import React, {useEffect, useState} from 'react';
import Header from './components/Header';
import MainForm from './components/MainForm';
import Tabs from './components/Tabs';
import {Skill} from './model/Skill';
import {Set as ArmorSet} from './model/Set';
import {Weapon} from './model/Weapon';
import {Amulet} from './model/Amulet';
import {Options} from './model/Options';
import {Result} from './model/Result';

function App() {
    // États principaux pour skills, sets, weapons, etc.
    const [skills, setSkills] = useState<Skill[]>([]);
    const [sets, setSets] = useState<ArmorSet[]>([]);
    const [weapons, setWeapons] = useState<Weapon[]>([]);
    const [options, setOptions] = useState<Options>({
        N: 5,
        include_all_amulets: true,
        transcend: false,
        include_gog_sets: false,
    });
    const [results, setResults] = useState<Result[] | string[]>([]);
    const [amulets, setAmulets] = useState<Amulet[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [availableSkills, setAvailableSkills] = useState<string[]>([]);
    const [availableSets, setAvailableSets] = useState<string[]>([]);
    const [availableWeapons, setAvailableWeapons] = useState<string[]>([]);
    const [loadingLists, setLoadingLists] = useState<boolean>(true);

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
            } catch (e) { /* ignore */
            }
        }
    }, []);

    // Charger les listes dynamiquement depuis le backend
    useEffect(() => {
        fetch('/available_items')
            .then(r => r.json())
            .then(data => {
                console.log(data);
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
                headers: {'Content-Type': 'application/json'},
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
            <main className="d-flex flex-row justify-content-between" id="main-container">
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
            </main>
        </div>
    );
}

export default App;
