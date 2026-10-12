import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import CallToAction from '../components/CallToAction';
import Footer from '../components/Footer';
import FloatingWhatsApp from '../components/FloatingWhatsApp';
import BookingModal from '../components/booking/BookingModal';

const Home: React.FC = () => {
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <>
      <Navbar onBookingOpen={() => setBookingOpen(true)} />
      <Hero onBookingOpen={() => setBookingOpen(true)} />
      <About />
      <Services />
      <CallToAction onBookingOpen={() => setBookingOpen(true)} />
      <Footer />
      <FloatingWhatsApp />
      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        createdBy="CLIENT"
      />
    </>
  );
};

export default Home;