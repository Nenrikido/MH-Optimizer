import React, {useEffect, useState} from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { GlobalStyles } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Header from './components/layout/Header';
import MainForm from './components/layout/MainForm';
import Tabs from './components/layout/Tabs';
import {Skill} from './model/Skill';
import {Set as ArmorSet} from './model/Set';
import {Weapon} from './model/Weapon';
import {Amulet} from './model/Amulet';
import {Options} from './model/Options';
import {Result} from './model/Result';
import { NamedEntity } from './model/Localized';
import { DEFAULT_DATA } from './lib/defaultData';
import { theme } from './lib/theme';
import { globalStyles } from './lib/globalStyles';
import { I18nProvider } from './lib/i18nContext';
import { TemplateData } from './model/Template';

function normalizeEntity(entry: any): NamedEntity | null {
  if (!entry) return null;
  if (typeof entry === 'string') {
    return { id: entry, names: { en: entry, fr: entry } };
  }
  const id = String(entry.id || entry.name || '');
  if (!id) return null;
  const en = entry.names?.en || entry.name || id;
  const fr = entry.names?.fr || en;
  return { id, names: { en, fr } };
}

function normalizeSavedSkill(skill: any, skillIndex: Record<string, NamedEntity>): Skill | null {
  const fromId = skill?.id ? skillIndex[String(skill.id)] : undefined;
  const fromName = skill?.name ? skillIndex[String(skill.name)] : undefined;
  const base = fromId || fromName;
  if (!base && !skill?.name) return null;

  return {
    id: base?.id || String(skill.name),
    names: base?.names || { en: String(skill.name), fr: String(skill.name) },
    max_points: skill?.max_points ?? 3,
    weight: skill?.weight ?? 10,
  };
}

function normalizeSavedSet(setItem: any, setIndex: Record<string, NamedEntity>): ArmorSet | null {
  const fromId = setItem?.id ? setIndex[String(setItem.id)] : undefined;
  const fromName = setItem?.name ? setIndex[String(setItem.name)] : undefined;
  const base = fromId || fromName;
  if (!base && !setItem?.name) return null;

  return {
    id: base?.id || String(setItem.name),
    names: base?.names || { en: String(setItem.name), fr: String(setItem.name) },
    min_pieces: setItem?.min_pieces ?? 2,
    is_group: setItem?.is_group,
  };
}

function normalizeSavedWeapon(weapon: any, weaponIndex: Record<string, NamedEntity>): Weapon | null {
  const fromId = weapon?.id ? weaponIndex[String(weapon.id)] : undefined;
  const fromName = weapon?.name ? weaponIndex[String(weapon.name)] : undefined;
  const base = fromId || fromName;
  if (!base && !weapon?.name) return null;

  return {
    id: base?.id || String(weapon.name),
    names: base?.names || { en: String(weapon.name), fr: String(weapon.name) },
  };
}

function App() {
    const [skills, setSkills] = useState<Skill[]>([]);
    const [sets, setSets] = useState<ArmorSet[]>([]);
    const [weapons, setWeapons] = useState<Weapon[]>([]);
    const [options, setOptions] = useState<Options>(DEFAULT_DATA.options);
    const [results, setResults] = useState<Result[] | string[]>([]);
    const [amulets, setAmulets] = useState<Amulet[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [availableSkills, setAvailableSkills] = useState<NamedEntity[]>([]);
    const [availableSets, setAvailableSets] = useState<NamedEntity[]>([]);
    const [availableWeapons, setAvailableWeapons] = useState<NamedEntity[]>([]);
    const [loadingLists, setLoadingLists] = useState<boolean>(true);
    const [customTemplates, setCustomTemplates] = useState<TemplateData[]>([]);

    const cloneConfig = (template: TemplateData) => ({
        skills: template.skills.map((s) => ({ ...s, names: { ...s.names } })),
        sets: template.sets.map((s) => ({ ...s, names: { ...s.names } })),
        weapons: template.weapons.map((w) => ({ ...w, names: { ...w.names } })),
        amulets: template.amulets.map((a) => ({ ...a, skills: a.skills.map((s) => ({ ...s })) })),
        options: { ...template.options },
    });

    const applyTemplate = (template: TemplateData) => {
        const cloned = cloneConfig(template);
        setSkills(cloned.skills);
        setSets(cloned.sets);
        setWeapons(cloned.weapons);
        setAmulets(cloned.amulets);
        setOptions(cloned.options);
    };

    const saveCustomTemplate = (name: string) => {
        const trimmedName = name.trim();
        if (!trimmedName) return;

        const template: TemplateData = {
            id: `custom-${Date.now()}`,
            name: trimmedName,
            skills: skills.map((s) => ({ ...s, names: { ...s.names } })),
            sets: sets.map((s) => ({ ...s, names: { ...s.names } })),
            weapons: weapons.map((w) => ({ ...w, names: { ...w.names } })),
            amulets: amulets.map((a) => ({ ...a, skills: a.skills.map((skill) => ({ ...skill })) })),
            options: { ...options },
        };

        const nextTemplates = [...customTemplates, template];
        setCustomTemplates(nextTemplates);
        localStorage.setItem('mh_opti_custom_templates', JSON.stringify(nextTemplates));
    };

    const deleteCustomTemplate = (templateId: string) => {
        const nextTemplates = customTemplates.filter((template) => template.id !== templateId);
        setCustomTemplates(nextTemplates);
        localStorage.setItem('mh_opti_custom_templates', JSON.stringify(nextTemplates));
    };

    useEffect(() => {
        fetch('/api/available_items')
            .then(r => r.json())
            .then(data => {
                const skillsList = (data.available_skills || []).map(normalizeEntity).filter(Boolean) as NamedEntity[];
                const setsList = (data.available_sets || []).map(normalizeEntity).filter(Boolean) as NamedEntity[];
                const weaponsList = (data.available_weapons || []).map(normalizeEntity).filter(Boolean) as NamedEntity[];

                setAvailableSkills(skillsList);
                setAvailableSets(setsList);
                setAvailableWeapons(weaponsList);

                const skillIndex: Record<string, NamedEntity> = {};
                const setIndex: Record<string, NamedEntity> = {};
                const weaponIndex: Record<string, NamedEntity> = {};
                skillsList.forEach((entry) => {
                    skillIndex[entry.id] = entry;
                    skillIndex[entry.names.en] = entry;
                    skillIndex[entry.names.fr] = entry;
                });
                setsList.forEach((entry) => {
                    setIndex[entry.id] = entry;
                    setIndex[entry.names.en] = entry;
                    setIndex[entry.names.fr] = entry;
                });
                weaponsList.forEach((entry) => {
                    weaponIndex[entry.id] = entry;
                    weaponIndex[entry.names.en] = entry;
                    weaponIndex[entry.names.fr] = entry;
                });

                const saved = localStorage.getItem('mh_opti_config');
                if (saved) {
                    try {
                        const parsed = JSON.parse(saved);
                        setSkills((parsed.skills || []).map((s: any) => normalizeSavedSkill(s, skillIndex)).filter(Boolean));
                        setSets((parsed.sets || []).map((s: any) => normalizeSavedSet(s, setIndex)).filter(Boolean));
                        setWeapons((parsed.weapons || []).map((w: any) => normalizeSavedWeapon(w, weaponIndex)).filter(Boolean));
                        setAmulets(parsed.amulets || DEFAULT_DATA.amulets);
                        setOptions(parsed.options || DEFAULT_DATA.options);
                    } catch {
                        setSkills(DEFAULT_DATA.skills as Skill[]);
                        setSets(DEFAULT_DATA.sets as ArmorSet[]);
                        setWeapons(DEFAULT_DATA.weapons as Weapon[]);
                        setAmulets(DEFAULT_DATA.amulets);
                        setOptions(DEFAULT_DATA.options);
                    }
                } else {
                    setSkills(DEFAULT_DATA.skills as Skill[]);
                    setSets(DEFAULT_DATA.sets as ArmorSet[]);
                    setWeapons(DEFAULT_DATA.weapons as Weapon[]);
                    setAmulets(DEFAULT_DATA.amulets);
                    setOptions(DEFAULT_DATA.options);
                }

                setLoadingLists(false);
            });
    }, []);

    useEffect(() => {
        const raw = localStorage.getItem('mh_opti_custom_templates');
        if (!raw) return;
        try {
            const parsed = JSON.parse(raw);
            if (Array.isArray(parsed)) {
                setCustomTemplates(parsed as TemplateData[]);
            }
        } catch {
            setCustomTemplates([]);
        }
    }, []);

    const handleSaveConfig = () => {
        localStorage.setItem('mh_opti_config', JSON.stringify({
            skills, sets, weapons, amulets, options
        }));
        alert('Configuration saved!');
    };

    const handleOptimize = async () => {
        setLoading(true);
        setResults([]);
        const payload = { skills, sets, weapons, options, amulets };
        try {
            const response = await fetch('/api/run', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
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
                <Box sx={{ height: '100vh', overflow: 'hidden' }}>
                    <Header />
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: { xs: 'column', lg: 'row' },
                            height: 'calc(100vh - 75px)',
                            overflow: { xs: 'auto', lg: 'hidden' }
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
                            defaultTemplates={DEFAULT_DATA.defaultTemplates}
                            customTemplates={customTemplates}
                            onApplyTemplate={applyTemplate}
                            onSaveTemplate={saveCustomTemplate}
                            onDeleteTemplate={deleteCustomTemplate}
                        />
                    </Box>
                </Box>
            </ThemeProvider>
        </I18nProvider>
    );
}

export default App;
