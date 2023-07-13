const fetch = require("node-fetch");
const dayjs = require('dayjs');



var express = require('express');
const {log} = require("debug");
var router = express.Router();

/* GET home page. */
router.get('/', async function(req, res, next) {
  const { date } = req.query;
  if (date) {
    const parsedDate = date.split('-');
    const day = parseInt(parsedDate[0], 10);
    const month = parseInt(parsedDate[1], 10) - 1; // Les mois sont indexés à partir de 0
    const year = parseInt(parsedDate[2], 10);

    const inputDate = new Date(year, month, day);
    const dayOfWeek = inputDate.toLocaleDateString('fr-FR', { weekday: 'long' });
    const formattedDate = inputDate.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' });

    const result = {
      date: formattedDate,
      dayOfWeek: dayOfWeek
    };

    const response = await fetch('http://localhost:8081/api/histories', {

      // Adding method type
      method: "POST",

      // Adding body or contents to send
      body: JSON.stringify({
        //request: formattedDate,
        date: formattedDate,
        day: dayOfWeek,
      }),

      // Adding headers to the request
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    });

    if (!response.ok) {
      res.status(500).json({error: 'Une erreur est survenu'});
      return;
    }

    res.json(result);
  } else {
    res.status(400).send('Veuillez fournir une date au format jj-mm-aaaa');
  }
});

router.get('/historique', async function(req, res, next) {

    var response = await fetch('http://localhost:8081/api/histories');

    if (!response.ok) {
      res.status(500).json({error: 'Une erreur est survenu'});
      return;
    }
  response = await response.json()

    const data = response.map(history => ({
      id: history.id,
      searchDate: dayjs(history.searchDate).format('DD/MM/YY HH:mm:ss'),
      searchItems: {
        request: history.request,
        response: {
          date: history.date,
          day: history.day
        }
      }
    }))

    res.json(data);
});

module.exports = router;
