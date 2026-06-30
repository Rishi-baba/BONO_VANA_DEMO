import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCustomer, customerAccessTokenDelete } from '../services/shopify';

const CustomerContext = createContext(undefined);

export const CustomerProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(() => localStorage.getItem('bv_customer_token'));
  const [customer, setCustomer] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCustomer = async () => {
      if (accessToken) {
        setIsLoading(true);
        const data = await getCustomer(accessToken);
        if (data) {
          setCustomer(data);
        } else {
          // Token might be expired or invalid
          localStorage.removeItem('bv_customer_token');
          setAccessToken(null);
          setCustomer(null);
        }
        setIsLoading(false);
      } else {
        setCustomer(null);
        setIsLoading(false);
      }
    };
    fetchCustomer();
  }, [accessToken]);

  const login = (token) => {
    localStorage.setItem('bv_customer_token', token);
    setAccessToken(token);
  };

  const logout = async () => {
    if (accessToken) {
      await customerAccessTokenDelete(accessToken);
    }
    localStorage.removeItem('bv_customer_token');
    setAccessToken(null);
    setCustomer(null);
  };

  return (
    <CustomerContext.Provider value={{
      customer,
      accessToken,
      isLoading,
      login,
      logout
    }}>
      {children}
    </CustomerContext.Provider>
  );
};

export const useCustomer = () => {
  const context = useContext(CustomerContext);
  if (context === undefined) {
    throw new Error('useCustomer must be used within a CustomerProvider');
  }
  return context;
};
