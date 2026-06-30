import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { customerCreate, customerAccessTokenCreate } from '../services/shopify';
import { useCustomer } from '../context/CustomerContext';
import { Button } from '../components/ui/Button';
import { SEO } from '../components/ui/SEO';

export const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
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

    // 1. Create Customer
    const createData = await customerCreate({ email, password, firstName, lastName });
    
    if (createData?.customerUserErrors?.length > 0) {
      setError(createData.customerUserErrors[0].message);
      setIsLoading(false);
      return;
    }

    // 2. Automatically log them in after registration
    const loginData = await customerAccessTokenCreate({ email, password });
    
    if (loginData?.customerAccessToken?.accessToken) {
      login(loginData.customerAccessToken.accessToken);
      navigate('/profile');
    } else {
      // Fallback if auto-login fails
      navigate('/login');
    }
    
    setIsLoading(false);
  };

  return (
    <div className="pt-32 pb-24 px-4 md:px-8 max-w-lg mx-auto">
      <SEO 
        title="Create Account" 
        description="Join Boho Vana to track orders and save your favorites."
      />
      <div className="text-center mb-12">
        <h1 className="font-serif text-3xl md:text-4xl font-medium text-charcoal mb-4">Create Account</h1>
        <p className="font-sans text-sm text-charcoal/60">Join Boho Vana to track orders and save your favorites.</p>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 text-xs font-sans p-3 rounded mb-6 text-center">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-sans text-[10px] tracking-widest uppercase font-bold text-charcoal mb-2">First Name</label>
            <input 
              type="text" 
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full border-b border-charcoal/20 bg-transparent py-2 px-1 font-sans text-sm text-charcoal focus:outline-none focus:border-forest-green transition-colors"
              required 
            />
          </div>
          <div>
            <label className="block font-sans text-[10px] tracking-widest uppercase font-bold text-charcoal mb-2">Last Name</label>
            <input 
              type="text" 
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full border-b border-charcoal/20 bg-transparent py-2 px-1 font-sans text-sm text-charcoal focus:outline-none focus:border-forest-green transition-colors"
              required 
            />
          </div>
        </div>
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
            {isLoading ? "Creating Account..." : "Create Account"}
          </Button>
        </div>
      </form>

      <div className="mt-8 text-center space-y-4">
        <p className="font-sans text-xs text-charcoal/60">
          Already have an account? <Link to="/login" className="text-charcoal font-bold hover:text-forest-green underline transition-colors">Sign in</Link>
        </p>
      </div>
    </div>
  );
};
