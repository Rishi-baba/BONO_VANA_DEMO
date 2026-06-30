import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const Orders = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/profile');
  }, [navigate]);

  return null;
};
