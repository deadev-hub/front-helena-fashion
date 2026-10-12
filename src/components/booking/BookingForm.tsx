import React, { useEffect, useState } from 'react';
import { Clock, Phone, Scissors, User } from 'lucide-react';
import { api, AvailabilityMap } from '../../services/api';
import AvailabilityCalendar from './AvailabilityCalendar';

const SERVICES = [
  'Corte',
  'Coloração',
  'Hidratação',
  'Escova',
  'Cronograma Capilar',
  'Progressiva',
  'Botox',
  'Selagem',
  'Banho de Brilho',
  'Sobrancelha',
  'Limpeza de Pele',
];

export interface BookingFormData {
  clientName: string;
  clientPhone: string;
  service: string;
  date: string;
  startTime: string;
  endTime: string;
  notes?: string;
}

interface Props {
  onSubmit: (data: BookingFormData) => Promise<void>;
  loading: boolean;
  error: string;
}

const BookingForm: React.FC<Props> = ({ onSubmit, loading, error }) => {
  const [date, setDate] = useState('');
  const [form, setForm] = useState({
    clientName: '',
    clientPhone: '',
    service: '',
    startTime: '',
    notes: '',
  });

  const now = new Date();
  const [viewYear, setViewYear] = useState(now.getFullYear());
  const [viewMonth, setViewMonth] = useState(now.getMonth());
  const [availabilityMap, setAvailabilityMap] = useState<AvailabilityMap>({});
  const [calendarLoading, setCalendarLoading] = useState(true);
  const [calendarError, setCalendarError] = useState('');

  useEffect(() => {
    let ignore = false;
    setCalendarLoading(true);
    setCalendarError('');
    api
      .getMonthAvailability(viewYear, viewMonth + 1)
      .then((map) => {
        if (!ignore) setAvailabilityMap(map);
      })
      .catch(() => {
        if (!ignore) setCalendarError('Não foi possível carregar os horários.');
      })
      .finally(() => {
        if (!ignore) setCalendarLoading(false);
      });
    return () => {
      ignore = true;
    };
  }, [viewYear, viewMonth]);

  const handlePrevMonth = () => {
    if (viewMonth === 0) {
      setViewYear(viewYear - 1);
      setViewMonth(11);
    } else {
      setViewMonth(viewMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (viewMonth === 11) {
      setViewYear(viewYear + 1);
      setViewMonth(0);
    } else {
      setViewMonth(viewMonth + 1);
    }
  };

  const handleSelectDate = (dateStr: string) => {
    setDate(dateStr);
    setForm({ ...form, startTime: '' });
  };

  const selectedSlots = date ? availabilityMap[date] || [] : [];

  const calcEndTime = (start: string) => {
    const [h, m] = start.split(':').map(Number);
    const end = new Date();
    end.setHours(h + 1, m);
    return `${String(end.getHours()).padStart(2, '0')}:${String(end.getMinutes()).padStart(2, '0')}`;
  };

  const handleSubmit = () => {
    onSubmit({
      ...form,
      date,
      endTime: calcEndTime(form.startTime),
    });
  };

  const isValid =
    form.clientName.trim() &&
    form.clientPhone.trim() &&
    form.service &&
    date &&
    form.startTime;

  const today = new Date();
  const todayLocal = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(
    today.getDate()
  ).padStart(2, '0')}`;

  const inputClass =
    'w-full border border-stone-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-helena-wine transition-colors';

  const labelClass =
    'text-xs text-stone-500 uppercase tracking-wider flex items-center gap-1 mb-1';

  return (
    <div className="space-y-4">
      {error && (
        <p className="text-red-500 text-sm bg-red-50 p-3 rounded-lg">{error}</p>
      )}

      {/* Nome */}
      <div>
        <label className={labelClass}>
          <User size={12} /> Nome
        </label>
        <input
          className={inputClass}
          placeholder="Seu nome completo"
          value={form.clientName}
          onChange={(e) => setForm({ ...form, clientName: e.target.value })}
        />
      </div>

      {/* WhatsApp */}
      <div>
        <label className={labelClass}>
          <Phone size={12} /> WhatsApp
        </label>
        <input
          className={inputClass}
          placeholder="(11) 99999-9999"
          value={form.clientPhone}
          onChange={(e) => setForm({ ...form, clientPhone: e.target.value })}
        />
      </div>

      {/* Serviço */}
      <div>
        <label className={labelClass}>
          <Scissors size={12} /> Serviço
        </label>
        <select
          className={inputClass}
          value={form.service}
          onChange={(e) => setForm({ ...form, service: e.target.value })}
        >
          <option value="">Selecione...</option>
          {SERVICES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {/* Calendário de datas disponíveis */}
      <div>
        <label className={labelClass}>Data disponível</label>
        <AvailabilityCalendar
          availabilityMap={availabilityMap}
          viewYear={viewYear}
          viewMonth={viewMonth}
          selectedDate={date}
          onSelectDate={handleSelectDate}
          onPrevMonth={handlePrevMonth}
          onNextMonth={handleNextMonth}
          minDate={todayLocal}
          loading={calendarLoading}
          error={calendarError}
          onRetry={() => setViewMonth(viewMonth)}
        />
      </div>

      {/* Horários disponíveis para a data selecionada */}
      {date && (
        <div>
          <label className={labelClass}>
            <Clock size={12} /> Horário disponível
          </label>

          {calendarLoading ? (
            <p className="text-stone-400 text-sm">Carregando horários...</p>
          ) : selectedSlots.length > 0 ? (
            <div className="grid grid-cols-3 gap-2">
              {selectedSlots.map((slot) => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => setForm({ ...form, startTime: slot })}
                  className={`py-2 rounded-lg text-sm border transition-colors ${
                    form.startTime === slot
                      ? 'bg-helena-wine text-white border-helena-wine'
                      : 'border-stone-200 text-stone-600 hover:border-helena-wine'
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          ) : (
            <p className="text-amber-600 text-sm bg-amber-50 p-3 rounded-lg">
              Nenhum horário disponível nesta data.
            </p>
          )}
        </div>
      )}

      {/* Observações */}
      <div>
        <label className={labelClass}>Observações (opcional)</label>
        <textarea
          className={`${inputClass} resize-none`}
          rows={2}
          placeholder="Ex: tenho cabelo quimicamente tratado..."
          value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
        />
      </div>

      {/* Botão */}
      <button
        type="button"
        onClick={handleSubmit}
        disabled={!isValid || loading}
        className="w-full bg-helena-wine hover:bg-helena-wine-dark text-white py-3 rounded-full text-sm font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Agendando...' : 'Confirmar Agendamento'}
      </button>
    </div>
  );
};

export default BookingForm;