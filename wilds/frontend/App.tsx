import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { GlobalStyles } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Header from './components/layout/Header';
import MainForm from './components/layout/MainForm';
import Tabs from './components/layout/Tabs';
import { Skill } from './model/Skill';
import { Set as ArmorSet } from './model/Set';
import { Weapon } from './model/Weapon';
import { Amulet } from './model/Amulet';
import { Options } from './model/Options';
import { Result } from './model/Result';
import { DEFAULT_DATA } from './lib/defaultData';
import { theme } from './lib/theme';
import { globalStyles } from './lib/globalStyles';
import { I18nProvider } from './lib/i18nContext';
import {loadConfig, saveConfig} from './lib/configStorage';
import { useAvailableItems } from './hooks/useAvailableItems';
import { useTemplates } from './hooks/useTemplates';

function App() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [sets, setSets] = useState<ArmorSet[]>([]);
  const [weapons, setWeapons] = useState<Weapon[]>([]);
  const [options, setOptions] = useState<Options>(DEFAULT_DATA.options);
  const [results, setResults] = useState<Result[] | string[]>([]);
  const [amulets, setAmulets] = useState<Amulet[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [excludedArmorItems, setExcludedArmorItems] = useState<string[]>([]);
  const [gogSetFilter, setGogSetFilter] = useState<string>('');
  const [gogGroupFilter, setGogGroupFilter] = useState<string>('');

  const { availableSkills, availableSets, availableWeapons, availableArmorItems, availableGroups, loading: loadingLists } = useAvailableItems(
    setSkills,
    setSets,
    setWeapons,
    setAmulets,
    setOptions
  );

  const {
    customTemplates,
    applyTemplate,
    saveTemplate,
    deleteTemplate,
  } = useTemplates(
    () => ({ skills, sets, weapons, amulets }),
    ({ skills, sets, weapons }) => {
      setSkills(skills);
      setSets(sets);
      setWeapons(weapons);
    }
  );

  const handleSaveConfig = () => {
    saveConfig({ skills, sets, weapons, amulets, options });
    alert('Configuration saved!');
  };

  const handleOptimize = async () => {
    setLoading(true);
    setResults([]);
    const payload = {
      skills,
      sets,
      weapons,
      amulets,
      options: {
        ...options,
        excluded_armor_items: excludedArmorItems,
        gog_set_filter: options.include_gog_sets ? '' : gogSetFilter,
        gog_group_filter: options.include_gog_sets ? '' : gogGroupFilter,
      }
    };
    try {
      const response = await fetch('/api/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      setResults(data);
    } catch {
      setResults(['Error during optimization.']);
    } finally {
      setLoading(false);
    }
  };

  return (
    <I18nProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles styles={globalStyles} />
        <Box sx={{
          height: {xs: 'auto', lg: '100vh'},
          overflow: { xs: 'auto', lg: 'hidden' },
        }}>
          <Header />
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', lg: 'row' },
              height: {xs: 'auto', lg: 'calc(100vh - 75px)'},
              overflow: { xs: 'auto', lg: 'hidden' },
            }}
            id="main-container"
          >
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
              availableSets={[...availableSets, ...availableGroups]}
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
              defaultTemplates={DEFAULT_DATA.defaultTemplates}
              customTemplates={customTemplates}
              onApplyTemplate={applyTemplate}
              onSaveTemplate={saveTemplate}
              onDeleteTemplate={deleteTemplate}
              excludedArmorItems={excludedArmorItems}
              setExcludedArmorItems={setExcludedArmorItems}
              gogSetFilter={gogSetFilter}
              setGogSetFilter={setGogSetFilter}
              gogGroupFilter={gogGroupFilter}
              setGogGroupFilter={setGogGroupFilter}
              availableArmorItems={availableArmorItems}
              availableSets={options.include_gog_sets ? [] : availableSets}
              availableGroups={options.include_gog_sets ? [] : availableGroups}
            />
          </Box>
        </Box>
      </ThemeProvider>
    </I18nProvider>
  );
}

export default App;
