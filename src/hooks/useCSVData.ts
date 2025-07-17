import { useState, useEffect } from 'react';
import { csvService } from '@/services/csvService';

export const useCSVData = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        
        // For demo purposes, we'll create sample CSV data
        // In production, this would load from a file or API
        const sampleCSVData = `account_id,transaction_date,transaction_category,transaction_amount,transaction_description
ACC001,2024-01-15,Dining,-45.67,Restaurant ABC
ACC001,2024-01-16,Groceries,-125.43,Supermarket XYZ
ACC001,2024-01-17,Transportation,-35.20,Gas Station
ACC001,2024-01-18,Entertainment,-89.99,Movie Theater
ACC001,2024-01-19,Dining,-23.45,Coffee Shop
ACC001,2024-01-20,Shopping,-156.78,Department Store
ACC001,2024-01-21,Dining,-67.89,Restaurant DEF
ACC001,2024-01-22,Groceries,-98.76,Supermarket ABC
ACC001,2024-01-23,Transportation,-42.30,Rideshare
ACC001,2024-01-24,Entertainment,-15.99,Streaming Service
ACC001,2024-01-25,Dining,-78.90,Restaurant GHI
ACC001,2024-01-26,Shopping,-234.56,Electronics Store
ACC001,2024-01-27,Groceries,-87.65,Organic Market
ACC001,2024-01-28,Dining,-34.56,Fast Food
ACC001,2024-01-29,Transportation,-28.70,Public Transit
ACC001,2024-01-30,Entertainment,-45.00,Concert Tickets`;

        await csvService.loadCSVData(sampleCSVData);
        setIsLoaded(true);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load CSV data');
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  return { isLoaded, isLoading, error };
};