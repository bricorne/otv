import React, { useState, useEffect } from 'react';


function AddStreamer() {
  const [name, setName] = useState('');
  const [twitch, setTwitch] = useState('');
  const [champion, setChampion] = useState('');
  const [champions, setChampions] = useState([]);

  useEffect(() => {
    // Fetch la liste des champions à l'initialisation du composant
    fetch('/api/champions')
      .then(response => response.json())
      .then(data => setChampions(data))
      .catch(error => console.error('Error fetching champions:', error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Structure de données à envoyer
    const streamerData = {
      name,
      twitch,
      championID: champion,
    };

    // Post les données vers l'API pour insertion dans la base de données
    fetch('/api/streamers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(streamerData),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Success:', data);
        // Réinitialiser le formulaire ou rediriger l'utilisateur
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  /*
  return (
    <div id='form_streamer'>
      <form className="form" autoComplete="off" onSubmit={handleSubmit}>
        <div className="control">
        </div>
        <div className="control block-cube block-input">
          <input name="name" type="text" placeholder="Nom" value={name}
            onChange={(e) => setName(e.target.value)}
            required />
          <div className="bg-top">
            <div className="bg-inner"></div>
          </div>
          <div className="bg-right">
            <div className="bg-inner"></div>
          </div>
          <div className="bg">
            <div className="bg-inner"></div>
          </div>
        </div>
        <div className="control block-cube block-input">
          <input name="url" type="url" placeholder="URL twitch" value={twitch}
            onChange={(e) => setTwitch(e.target.value)}
            required />
          <div className="bg-top">
            <div className="bg-inner"></div>
          </div>
          <div className="bg-right">
            <div className="bg-inner"></div>
          </div>
          <div className="bg">
            <div className="bg-inner"></div>
          </div>
        </div>
        <div className="control block-cube block-input">
            <select value={champion} onChange={(e) => setChampion(e.target.value)} required>
              <option value="">Sélectionner un champion</option>
              {champions.map((champ) => (
                <option key={champ.id} value={champ.id}>{champ.name}</option>
              ))}
            </select>
          <div className="bg-top">
            <div className="bg-inner"></div>
          </div>
          <div className="bg-right">
            <div className="bg-inner"></div>
          </div>
          <div className="bg">
            <div className="bg-inner"></div>
          </div>
        </div>
        <button className="btn block-cube block-cube-hover" type="submit">
          <div className="bg-top">
            <div className="bg-inner"></div>
          </div>
          <div className="bg-right">
            <div className="bg-inner"></div>
          </div>
          <div className="bg">
            <div className="bg-inner"></div>
          </div>
          <div className="text">Ajouter un streamer</div>
        </button>
      </form>

    </div>
  );
*/
  return (
    <div id='form_streamer'>
      <form onSubmit={handleSubmit}>
        <div id='champs'>
          <label>
            Pseudo:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
          <label>
            Twitch URL:
            <input
              type="url"
              value={twitch}
              onChange={(e) => setTwitch(e.target.value)}
              required
            />
          </label>

          <label>
            Champion Joué:
            <select value={champion} onChange={(e) => setChampion(e.target.value)} required>
              <option value="">Sélectionner un champion</option>
              {champions.map((champ) => (
                <option key={champ.id} value={champ.id}>{champ.name}</option>
              ))}
            </select>
          </label>
        </div>

        <button type="submit">Ajouter Streamer</button>
      </form>
    </div>
  );
}
export default AddStreamer;
