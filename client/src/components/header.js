import React from 'react';

function Header() {
    return (
        <header>
            <div id="logo">
                <img src="/img/logo.png" alt='logo' />
            </div>
            <div id="fav-champ">
                <p>Champions favoris :</p>
                <img src="https://ddragon.leagueoflegends.com/cdn/14.4.1/img/champion/Kled.png" alt='champion' />
                <img src="https://ddragon.leagueoflegends.com/cdn/14.4.1/img/champion/Darius.png" alt='champion' />
                <img src="https://ddragon.leagueoflegends.com/cdn/14.4.1/img/champion/Sett.png" alt='champion' />
                <img src="https://ddragon.leagueoflegends.com/cdn/14.4.1/img/champion/Urgot.png" alt='champion' />
                <img src="https://ddragon.leagueoflegends.com/cdn/14.4.1/img/champion/Kayn.png" alt='champion' />
            </div>
            <div id="login">
                <p><a href='/addStreamer'>Proposer un streamer</a></p>
            </div>
        </header>
    );
}

export default Header;