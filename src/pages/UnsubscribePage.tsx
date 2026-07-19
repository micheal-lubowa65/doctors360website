import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Loader, CheckCircle2, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

type Status = 'loading' | 'success' | 'already' | 'error';

export default function UnsubscribePage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token')?.trim() || '';
  const [status, setStatus] = useState<Status>('loading');

  useEffect(() => {
    async function unsubscribe() {
      if (!token) {
        setStatus('error');
        return;
      }

      const { error, count } = await supabase
        .from('subscribers')
        .update({ unsubscribed: true }, { count: 'exact' })
        .eq('unsubscribe_token', token)
        .eq('unsubscribed', false);

      if (error) {
        console.error('Unsubscribe failed:', error);
        setStatus('error');
        return;
      }

      if (!count || count === 0) {
        setStatus('already');
        return;
      }

      setStatus('success');
    }

    unsubscribe();
  }, [token]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full bg-white border border-gray-100 rounded-3xl shadow-xl p-8 text-center">
        {status === 'loading' && (
          <>
            <Loader className="w-10 h-10 text-teal-600 animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Processing your request...</p>
          </>
        )}

        {status === 'success' && (
          <>
            <CheckCircle2 className="w-12 h-12 text-teal-600 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">You&apos;ve been unsubscribed</h1>
            <p className="text-gray-600 mb-6">
              You will no longer receive newsletter emails from Doctors360.
            </p>
            <Link to="/" className="btn-primary inline-flex">
              Back to Home
            </Link>
          </>
        )}

        {status === 'already' && (
          <>
            <CheckCircle2 className="w-12 h-12 text-teal-600 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Already unsubscribed</h1>
            <p className="text-gray-600 mb-6">
              This email address is already removed from our newsletter list.
            </p>
            <Link to="/" className="btn-primary inline-flex">
              Back to Home
            </Link>
          </>
        )}

        {status === 'error' && (
          <>
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Invalid unsubscribe link</h1>
            <p className="text-gray-600 mb-6">
              This link may be expired or invalid. Please contact us if you continue to receive emails.
            </p>
            <Link to="/" className="btn-primary inline-flex">
              Back to Home
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
