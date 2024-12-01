import React, { useEffect, useState } from 'react';
import EventCard from '../../components/EventCard';
import axios from 'axios';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/events/events'); 
        setEvents(response.data.events);
      } catch (err) {
        setError('Erreur lors de la récupération des événements');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) return <p>Chargement des événements...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className="ezy__blog2 light py-14 md:py-24 text-stone-800 dark:text-white bg-white dark:bg-[#0b1727] overflow-hidden">
      <div className="container px-16 md:px-8 xl:px-32">
        <h2 className="text-[32px] lg:text-[45px] leading-none font-bold mb-4 text-center">
          Liste des Événements
        </h2>
        <div className="grid grid-cols-12 mt-12 gap-6">
          {events.map(event => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventList;
