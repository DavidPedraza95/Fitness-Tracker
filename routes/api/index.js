const router = require("express").Router();

const workoutRoutes = require('./workouts.js');


router.use('/workouts', workoutRoutes);

module.exports = router;