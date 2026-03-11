import React from 'react';
import { Box, Typography } from '@mui/material';
import { TemplateData, getTemplateName } from '../../../model/Template';
import { useI18n } from '../../../lib/i18nContext';
import {Icon, isGearIconKey, isSkillIconKey} from '../../../lib/icon';

interface TemplateTooltipContentProps {
  template: TemplateData;
}

function TemplateTooltipContent({ template }: TemplateTooltipContentProps) {
  const { t, language } = useI18n();
  const displayName = getTemplateName(template, t);

  return (
    <Box sx={{ maxWidth: 360 }}>
      <Typography sx={{ fontWeight: 700, fontSize: '0.85rem', mb: 0.75 }}>{displayName}</Typography>
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
              {isSkillIconKey(set.icon) && <Icon type="skills" iconKey={set.icon} size={14} />}
              {set.names[language] || set.names.en} ({set.min_pieces}p)
            </Typography>
          ))}
        </Box>
      )}
      {template.weapons.length > 0 && (
        <Box>
          <Typography sx={{ fontWeight: 600, fontSize: '0.8rem', mb: 0.25 }}>Weapons:</Typography>
          {template.weapons.map((weapon, idx) => (
            <Typography key={idx} sx={{ fontSize: '0.72rem' }}>
              {isGearIconKey(weapon.gear_key) && <Icon type="gear" iconKey={weapon.gear_key} size={14} />}
              {weapon.names[language] || weapon.names.en}
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

