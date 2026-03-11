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
import {Skill} from '../../model/Skill';
import {useI18n} from '../../lib/i18nContext';
import { GearIconKey, Icon, isGearIconKey, isSkillIconKey } from '../../lib/icon';

interface FiltersTabProps {
  amulets: Amulet[];
  setAmulets: React.Dispatch<React.SetStateAction<Amulet[]>>;
  availableSkills: Skill[];
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

  return (
    <Box sx={{display: 'flex', flexDirection: 'column', gap: 3}}>
      <Box>
        <Typography variant="body1" sx={{fontSize: '1rem', fontWeight: 600, mb: 1.5, color: '#adb5bd'}}>
          {t.filters.amulets.title}
        </Typography>
        <AmuletBadgeList amulets={amulets} setAmulets={setAmulets} availableSkills={availableSkills} />
        <AddAmuletButton onAdd={handleAddAmulet} />
      </Box>

      <Box>
        <Typography variant="body1" sx={{fontSize: '1rem', fontWeight: 600, mb: 1.5, color: '#adb5bd'}}>
          {t.filters.excludeArmorParts.title}
        </Typography>
        <Typography variant="caption" sx={{color: '#6c757d', mb: 1.5, display: 'block'}}>
          {t.filters.excludeArmorParts.description}
        </Typography>

        <Autocomplete
          inputValue={exclusionInput}
          onInputChange={(_, newInputValue) => setExclusionInput(newInputValue)}
          onChange={handleSelectArmorItem}
          options={availableArmorForExclusion}
          getOptionLabel={(option) => option.names[language] || option.names.en}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          renderOption={(props, option) => (
            <Box component="li" {...props} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {isGearIconKey(option.gear_key) ? <Icon type="gear" iconKey={option.gear_key as GearIconKey} /> : null}
              <span>{option.names[language] || option.names.en}</span>
            </Box>
          )}
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

        {excludedArmorItems.length > 0 && (
          <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 1}}>
            {excludedArmorItems.map((itemId) => {
              const item = availableArmorItems.find(a => a.id === itemId);
              const label = item ? (item.names[language] || item.names.en) : itemId;
              return (
                <Chip
                  key={itemId}
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                      {item && isGearIconKey(item.gear_key) ? <Icon type="gear" iconKey={item.gear_key as GearIconKey} /> : null}
                      <span>{label}</span>
                    </Box>
                  }
                  onDelete={() => handleRemoveArmorItem(itemId)}
                  size="small"
                  variant="outlined"
                />
              );
            })}
          </Box>
        )}
      </Box>

      {availableSets.length > 0 || availableGroups.length > 0 ? (
        <Box>
          <Typography variant="body1" sx={{fontSize: '1rem', fontWeight: 600, mb: 1.5, color: '#adb5bd'}}>
            {t.filters.gogWeapons.title}
          </Typography>
          <Typography variant="caption" sx={{color: '#6c757d', mb: 1.5, display: 'block'}}>
            {t.filters.gogWeapons.description}
          </Typography>

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
              renderOption={(props, option) => (
                <Box component="li" {...props} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {isSkillIconKey(option.icon) ? <Icon type="skills" iconKey={option.icon} /> : null}
                  <span>{option.names[language] || option.names.en}</span>
                </Box>
              )}
              renderInput={(params) => (
                <TextField {...params} placeholder={t.filters.gogWeapons.setBonusAutocomplete} />
              )}
            />
          </Box>

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
              renderOption={(props, option) => (
                <Box component="li" {...props} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {isSkillIconKey(option.icon) ? <Icon type="skills" iconKey={option.icon} /> : null}
                  <span>{option.names[language] || option.names.en}</span>
                </Box>
              )}
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

