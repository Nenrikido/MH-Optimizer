import React from 'react';
import {Autocomplete, Box, FormControl, IconButton, MenuItem, Select, TextField} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import {Amulet} from '../../../../model/Amulet';
import {useI18n} from '../../../../lib/i18n/i18nContext';
import {Skill} from '../../../../model/Skill';
import {LocalizedNames} from '../../../../model/Localized';
import {Icon, isSkillIconKey} from '../../../../lib/style/icon';

interface AmuletBadgeProps {
  amulet: Amulet;
  onRemove: (index: number) => void;
  onSkillRemove: (amuletIdx: number, skillIdx: number) => void;
  onSkillChange: (
    amuletIdx: number,
    skillIdx: number,
    field: string,
    value: string | number | LocalizedNames | undefined
  ) => void;
  onSlotChange: (index: number, value: string) => void;
  index: number;
  availableSkills: Skill[];
}

function AmuletBadge({
                       amulet,
                       onRemove,
                       onSkillRemove,
                       onSkillChange,
                       onSlotChange,
                       index,
                       availableSkills,
                     }: AmuletBadgeProps) {
  const {t, language} = useI18n();

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
    <Box sx={{
      display: 'flex',
      position: 'relative',
      gap: 1,
      alignItems: 'center',
      bgcolor: 'action.selected',
      p: 1,
      borderRadius: 1,
      border: '1px solid',
      borderColor: 'divider',
      width: {
        xs: '100%',
        sm: 'calc(50% - 8px)',
        md: 'calc(33% - 36px / 3)',
        lg: '100%',
        xl: 'calc(50% - 8px)'
      },
    }}>
      <Box sx={{display: 'flex', flexDirection: 'column', width: '80%', gap: 1}}>
        {[0, 1, 2].map((i) => {
          const currentSkill = amulet.skills[i];
          const selectedSkill = currentSkill?.id ? availableSkills.find((s) => s.id === currentSkill.id) : null;

          const selectedSkillIds = amulet.skills
            .filter((s, idx) => idx !== i && s?.id)
            .map((s) => s.id);
          const filteredSkills = availableSkills.filter((skill) => !selectedSkillIds.includes(skill.id));

          return (
            <Box key={i} sx={{display: 'flex', alignItems: 'center', gap: 1}}>
              <Autocomplete
                value={selectedSkill}
                onChange={(_, newValue) => handleSkillSelect(i, newValue)}
                options={filteredSkills}
                getOptionLabel={(option) => option.names[language] || option.names.en}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                renderOption={(props, option) => (
                  <Box component="li" {...props} sx={{display: 'flex', alignItems: 'center', gap: 1}}>
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
                }}
              />
              <TextField
                type="number"
                size="medium"
                value={Number(currentSkill.value).toString()}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  if (val >= 0 && val <= 3) {
                    onSkillChange(index, i, 'value', val);
                  }
                }}
                sx={{width: 45, '& .MuiOutlinedInput-root': {padding: '2px 4px'}}}
                slotProps={{input: {inputProps: {min: 1, max: 3, style: {padding: '2px 4px', height: 'auto'}}}}}
                disabled={!currentSkill.id}
              />
            </Box>
          );
        })}
      </Box>
      <Box sx={{display: 'flex', alignItems: 'center'}}>
        <FormControl
          size="small"
          sx={{
            '& .MuiOutlinedInput-root': {
              color: 'text.primary',
            },
          }}
        >
          <Select value={amulet.slots} onChange={(e) => onSlotChange(index, e.target.value)} displayEmpty
                  sx={{color: 'text.primary'}}>
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
      </Box>
      <IconButton size="small" onClick={() => onRemove(index)} sx={{
        color: 'text.secondary',
        position: 'absolute',
        right: '.5rem',
        top: '.25rem'
      }}>
        <CloseIcon fontSize="small" />
      </IconButton>
    </Box>
  );
}

export default AmuletBadge;

