import { useCallback, useState } from 'react';
import { Maximize2 } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext.js';
import { ImageLightbox } from './ImageLightbox.jsx';

const IMAGE_IDS = new Set(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']);

export function hasExerciseImage(id) {
  return IMAGE_IDS.has(String(id));
}

export function ExerciseImage({ id, alt, eager = false, className = '', zoomable = false }) {
  const { messages } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const openLightbox = useCallback(() => setIsOpen(true), []);
  const closeLightbox = useCallback(() => setIsOpen(false), []);

  if (!hasExerciseImage(id)) {
    return null;
  }

  const base = `${import.meta.env.BASE_URL}images/${id}`;
  const imgClassName = zoomable
    ? 'h-auto w-full rounded-2xl object-cover'
    : `h-auto rounded-2xl object-cover ${className}`.trim();

  const picture = (
    <picture className={zoomable ? 'block' : 'mb-4'}>
      <source
        type="image/webp"
        media="(max-width: 640px)"
        srcSet={`${base}-640.webp 640w, ${base}-1280.webp 1280w`}
        sizes="calc(100vw - 2rem)"
      />
      <source type="image/webp" srcSet={`${base}-1280.webp`} />
      <source
        type="image/jpeg"
        media="(max-width: 640px)"
        srcSet={`${base}-640.jpg 640w, ${base}-1280.jpg 1280w`}
        sizes="calc(100vw - 2rem)"
      />
      <img
        src={`${base}-640.jpg`}
        srcSet={`${base}-640.jpg 640w, ${base}-1280.jpg 1280w`}
        sizes="(max-width: 640px) calc(100vw - 2rem), 540px"
        alt={alt}
        width={2400}
        height={1792}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        className={imgClassName}
      />
    </picture>
  );

  if (!zoomable) {
    return picture;
  }

  return (
    <>
      <button
        type="button"
        onClick={openLightbox}
        aria-label={messages.image.open}
        className={`relative block cursor-zoom-in overflow-hidden rounded-2xl p-0 ${className}`.trim()}
      >
        {picture}
        <span className="pointer-events-none absolute bottom-1.5 right-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-black/55 text-white">
          <Maximize2 size={12} />
        </span>
      </button>
      {isOpen ? <ImageLightbox id={id} alt={alt} onClose={closeLightbox} /> : null}
    </>
  );
}
