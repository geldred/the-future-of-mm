
import React, { useEffect } from 'react';
import Dashboard from '@/components/Dashboard';

const Index = () => {
  useEffect(() => {
    document.title = "Plan & Spend";
  }, []);

  return <Dashboard />;
};

export default Index;
