// Budget API

const express = require('express');
const cors = require('cors');
const app = express();
const port = 4000;

app.use(cors());

const budget = {
    data: [
        {
          "title": "Eat out",
          "budget": 50
        },
        {
          "title": "Rent",
          "budget": 200
        },
        {
          "title": "Grocery",
          "budget": 90
        },
        {
          "title": "Dog",
          "budget": 50
        },
        {
          "title": "Entertainment",
          "budget": 200
        },
        {
          "title": "Office",
          "budget": 50
        },
        {
          "title": "Motorcycle",
          "budget": 400
        }
      ]
};


app.get('/budget', (req, res) => {
    res.json(budget);
});

app.listen(port, () => {
    console.log(`API served at http://localhost:${port}`);
});