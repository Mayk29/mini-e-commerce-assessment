import { useEffect, useState } from 'react';

/**
 * Individual toast item with auto-dismiss and fade-out animation.
 */
function Toast({ id, message, onDismiss }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Trigger enter animation on next tick
    const enterTimer = setTimeout(() => setVisible(true), 10);
    // Start fade-out 300ms before onDismiss fires
    const fadeTimer = setTimeout(() => setVisible(false), 2200);
    return () => {
      clearTimeout(enterTimer);
      clearTimeout(fadeTimer);
    };
  }, []);

  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        transition: 'opacity 0.3s ease, transform 0.3s ease',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(12px)',
      }}
      className="flex items-center gap-3 rounded-2xl border border-neutral-200 bg-white px-4 py-3 shadow-lg min-w-[240px] max-w-xs"
    >
      {/* Checkmark icon */}
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-neutral-900">
        <svg className="h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </span>
      <p className="text-xs font-medium text-neutral-900 leading-snug">{message}</p>
      <button
        type="button"
        onClick={() => onDismiss(id)}
        className="ml-auto text-neutral-300 hover:text-neutral-600 transition-colors"
        aria-label="Dismiss notification"
      >
        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}

/**
 * Toast container — renders a stacked list of toasts at bottom-right.
 * Props:
 *   toasts: Array<{ id, message }>
 *   onDismiss: (id) => void
 */
export default function ToastContainer({ toasts, onDismiss }) {
  if (toasts.length === 0) return null;
  return (
    <div
      aria-label="Notifications"
      className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 items-end pointer-events-none"
    >
      {toasts.map((t) => (
        <div key={t.id} className="pointer-events-auto">
          <Toast id={t.id} message={t.message} onDismiss={onDismiss} />
        </div>
      ))}
    </div>
  );
}