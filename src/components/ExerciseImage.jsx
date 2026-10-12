const IMAGE_IDS = new Set(['2', '3', '4', '5', '6', '7', '8', '9', '10', '11']);

export function hasExerciseImage(id) {
  return IMAGE_IDS.has(String(id));
}

export function ExerciseImage({ id, alt, eager = false, className = '' }) {
  if (!hasExerciseImage(id)) {
    return null;
  }

  const base = `${import.meta.env.BASE_URL}images/${id}`;

  return (
    <picture>
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
        className={`h-auto rounded-2xl object-cover ${className}`.trim()}
      />
    </picture>
  );
}
