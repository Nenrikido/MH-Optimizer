import React from 'react';
import {Autocomplete, Box, FormControl, IconButton, MenuItem, Select, TextField} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ClearIcon from '@mui/icons-material/Clear';
import {Amulet} from '../../model/Amulet';
import { useI18n } from '../../lib/i18nContext';
import { Skill } from '../../model/Skill';
import { NamedEntity } from '../../model/Localized';
import { Icon, isSkillIconKey } from '../../lib/icon';

interface AmuletBadgeProps {
  amulet: Amulet;
  onRemove: (index: number) => void;
  onSkillRemove: (amuletIdx: number, skillIdx: number) => void;
  onSlotRemove: (index: number) => void;
  onSkillChange: (
    amuletIdx: number,
    skillIdx: number,
    field: string,
    value: string | number | { en: string; fr: string } | undefined
  ) => void;
  onSlotChange: (index: number, value: string) => void;
  index: number;
  availableSkills: Skill[];
}

function AmuletBadge({
  amulet,
  onRemove,
  onSkillRemove,
  onSlotRemove,
  onSkillChange,
  onSlotChange,
  index,
  availableSkills
}: AmuletBadgeProps) {
  const { t, language } = useI18n();

  const handleSkillSelect = (skillIndex: number, value: Skill | null) => {
    if (value) {
      onSkillChange(index, skillIndex, 'id', value.id);
      onSkillChange(index, skillIndex, 'name', value.names.en);
      onSkillChange(index, skillIndex, 'names', value.names);
      onSkillChange(index, skillIndex, 'value', 1);
    } else {
      onSkillRemove(index, skillIndex);
    }
  };

  return (
    <Box sx={{display: 'flex', gap: 1, alignItems: 'center', bgcolor: '#495057', p: 1, borderRadius: 1, border: '1px solid #6c757d'}}>
      <Box sx={{display: 'flex', flexDirection: 'column', width: '75%', gap: 1}}>
        {[0, 1, 2].map(i => {
          const currentSkill = amulet.skills[i];
          const selectedSkill = currentSkill?.id ? availableSkills.find(s => s.id === currentSkill.id) : null;

          // Filter out skills already selected in this amulet
          const selectedSkillIds = amulet.skills
            .filter((s, idx) => idx !== i && s?.id)
            .map(s => s.id);
          const filteredSkills = availableSkills.filter(skill => !selectedSkillIds.includes(skill.id));
          return (
            <Box key={i} sx={{display: 'flex', alignItems: 'center', gap: 1}}>
              <Autocomplete
                value={selectedSkill}
                onChange={(_, newValue) => handleSkillSelect(i, newValue)}
                options={filteredSkills}
                getOptionLabel={(option) => option.names[language] || option.names.en}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                renderOption={(props, option) => (
                  <Box component="li" {...props} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {isSkillIconKey(option.icon) ? <Icon type="skills" iconKey={option.icon} size={18} /> : null}
                    <span>{option.names[language] || option.names.en}</span>
                  </Box>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder={`${t.filters.amulets.skill} ${i + 1}`}
                    size="small"
                    fullWidth
                  />
                )}
                size="small"
                sx={{
                  flex: 1,
                  '& .MuiOutlinedInput-root': {
                    color: '#f8f9fa',
                    '& fieldset': {borderColor: '#6c757d'},
                    '&:hover fieldset': {borderColor: '#adb5bd'}
                  }
                }}
              />
              <Box
                component="input"
                type="number"
                value={currentSkill?.value || ''}
                onChange={e => {
                  const val = Number(e.target.value);
                  if (val >= 1 && val <= 3) {
                    onSkillChange(index, i, 'value', val);
                  }
                }}
                min={1}
                max={3}
                disabled={!currentSkill?.id}
                placeholder="1"
                sx={{
                  width: 60,
                  padding: '8px',
                  borderRadius: '4px',
                  border: '1px solid #6c757d',
                  backgroundColor: '#212529',
                  color: '#f8f9fa',
                  fontSize: '0.875rem',
                  '&:hover': {
                    borderColor: '#adb5bd',
                  },
                  '&:focus': {
                    outline: 'none',
                    borderColor: '#adb5bd',
                  },
                  '&:disabled': {
                    opacity: 0.5,
                  },
                  '&::placeholder': {
                    color: '#6c757d',
                  }
                }}
              />
            </Box>
          );
        })}
      </Box>
      <Box sx={{display: 'flex', alignItems: 'center'}}>
        <FormControl size="small" sx={{'& .MuiOutlinedInput-root': {
          color: '#f8f9fa',
          '& fieldset': {
            borderColor: '#6c757d',
          },
        }}}>
          <Select
            value={amulet.slots}
            onChange={e => onSlotChange(index, e.target.value)}
            displayEmpty
            sx={{color: '#f8f9fa'}}
          >
            <MenuItem value="">
              <em>{t.filters.amulets.slots}</em>
            </MenuItem>
            <MenuItem value="1-0-0">1-0-0</MenuItem>
            <MenuItem value="1-1-0">1-1-0</MenuItem>
            <MenuItem value="2-0-0">2-0-0</MenuItem>
            <MenuItem value="2-1-0">2-1-0</MenuItem>
            <MenuItem value="3-0-0">3-0-0</MenuItem>
            <MenuItem value="W1-0-0">W1-0-0</MenuItem>
            <MenuItem value="W1-1-0">W1-1-0</MenuItem>
            <MenuItem value="W1-1-1">W1-1-1</MenuItem>
          </Select>
        </FormControl>
        <IconButton size="small" onClick={() => onSlotRemove(index)} sx={{color: '#adb5bd'}}>
          <ClearIcon fontSize="small" />
        </IconButton>
      </Box>
      <IconButton size="small" onClick={() => onRemove(index)} sx={{color: '#adb5bd'}}>
        <CloseIcon fontSize="small" />
      </IconButton>
    </Box>
  );
}

export default AmuletBadge;
