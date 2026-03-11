import React from 'react';
import {Box, Typography} from '@mui/material';
import SkillInput from '../inputs/SkillInput';
import BadgeList from '../inputs/BadgeList';
import SetInput from '../inputs/SetInput';
import WeaponInput from '../inputs/WeaponInput';
import OptionsInputs from '../inputs/OptionsInputs';
import InfoCollapse from './InfoCollapse';
import {Skill} from '../../model/Skill';
import {Set as ArmorSet} from '../../model/Set';
import {Weapon} from '../../model/Weapon';
import type {Options} from '../../model/Options';
import { NamedEntity } from '../../model/Localized';
import { useI18n } from '../../lib/i18nContext';

interface MainFormProps {
  skills: Skill[];
  setSkills: (skills: Skill[]) => void;
  sets: ArmorSet[];
  setSets: (sets: ArmorSet[]) => void;
  weapons: Weapon[];
  setWeapons: (weapons: Weapon[]) => void;
  options: Options;
  setOptions: (options: Options) => void;
  availableSkills: Skill[];
  availableSets: NamedEntity[];
  availableWeapons: NamedEntity[];
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
  const { t } = useI18n();

  if (loadingLists) {
    return <Box sx={{ p: 3 }}>{t.common.loading}</Box>;
  }
  return (
      <Box sx={{
        p: 3,
        width: { xs: '100%', lg: '60%' },
        minWidth: { xs: '100%', lg: '60vw' },
        height: { xs: 'auto', lg: 'calc(100vh - 75px)' },
        overflowY: { xs: 'visible', lg: 'auto' },
        overflowX: 'hidden'
      }}>
        <InfoCollapse />
        <Box sx={{ mt: 1 }}>
          <Typography variant="body1" sx={{ fontSize: '1.5rem', fontWeight: 600, mb: 1, color: '#adb5bd' }}>{t.form.skills}</Typography>
          <SkillInput skills={skills} setSkills={setSkills} availableSkills={availableSkills} />
          <BadgeList items={skills} setItems={setSkills} type="skills" />

          <Typography variant="body1" sx={{ fontSize: '1.5rem', fontWeight: 600, mb: 1, color: '#adb5bd' }}>{t.form.armor}</Typography>
          <SetInput sets={sets} setSets={setSets} availableSets={availableSets} />
          <BadgeList items={sets} setItems={setSets} type="sets" />

          <Typography variant="body1" sx={{ fontSize: '1.5rem', fontWeight: 600, mb: 1, color: '#adb5bd' }}>{t.form.weapons}</Typography>
          <WeaponInput weapons={weapons} setWeapons={setWeapons} availableWeapons={availableWeapons} />
          <BadgeList items={weapons} setItems={setWeapons} type="weapons" />

          <OptionsInputs options={options} setOptions={setOptions} onOptimize={onOptimize} loading={loading}
                         onSaveConfig={onSaveConfig} />
        </Box>
      </Box>
  );
}

export default MainForm;
