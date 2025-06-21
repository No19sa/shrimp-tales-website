import React, { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Loader2, User, LogIn, LogOut } from 'lucide-react';

export function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) setError(error.message);
    else window.location.reload();
  };

  return (
    <form onSubmit={handleSignIn} className="space-y-6 bg-gradient-to-br from-aqua-100 to-white p-6 rounded-xl shadow-xl">
      <div className="flex flex-col items-center mb-4">
        <User className="h-10 w-10 text-aqua-600 mb-2" />
        <h2 className="text-2xl font-bold text-aqua-700">Sign In</h2>
      </div>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-aqua-400"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-aqua-400"
        required
      />
      <button type="submit" className="w-full flex items-center justify-center gap-2 bg-aqua-600 hover:bg-aqua-700 text-white font-semibold py-2 rounded transition">
        <LogIn className="h-5 w-5" />
        {loading ? <Loader2 className="animate-spin h-5 w-5" /> : 'Sign In'}
      </button>
      {error && <div className="text-red-500 text-center">{error}</div>}
    </form>
  );
}

export function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    const { error } = await supabase.auth.signUp({ email, password });
    setLoading(false);
    if (error) setError(error.message);
    else setSuccess('Check your email for confirmation!');
  };

  return (
    <form onSubmit={handleSignUp} className="space-y-6 bg-gradient-to-br from-aqua-100 to-white p-6 rounded-xl shadow-xl">
      <div className="flex flex-col items-center mb-4">
        <User className="h-10 w-10 text-aqua-600 mb-2" />
        <h2 className="text-2xl font-bold text-aqua-700">Sign Up</h2>
      </div>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-aqua-400"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-aqua-400"
        required
      />
      <button type="submit" className="w-full flex items-center justify-center gap-2 bg-aqua-600 hover:bg-aqua-700 text-white font-semibold py-2 rounded transition">
        <LogIn className="h-5 w-5" />
        {loading ? <Loader2 className="animate-spin h-5 w-5" /> : 'Sign Up'}
      </button>
      {error && <div className="text-red-500 text-center">{error}</div>}
      {success && <div className="text-green-600 text-center">{success}</div>}
    </form>
  );
}

export function SignOut() {
  const [loading, setLoading] = useState(false);
  const handleSignOut = async () => {
    setLoading(true);
    await supabase.auth.signOut();
    setLoading(false);
    window.location.reload();
  };
  return <button onClick={handleSignOut} className="w-full flex items-center justify-center gap-2 bg-red-100 hover:bg-red-200 text-red-700 font-semibold py-2 rounded transition">
    <LogOut className="h-5 w-5" />
    {loading ? <Loader2 className="animate-spin h-5 w-5" /> : 'Sign Out'}
  </button>;
}
