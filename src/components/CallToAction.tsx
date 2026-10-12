import React from 'react';

interface Props {
  onBookingOpen: () => void;
}

const CallToAction: React.FC<Props> = ({ onBookingOpen }) => {
  return (
    <section className="bg-[#4a3d3f] py-10 px-4">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-serif text-white mb-6">
          Pronta para uma transformação?
        </h2>
        <p className="text-white/90 text-lg mb-6 max-w-xl mx-auto font-light">
          Agende seu horário agora mesmo e venha viver a experiência Helena Fashion Hair!
        </p>
        <button
          onClick={onBookingOpen}
          className="inline-block bg-[#823a45] text-[#fcf3f2] font-semibold py-3 px-10 rounded-full text-lg hover:bg-helena-accent transition-colors shadow-lg"
        >
          Agendar Horário
        </button>
      </div>
    </section>
  );
};

export default CallToAction;