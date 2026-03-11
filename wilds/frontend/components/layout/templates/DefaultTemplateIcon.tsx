import React from 'react';
import { Box, Tooltip, Typography } from '@mui/material';
import { TemplateData } from '../../../model/Template';
import { GearIconKey, Icon, isGearIconKey } from '../../../lib/icon';
import TemplateTooltipContent from './TemplateTooltipContent';

interface DefaultTemplateIconProps {
  template: TemplateData;
  onApply: (template: TemplateData) => void;
}

function DefaultTemplateIcon({ template, onApply }: DefaultTemplateIconProps) {
  const gearKey = template.weapons[0]?.gear_key;

  return (
    <Tooltip title={<TemplateTooltipContent template={template} />} arrow placement="top">
      <Box
        onClick={() => onApply(template)}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 0.5,
          p: 1,
          width: 64,
          height: 72,
          backgroundColor: '#2c3034',
          border: '1px solid #495057',
          borderRadius: 1,
          cursor: 'pointer',
          userSelect: 'none',
          '&:hover': {
            backgroundColor: '#3a4045',
            borderColor: '#6c757d',
          },
          '&:active': {
            backgroundColor: '#495057',
          },
        }}
      >
        {isGearIconKey(gearKey)
          ? <Icon type="gear" iconKey={gearKey as GearIconKey} size={32} />
          : <Typography sx={{ fontSize: '0.65rem', color: '#adb5bd', textAlign: 'center', lineHeight: 1.2 }}>{template.name}</Typography>}
        <Typography sx={{ fontSize: '0.6rem', color: '#6c757d', textAlign: 'center', lineHeight: 1.1, maxWidth: 60, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {template.name}
        </Typography>
      </Box>
    </Tooltip>
  );
}

export default DefaultTemplateIcon;

