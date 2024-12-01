import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'; 
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AddEvent from './pages/Events/AddEvent';
import EditEvent from './pages/Events/EditEvent'; 
import Subscribers from './pages/Participants/Subscribers';
import AddParticipant from './pages/Participants/AddParticipant';
import EditParticipant from './pages/Participants/EditParticipant';
import EventList from './pages/Events/EventList';
import ParticipantList from './pages/Participants/ParticipantList';


function App() {
  return (
    <Router> 
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/register" element={<Register />} /> 
        <Route path="/login" element={<Login />} /> 
        <Route path="/dashboard" element={<Dashboard />} /> 
        <Route path="/add-event" element={<AddEvent />} />
        <Route path="/edit-event/:eventId" element={<EditEvent />} />
        <Route path="/subscribers" element={<Subscribers />} />
        <Route path="/add-participant" element={<AddParticipant />} />
        <Route path="/edit-participant/:participantId" element={<EditParticipant />} />
        <Route path="/event-list" element={<EventList />} />
        <Route path="/:eventId/participants" element={<ParticipantList />} />
      </Routes>
    </Router>
  );
}

export default App;
