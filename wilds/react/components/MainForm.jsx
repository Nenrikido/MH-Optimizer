import React from 'react';
import SkillInput from './SkillInput';
import BadgeList from './BadgeList';
import SetInput from './SetInput';
import WeaponInput from './WeaponInput';
import Options from './Options';
import InfoCollapse from './InfoCollapse';

function MainForm({ skills, setSkills, sets, setSets, weapons, setWeapons, options, setOptions, availableSkills = [], availableSets = [], availableWeapons = [], onOptimize, loading, loadingLists, onSaveConfig }) {
  if (loadingLists) {
    return <div className="container p-3">Chargement des listes...</div>;
  }
  return (
    <div className="container p-3 overflow-auto" style={{ maxHeight: 'calc(100vh - 75px)', minWidth: '60vw' }}>
      <InfoCollapse />
      <div className="mt-2">
        <h4>Skills</h4>
        <SkillInput skills={skills} setSkills={setSkills} availableSkills={availableSkills} />
        <BadgeList items={skills} setItems={setSkills} type="skills" />

        <h4>Sets</h4>
        <SetInput sets={sets} setSets={setSets} availableSets={availableSets} />
        <BadgeList items={sets} setItems={setSets} type="sets" />

        <h4>Weapons</h4>
        <WeaponInput weapons={weapons} setWeapons={setWeapons} availableWeapons={availableWeapons} />
        <BadgeList items={weapons} setItems={setWeapons} type="weapons" />

        <Options options={options} setOptions={setOptions} onOptimize={onOptimize} loading={loading} onSaveConfig={onSaveConfig} />
      </div>
    </div>
  );
}

export default MainForm;
