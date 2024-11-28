import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'; 
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AddEvent from './pages/Events/AddEvent';
import EditEvent from './pages/Events/EditEvent'; 


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
      </Routes>
    </Router>
  );
}

export default App;
