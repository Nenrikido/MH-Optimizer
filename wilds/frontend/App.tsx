import React, {useEffect, useState} from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Header from './components/Header';
import MainForm from './components/MainForm';
import Tabs from './components/Tabs';
import {Skill} from './model/Skill';
import {Set as ArmorSet} from './model/Set';
import {Weapon} from './model/Weapon';
import {Amulet} from './model/Amulet';
import {Options} from './model/Options';
import {Result} from './model/Result';
import Box from '@mui/material/Box';
import { DEFAULT_DATA } from './lib/defaultData';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#0d6efd',
    },
    secondary: {
      main: '#6c757d',
    },
    success: {
      main: '#198754',
    },
    background: {
      default: '#212529',
      paper: '#343a40',
    },
    text: {
      primary: '#adb5bd',
      secondary: '#adb5bd',
    },
    divider: '#495057',
  },
  typography: {
    fontFamily: '"Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        contained: {
          textTransform: 'none',
          fontWeight: 500,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            backgroundColor: '#212529',
            color: '#f8f9fa',
            fontSize: '0.875rem',
          },
          '& .MuiOutlinedInput-input': {
            color: '#f8f9fa',
            fontSize: '0.875rem',
          },
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        paper: {
          backgroundColor: '#343a40',
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          backgroundColor: '#343a40',
          '&.Mui-expanded': {
            margin: 0,
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#343a40',
        },
      },
    },
  },
});

function App() {
    // États principaux pour skills, sets, weapons, etc.
    const [skills, setSkills] = useState<Skill[]>([]);
    const [sets, setSets] = useState<ArmorSet[]>([]);
    const [weapons, setWeapons] = useState<Weapon[]>([]);
    const [options, setOptions] = useState<Options>({
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
        } else {
            // Charger les données par défaut si aucune configuration sauvegardée
            setSkills(DEFAULT_DATA.skills);
            setSets(DEFAULT_DATA.sets);
            setWeapons(DEFAULT_DATA.weapons);
            setAmulets(DEFAULT_DATA.amulets);
            setOptions(DEFAULT_DATA.options);
        }
    }, []);

    // Charger les listes dynamiquement depuis le backend
    useEffect(() => {
        fetch('/api/available_items')
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
        alert('Configuration saved!');
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
            setResults(["Error during optimization."]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box sx={{ height: '100vh', overflow: 'hidden' }}>
                <Header />
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', height: 'calc(100vh - 75px)', overflow: 'hidden' }} id="main-container">
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
                </Box>
            </Box>
        </ThemeProvider>
    );
}

export default App;
