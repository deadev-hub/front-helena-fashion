import React, { useState } from 'react';
import { X } from 'lucide-react';
import BookingForm, { BookingFormData } from './BookingForm';
import { api } from '../../services/api';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  createdBy?: 'CLIENT' | 'PROFESSIONAL';
}

const BookingModal: React.FC<Props> = ({ isOpen, onClose, createdBy }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (data: BookingFormData) => {
    setLoading(true);
    setError('');
    try {
      await api.createAppointment({ ...data, createdBy });
      setSuccess(true);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setSuccess(false);
    setError('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative max-h-[90vh] overflow-y-auto">
        
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 transition-colors"
        >
          <X size={20} />
        </button>

        <h2 className="font-serif text-2xl text-helena-wine mb-1">
          Agendar Horário
        </h2>
        <p className="text-stone-500 text-sm mb-6">Helena Fashion Hair</p>

        {success ? (
          <div className="text-center py-8">
            <div className="text-5xl mb-4">✅</div>
            <p className="font-serif text-xl text-stone-800">
              Agendamento confirmado!
            </p>
            <p className="text-stone-500 text-sm mt-2">
              Seu horário foi reservado com sucesso. Qualquer dúvida, fale conosco pelo WhatsApp.
            </p>
            <button
              onClick={handleClose}
              className="mt-6 bg-helena-wine text-white px-8 py-2 rounded-full text-sm font-semibold"
            >
              Fechar
            </button>
          </div>
        ) : (
          <BookingForm
            onSubmit={handleSubmit}
            loading={loading}
            error={error}
          />
        )}
      </div>
    </div>
  );
};

export default BookingModal;