import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function StreamerChamp() {
    const { name } = useParams();
    const [streamers, setStreamers] = useState([]);

    useEffect(() => {
        fetch(`/api/champion/${name}`)
            .then(response => response.json())
            .then(data => {
                console.log('Données reçues:', data);

                setStreamers(data);
            })
            .catch(error => console.error('Erreur lors de la récupération des streamers:', error));
    }, [name]);

    return (
        <div id='streamers'>
            <div className='champ-header' style={{ backgroundImage: `url(https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${name}_0.jpg)` }}>
            <h1>{name}</h1>
            </div>
            <ul>
                {streamers.map(streamer => (
                    <div className='streamer' style={{ backgroundImage: `url(${streamer.banniere})` }}>
                    <li key={streamer.id}>
                            <div><h2>{streamer.name}</h2> <a href={streamer.twitch} target="_blank" rel="noopener noreferrer">{streamer.twitch}</a></div>
                    </li>
                    </div>
                ))}
            </ul>
        </div>
    );
}

export default StreamerChamp;
//<img src={streamer.logo} alt={`${streamer.name} logo`} className="streamer-logo" />
