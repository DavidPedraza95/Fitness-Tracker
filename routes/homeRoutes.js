const router = require("express").Router();
const path = require("path");

//index
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
})


//stats
router.get('/stats', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/stats.html'));
})


//exercise
router.get('/exercise', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/exercise.html'));
})

module.exports = router;