import React from 'react';
import {Box, Typography} from '@mui/material';
import SkillInput from '../inputs/SkillInput';
import BadgeList from '../inputs/BadgeList';
import SetInput from '../inputs/SetInput';
import WeaponInput from '../inputs/WeaponInput';
import OptionsInputs from '../inputs/OptionsInputs';
import InfoCollapse from './InfoCollapse';
import {useI18n} from '../../lib/i18nContext';
import {useAppState} from '../../lib/appStateContext';

function MainForm() {
  const {t} = useI18n();
  const {
    skills,
    setSkills,
    sets,
    setSets,
    weapons,
    setWeapons,
    options,
    setOptions,
    availableSkills,
    availableSets,
    availableGroups,
    availableWeapons,
    onOptimize,
    loading,
    loadingLists,
    onSaveConfig,
  } = useAppState();

  if (loadingLists) {
    return <Box sx={{p: 3}}>{t.common.loading}</Box>;
  }

  const combinedAvailableSets = [...availableSets, ...availableGroups];
  const sectionTitleSx = {fontSize: '1.5rem', fontWeight: 600, mb: 1, color: 'text.primary'};

  return (
    <Box sx={{
      p: 3,
      width: {xs: '100%', lg: '55%'},
      minWidth: {xs: '100%', lg: '55vw'},
      height: {xs: 'auto', lg: 'calc(100vh - 75px)'},
      overflowX: 'hidden'
    }}>
      <InfoCollapse/>
      <Box sx={{mt: 1}}>
        <Typography variant="body1" sx={sectionTitleSx}>{t.form.skills}</Typography>
        <SkillInput skills={skills} setSkills={setSkills} availableSkills={availableSkills}/>
        <BadgeList items={skills} setItems={setSkills} type="skills"/>

        <Typography variant="body1" sx={sectionTitleSx}>{t.form.armor}</Typography>
        <SetInput sets={sets} setSets={setSets} availableSets={combinedAvailableSets}/>
        <BadgeList items={sets} setItems={setSets} type="sets"/>

        <Typography variant="body1" sx={sectionTitleSx}>{t.form.weapons}</Typography>
        <WeaponInput weapons={weapons} setWeapons={setWeapons} availableWeapons={availableWeapons}/>
        <BadgeList items={weapons} setItems={setWeapons} type="weapons"/>

        <OptionsInputs options={options} setOptions={setOptions} onOptimize={onOptimize} loading={loading}
                       onSaveConfig={onSaveConfig}/>
      </Box>
    </Box>
  );
}

export default MainForm;
