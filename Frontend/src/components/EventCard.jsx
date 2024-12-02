import React from 'react';
import { Link } from 'react-router-dom';

const EventCard = ({ event }) => {
  return (
    <div className="col-span-12 md:col-span-6 lg:col-span-4">
      <article className="shadow-lg dark:shadow-none dark:bg-[#1E2735] rounded overflow-hidden h-full">
      <img 
  src={`http://localhost:5000${event.image}`} 
  alt={event.title} 
  className="h-auto w-full" 
/>

        <div className="p-3 pb-8 md:p-6">
          <h4 className="font-medium text-2xl leading-7 mb-2">{event.title}</h4>
          <p>
            <span className="ml-2">
              By <a href="#" className="text-blue-600 opacity-70">{event.organizer}</a>
            </span>
            <span>At <span>{new Date(event.date).toLocaleDateString()}</span></span>
          </p>
          <p className="opacity-60 mt-3 mb-8">{event.description}</p>
          <Link
              to={`/${event._id}/participants`}
              className="bg-transparent hover:bg-blue-600 border border-blue-600 hover:text-white py-2 px-5 rounded transition"
            >
              Liste des participants
            </Link>
        </div>
      </article>
    </div>
  );
};

export default EventCard;
