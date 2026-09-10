'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function VisitorTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // Generate or get session ID
    let sessionId = localStorage.getItem('visitor_session_id');
    if (!sessionId) {
      sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('visitor_session_id', sessionId);
    }

    // Track page view
    const trackVisit = async () => {
      try {
        await fetch('/api/track-visitor', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            sessionId,
            path: pathname,
            title: document.title,
          }),
        });
      } catch (error) {
        console.error('Failed to track visit:', error);
      }
    };

    trackVisit();
  }, [pathname]);

  return null; // This component doesn't render anything
}
