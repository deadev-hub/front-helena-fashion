import React from 'react';
import { getWhatsAppLink } from '../config-whats/whatsapp';

const FloatingWhatsApp: React.FC = () => {
  return (
    <a 
      href={getWhatsAppLink('Olá, Helena Fashion Hair! Vim pelo site e gostaria de mais informações sobre os serviços.')}
      target="_blank" 
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20bd5a] text-white p-3 md:p-4 rounded-full shadow-lg transition-transform hover:scale-110 flex items-center justify-center"
      aria-label="Contact on WhatsApp"
    >
    
      <svg 
        viewBox="0 0 24 24" 
        width="28" 
        height="28" 
        stroke="currentColor" 
        strokeWidth="2" 
        fill="none" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className="w-6 h-6 md:w-7 md:h-7"
      >
        <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
        <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
      </svg>
    </a>
  );
};

export default FloatingWhatsApp;