import React from 'react';
import { Button, IconButton, Paper, Tooltip, Typography, Box } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import DeleteIcon from '@mui/icons-material/Delete';
import { TemplateData } from '../../../model/Template';
import { GearIconKey, Icon, isGearIconKey } from '../../../lib/icon';
import TemplateTooltipContent from './TemplateTooltipContent';

interface CustomTemplateRowProps {
  template: TemplateData;
  onApply: (template: TemplateData) => void;
  onDelete: (templateId: string) => void;
  applyLabel: string;
}

function CustomTemplateRow({ template, onApply, onDelete, applyLabel }: CustomTemplateRowProps) {
  const gearKey = template.weapons[0]?.gear_key;

  return (
    <Paper sx={{ px: 1, py: 0.75, mb: 0.75, backgroundColor: 'action.selected', border: '1px solid', borderColor: 'divider' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
        {isGearIconKey(gearKey) && <Icon type="gear" iconKey={gearKey as GearIconKey} size={18} />}
        <Typography sx={{ color: 'text.primary', fontWeight: 600, fontSize: '0.85rem', flexGrow: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {template.name}
        </Typography>
        <Tooltip title={<TemplateTooltipContent template={template} />} arrow placement="top">
          <IconButton size="small" sx={{ color: 'text.secondary', p: '2px' }}>
            <InfoIcon sx={{ fontSize: '0.95rem' }} />
          </IconButton>
        </Tooltip>
        <Button
          size="small"
          onClick={() => onApply(template)}
          sx={{
            backgroundColor: 'background.paper',
            color: 'text.primary',
            textTransform: 'none',
            px: 1,
            py: 0.25,
            minWidth: 0,
            fontSize: '0.75rem',
            '&:hover': { backgroundColor: 'action.hover' },
          }}
        >
          {applyLabel}
        </Button>
        <IconButton
          size="small"
          onClick={() => onDelete(template.id)}
          sx={{ color: '#842029', p: '2px', '&:hover': { color: '#dc3545' } }}
        >
          <DeleteIcon sx={{ fontSize: '0.95rem' }} />
        </IconButton>
      </Box>
    </Paper>
  );
}

export default CustomTemplateRow;

