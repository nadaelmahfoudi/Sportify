const express = require('express');
const cors = require('cors');
const { connect, PORT } = require('./config/config'); 
const authRoutes = require('./src/routes/auth');
const eventRoutes = require('./src/routes/eventRoutes');
const eventIdRoutes = require('./src/routes/getEventByIdRoute');
const participantRoutes = require('./src/routes/participantRoutes');
const participantIdRoutes = require('./src/routes/getParticipantId');
const path = require('path');

const app = express();

app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));


app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());
connect();

app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/event', eventIdRoutes);
app.use('/api/participants', participantRoutes);
app.use('/api/participant', participantIdRoutes);

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
