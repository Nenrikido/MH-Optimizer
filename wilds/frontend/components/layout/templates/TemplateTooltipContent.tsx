import React from 'react';
import { Box, Typography } from '@mui/material';
import { TemplateData } from '../../../model/Template';
import { useI18n } from '../../../lib/i18nContext';
import { Icon, isSkillIconKey } from '../../../lib/icon';

interface TemplateTooltipContentProps {
  template: TemplateData;
}

function TemplateTooltipContent({ template }: TemplateTooltipContentProps) {
  const { language } = useI18n();

  return (
    <Box sx={{ maxWidth: 360 }}>
      {template.skills.length > 0 && (
        <Box sx={{ mb: 1 }}>
          <Typography sx={{ fontWeight: 600, fontSize: '0.8rem', mb: 0.25 }}>Skills:</Typography>
          {template.skills.map((skill, idx) => (
            <Box key={idx} sx={{ display: 'flex', alignItems: 'center', gap: 0.5, fontSize: '0.72rem' }}>
              {isSkillIconKey(skill.icon) && <Icon type="skills" iconKey={skill.icon} size={14} />}
              <span>{skill.names[language] || skill.names.en} ({skill.max_points}/{skill.weight})</span>
            </Box>
          ))}
        </Box>
      )}
      {template.sets.length > 0 && (
        <Box sx={{ mb: 1 }}>
          <Typography sx={{ fontWeight: 600, fontSize: '0.8rem', mb: 0.25 }}>Sets:</Typography>
          {template.sets.map((set, idx) => (
            <Typography key={idx} sx={{ fontSize: '0.72rem' }}>
              - {set.names[language] || set.names.en} ({set.min_pieces}p)
            </Typography>
          ))}
        </Box>
      )}
      {template.weapons.length > 0 && (
        <Box>
          <Typography sx={{ fontWeight: 600, fontSize: '0.8rem', mb: 0.25 }}>Weapons:</Typography>
          {template.weapons.map((weapon, idx) => (
            <Typography key={idx} sx={{ fontSize: '0.72rem' }}>
              - {weapon.names[language] || weapon.names.en}
            </Typography>
          ))}
        </Box>
      )}
      {template.skills.length === 0 && template.sets.length === 0 && template.weapons.length === 0 && (
        <Typography sx={{ fontSize: '0.72rem', fontStyle: 'italic' }}>Empty template</Typography>
      )}
    </Box>
  );
}

export default TemplateTooltipContent;

