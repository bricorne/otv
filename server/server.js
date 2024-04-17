const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const path = require('path');
const port = 3001;

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'otv'
});

db.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données:', err);
  } else {
    console.log('Connecté à la base de données MySQL');
  }
});

app.use(cors());
app.use(bodyParser.json());

app.post('/api/streamers', (req, res) => {
  console.log("Received data:", req.body);

  const { name, twitch, championID } = req.body;

  if (!name || !twitch || !championID) {
    return res.status(400).send('Toutes les données requises ne sont pas fournies.');
  }

  const insertStreamer = 'INSERT INTO streamers (name, twitch) VALUES (?, ?)';
  db.query(insertStreamer, [name, twitch], (streamerErr, streamerResults) => {
    if (streamerErr) {
      console.error("Erreur lors de l'insertion du streamer:", streamerErr);
      return res.status(500).send('Erreur lors de l\'ajout du streamer.');
    }

    const streamerId = streamerResults.insertId;
    const linkQuery = 'INSERT INTO link (streamer_id, champ_id) VALUES (?, ?)';

    db.query(linkQuery, [streamerId, championID], (linkErr, linkResults) => {
      if (linkErr) {
        console.error("Erreur lors de la liaison du streamer avec le champion:", linkErr);
        return res.status(500).send('Erreur lors de la création de la liaison.');
      }
      res.status(201).send({ message: 'Streamer et champion liés avec succès' });
    });
  });
});

app.get('/api/champions', (req, res) => {
  const query = 'SELECT id, name FROM champions'; // Assurez-vous que les colonnes correspondent
  db.query(query, (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des champions:', err);
      return res.status(500).send('Erreur lors de la récupération des champions.');
    }
    res.json(results);
  });
});

app.get('/api/champion/:name', async (req, res) => {
  const championName = req.params.name;

  // Requête SQL pour récupérer les streamers affiliés au champion
  const query = `SELECT streamers.*
  FROM streamers
  JOIN link ON streamers.id = link.streamer_id
  JOIN champions ON link.champ_id = champions.id
  WHERE champions.name = ?`;

  try {
    const results = await new Promise((resolve, reject) => {
      db.query(query, [championName], (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results);
      });
    });

    // Préparer les promesses pour récupérer les logos de chaque streamer via Twitch API
    const twitchDataPromises = results.map(streamer =>
      fetch(`https://api.twitch.tv/helix/users?login=${streamer.name}`, {
        headers: {
          'Client-ID': 'cbprmek347ulpu6cqhfigh4zn4bqc7',
          'Authorization': `Bearer waedkdut2zmojtsef7d8acnowse7ju`
        }
      }).then(response => response.json())
    );

    // Résoudre toutes les promesses pour obtenir les données Twitch
    const twitchResults = await Promise.all(twitchDataPromises);

    // Fusionner les données Twitch avec les résultats de la base de données
    const enrichedStreamers = results.map((streamer, index) => {
      const twitchData = twitchResults[index].data[0];
      console.log(`Données Twitch pour ${streamer.name}:`, twitchData);
      return {
        ...streamer,
        logo: twitchData ? twitchData.profile_image_url : 'default-logo-url',
        banniere: twitchData ? twitchData.offline_image_url : 'default-banniere-url'
      };
    });

    res.json(enrichedStreamers);
  } catch (error) {
    console.error('Erreur serv', error);
    res.status(500).send('Erreur recup');
  }
});

// Serve static files from React app
app.use(express.static('../client/build'));

// Handle React routing, return all requests to React app
app.get('*', function (req, res) {
  res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'));
});

app.listen(port, () => {
  console.log(`Le serveur est en écoute sur le port ${port}`);
});
