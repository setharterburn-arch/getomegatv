'use client';

import { useState, useEffect, useRef } from 'react';

interface PaymentFormProps {
  amount: number;
  plan: string;
  email: string;
  onSuccess: (response: any) => void;
  onError: (error: string) => void;
  onCancel: () => void;
}

declare global {
  interface Window {
    tokenizer: any;
  }
}

export default function PaymentForm({ amount, plan, email, onSuccess, onError, onCancel }: PaymentFormProps) {
  const [loading, setLoading] = useState(false);
  const [cardholderName, setCardholderName] = useState('');
  const [ready, setReady] = useState(false);
  const tokenizerRef = useRef<any>(null);
  const inputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load BlockChyp tokenizer script
    const script = document.createElement('script');
    script.src = 'https://api.blockchyp.com/static/js/blockchyp-tokenizer-all.min.js';
    script.async = true;
    script.onload = () => {
      initTokenizer();
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const initTokenizer = async () => {
    try {
      // Fetch tokenizing key from backend
      const response = await fetch('/api/blockchyp/tokenizing-key');
      const data = await response.json();
      
      if (window.tokenizer && inputRef.current) {
        tokenizerRef.current = window.tokenizer;
        
        // Render the secure input
        window.tokenizer.render(data.tokenizingKey, false, 'blockchyp-card-input', {
          postalCode: true,
        });
        
        setReady(true);
      }
    } catch (err) {
      console.error('Failed to init tokenizer:', err);
      onError('Failed to load payment form');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!cardholderName.trim()) {
      onError('Please enter cardholder name');
      return;
    }
    
    setLoading(true);
    
    try {
      // Tokenize the card
      const tokenResponse = await tokenizerRef.current.tokenize('', {
        cardholderName: cardholderName,
      });
      
      if (!tokenResponse.data || !tokenResponse.data.token) {
        throw new Error(tokenResponse.data?.responseDescription || 'Failed to tokenize card');
      }
      
      // Send token to backend to charge
      const chargeResponse = await fetch('/api/blockchyp/charge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token: tokenResponse.data.token,
          amount: amount,
          email: email,
          plan: plan,
        }),
      });
      
      const chargeData = await chargeResponse.json();
      
      if (chargeData.success && chargeData.approved) {
        onSuccess(chargeData);
      } else {
        onError(chargeData.error || 'Payment declined');
      }
    } catch (err: any) {
      console.error('Payment error:', err);
      onError(err.message || 'Payment failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white/5 rounded-xl p-4 mt-3">
      <div className="text-center mb-4">
        <p className="text-lg font-semibold text-white">Complete Payment</p>
        <p className="text-purple-300">{plan} - ${amount}</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm text-gray-300 mb-1">Card Information</label>
          <div 
            id="blockchyp-card-input" 
            ref={inputRef}
            className="bg-white rounded-lg p-3 min-h-[50px]"
          />
        </div>
        
        <div>
          <label className="block text-sm text-gray-300 mb-1">Cardholder Name</label>
          <input
            type="text"
            value={cardholderName}
            onChange={(e) => setCardholderName(e.target.value)}
            placeholder="Name on card"
            className="w-full bg-white/10 text-white placeholder-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            disabled={loading}
          />
        </div>
        
        <div className="flex gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-white/10 hover:bg-white/20 text-white rounded-lg py-2 transition-colors"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading || !ready}
            className="flex-1 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white rounded-lg py-2 font-medium transition-colors"
          >
            {loading ? 'Processing...' : `Pay $${amount}`}
          </button>
        </div>
      </form>
      
      <p className="text-xs text-gray-400 text-center mt-3">
        🔒 Secured by BlockChyp
      </p>
    </div>
  );
}
