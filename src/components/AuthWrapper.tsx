import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { SignIn, SignUp, SignOut } from '../components/Auth';

export default function AuthWrapper({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showSignUp, setShowSignUp] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
      setLoading(false);
    };
    getUser();
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  if (loading) return <div>Loading...</div>;

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        {showSignUp ? <SignUp /> : <SignIn />}
        <button className="mt-4 underline" onClick={() => setShowSignUp(!showSignUp)}>
          {showSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-end p-4"><SignOut /></div>
      {children}
    </div>
  );
}
