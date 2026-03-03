import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import MainForm from './components/MainForm';
import Tabs from './components/Tabs';

function App() {
  // États principaux pour skills, sets, weapons, etc.
  const [skills, setSkills] = useState([]);
  const [sets, setSets] = useState([]);
  const [weapons, setWeapons] = useState([]);
  const [options, setOptions] = useState({
    N: 5,
    include_all_amulets: true,
    transcend: false,
    include_gog_sets: false,
  });
  const [results, setResults] = useState([]);
  const [amulets, setAmulets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [availableSkills, setAvailableSkills] = useState([]);
  const [availableSets, setAvailableSets] = useState([]);
  const [availableWeapons, setAvailableWeapons] = useState([]);
  const [loadingLists, setLoadingLists] = useState(true);

  // Persistance locale : charger la config au démarrage
  useEffect(() => {
    const saved = localStorage.getItem('mh_opti_config');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setSkills(parsed.skills || []);
        setSets(parsed.sets || []);
        setWeapons(parsed.weapons || []);
        setAmulets(parsed.amulets || []);
        setOptions(parsed.options || options);
      } catch (e) { /* ignore */ }
    }
  }, []);

  // Charger les listes dynamiquement depuis le backend
  useEffect(() => {
    fetch('/available_items')
      .then(r => r.json())
      .then(data => {
        setAvailableSkills(data.available_skills || []);
        setAvailableSets(data.available_sets || []);
        setAvailableWeapons(data.available_weapons || []);
        setLoadingLists(false);
      });
  }, []);

  // Fonction de sauvegarde locale
  const handleSaveConfig = () => {
    localStorage.setItem('mh_opti_config', JSON.stringify({
      skills, sets, weapons, amulets, options
    }));
    alert('Configuration sauvegardée !');
  };

  // Fonction de soumission du formulaire
  const handleOptimize = async () => {
    setLoading(true);
    setResults([]);
    // Construction du payload
    const payload = {
      skills,
      sets,
      weapons,
      options,
      amulets,
    };
    try {
      const response = await fetch('/api/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      setResults(data);
    } catch (e) {
      setResults(["Erreur lors de l'optimisation."]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <MainForm
        skills={skills}
        setSkills={setSkills}
        sets={sets}
        setSets={setSets}
        weapons={weapons}
        setWeapons={setWeapons}
        options={options}
        setOptions={setOptions}
        availableSkills={availableSkills}
        availableSets={availableSets}
        availableWeapons={availableWeapons}
        onOptimize={handleOptimize}
        loading={loading}
        loadingLists={loadingLists}
        onSaveConfig={handleSaveConfig}
      />
      <Tabs
        results={results}
        amulets={amulets}
        setAmulets={setAmulets}
        availableSkills={availableSkills}
        loading={loading}
      />
    </div>
  );
}

export default App;
