import { useState, useEffect } from 'react';

type ABTestVariant = {
  id: string;
  text: string;
  weight?: number; // For weighted distribution (default 1)
};

type ABTestConfig = {
  testName: string;
  variants: ABTestVariant[];
  persistInSession?: boolean; // Whether to remember choice during session
};

export function useABTest(config: ABTestConfig) {
  const [selectedVariant, setSelectedVariant] = useState<ABTestVariant | null>(null);

  useEffect(() => {
    const { testName, variants, persistInSession = true } = config;
    const storageKey = `ab_test_${testName}`;

    // Check if we already have a selection for this session
    if (persistInSession) {
      const stored = sessionStorage.getItem(storageKey);
      if (stored) {
        const storedVariant = variants.find(v => v.id === stored);
        if (storedVariant) {
          setSelectedVariant(storedVariant);
          return;
        }
      }
    }

    // Calculate total weight
    const totalWeight = variants.reduce((sum, variant) => sum + (variant.weight || 1), 0);
    
    // Generate random number
    const random = Math.random() * totalWeight;
    
    // Select variant based on weighted distribution
    let currentWeight = 0;
    for (const variant of variants) {
      currentWeight += variant.weight || 1;
      if (random <= currentWeight) {
        setSelectedVariant(variant);
        
        // Store selection for session persistence
        if (persistInSession) {
          sessionStorage.setItem(storageKey, variant.id);
        }
        
        // Optional: Track the variant selection for analytics
        console.log(`AB Test "${testName}": Selected variant "${variant.id}"`);
        
        break;
      }
    }
  }, [config]);

  return selectedVariant;
}