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

  const handleDelete = async (participantId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No token found, please login again');
        return;
      }
  
      const response = await axios.delete(`http://localhost:5000/api/participants/${participantId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      // Show success message
      setMessage(response.data.message);
  
      // Update the state to remove the deleted participant
      setParticipants(participants.filter(participant => participant._id !== participantId));
  
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete participant');
    }
  };
  

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
                      <td className="whitespace-nowrap px-4 py-2">
                        <a
                          href="#"
                          className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
                        >
                          View
                        </a>
                        <a
                          onClick={() => navigate(`/edit-participant/${participant._id}`)}
                          className="inline-block ml-2 rounded bg-blue-500 px-4 py-2 text-xs font-medium text-white hover:bg-blue-700"
                        >
                          Edit
                        </a>
                        {error && <p className="text-red-500">{error}</p>}
                            {message && <p className="text-green-500">{message}</p>}

                            {/* Delete Button */}
                            <a
                                href="#"
                                onClick={() => handleDelete(participant._id)}
                                className="inline-block ml-2 rounded bg-red-600 px-4 py-2 text-xs font-medium text-white hover:bg-red-700"
                            >
                                Delete
                            </a>
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
