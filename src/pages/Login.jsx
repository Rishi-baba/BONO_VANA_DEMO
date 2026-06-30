import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCustomer } from '../context/CustomerContext';
import { customerAccessTokenCreate } from '../services/shopify';
import { Button } from '../components/ui/Button';
import { SEO } from '../components/ui/SEO';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useCustomer();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const data = await customerAccessTokenCreate({ email, password });
    
    if (data?.customerUserErrors?.length > 0) {
      setError(data.customerUserErrors[0].message);
    } else if (data?.customerAccessToken?.accessToken) {
      login(data.customerAccessToken.accessToken);
      navigate('/profile');
    } else {
      setError("An unexpected error occurred. Please try again.");
    }
    setIsLoading(false);
  };

  return (
    <div className="pt-32 pb-24 px-4 md:px-8 max-w-lg mx-auto">
      <SEO 
        title="Sign In" 
        description="Sign in to your Boho Vana account."
      />
      <div className="text-center mb-12">
        <h1 className="font-serif text-3xl md:text-4xl font-medium text-charcoal mb-4">Welcome Back</h1>
        <p className="font-sans text-sm text-charcoal/60">Sign in to your account to view your orders and profile.</p>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 text-xs font-sans p-3 rounded mb-6 text-center">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block font-sans text-[10px] tracking-widest uppercase font-bold text-charcoal mb-2">Email</label>
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border-b border-charcoal/20 bg-transparent py-2 px-1 font-sans text-sm text-charcoal focus:outline-none focus:border-forest-green transition-colors"
            required 
          />
        </div>
        <div>
          <label className="block font-sans text-[10px] tracking-widest uppercase font-bold text-charcoal mb-2">Password</label>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border-b border-charcoal/20 bg-transparent py-2 px-1 font-sans text-sm text-charcoal focus:outline-none focus:border-forest-green transition-colors"
            required 
          />
        </div>

        <div className="pt-4">
          <Button type="submit" variant="primary" className="w-full flex justify-center py-4" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>
        </div>
      </form>

      <div className="mt-8 text-center space-y-4">
        <p className="font-sans text-xs text-charcoal/60">
          Don't have an account? <Link to="/register" className="text-charcoal font-bold hover:text-forest-green underline transition-colors">Create one</Link>
        </p>
      </div>
    </div>
  );
};
