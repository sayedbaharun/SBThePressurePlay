import { useState, useEffect } from 'react';
import { apiRequest } from '@/lib/queryClient';

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

// Generate a session ID that persists for the browser session
const getSessionId = () => {
  let sessionId = sessionStorage.getItem('ab_session_id');
  if (!sessionId) {
    sessionId = `${Date.now()}_${Math.random().toString(36).substring(2)}`;
    sessionStorage.setItem('ab_session_id', sessionId);
  }
  return sessionId;
};

// Track analytics events
const trackEvent = async (testName: string, variantId: string, eventType: 'exposure' | 'click') => {
  try {
    await apiRequest('POST', '/api/analytics/track', {
      testName,
      variantId,
      eventType,
      sessionId: getSessionId()
    });
  } catch (error) {
    // Fail silently for analytics - don't break user experience
    console.warn('Failed to track A/B test event:', error);
  }
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
        
        // Track exposure event
        trackEvent(testName, variant.id, 'exposure');
        console.log(`AB Test "${testName}": Selected variant "${variant.id}"`);
        
        break;
      }
    }
  }, [config]);

  // Return variant and tracking function
  return {
    variant: selectedVariant,
    trackClick: () => {
      if (selectedVariant) {
        trackEvent(config.testName, selectedVariant.id, 'click');
      }
    }
  };
}