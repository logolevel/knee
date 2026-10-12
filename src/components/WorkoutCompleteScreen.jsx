import { Trophy } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext.js';

export function WorkoutCompleteScreen({ onFinish }) {
  const { messages } = useI18n();

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-gradient-to-b from-emerald-500 via-teal-700 to-slate-950 px-6 text-center text-white">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/15">
        <Trophy size={36} />
      </div>
      <h1 className="mt-6 text-4xl font-bold tracking-tight">{messages.complete.title}</h1>
      <p className="mt-3 max-w-sm text-base leading-relaxed text-white/75">
        {messages.complete.text}
      </p>
      <button
        type="button"
        onClick={onFinish}
        className="mt-10 flex h-14 w-full max-w-sm items-center justify-center rounded-3xl bg-white text-base font-bold text-slate-950"
      >
        {messages.complete.home}
      </button>
    </div>
  );
}
