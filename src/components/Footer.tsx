import { MapPin, Clock } from 'lucide-react';
import React from 'react';

const InstagramIcon = ({ size = 18 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.5" y2="6.5" />
  </svg>
);

const Footer: React.FC = () => {
  const mapUrl = 'https://www.google.com/maps/search/?api=1&query=Carapicu%C3%ADba%2C+SP';

  return (
    <footer id="contato" className="bg-helena-bg pt-20 pb-10 border-t border-stone-200">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">

          {/* Coluna 1 — Logo + Descrição */}
          <div className="space-y-6 max-w-sm">
            <div className="flex flex-col items-center w-full">
              <span className="font-serif text-2xl tracking-widest text-helena-wine font-semibold uppercase">Helena</span>
              <span className="text-[10px] tracking-[0.3em] text-stone-500 uppercase">Fashion Hair</span>
            </div>
            <p className="text-stone-500 font-light leading-relaxed max-w-sm">
              Realçando sua beleza natural com tratamentos personalizados e profissionais experientes em um ambiente acolhedor.
            </p>
          </div>
         
          <div>
            <h4 className="font-serif text-lg text-stone-800 mb-6">Contato</h4>
            <div className="space-y-4">

              {/* Endereço com ícone clicável */}
              <div className="flex items-start gap-3 text-stone-600 font-light">
  
                <a  className="text-helena-wine hover:text-helena-accent transition-colors flex-shrink-0 mt-1"
                  href={mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Abrir localização no Google Maps"
                >
                  <MapPin size={18} />
                </a>
                <p>Av. Barueri, 98, Vila Três Irmãos<br />Carapicuíba/SP</p>
              </div>

              {/* Horários */}
              <div className="flex items-start gap-3 text-stone-600 font-light">
                <Clock className="text-helena-wine flex-shrink-0 mt-1" size={18} />
                <div>
                  <p>Seg - Sáb: 09:00 - 19:00</p>
                  <p>Dom: Fechado</p>
                </div>
              </div>

              {/* Instagram */}
              <div className="flex items-center gap-3 text-stone-600 font-light">
                <a
                    className="text-helena-wine hover:text-helena-accent transition-colors"
                    href="https://instagram.com/helena_fashionhair"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <InstagramIcon size={18} />
                  </a>
                <p>Instagram</p>
              </div>

            </div>
          </div>

        </div>

        {/* Rodapé */}
        <div className="border-t border-stone-200 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-stone-400 font-light">
          <p>&copy; 2026 Helena Fashion Hair. Todos os direitos reservados.</p>
          <div className="hidden md:flex items-center text-sm gap-5 mt-4 md:mt-0">
            <span>|</span>
            <span>by de@dev🩶</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;