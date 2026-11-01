import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext.js';

export function ImageLightbox({ id, alt, onClose }) {
  const { messages } = useI18n();
  const closeRef = useRef(null);
  const base = `${import.meta.env.BASE_URL}images/${id}`;

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    closeRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [onClose]);

  return createPortal(
    <div
      className="fixed inset-0 z-50 bg-black"
      role="dialog"
      aria-modal="true"
      aria-label={alt}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute inset-0 cursor-zoom-out"
        aria-label={messages.image.close}
      />

      <picture>
        <source type="image/webp" srcSet={`${base}-1280.webp`} />
        <img
          src={`${base}-1280.jpg`}
          alt={alt}
          width={2400}
          height={1792}
          className="pointer-events-none absolute inset-0 z-10 h-full w-full object-contain"
        />
      </picture>

      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        className="absolute right-[max(0.75rem,env(safe-area-inset-right))] top-[max(0.75rem,env(safe-area-inset-top))] z-20 flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15 text-white"
        aria-label={messages.image.close}
      >
        <X size={20} />
      </button>
    </div>,
    document.body,
  );
}
