import { Play } from 'lucide-react';
import { NumberField } from './NumberField.jsx';
import { ExerciseCard } from './ExerciseCard.jsx';

export function ConfigurationScreen({
  settings,
  exercises,
  onSettingsChange,
  onExerciseChange,
  onStart,
}) {
  const activeCount = exercises.filter((exercise) => exercise.isActive).length;
  const canStart = activeCount > 0;

  return (
    <div className="min-h-dvh bg-slate-950 text-slate-100">
      <div className="mx-auto w-full max-w-xl px-4 pb-36 pt-[max(1.25rem,env(safe-area-inset-top))]">
        <header className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-400">
            Реабилитация колена
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-white">Настройки тренировки</h1>
          <p className="mt-2 text-sm leading-relaxed text-slate-400">
            Время и список упражнений сохраняются на этом устройстве.
          </p>
        </header>

        <section className="mb-8 rounded-3xl border border-slate-800 bg-slate-900/50 p-4">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-slate-300">
            Глобальные настройки
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <NumberField
              label="Разминка"
              suffix="минуты"
              value={Math.round((settings.warmupTime ?? 0) / 60)}
              min={0}
              max={30}
              onChange={(warmupMinutes) => onSettingsChange({ warmupTime: warmupMinutes * 60 })}
            />
            <NumberField
              label="Работа табаты"
              suffix="секунды"
              value={settings.tabataWorkTime}
              min={1}
              max={300}
              onChange={(tabataWorkTime) => onSettingsChange({ tabataWorkTime })}
            />
            <NumberField
              label="Отдых табаты"
              suffix="секунды"
              value={settings.tabataRestTime}
              min={0}
              max={180}
              onChange={(tabataRestTime) => onSettingsChange({ tabataRestTime })}
            />
            <NumberField
              label="Круги"
              suffix="повторы работы/отдыха"
              value={settings.tabataSets}
              min={1}
              max={50}
              onChange={(tabataSets) => onSettingsChange({ tabataSets })}
            />
            <div className="col-span-2">
              <NumberField
                label="Отдых между упражнениями"
                suffix="секунды"
                value={settings.restBetweenExercises}
                min={0}
                max={600}
                onChange={(restBetweenExercises) => onSettingsChange({ restBetweenExercises })}
              />
            </div>
          </div>
        </section>

        <section>
          <div className="mb-4 flex items-end justify-between gap-3">
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-300">
              Упражнения
            </h2>
            <p className="text-xs text-slate-500">Активно: {activeCount}</p>
          </div>

          <div className="space-y-3">
            {exercises.map((exercise) => (
              <ExerciseCard
                key={exercise.id}
                exercise={exercise}
                onToggle={(isActive) => onExerciseChange(exercise.id, { isActive })}
                onDurationChange={(durationMinutes) =>
                  onExerciseChange(exercise.id, { durationMinutes })
                }
              />
            ))}
          </div>
        </section>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-20 bg-gradient-to-t from-slate-950 via-slate-950/95 to-transparent px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-8">
        <div className="mx-auto w-full max-w-xl">
          <button
            type="button"
            disabled={!canStart}
            onClick={onStart}
            className="flex h-16 w-full items-center justify-center gap-3 rounded-3xl bg-emerald-500 text-lg font-bold text-slate-950 shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-400 active:scale-[0.99] disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400 disabled:shadow-none"
          >
            <Play size={22} fill="currentColor" />
            Начать тренировку
          </button>
          {!canStart ? (
            <p className="mt-2 text-center text-xs text-rose-300">
              Включите хотя бы одно упражнение
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
