import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Loader2, User, LogIn } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-aqua-100 to-white">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md border-2 border-aqua-200">
        <div className="flex flex-col items-center mb-6">
          <User className="h-12 w-12 text-aqua-600 mb-2" />
          <h2 className="text-3xl font-bold text-aqua-700 mb-2">{isSignUp ? 'Create Account' : 'Welcome Back'}</h2>
        </div>
        {isSignUp ? <SignUpForm /> : <SignInForm />}
        <button className="mt-4 underline w-full text-aqua-700 font-medium" onClick={() => setIsSignUp(!isSignUp)}>
          {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
        </button>
      </div>
    </div>
  );
}

function SignInForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) setError(error.message);
    else navigate('/');
  };

  return (
    <form onSubmit={handleSignIn} className="space-y-4">
      <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-aqua-400" required />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-aqua-400" required />
      <button type="submit" className="w-full flex items-center justify-center gap-2 bg-aqua-600 hover:bg-aqua-700 text-white font-semibold py-2 rounded transition">
        <LogIn className="h-5 w-5" />
        {loading ? <Loader2 className="animate-spin h-5 w-5" /> : 'Sign In'}
      </button>
      {error && <div className="text-red-500 text-center">{error}</div>}
    </form>
  );
}

function SignUpForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!fullName.trim()) {
      setError('Full name is required');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          phone,
          address,
          created_at: new Date().toISOString(),
          role: 'customer',
        },
      },
    });
    setLoading(false);
    if (error) setError(error.message);
    else {
      setSuccess('Check your email for confirmation! Redirecting to sign in...');
      setTimeout(() => window.location.reload(), 2000);
    }
  };

  return (
    <form onSubmit={handleSignUp} className="space-y-4">
      <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-aqua-400" required />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-aqua-400" required />
      <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-aqua-400" required />
      <input type="text" placeholder="Full Name (required)" value={fullName} onChange={e => setFullName(e.target.value)} className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-aqua-400" required />
      <input type="tel" placeholder="Phone (optional)" value={phone} onChange={e => setPhone(e.target.value)} className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-aqua-400" />
      <input type="text" placeholder="Address (optional)" value={address} onChange={e => setAddress(e.target.value)} className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-aqua-400" />
      <button type="submit" className="w-full flex items-center justify-center gap-2 bg-aqua-600 hover:bg-aqua-700 text-white font-semibold py-2 rounded transition">
        <LogIn className="h-5 w-5" />
        {loading ? <Loader2 className="animate-spin h-5 w-5" /> : 'Sign Up'}
      </button>
      {error && <div className="text-red-500 text-center">{error}</div>}
      {success && <div className="text-green-600 text-center">{success}</div>}
    </form>
  );
}
