import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ChampionList from './components/ChampionList';
import StreamerChamp from './components/StreamerChamp';
import AddStreamer from './components/addStreamer';
import Header from './components/header'
import Footer from './components/footer';
import './styles/style.css';

function App() {
  return (
    <React.StrictMode>
      <Router>
        <Header />
        <hr />
        <main>
          <Routes>
            <Route path="/" element={<ChampionList />} />
            <Route path="/champion/:name" element={<StreamerChamp />} />
            <Route path="/addStreamer" element={<AddStreamer />} />
            {/* Ajoutez d'autres routes ici */}
          </Routes>
        </main>
        <Footer />
      </Router>
    </React.StrictMode>
  );
}

export default App;
