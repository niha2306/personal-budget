const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app= express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect("mongodb://0.0.0.0:27017/personalbudget").then(() => {
  console.log("database connected")
}).catch((err) => {
  console.log("error while connecting to database",err)
});


const db = mongoose.connection;

const personalBudgetSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    budget: {
        type: Number,
        required: true
    },
    color: {
        type: String,
        required: true
    }
});

const personalBudget = mongoose.model('personalBudget', personalBudgetSchema);

app.post('/api/budget', async(req, res) => {
    console.log(req.body);
    try {
        const newPersonalBudget = new personalBudget({
            title: req.body.title,
            budget: req.body.budget,
            color: req.body.color
        });

        await newPersonalBudget.save();
        res.status(201).send(newPersonalBudget);
    } catch(error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/budget', async(req, res) => {

    try {
        const data = await personalBudget.find({});
        res.status(200).send(data);
    } catch(error) {
        res.status(500).json({ error: error.message });
    }
});

// const budget = require('./mybudget.json');
app.use('/', express.static('public'));

app.get('/hello', (req, res) => {
    res.send('<h1>Hello World</h1>');
});

// app.get('/budget', (req, res) => {
//     res.json(budget);
// });


app.listen(PORT, () => {
    console.log('App Running at localhost:3000/');
});