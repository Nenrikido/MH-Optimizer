/**
 * FiltersTab Component
 * Manages all filter options including amulets, excluded armor items, and GOG weapon filters
 */

import React from 'react';
import { Box } from '@mui/material';
import AmuletsSection from './filters/AmuletsSection';
import ExcludeArmorSection from './filters/ExcludeArmorSection';
import GogWeaponsSection from './filters/GogWeaponsSection';
import { useAppState } from '../../lib/appStateContext';

function FiltersTab() {
  const {
    amulets,
    setAmulets,
    availableSkills,
    excludedArmorItems,
    setExcludedArmorItems,
    gogSetFilter,
    setGogSetFilter,
    gogGroupFilter,
    setGogGroupFilter,
    availableArmorItems,
    availableSets,
    availableGroups,
  } = useAppState();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <ExcludeArmorSection
        excludedArmorItems={excludedArmorItems}
        setExcludedArmorItems={setExcludedArmorItems}
        availableArmorItems={availableArmorItems}
      />
      <GogWeaponsSection
        gogSetFilter={gogSetFilter}
        setGogSetFilter={setGogSetFilter}
        gogGroupFilter={gogGroupFilter}
        setGogGroupFilter={setGogGroupFilter}
        availableSets={availableSets}
        availableGroups={availableGroups}
      />
      <AmuletsSection amulets={amulets} setAmulets={setAmulets} availableSkills={availableSkills} />
    </Box>
  );
}

export default FiltersTab;

