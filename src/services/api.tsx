const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export type AvailabilityMap = { [date: string]: string[] };

export const api = {
    getMonthAvailability: async (year: number, month: number): Promise<AvailabilityMap> => {
        const res = await fetch(`${BASE_URL}/availability?year=${year}&month=${month}`);
        if (!res.ok) throw new Error('Erro ao carregar disponibilidade.');
        return res.json();
    },

    getAvailableSlots: async (date: string): Promise<string[]> => {
        const res = await fetch(`${BASE_URL}/appointments/available?date=${date}`);
        return res.json();
    },

    createAppointment: async (data: {
        clientName: string;
        clientPhone: string;
        service: string;
        date: string;
        startTime: string;
        endTime: string;
        notes?: string;
        createdBy?: 'CLIENT' | 'PROFESSIONAL';
    }) => {
        const res = await fetch(`${BASE_URL}/appointments`, {
            method: "post",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        if(!res.ok) {
            const err = await res.json();
            throw new Error(err.error || err.message || 'Erro ao agendar');
        }
        return res.json();
    },

    getAllAppointments: async () => {
        const res = await fetch(`${BASE_URL}/appointments`);
        return res.json();
    },

    updateStatus: async (id: string, status: 'CONFIRMED' | 'CANCELLED') => {
        const res = await fetch(`${BASE_URL}/appointments/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
        });
        return res.json();
    },
}