const express = require('express');
const routes = express.Router(); 

const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const avatarRoutes = require('./avatarRoutes');
const diagramRoutes = require('./diagramRoutes');
const instructionTypeRoutes = require('./instructionTypeRoutes');
const diagramInstructionTypeRoutes = require('./diagramInstructionRoutes');
const nodeRoutes = require('./nodeRoutes');
const jobRoutes = require('./jobRoutes');
const authReadOnlyMiddleware = require('../middleware/authReadOnlyMiddleware');


routes.use('/auth', authRoutes);
routes.use('/users',authReadOnlyMiddleware, userRoutes);
routes.use('/avatars',authReadOnlyMiddleware, avatarRoutes);
routes.use('/diagrams',authReadOnlyMiddleware, diagramRoutes);
routes.use('/instruction-types',authReadOnlyMiddleware, instructionTypeRoutes);
routes.use('/nodes',authReadOnlyMiddleware, nodeRoutes);
routes.use('/diagram-instructions',authReadOnlyMiddleware, diagramInstructionTypeRoutes);
routes.use('/jobs',authReadOnlyMiddleware, jobRoutes);


module.exports = routes;