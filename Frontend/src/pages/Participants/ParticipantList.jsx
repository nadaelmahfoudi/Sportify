import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ParticipantList = () => {
  const { eventId } = useParams();
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/event/${eventId}/participants`);
        setParticipants(response.data.participants);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchParticipants();
  }, [eventId]);

  if (loading) return <p className="text-center mt-10 text-xl font-semibold">Chargement des participants...</p>;
  if (error) return <p className="text-center mt-10 text-xl text-red-500 font-semibold">Erreur: {error}</p>;

  return (
    <section className="ezy__careers5 py-14 md:py-24 bg-gradient-to-b from-white to-gray-100 dark:bg-gradient-to-b dark:from-[#0b1727] dark:to-gray-800 text-zinc-900 dark:text-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-12 justify-center">
          <div className="col-span-12 md:col-span-6 md:col-start-4 text-center">
            <h1 className="text-4xl leading-none font-extrabold md:text-5xl mb-8 text-blue-600 dark:text-blue-400">
              Liste des Participants
            </h1>
            <p className="leading-6 font-medium opacity-80 text-lg">
              Découvrez les participants de cet événement.
            </p>
          </div>
          <div className="col-span-12 md:col-span-8 md:col-start-3 mt-12">
            {participants.length === 0 ? (
              <p className="text-center text-lg font-medium">Aucun participant trouvé.</p>
            ) : (
              participants.map((participant) => (
                <div
                  key={participant._id}
                  className="bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out mt-6"
                >
                  <div className="flex items-center justify-between p-4 md:p-6">
                    <div>
                      <h4 className=" block text-2xl font-semibold text-gray-800 dark:text-white">
                        {participant.name}
                      </h4>
                      <div className="flex flex-wrap mt-2">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Téléphone : {participant.phoneNumber}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ParticipantList;
