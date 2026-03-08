import React from 'react';
import {Box, FormControl, IconButton, MenuItem, Select} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ClearIcon from '@mui/icons-material/Clear';
import {Amulet} from '../../model/Amulet';
import CustomAutocomplete from '../inputs/CustomAutocomplete';
import { useI18n } from '../../lib/i18nContext';
import { NamedEntity } from '../../model/Localized';

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
  availableSkills: NamedEntity[];
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
  const { t } = useI18n();

  const handleSkillSelect = (skillIndex: number, value: string) => {
    const selected = availableSkills.find((skill) => skill.id === value);
    onSkillChange(index, skillIndex, 'id', selected?.id || '');
    onSkillChange(index, skillIndex, 'name', selected?.names.en || '');
    onSkillChange(index, skillIndex, 'names', selected?.names || undefined);
  };

  return (
    <Box sx={{display: 'flex', gap: 1, alignItems: 'center', bgcolor: '#495057', p: 1, borderRadius: 1, border: '1px solid #6c757d'}}>
      <Box sx={{display: 'flex', flexDirection: 'column', width: '75%', gap: 1}}>
        {[1, 2, 3].map(i => (
          <Box key={i} sx={{display: 'flex', alignItems: 'center', gap: 1}}>
            <CustomAutocomplete
              value={amulet.skills[i - 1]?.id || ''}
              onChange={(value) => handleSkillSelect(i - 1, value)}
              options={availableSkills}
              placeholder={`${t.filters.amulets.skill} ${i}`}
              size="small"
              fullWidth
              sx={{'& .MuiOutlinedInput-root': {color: '#f8f9fa', '& fieldset': {borderColor: '#6c757d'}, '&:hover fieldset': {borderColor: '#adb5bd'}}}}
            />
            <Box
              component="input"
              type="number"
              value={amulet.skills[i - 1]?.value || ''}
              onChange={e => onSkillChange(index, i - 1, 'value', e.target.value)}
              min={1}
              max={4}
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
              }}
            />
            <IconButton size="small" onClick={() => onSkillRemove(index, i - 1)} sx={{color: '#adb5bd'}}>
              <ClearIcon fontSize="small" />
            </IconButton>
          </Box>
        ))}
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
              <em>{t.filters.amulets.level}</em>
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
