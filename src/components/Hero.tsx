import React from 'react';
import heroImage from '../assets/img/hero_salao.jpeg';

interface Props {
  onBookingOpen: () => void;
}

const Hero: React.FC<Props> = ({ onBookingOpen }) => {
  return (
    <section className="relative h-[60vh] md:h-[75vh] w-full flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 z-0 bg-cover bg-[center_55%] bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-black/50 md:bg-black/40"></div>
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-7xl text-white font-serif mb-6 leading-tight">
          Sua Beleza em <br />
          <span className="italic text-helena-wine">Boas Mãos</span>
        </h1>
        <p className="text-stone-200 text-lg md:text-xl font-light mb-10 max-w-2xl mx-auto">
          Descubra o melhor da sua autoestima no Helena Fashion Hair.
          Profissionais qualificados e um ambiente acolhedor esperam por você.
        </p>
        <button
          onClick={onBookingOpen}
          className="bg-helena-wine hover:bg-helena-wine-dark text-white py-3 px-8 rounded-full text-lg transition-all transform hover:scale-105 shadow-lg"
        >
          Agende seu Horário
        </button>
      </div>
    </section>
  );
};

export default Hero;