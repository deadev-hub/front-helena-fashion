import React, { useEffect, useState } from 'react';
import { Calendar, Check, X, Plus, Clock, User, Phone, Scissors } from 'lucide-react';
import { api } from '../services/api';
import BookingModal from '../components/booking/BookingModal';

interface Appointment {
  id: string;
  clientName: string;
  clientPhone: string;
  service: string;
  date: string;
  startTime: string;
  endTime: string;
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED';
  notes?: string;
  createdBy: 'CLIENT' | 'PROFESSIONAL';
}

const STATUS_LABEL = {
  PENDING: 'Pendente',
  CONFIRMED: 'Confirmado',
  CANCELLED: 'Cancelado',
};

const STATUS_CLASS = {
  PENDING: 'bg-amber-100 text-amber-800',
  CONFIRMED: 'bg-green-100 text-green-800',
  CANCELLED: 'bg-red-100 text-red-800',
};

const Admin: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterDate, setFilterDate] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [bookingOpen, setBookingOpen] = useState(false);

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const data = await api.getAllAppointments();
      setAppointments(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleStatus = async (id: string, status: 'CONFIRMED' | 'CANCELLED') => {
    await api.updateStatus(id, status);
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status } : a))
    );
  };

  const filtered = appointments.filter((a) => {
    const matchDate = filterDate
      ? new Date(a.date).toISOString().split('T')[0] === filterDate
      : true;
    const matchStatus = filterStatus ? a.status === filterStatus : true;
    return matchDate && matchStatus;
  });

  const counts = {
    total: appointments.length,
    pending: appointments.filter((a) => a.status === 'PENDING').length,
    confirmed: appointments.filter((a) => a.status === 'CONFIRMED').length,
    cancelled: appointments.filter((a) => a.status === 'CANCELLED').length,
  };

  return (
    <div className="min-h-screen bg-helena-bg">

      {/* Header */}
      <header className="bg-white border-b border-stone-200 px-6 py-4 flex justify-between items-center">
        <div>
          <span className="font-serif text-xl text-helena-wine font-semibold uppercase tracking-widest">
            Helena
          </span>
          <span className="text-[10px] tracking-[0.3em] text-stone-500 uppercase block">
            Fashion Hair — Painel Admin
          </span>
        </div>
        <button
          onClick={() => setBookingOpen(true)}
          className="flex items-center gap-2 bg-helena-wine text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-helena-wine-dark transition-colors"
        >
          <Plus size={16} />
          Novo Agendamento
        </button>
      </header>

      <main className="container mx-auto px-4 md:px-8 py-8">

        {/* Cards de resumo */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total', value: counts.total, color: 'text-stone-700' },
            { label: 'Pendentes', value: counts.pending, color: 'text-amber-600' },
            { label: 'Confirmados', value: counts.confirmed, color: 'text-green-600' },
            { label: 'Cancelados', value: counts.cancelled, color: 'text-red-500' },
          ].map((card) => (
            <div key={card.label} className="bg-white rounded-xl p-4 border border-stone-100 shadow-sm text-center">
              <p className={`text-3xl font-serif font-semibold ${card.color}`}>{card.value}</p>
              <p className="text-stone-500 text-sm mt-1">{card.label}</p>
            </div>
          ))}
        </div>

        {/* Filtros */}
        <div className="bg-white rounded-xl border border-stone-100 shadow-sm p-4 mb-6 flex flex-col md:flex-row gap-4">
          <div className="flex items-center gap-2 flex-1">
            <Calendar size={16} className="text-helena-wine" />
            <input
              type="date"
              className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-helena-wine"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 flex-1">
            <Clock size={16} className="text-helena-wine" />
            <select
              className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-helena-wine"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="">Todos os status</option>
              <option value="PENDING">Pendente</option>
              <option value="CONFIRMED">Confirmado</option>
              <option value="CANCELLED">Cancelado</option>
            </select>
          </div>
          {(filterDate || filterStatus) && (
            <button
              onClick={() => { setFilterDate(''); setFilterStatus(''); }}
              className="text-sm text-stone-400 hover:text-helena-wine transition-colors"
            >
              Limpar filtros
            </button>
          )}
        </div>

        {/* Lista de agendamentos */}
        {loading ? (
          <p className="text-center text-stone-400 py-16">Carregando agendamentos...</p>
        ) : filtered.length === 0 ? (
          <p className="text-center text-stone-400 py-16">Nenhum agendamento encontrado.</p>
        ) : (
          <div className="space-y-3">
            {filtered.map((a) => (
              <div
                key={a.id}
                className="bg-white rounded-xl border border-stone-100 shadow-sm p-4 flex flex-col md:flex-row md:items-center gap-4"
              >
                {/* Data e hora */}
                <div className="flex items-center gap-3 min-w-[140px]">
                  <div className="bg-helena-bg rounded-lg p-2 text-center min-w-[56px]">
                    <p className="text-helena-wine font-semibold text-lg leading-none">
                      {new Date(a.date).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })}
                    </p>
                    <p className="text-stone-400 text-xs mt-1">{a.startTime}</p>
                  </div>
                </div>

                {/* Dados da cliente */}
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <User size={14} className="text-stone-400" />
                    <p className="text-stone-800 font-medium text-sm">{a.clientName}</p>
                    {a.createdBy === 'PROFESSIONAL' && (
                      <span className="text-[10px] bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">
                        Criado pela profissional
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone size={14} className="text-stone-400" />
                    <p className="text-stone-500 text-sm">{a.clientPhone}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Scissors size={14} className="text-stone-400" />
                    <p className="text-stone-500 text-sm">{a.service}</p>
                  </div>
                  {a.notes && (
                    <p className="text-stone-400 text-xs italic">"{a.notes}"</p>
                  )}
                </div>

                {/* Status + Ações */}
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`text-xs px-3 py-1 rounded-full font-medium ${STATUS_CLASS[a.status]}`}>
                    {STATUS_LABEL[a.status]}
                  </span>

                  {a.status === 'PENDING' && (
                    <>
                      <button
                        onClick={() => handleStatus(a.id, 'CONFIRMED')}
                        className="flex items-center gap-1 bg-green-50 hover:bg-green-100 text-green-700 text-xs px-3 py-1.5 rounded-full transition-colors"
                      >
                        <Check size={12} /> Confirmar
                      </button>
                      <button
                        onClick={() => handleStatus(a.id, 'CANCELLED')}
                        className="flex items-center gap-1 bg-red-50 hover:bg-red-100 text-red-600 text-xs px-3 py-1.5 rounded-full transition-colors"
                      >
                        <X size={12} /> Cancelar
                      </button>
                    </>
                  )}

                  {a.status === 'CONFIRMED' && (
                    <button
                      onClick={() => handleStatus(a.id, 'CANCELLED')}
                      className="flex items-center gap-1 bg-red-50 hover:bg-red-100 text-red-600 text-xs px-3 py-1.5 rounded-full transition-colors"
                    >
                      <X size={12} /> Cancelar
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <BookingModal
        isOpen={bookingOpen}
        onClose={() => {
          setBookingOpen(false);
          fetchAppointments();
        }}
        createdBy="PROFESSIONAL"
      />
    </div>
  );
};

export default Admin;