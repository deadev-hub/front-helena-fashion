import React, { useState } from 'react';
import { Scissors, Menu, X } from 'lucide-react';

interface Props {
  onBookingOpen: () => void;
}

const Navbar: React.FC<Props> = ({ onBookingOpen }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-[#f5f2ed] sticky top-0 z-50 py-4 shadow-sm border-b border-stone-200">
      <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">

        <div className="flex items-center gap-3">
          <div className="text-helena-wine">
            <Scissors className="w-8 h-8 rotate-[-90deg]" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-xl tracking-widest text-helena-wine font-semibold uppercase">Helena</span>
            <span className="text-[10px] tracking-[0.3em] text-stone-500 uppercase">Fashion Hair</span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-600">
          <a href="#" className="hover:text-helena-wine transition-colors">Início</a>
          <a href="#sobre" className="hover:text-helena-wine transition-colors">Sobre</a>
          <a href="#servicos" className="hover:text-helena-wine transition-colors">Serviços</a>
          <a href="#contato" className="hover:text-helena-wine transition-colors">Contato</a>
          <button
            onClick={onBookingOpen}
            className="bg-helena-wine text-white px-5 py-2 rounded-full hover:bg-helena-wine-dark transition-colors"
          >
            Agendar
          </button>
        </div>

        <button
          className="md:hidden text-stone-600"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-[#f5f2ed] border-t border-stone-200 absolute w-full left-0 top-full shadow-lg">
          <div className="flex flex-col p-4 gap-4 text-center">
            <a href="#" onClick={() => setIsOpen(false)} className="hover:text-helena-wine">Início</a>
            <a href="#sobre" onClick={() => setIsOpen(false)} className="hover:text-helena-wine">Sobre</a>
            <a href="#servicos" onClick={() => setIsOpen(false)} className="hover:text-helena-wine">Serviços</a>
            <a href="#contato" onClick={() => setIsOpen(false)} className="hover:text-helena-wine">Contato</a>
            <button
              onClick={() => { setIsOpen(false); onBookingOpen(); }}
              className="bg-helena-wine text-white px-5 py-2 rounded-full hover:bg-helena-wine-dark transition-colors"
            >
              Agendar
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;