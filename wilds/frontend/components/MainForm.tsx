import React from 'react';
import {Box, Typography} from '@mui/material';
import SkillInput from './SkillInput';
import BadgeList from './BadgeList';
import SetInput from './SetInput';
import WeaponInput from './WeaponInput';
import Options from './Options';
import InfoCollapse from './InfoCollapse';
import {Skill} from '../model/Skill';
import {Set as ArmorSet} from '../model/Set';
import {Weapon} from '../model/Weapon';
import type {Options as OptionsType} from '../model/Options';

interface MainFormProps {
  skills: Skill[];
  setSkills: (skills: Skill[]) => void;
  sets: ArmorSet[];
  setSets: (sets: ArmorSet[]) => void;
  weapons: Weapon[];
  setWeapons: (weapons: Weapon[]) => void;
  options: OptionsType;
  setOptions: (options: OptionsType) => void;
  availableSkills: string[];
  availableSets: string[];
  availableWeapons: string[];
  onOptimize: () => void;
  loading: boolean;
  loadingLists: boolean;
  onSaveConfig: () => void;
}

function MainForm({
                    skills,
                    setSkills,
                    sets,
                    setSets,
                    weapons,
                    setWeapons,
                    options,
                    setOptions,
                    availableSkills = [],
                    availableSets = [],
                    availableWeapons = [],
                    onOptimize,
                    loading,
                    loadingLists,
                    onSaveConfig
                  }: MainFormProps) {
  if (loadingLists) {
    return <Box sx={{ p: 3 }}>Loading lists...</Box>;
  }
  return (
      <Box sx={{ p: 3, minWidth: '60vw', height: 'calc(100vh - 75px)', overflowY: 'auto', overflowX: 'hidden' }}>
        <InfoCollapse />
        <Box sx={{ mt: 1 }}>
          <Typography variant="body1" sx={{ fontSize: '1.5rem', fontWeight: 600, mb: 1, color: '#adb5bd' }}>Skills</Typography>
          <SkillInput skills={skills} setSkills={setSkills} availableSkills={availableSkills} />
          <BadgeList items={skills} setItems={setSkills} type="skills" />

          <Typography variant="body1" sx={{ fontSize: '1.5rem', fontWeight: 600, mb: 1, color: '#adb5bd' }}>Sets</Typography>
          <SetInput sets={sets} setSets={setSets} availableSets={availableSets} />
          <BadgeList items={sets} setItems={setSets} type="sets" />

          <Typography variant="body1" sx={{ fontSize: '1.5rem', fontWeight: 600, mb: 1, color: '#adb5bd' }}>Weapons</Typography>
          <WeaponInput weapons={weapons} setWeapons={setWeapons} availableWeapons={availableWeapons} />
          <BadgeList items={weapons} setItems={setWeapons} type="weapons" />

          <Options options={options} setOptions={setOptions} onOptimize={onOptimize} loading={loading}
                   onSaveConfig={onSaveConfig} />
        </Box>
      </Box>
  );
}

export default MainForm;
