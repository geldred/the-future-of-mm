
import React, { useState, useEffect } from 'react';
import Dashboard from '@/components/Dashboard';
import InsightDetail from '@/components/InsightDetail';

const Index = () => {
  const [showInsightDetail, setShowInsightDetail] = useState(false);

  useEffect(() => {
    document.title = "Plan & Spend";
  }, []);

  const handleInsightClick = () => {
    setShowInsightDetail(true);
  };

  const handleBackClick = () => {
    setShowInsightDetail(false);
  };

  return (
    <>
      {!showInsightDetail ? (
        <Dashboard onInsightClick={handleInsightClick} />
      ) : (
        <InsightDetail onBackClick={handleBackClick} />
      )}
    </>
  );
};

export default Index;
