import React from 'react';
import { Scissors, Palette, Sparkles } from 'lucide-react';

import cortesImage from '../assets/img/liso_preto.jpeg';
import colorImage from '../assets/img/liso_castanhoclaro.jpeg';
import capilarImage from '../assets/img/img_secador.jpeg';


interface ServiceCardProps {
  title: string;
  description: string;
  image: string;
  icon: React.ReactNode;
  imagePosition?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, image, icon, imagePosition }) => (
  <div className="bg-[#f2efe9] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col h-full border border-stone-100">
    <div className="h-80 relative group">
      <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"  style={{ objectPosition: imagePosition || 'center' }}/>
      <div className="absolute bottom-4 left-4 text-helena-wine bg-black/50 p-2 rounded-full backdrop-blur-sm">
        {icon}
      </div>
    </div>
    <div className="p-8 flex-1 flex flex-col justify-center text-center">
      <h3 className="font-serif text-2xl text-stone-800 mb-4">{title}</h3>
      <p className="text-stone-500 font-light text-sm leading-relaxed">{description}</p>
    </div>
  </div>
);

const Services: React.FC = () => {
  const services = [
    {
      title: "Cortes Personalizados",
      description: "Design de corte que valoriza seu rosto e estilo de vida.",      
      image: cortesImage,
      icon: <Scissors size={20} />
    },
    {
      title: "Coloração",
      description: "Técnicas modernas de coloração.",
      image: colorImage,
      icon: <Palette size={20} />
    },
    {
      title: "Tratamentos",
      description: "Hidratação profunda, cronograma capilar e reconstrução.",
      image: capilarImage,
      icon: <Sparkles size={20} />
    }
  ];

  return (
    <section id="servicos" className="py-24 bg-helena-bg">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <span className="text-helena-wine text-xs tracking-[0.2em] uppercase font-bold mb-3 block">
            Nossos Serviços
          </span>
          <h2 className="text-5xl font-serif text-helena-dark mb-6">
            Especialidades
          </h2>
          <p className="text-stone-500 font-light max-w-2xl mx-auto">
            Oferecemos uma gama completa de serviços para transformar e cuidar do seu visual.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;