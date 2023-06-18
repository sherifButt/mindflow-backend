const express = require('express');
const routes = express.Router(); 

const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const avatarRoutes = require('./avatarRoutes');
const diagramRoutes = require('./diagramRoutes');
const instructionRoutes = require('./instructionRoutes');
const jobRoutes = require('./jobRoutes');


routes.use('/auth', authRoutes);
routes.use('/users', userRoutes);
routes.use('/avatars', avatarRoutes);
routes.use('/diagrams', diagramRoutes);
routes.use('/instructions', instructionRoutes);
routes.use('/jobs', jobRoutes);


module.exports = routes;