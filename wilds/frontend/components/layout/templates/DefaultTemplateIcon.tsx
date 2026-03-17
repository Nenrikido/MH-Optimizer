import React from 'react';
import { Box, Tooltip, Typography } from '@mui/material';
import { TemplateData, getTemplateName } from '../../../model/Template';
import { GearIconKey, Icon, isGearIconKey } from '../../../lib/icon';
import { useI18n } from '../../../lib/i18nContext';
import TemplateTooltipContent from './TemplateTooltipContent';

interface DefaultTemplateIconProps {
  template: TemplateData;
  onApply: (template: TemplateData) => void;
}

function DefaultTemplateIcon({ template, onApply }: DefaultTemplateIconProps) {
  const { t } = useI18n();
  const gearKey = template.weapons[0]?.gear_key;
  const displayName = getTemplateName(template, t);

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
          minWidth: {xs: 'calc(100% / 3 - 48px / 3)', sm: 'calc(100% / 5 - 48px / 5)', md: 'calc(100% / 7 - 48px / 7)'},
          maxWidth: {xs: 'calc(100% / 3 - 48px / 3)', sm: 'calc(100% / 5 - 48px / 5)', md: 'calc(100% / 7 - 48px / 7)'},
          backgroundColor: 'action.selected',
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 1,
          cursor: 'pointer',
          userSelect: 'none',
          '&:hover': {
            backgroundColor: 'action.hover',
            borderColor: 'text.secondary',
          },
          '&:active': {
            backgroundColor: 'action.selected',
          },
        }}
      >
        {isGearIconKey(gearKey)
          ? <Icon type="gear" iconKey={gearKey as GearIconKey} size={32} />
          : <Typography sx={{ fontSize: '0.65rem', color: 'text.primary', textAlign: 'center', lineHeight: 1.2 }}>{displayName}</Typography>}
        <Typography sx={{ fontSize: '0.6rem', color: 'text.secondary', textAlign: 'center', lineHeight: 1.1, maxWidth: 60, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {displayName}
        </Typography>
      </Box>
    </Tooltip>
  );
}

export default DefaultTemplateIcon;

