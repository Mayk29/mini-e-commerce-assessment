import { useState, useEffect } from 'react';

export default function OfflineBanner() {
  const [isOnline, setIsOnline] = useState(() => navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (isOnline) return null;

  return (
    <div 
      className="fixed bottom-0 left-0 right-0 z-50 bg-neutral-900 px-4 py-3 text-center animate-slideUp border-t border-neutral-800"
      role="alert"
      aria-live="assertive"
    >
      <div className="flex items-center justify-center gap-2 text-xs font-medium tracking-wide text-white uppercase">
        <span className="h-2 w-2 rounded-full bg-orange-500 animate-pulse" />
        <span>Offline Mode — Displaying cached storefront data</span>
      </div>
    </div>
  );
}