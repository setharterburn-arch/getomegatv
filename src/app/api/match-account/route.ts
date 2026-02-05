import { NextRequest, NextResponse } from 'next/server'
import { adminSupabase } from '@/lib/supabase-server'
import fs from 'fs'

// Customer CSV path
const CUSTOMER_CSV = '/home/ubuntu/clawd/iptv-panel/maincell_with_phones.csv'

const PUSHOVER_USER = process.env.PUSHOVER_USER_KEY;
const PUSHOVER_TOKEN = process.env.PUSHOVER_APP_TOKEN;

interface Customer {
  panelId: string
  username: string
  expiry: string
  phone: string
  notes: string
}

async function sendPushover(title: string, message: string, priority: number = 0) {
  if (!PUSHOVER_USER || !PUSHOVER_TOKEN) return;
  
  try {
    await fetch('https://api.pushover.net/1/messages.json', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        token: PUSHOVER_TOKEN,
        user: PUSHOVER_USER,
        title,
        message,
        priority,
      }),
    });
  } catch (err) {
    console.error('Pushover failed:', err);
  }
}

function normalizePhone(phone: string): string {
  return phone.replace(/\D/g, '')
}

function normalizeName(name: string): string {
  return name.replace(/\d{4}$/, '').toLowerCase().trim()
}

function similarity(s1: string, s2: string): number {
  const n1 = normalizeName(s1)
  const n2 = normalizeName(s2)
  if (!n1 || !n2) return 0
  
  const longer = n1.length > n2.length ? n1 : n2
  const shorter = n1.length > n2.length ? n2 : n1
  
  if (longer.length === 0) return 1.0
  
  const editDistance = levenshtein(longer, shorter)
  return (longer.length - editDistance) / longer.length
}

function levenshtein(s1: string, s2: string): number {
  const costs: number[] = []
  for (let i = 0; i <= s1.length; i++) {
    let lastValue = i
    for (let j = 0; j <= s2.length; j++) {
      if (i === 0) {
        costs[j] = j
      } else if (j > 0) {
        let newValue = costs[j - 1]
        if (s1.charAt(i - 1) !== s2.charAt(j - 1)) {
          newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1
        }
        costs[j - 1] = lastValue
        lastValue = newValue
      }
    }
    if (i > 0) costs[s2.length] = lastValue
  }
  return costs[s2.length]
}

function parseCSVWithQuotes(content: string): string[][] {
  const rows: string[][] = []
  let currentRow: string[] = []
  let currentField = ''
  let inQuotes = false
  
  // Remove Windows line endings
  content = content.replace(/\r/g, '')
  
  for (let i = 0; i < content.length; i++) {
    const char = content[i]
    
    if (char === '"') {
      if (inQuotes && content[i + 1] === '"') {
        // Escaped quote
        currentField += '"'
        i++
      } else {
        // Toggle quote mode
        inQuotes = !inQuotes
      }
    } else if (char === ',' && !inQuotes) {
      currentRow.push(currentField)
      currentField = ''
    } else if (char === '\n' && !inQuotes) {
      currentRow.push(currentField)
      if (currentRow.length > 1) { // Skip empty rows
        rows.push(currentRow)
      }
      currentRow = []
      currentField = ''
    } else {
      currentField += char
    }
  }
  
  // Don't forget the last field/row
  if (currentField || currentRow.length > 0) {
    currentRow.push(currentField)
    if (currentRow.length > 1) {
      rows.push(currentRow)
    }
  }
  
  return rows
}

function loadCustomers(): Customer[] {
  try {
    const content = fs.readFileSync(CUSTOMER_CSV, 'utf-8')
    const rows = parseCSVWithQuotes(content)
    
    // Skip header row
    const customers = rows.slice(1).map(row => ({
      panelId: row[0] || '',
      username: row[1] || '',
      expiry: row[2] || '',
      phone: normalizePhone(row[3] || ''),
      notes: row[4] || '',
    }))
    
    console.log(`[MATCH] Loaded ${customers.length} customers, sample:`, customers.slice(0, 3).map(c => ({ username: c.username, phone: c.phone })))
    return customers
  } catch (err) {
    console.error('Failed to load customers:', err)
    return []
  }
}

function matchCustomer(name: string, phone: string, email: string, customers: Customer[]) {
  const cleanPhone = normalizePhone(phone)
  console.log(`[MATCH] Looking for phone: ${cleanPhone}, name: ${name}`)
  
  // First, find phone matches
  const phoneMatches = customers.filter(c => c.phone === cleanPhone && cleanPhone.length >= 10)
  console.log(`[MATCH] Phone matches found: ${phoneMatches.length}`)
  
  if (phoneMatches.length === 0) {
    // Try matching by name alone (for cases where phone wasn't recorded)
    const nameMatches = customers.filter(c => {
      const score = similarity(name, c.username)
      return score >= 0.85
    })
    
    if (nameMatches.length === 1) {
      console.log(`[MATCH] Single name match found: ${nameMatches[0].username}`)
      return { status: 'review_required', confidence: 0.85, customer: nameMatches[0] }
    }
    
    return { status: 'no_match', confidence: 0 }
  }
  
  // Score by name similarity
  let bestMatch = null
  let bestScore = 0
  
  for (const customer of phoneMatches) {
    const score = similarity(name, customer.username)
    console.log(`[MATCH] Comparing "${name}" to "${customer.username}": ${score.toFixed(2)}`)
    if (score > bestScore) {
      bestScore = score
      bestMatch = customer
    }
  }
  
  if (!bestMatch) {
    return { status: 'no_match', confidence: 0 }
  }
  
  // Thresholds: 85%+ auto-link, 50-84% review, <50% no match
  if (bestScore >= 0.85) {
    return { status: 'auto_link', confidence: bestScore, customer: bestMatch }
  } else if (bestScore >= 0.50) {
    return { status: 'review_required', confidence: bestScore, customer: bestMatch }
  }
  
  return { status: 'no_match', confidence: bestScore }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, phone, userId, email } = body
    
    console.log(`[MATCH] New signup: name="${name}", phone="${phone}", userId="${userId}"`)
    
    if (!name || !phone || !userId) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }
    
    const customers = loadCustomers()
    const result = matchCustomer(name, phone, email || '', customers)
    console.log(`[MATCH] Result: ${result.status}, confidence: ${result.confidence}`)
    
    if (result.status === 'auto_link' && result.customer) {
      // Parse expiry date from CSV format "15-01-2027 13:39\n352 days left"
      const expiryMatch = result.customer.expiry.match(/(\d{2}-\d{2}-\d{4})/)
      let expiryDate = null
      if (expiryMatch) {
        const [day, month, year] = expiryMatch[1].split('-')
        expiryDate = new Date(`${year}-${month}-${day}`).toISOString()
      }
      
      // Save link to database with correct column names
      const { error } = await adminSupabase.from('user_subscriptions').insert({
        user_id: userId,
        iptv_username: result.customer.username,
        status: 'active',
        expires_at: expiryDate,
        plan_name: '1 Month',
        price_cents: 2500,
      })
      
      if (error) {
        console.error('[MATCH] Failed to save subscription:', error)
      } else {
        console.log(`[MATCH] Auto-linked ${name} to ${result.customer.username}`)
        
        // Notify via Pushover (low priority for auto-links)
        await sendPushover(
          '✅ Omega TV: Auto-Linked',
          `${name} → @${result.customer.username}\nConfidence: ${Math.round(result.confidence * 100)}%`,
          -1
        )
      }
      
      return NextResponse.json({
        matched: true,
        status: 'auto_link',
        username: result.customer.username,
      })
      
    } else if (result.status === 'review_required' && result.customer) {
      // Save for manual review
      const { error } = await adminSupabase.from('pending_matches').insert({
        user_id: userId,
        user_name: name,
        user_phone: phone,
        user_email: email || '',
        matched_iptv_username: result.customer.username,
        match_confidence: result.confidence,
        status: 'pending',
      })
      
      if (error) {
        console.error('[MATCH] Failed to save pending match:', error)
      } else {
        // Notify via Pushover (normal priority for review)
        await sendPushover(
          '🔗 Omega TV: Review Needed',
          `${name} might be @${result.customer.username}\nConfidence: ${Math.round(result.confidence * 100)}%\nPhone: ${phone}`,
          0
        )
      }
      
      return NextResponse.json({
        matched: false,
        status: 'review_required',
        message: 'Your account is pending manual verification.',
      })
    }
    
    // No match - create pending entry without match
    await adminSupabase.from('pending_matches').insert({
      user_id: userId,
      user_name: name,
      user_phone: phone,
      user_email: email || '',
      matched_iptv_username: null,
      match_confidence: null,
      status: 'pending',
    })
    
    // Notify via Pushover
    await sendPushover(
      '❓ Omega TV: No Match',
      `New signup couldn't be matched:\n${name}\nPhone: ${phone}`,
      0
    )
    
    return NextResponse.json({
      matched: false,
      status: 'no_match',
      message: 'No matching IPTV account found. Contact support.',
    })
  } catch (err) {
    console.error('Match error:', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
