
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
        
        // Load CSV data from the public folder
        const response = await fetch('/premium_transactions_jul2023_jun2025_v2.csv');
        if (!response.ok) {
          throw new Error('Failed to fetch CSV file');
        }
        
        const csvContent = await response.text();
        await csvService.loadCSVData(csvContent);
        setIsLoaded(true);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load CSV data');
        console.error('Error loading CSV:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  return { isLoaded, isLoading, error };
};
