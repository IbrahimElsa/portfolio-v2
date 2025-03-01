'use client';

import { useEffect } from 'react';

export type VisitorData = {
  deviceType: string;
  userAgent: string;
};

/**
 * Function to check if the current user agent is a bot
 */
export const isBot = (userAgent: string): boolean => {
  const BOT_IDENTIFIERS = [
    'bot', 'spider', 'crawl', 'crawler', 'prerender', 'headless', 
    'lighthouse', 'pingdom', 'pagespeed', 'googlebot', 
    'chrome-lighthouse', 'gtmetrix'
  ];
  
  return BOT_IDENTIFIERS.some(identifier => 
    userAgent.toLowerCase().includes(identifier.toLowerCase())
  );
};

/**
 * Function to detect device type from user agent
 */
export const getDeviceType = (userAgent: string): string => {
  return /Mobi|Android/i.test(userAgent) ? 'Mobile' : 'Desktop';
};

/**
 * Send visitor notification to the API endpoint
 */
export const notifyVisitor = async (visitorData: VisitorData): Promise<void> => {
  try {
    const response = await fetch('/api/notify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(visitorData)
    });
    
    const data = await response.json();
    console.log('Email notification sent:', data);
  } catch (err) {
    console.error('Failed to send email notification:', err);
  }
};

/**
 * Hook to handle visitor notification with localStorage to prevent duplicate notifications
 */
export const useVisitorNotification = (): void => {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Only notify once per browser using localStorage
    if (localStorage.getItem('visited')) return;

    const userAgent = navigator.userAgent;

    // Skip notification for bots
    if (isBot(userAgent)) return;

    const deviceType = getDeviceType(userAgent);

    // Mark as visited to prevent future notifications
    localStorage.setItem('visited', 'true');

    // Send notification
    notifyVisitor({ deviceType, userAgent });
  }, []);
};