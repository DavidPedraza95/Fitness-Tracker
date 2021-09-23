const router = require("express").Router();
const { Mongoose } = require("mongoose");
const db = require('../../models');


//GET api/workouts - calculate totalDuration 
router.get('/', (req, res) => {
    db
    .Workout
    .aggregate(
                [
                    {
                        $addFields: { totalDuration: {$sum: "$exercises.duration"}}
                    }
                ])
    .sort({ day: -1})
    .limit(1)
    // return data
    .then(dbWorkout => {
            res.status(200).json(dbWorkout);
    })
    // return error
    .catch(err => {
            res.status(400).json(err);
    })
});

//GET ./range 
router.get('/range', (req, res) => {
    db.Workout
        .aggregate(
                    [
                        {
                            $addFields: { totalDuration: {$sum: "$exercises.duration"}}
                        }
                    ]
        )
        .sort({ day: -1 })
        .limit(7)
        // return data
        .then (dbWorkout => {
                res.status(200).json(dbWorkout);
        })
        //return error
        .catch(err => {
            res.status(400).json(err);
        })
});

//PUT api/workouts by id
router.put('/:id', ({ body, params }, res) => {
    db.Workout
        .findByIdAndUpdate(params.id, {$push: {exercises: body}}, {new: true, runValidators: true})
        // return data
        .then (dbWorkout => {
            res.status(200).json(dbWorkout);
        })
        //return error
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
});

//POST api/workouts - create new workout
router.post('/', ({ body }, res) => {
    db.Workout
        .create(body)
        //return data
        .then(dbWorkout => {
            console.log(dbWorkout);
            res.status(200).json(dbWorkout);
        })
        //return error
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
})

module.exports = router;