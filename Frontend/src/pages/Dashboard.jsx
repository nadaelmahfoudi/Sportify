import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Sidebar from '../components/SideBare';
import axios from 'axios'; 

const Dashboard = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  // Fetch events from backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/events/events'); 
        setEvents(response.data.events);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch events');
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  // Handle Delete event
  const handleDelete = async (eventId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No token found, please login again');
        return;
      }
  
      const response = await axios.delete(`http://localhost:5000/api/events/${eventId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessage(response.data.message);
      setEvents(events.filter(event => event._id !== eventId)); // Remove the deleted event from state
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete event');
    }
  };
  

  return (
    <div>
      <Navbar />
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 bg-gray-50 p-6">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p>Bienvenue dans votre application !</p>
          <button
            onClick={() => navigate('/add-event')}
            className="my-4 block bg-green-600 border text-white px-8 py-2 hover:opacity-90 rounded-md"
          >
            Add Event
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
                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Title</th>
                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Date</th>
                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Location</th>
                    <th className="whitespace-nowrap px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {events.map((event) => (
                    <tr key={event._id}>
                      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                        {event.title}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700">{event.date}</td>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                        {event.location}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2">
                        <a
                          href="#"
                          className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
                        >
                          View
                        </a>
                        <a
                          onClick={() => navigate(`/edit-event/${event._id}`)}
                          className="inline-block ml-2 rounded bg-blue-500 px-4 py-2 text-xs font-medium text-white hover:bg-blue-700"
                        >
                          Edit
                        </a>
                            {error && <p className="text-red-500">{error}</p>}
                            {message && <p className="text-green-500">{message}</p>}

                            {/* Delete Button */}
                            <a
                                href="#"
                                onClick={() => handleDelete(event._id)} // Pass eventId here
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
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
