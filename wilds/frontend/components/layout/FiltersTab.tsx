/**
 * FiltersTab Component
 * Manages all filter options including amulets, excluded armor items, and GOG weapon filters
 */

import React, {useState} from 'react';
import {Autocomplete, Box, Chip, TextField, Typography} from '@mui/material';
import AmuletBadgeList from '../blocks/AmuletBadgeList';
import AddAmuletButton from '../blocks/AddAmuletButton';
import {Amulet} from '../../model/Amulet';
import {NamedEntity} from '../../model/Localized';
import {useI18n} from '../../lib/i18nContext';

interface FiltersTabProps {
  amulets: Amulet[];
  setAmulets: React.Dispatch<React.SetStateAction<Amulet[]>>;
  availableSkills: NamedEntity[];
  excludedArmorItems: string[];
  setExcludedArmorItems: (items: string[]) => void;
  gogSetFilter: string;
  setGogSetFilter: (setId: string) => void;
  gogGroupFilter: string;
  setGogGroupFilter: (groupId: string) => void;
  availableArmorItems: NamedEntity[];
  availableSets: NamedEntity[];
  availableGroups: NamedEntity[];
}

function FiltersTab({
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
                    }: FiltersTabProps) {
  const {t, language} = useI18n();
  const [exclusionInput, setExclusionInput] = useState('');

  const handleAddAmulet = () => {
    setAmulets(prev => ([
      ...prev,
      {name: 'Custom Amulet', skills: [{value: 0}, {value: 0}, {value: 0}], slots: ''}
    ]));
  };

  // Filter available armor items (remove already excluded)
  const availableArmorForExclusion = availableArmorItems.filter(
    item => !excludedArmorItems.includes(item.id)
  );

  const handleSelectArmorItem = (_: any, value: NamedEntity | null) => {
    if (value && !excludedArmorItems.includes(value.id)) {
      setExcludedArmorItems([...excludedArmorItems, value.id]);
      setExclusionInput('');
    }
  };

  const handleRemoveArmorItem = (itemId: string) => {
    setExcludedArmorItems(excludedArmorItems.filter(id => id !== itemId));
  };

  const handleSelectGogSet = (value: string) => {
    setGogSetFilter(value || '');
  };

  const handleSelectGogGroup = (value: string) => {
    setGogGroupFilter(value || '');
  };

  const selectedGogSet = availableSets.find((s) => s.id === gogSetFilter) || null;
  const selectedGogGroup = availableGroups.find((g) => g.id === gogGroupFilter) || null;

  // Get names of excluded armor items for display
  const excludedArmorNames = excludedArmorItems.map(id => {
    const item = availableArmorItems.find(a => a.id === id);
    return item ? item.names.en : id;
  });

  return (
    <Box sx={{display: 'flex', flexDirection: 'column', gap: 3}}>
      {/* Amulets Section */}
      <Box>
        <Typography variant="body1" sx={{fontSize: '1rem', fontWeight: 600, mb: 1.5, color: '#adb5bd'}}>
          {t.filters.amulets.title}
        </Typography>
        <AmuletBadgeList amulets={amulets} setAmulets={setAmulets} availableSkills={availableSkills} />
        <AddAmuletButton onAdd={handleAddAmulet} />
      </Box>

      {/* Excluded Armor Items Section */}
      <Box>
        <Typography variant="body1" sx={{fontSize: '1rem', fontWeight: 600, mb: 1.5, color: '#adb5bd'}}>
          {t.filters.excludeArmorParts.title}
        </Typography>
        <Typography variant="caption" sx={{color: '#6c757d', mb: 1.5, display: 'block'}}>
          {t.filters.excludeArmorParts.description}
        </Typography>

        {/* Search field */}
        <Autocomplete
          inputValue={exclusionInput}
          onInputChange={(_, newInputValue) => setExclusionInput(newInputValue)}
          onChange={handleSelectArmorItem}
          options={availableArmorForExclusion}
          getOptionLabel={(option) => option.names[language] || option.names.en}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder={t.filters.excludeArmorParts.placeholder}
              size="small"
              fullWidth
            />
          )}
          fullWidth
          size="small"
          sx={{mb: 1.5}}
        />

        {/* Selected chips */}
        {excludedArmorItems.length > 0 && (
          <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 1}}>
            {excludedArmorItems.map((itemId, idx) => (
              <Chip
                key={itemId}
                label={excludedArmorNames[idx]}
                onDelete={() => handleRemoveArmorItem(itemId)}
                size="small"
                variant="outlined"
              />
            ))}
          </Box>
        )}
      </Box>

      {/* GOG Weapon Filters Section */}
      {availableSets.length > 0 || availableGroups.length > 0 ? (
        <Box>
          <Typography variant="body1" sx={{fontSize: '1rem', fontWeight: 600, mb: 1.5, color: '#adb5bd'}}>
            {t.filters.gogWeapons.title}
          </Typography>
          <Typography variant="caption" sx={{color: '#6c757d', mb: 1.5, display: 'block'}}>
            {t.filters.gogWeapons.description}
          </Typography>

          {/* GOG Set Filter */}
          <Box sx={{mb: 2}}>
            <Typography variant="body2" sx={{fontSize: '0.875rem', fontWeight: 500, color: '#adb5bd', mb: 1}}>
              {t.filters.gogWeapons.setBonus}
            </Typography>
            <Autocomplete
              disablePortal
              size="small"
              fullWidth
              options={availableSets}
              value={selectedGogSet}
              onChange={(_, newValue) => handleSelectGogSet(newValue?.id || '')}
              getOptionLabel={(option) => option.names[language] || option.names.en}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              renderInput={(params) => (
                <TextField {...params} placeholder={t.filters.gogWeapons.setBonusAutocomplete} />
              )}
            />
          </Box>

          {/* GOG Group Filter */}
          <Box>
            <Typography variant="body2" sx={{fontSize: '0.875rem', fontWeight: 500, color: '#adb5bd', mb: 1}}>
              {t.filters.gogWeapons.groupBonus}
            </Typography>
            <Autocomplete
              disablePortal
              size="small"
              fullWidth
              options={availableGroups}
              value={selectedGogGroup}
              onChange={(_, newValue) => handleSelectGogGroup(newValue?.id || '')}
              getOptionLabel={(option) => option.names[language] || option.names.en}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              renderInput={(params) => (
                <TextField {...params} placeholder={t.filters.gogWeapons.groupBonusAutocomplete} />
              )}
            />
          </Box>
        </Box>
      ) : null}
    </Box>
  );
}

export default FiltersTab;

