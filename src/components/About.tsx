import React from 'react';

import abautImage from '../assets/img/img_escova.jpeg';

const About: React.FC = () => {
  return (
    <section id="sobre" className="py-20 bg-helena-bg">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">          
         
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl h-[350px] md:h-[450px] lg:h-[500px]">
              <img
                src={abautImage}
                alt="Cabelo feminino saudável"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          <div className="lg:pl-8">
            <span className="text-helena-wine text-center text-sm tracking-[0.2em] uppercase font-bold mb-2 block">
              Sobre Nós
            </span>
            <h2 className="text-4xl md:text-5xl text-center font-serif text-helena-dark mb-6 leading-tight">
              Excelência em Cabelos e Bem-estar
            </h2>
            
            <p className="text-stone-600 mb-6 leading-relaxed text-lg font-light">
              Localizado na Vila Três Irmãos em Carapicuíba, o Helena Fashion Hair nasceu com a missão de proporcionar mais do que um serviço de beleza, mas uma experiência de renovação.
            </p>
            
            <p className="text-stone-600 mb-8 leading-relaxed text-lg font-light">
              Nossa equipe é especializada nas últimas tendências e técnicas para garantir que você saia daqui se sentindo confiante e radiante. Utilizamos apenas produtos de alta qualidade para cuidar da saúde dos seus fios.
            </p>

            <a href="#servicos" className="border border-helena-wine text-helena-wine hover:bg-helena-wine hover:text-white transition-all py-2 px-8 rounded-md uppercase text-sm tracking-wider">
              Saiba Mais
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;