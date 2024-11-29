import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Sidebar from '../../components/SideBare';
import axios from 'axios'; 

const Subscribers = () => {
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  // Fetch participants from backend
  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/participants/participants');
        setParticipants(response.data.participants);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch participants');
        setLoading(false);
      }
    };
    fetchParticipants();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 bg-gray-50 p-6">
          <h1 className="text-2xl font-bold">Subscribers</h1>
          <p>Voici la liste des participants à vos événements.</p>
          <button
            onClick={() => navigate('/add-participant')}
            className="my-4 block bg-green-600 border text-white px-8 py-2 hover:opacity-90 rounded-md"
          >
            Add Participant
          </button>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                <thead className="text-left">
                  <tr>
                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Name</th>
                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Phone</th>
                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Event</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {participants.map((participant) => (
                    <tr key={participant._id}>
                      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                        {participant.name}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700">{participant.phoneNumber}</td>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                        {participant.event.title}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {message && <p className="text-green-500">{message}</p>}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Subscribers;
