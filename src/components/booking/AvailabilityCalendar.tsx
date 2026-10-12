import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { AvailabilityMap } from '../../services/api';

interface Props {
  availabilityMap: AvailabilityMap;
  viewYear: number;
  viewMonth: number; // 0-based
  selectedDate: string;
  onSelectDate: (date: string) => void;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  minDate?: string;
  loading?: boolean;
  error?: string;
  onRetry?: () => void;
}

const WEEKDAYS = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

function pad(n: number): string {
  return String(n).padStart(2, '0');
}

function buildDays(viewYear: number, viewMonth: number): (string | null)[] {
  const firstWeekday = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const cells: (string | null)[] = Array(firstWeekday).fill(null);
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push(`${viewYear}-${pad(viewMonth + 1)}-${pad(d)}`);
  }
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

const AvailabilityCalendar: React.FC<Props> = ({
  availabilityMap,
  viewYear,
  viewMonth,
  selectedDate,
  onSelectDate,
  onPrevMonth,
  onNextMonth,
  minDate,
  loading,
  error,
  onRetry,
}) => {
  const todayLocal = minDate || '';
  const days = buildDays(viewYear, viewMonth);

  const monthLabel = new Date(viewYear, viewMonth, 1)
    .toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });

  const isPast = (dateStr: string) =>
    todayLocal ? dateStr < todayLocal : false;

  const hasSlots = (dateStr: string) =>
    (availabilityMap[dateStr] || []).length > 0;

  return (
    <div className="border border-stone-200 rounded-lg p-3">
      {/* Navegação do mês */}
      <div className="flex items-center justify-between mb-2">
        <button
          type="button"
          onClick={onPrevMonth}
          className="text-stone-400 hover:text-helena-wine transition-colors p-1"
          aria-label="Mês anterior"
        >
          <ChevronLeft size={18} />
        </button>
        <p className="text-sm font-medium text-stone-700 capitalize">
          {monthLabel}
        </p>
        <button
          type="button"
          onClick={onNextMonth}
          className="text-stone-400 hover:text-helena-wine transition-colors p-1"
          aria-label="Próximo mês"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {loading ? (
        <p className="text-stone-400 text-sm text-center py-6">
          Carregando disponibilidade...
        </p>
      ) : error ? (
        <div className="text-center py-4">
          <p className="text-red-500 text-sm mb-2">{error}</p>
          {onRetry && (
            <button
              type="button"
              onClick={onRetry}
              className="text-sm text-helena-wine font-medium hover:underline"
            >
              Tentar novamente
            </button>
          )}
        </div>
      ) : (
        <>
          {/* Cabeçalho dos dias da semana */}
          <div className="grid grid-cols-7 gap-1 mb-1">
            {WEEKDAYS.map((w, i) => (
              <div
                key={i}
                className="text-center text-[10px] text-stone-400 font-medium"
              >
                {w}
              </div>
            ))}
          </div>

          {/* Grade de dias */}
          <div className="grid grid-cols-7 gap-1">
            {days.map((dateStr, i) => {
              if (!dateStr) return <div key={i} />;

              const past = isPast(dateStr);
              const available = hasSlots(dateStr);
              const disabled = past || !available;
              const selected = dateStr === selectedDate;
              const day = Number(dateStr.slice(8, 10));

              return (
                <button
                  key={dateStr}
                  type="button"
                  disabled={disabled}
                  onClick={() => onSelectDate(dateStr)}
                  className={`rounded-lg py-1.5 text-sm transition-colors ${
                    disabled
                      ? 'text-stone-300 cursor-not-allowed'
                      : selected
                        ? 'bg-helena-wine text-white font-semibold'
                        : 'bg-white border border-stone-200 text-stone-700 hover:border-helena-wine hover:text-helena-wine'
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>

          <p className="text-[11px] text-stone-400 mt-2">
            Clique em um dia com horário disponível para ver os horários.
          </p>
        </>
      )}
    </div>
  );
};

export default AvailabilityCalendar;