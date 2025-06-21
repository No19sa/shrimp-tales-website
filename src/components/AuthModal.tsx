import { User, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { SignIn, SignUp } from '@/components/Auth';

export default function AuthModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [showSignUp, setShowSignUp] = useState(false);
  useEffect(() => {
    function onOpenAuthModal() {
      if (!open) onClose();
    }
    window.addEventListener('open-auth-modal', onOpenAuthModal);
    return () => window.removeEventListener('open-auth-modal', onOpenAuthModal);
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-2xl shadow-2xl p-0 w-full max-w-md relative overflow-hidden border-2 border-aqua-200">
        <button className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-2xl" onClick={onClose}><X /></button>
        <div className="flex flex-col items-center py-6 px-8">
          <User className="h-12 w-12 text-aqua-600 mb-2" />
          <h2 className="text-3xl font-bold text-aqua-700 mb-4">{showSignUp ? 'Create Account' : 'Welcome Back'}</h2>
          {showSignUp ? <SignUp /> : <SignIn />}
          <button className="mt-4 underline w-full text-aqua-700 font-medium" onClick={() => setShowSignUp(!showSignUp)}>
            {showSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
}
