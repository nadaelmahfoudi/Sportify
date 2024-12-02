import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Sidebar from '../../components/SideBare';
import { useNavigate, useParams } from 'react-router-dom';
import validateParticipant from '../../validations/validateParticipant'; // Import validation

const EditParticipant = () => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [eventName, setEventName] = useState('');
  const [events, setEvents] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();
  const { participantId } = useParams(); 

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/events/events');
        setEvents(response.data.events);
      } catch (err) {
        setError('Failed to fetch events');
      }
    };

    const fetchParticipant = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/participant/${participantId}`);
        const { name, phoneNumber, event } = response.data.participant;
        setName(name);
        setPhoneNumber(phoneNumber);
        setEventName(event.title);
      } catch (err) {
        setError('Failed to fetch participant');
      }
    };

    fetchEvents();
    fetchParticipant();
  }, [participantId]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateParticipant({ name, phoneNumber, eventName });
    setFormErrors(errors);

    if (Object.keys(errors).length > 0) return;

    try {
      const response = await axios.put(
        `http://localhost:5000/api/participants/${participantId}`,
        {
          name,
          phoneNumber,
          eventName,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        }
      );
      setMessage(response.data.message);
      setTimeout(() => navigate('/subscribers'), 1000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update participant');
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 bg-gray-50 p-6">
          <h1 className="text-2xl font-bold">Edit Participant</h1>
          <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded shadow-md">
            {message && <p className="text-green-500 mb-4">{message}</p>}
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <div className="mb-4">
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-full px-4 py-2 border rounded-md ${
                  formErrors.name ? 'border-red-500' : ''
                }`}
              />
              {formErrors.name && <p className="text-red-500 text-sm">{formErrors.name}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Phone Number</label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className={`w-full px-4 py-2 border rounded-md ${
                  formErrors.phoneNumber ? 'border-red-500' : ''
                }`}
              />
              {formErrors.phoneNumber && (
                <p className="text-red-500 text-sm">{formErrors.phoneNumber}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Event</label>
              <select
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                className={`w-full px-4 py-2 border rounded-md ${
                  formErrors.eventName ? 'border-red-500' : ''
                }`}
              >
                <option value="">Select an event</option>
                {events.map((event) => (
                  <option key={event._id} value={event.title}>
                    {event.title}
                  </option>
                ))}
              </select>
              {formErrors.eventName && <p className="text-red-500 text-sm">{formErrors.eventName}</p>}
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Update Participant
            </button>
          </form>
          <button
          onClick={() => navigate('/dashboard')}
          className="my-4 block bg-indigo-600 border text-white px-8 py-2 hover:opacity-90 rounded-md"
        >
          Retour!
        </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EditParticipant;
