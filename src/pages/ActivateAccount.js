// src/pages/ActivateAccount.js
import React, { useState, useEffect } from 'react';
import { Check, Lock, Phone, AlertCircle, Star, Loader2, XCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function ActivateAccount() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [checkingPayment, setCheckingPayment] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [applicationData, setApplicationData] = useState(null);
  const [fundingAmount, setFundingAmount] = useState(0);
  const [clientReference] = useState(`NYOTA-${Date.now()}-${Math.floor(Math.random() * 1000)}`);

  useEffect(() => {
    const data = localStorage.getItem('nyotaApplication');
    const savedAmount = localStorage.getItem('nyotaFundingAmount');

    if (data && savedAmount) {
      const parsed = JSON.parse(data);
      setApplicationData(parsed);
      setPhone(parsed.phone || '');
      setFundingAmount(parseInt(savedAmount));
    } else {
      navigate('/apply');
    }
  }, [navigate]);

  const formatAmount = (amount) => amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // Poll payment status — NOW HANDLES FAILED & CANCELLED
  const checkPaymentStatus = async (reference) => {
    try {
      const res = await fetch(`/api/transaction-status?reference=${reference}`);
      const data = await res.json();

      if (!data.success) {
        setCheckingPayment(false);
        setError('Payment status check failed. Please try again.');
        setLoading(false);
        return;
      }

      if (data.status === 'SUCCESS') {
        setCheckingPayment(false);
        setSuccess(true);
        localStorage.setItem('nyotaAccountActivated', 'true');
        localStorage.setItem('nyotaActivatedPhone', phone);
        localStorage.setItem('nyotaPaymentReference', reference);
      } 
      else if (data.status === 'FAILED' || data.status === 'CANCELLED') {
        setCheckingPayment(false);
        setLoading(false);
        setError('Payment failed or was cancelled. Please try again.');
      } 
      else if (data.status === 'QUEUED') {
        // Still waiting — poll again
        setTimeout(() => checkPaymentStatus(reference), 3000);
      }
    } catch (err) {
      console.error('Status check failed:', err);
      setTimeout(() => checkPaymentStatus(reference), 5000);
    }
  };

  const handleActivate = async () => {
    if (!phone || phone.length !== 10) {
      alert("Please enter a valid 10-digit phone number");
      return;
    }

    setLoading(true);
    setError('');
    setCheckingPayment(false);

    try {
      const response = await fetch('/api/stk-push', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phoneNumber: phone,
          amount: 225,
          reference: clientReference,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setLoading(false);
        setCheckingPayment(true);
        checkPaymentStatus(result.payheroReference || result.clientReference);
      } else {
        setLoading(false);
        setError(result.error || 'Failed to send payment request. Try again.');
      }
    } catch (err) {
      setLoading(false);
      setError('Network error. Check your connection and try again.');
      console.error('STK Push failed:', err);
    }
  };

  if (!applicationData) return null;

  return (
    <>
      <header className="bg-kenya-black text-white py-5 shadow-xl">
        <div className="max-w-2xl mx-auto px-4 flex items-center gap-3">
          <div className="w-10 h-10 kenya-gradient rounded-full flex items-center justify-center shadow-lg">
            <Star className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-xl font-black">NYOTA Account Activation</h1>
        </div>
      </header>

      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-10">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full border-t-8 border-kenya-red">

          {!success ? (
            <>
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-kenya-red rounded-full flex items-center justify-center mx-auto mb-6">
                  <Lock className="w-12 h-12 text-white" />
                </div>
                <h2 className="text-2xl font-black text-kenya-black mb-3">
                  Final Step: Activate Your Account
                </h2>
                <p className="text-gray-600">
                  Hello <strong>{applicationData.fullName}</strong>,<br />
                  Your application for <strong>KSh {formatAmount(fundingAmount)}</strong> is approved!
                </p>
              </div>

              <div className="bg-amber-50 border border-amber-300 rounded-xl p-4 mb-6">
                <div className="flex gap-3">
                  <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0" />
                  <div>
                    <p className="font-bold text-kenya-black">Activation Fee: KSh 225</p>
                    <p className="text-sm text-gray-700">
                      Pay a one-time fee to activate your Nyota Youth Fund account.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    <Phone className="inline w-5 h-5 mr-2 text-kenya-green" />
                    M-Pesa Phone Number
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl focus:border-kenya-green focus:outline-none text-lg text-center font-mono"
                    placeholder="0712345678"
                    maxLength="10"
                    disabled={loading || checkingPayment}
                  />
                  <p className="text-xs text-gray-500 mt-2 text-center">
                    You will receive an M-Pesa prompt on this number
                  </p>
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded-lg text-sm flex items-center gap-2">
                    <XCircle className="w-5 h-5" />
                    {error}
                  </div>
                )}

                <button
                  onClick={handleActivate}
                  disabled={loading || checkingPayment || phone.length !== 10}
                  className="w-full bg-kenya-green hover:bg-green-700 text-white font-black text-xl py-5 rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                  {checkingPayment ? (
                    <>
                      <Loader2 className="w-7 h-7 animate-spin" />
                      Waiting for Payment...
                    </>
                  ) : loading ? (
                    <>
                      <Loader2 className="w-7 h-7 animate-spin" />
                      Sending STK Push...
                    </>
                  ) : (
                    <>
                      <Lock className="w-7 h-7" />
                      Activate Account
                    </>
                  )}
                </button>

                {checkingPayment && (
                  <p className="text-center text-sm text-gray-600 animate-pulse mt-4">
                    Please enter your M-Pesa PIN on your phone
                  </p>
                )}
              </div>
            </>
          ) : (
            /* SUCCESS STATE */
            <>
              <div className="text-center">
                <div className="w-24 h-24 bg-kenya-green rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                  <Check className="w-16 h-16 text-white" />
                </div>
                <h2 className="text-3xl font-black text-kenya-black mb-4">
                  Payment Successful!
                </h2>
                <p className="text-2xl font-bold text-kenya-green mb-4">
                  Account Activated
                </p>
                <p className="text-xl font-bold text-kenya-green mb-6">
                  KSh {formatAmount(fundingAmount)} Coming in 72 Hours!
                </p>
                <p className="text-gray-700 mb-8">
                  Congratulations <strong>{applicationData.fullName}</strong>!<br />
                  Your Nyota Youth Fund is now fully activated.
                </p>

                <Link to="/">
                  <button className="w-full bg-kenya-red text-white font-bold text-lg py-5 rounded-full shadow-xl hover:scale-105 transition flex items-center justify-center gap-3">
                    Back to Home
                  </button>
                </Link>

                <div className="mt-8 p-5 bg-gray-50 rounded-xl text-left">
                  <p className="text-sm text-gray-600">
                    <strong>Reference ID:</strong> {clientReference}<br />
                    <strong>Activated On:</strong> {new Date().toLocaleString('en-KE')}<br />
                    <strong>Payment:</strong> KSh 225 (Confirmed)
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}