import React from 'react';
import {Box, IconButton, TextField} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import {Skill} from '../../model/Skill';
import {Set as ArmorSet} from '../../model/Set';
import {Weapon} from '../../model/Weapon';

interface BadgeListProps {
  items: (Skill | ArmorSet | Weapon)[];
  setItems: (items: (Skill | ArmorSet | Weapon)[]) => void;
  type: 'skills' | 'sets' | 'weapons';
}

// Displays a list of badges (skills, sets, weapons)
function BadgeList({items, setItems, type}: BadgeListProps) {
  const handleRemove = (item: Skill | ArmorSet | Weapon) => {
    setItems(items.filter(i => i !== item));
  };

  const handleUpdateSkill = (index: number, field: 'max_points' | 'weight', value: number) => {
    const newItems = [...items];
    (newItems[index] as Skill)[field] = value;
    setItems(newItems);
  };

  const handleUpdateSet = (index: number, value: number) => {
    const newItems = [...items];
    (newItems[index] as ArmorSet).min_pieces = value;
    setItems(newItems);
  };

  return (
      <Box sx={{mb: 2, display: 'flex', flexWrap: 'wrap', gap: 1}}>
        {items.map((item, idx) => (
            <Box
                key={item.name}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  bgcolor: '#495057',
                  border: '1px solid #6c757d',
                  borderRadius: 1,
                  px: 1,
                  py: 0.5,
                  minWidth: 'calc(25% - 6px)',
                  maxWidth: 'calc(25% - 6px)',
                }}
            >
              <Box sx={{flexGrow: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: '#f8f9fa', mr: 0.5}}>{item.name}</Box>
              <Box sx={{display: 'flex', alignItems: 'center', gap: 0.5, flexShrink: 0}}>
                {type === 'skills' && (
                    <>
                      <TextField
                          type="number"
                          size="small"
                          value={(item as Skill).max_points}
                          onChange={(e) => handleUpdateSkill(idx, 'max_points', parseInt(e.target.value) || 0)}
                          sx={{width: 45, '& .MuiOutlinedInput-root': {color: '#f8f9fa', '& fieldset': {borderColor: '#6c757d'}, '&:hover fieldset': {borderColor: '#adb5bd'}, padding: '2px 4px'}}}
                          slotProps={{input: {inputProps: {min: 1, max: 10, style: {padding: '2px 4px', height: 'auto'}}}}}
                      />
                      <TextField
                          type="number"
                          size="small"
                          value={(item as Skill).weight}
                          onChange={(e) => handleUpdateSkill(idx, 'weight', parseInt(e.target.value) || 0)}
                          sx={{width: 45, '& .MuiOutlinedInput-root': {color: '#f8f9fa', '& fieldset': {borderColor: '#6c757d'}, '&:hover fieldset': {borderColor: '#adb5bd'}, padding: '2px 4px'}}}
                          slotProps={{input: {inputProps: {min: 1, style: {padding: '2px 4px', height: 'auto'}}}}}
                      />
                    </>
                )}
                {type === 'sets' && (
                    <TextField
                        type="number"
                        size="small"
                        value={(item as ArmorSet).min_pieces}
                        onChange={(e) => handleUpdateSet(idx, parseInt(e.target.value) || 0)}
                        sx={{width: 45, '& .MuiOutlinedInput-root': {color: '#f8f9fa', '& fieldset': {borderColor: '#6c757d'}, '&:hover fieldset': {borderColor: '#adb5bd'}, padding: '2px 4px'}}}
                        slotProps={{input: {inputProps: {min: 1, style: {padding: '2px 4px', height: 'auto'}}}}}
                    />
                )}
                <IconButton size="small" onClick={() => handleRemove(item)} sx={{color: '#adb5bd', padding: '2px'}}>
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Box>
            </Box>
        ))}
      </Box>
  );
}

export default BadgeList;
