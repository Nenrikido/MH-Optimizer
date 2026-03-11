import React, { useState } from 'react';
import { Box, Typography, Button, Paper, TextField, IconButton, Tooltip } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import DeleteIcon from '@mui/icons-material/Delete';
import { useI18n } from '../../lib/i18nContext';
import { TemplateData } from '../../model/Template';
import { GearIconKey, Icon, isGearIconKey, isSkillIconKey } from '../../lib/icon';

interface TemplatesTabProps {
  defaultTemplates: TemplateData[];
  customTemplates: TemplateData[];
  onApplyTemplate: (template: TemplateData) => void;
  onSaveTemplate: (name: string) => void;
  onDeleteTemplate: (templateId: string) => void;
}

/** Tooltip body shared by both default and custom template cards */
function TemplateTooltipContent({ template }: { template: TemplateData }) {
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
              • {set.names[language] || set.names.en} ({set.min_pieces}p)
            </Typography>
          ))}
        </Box>
      )}
      {template.weapons.length > 0 && (
        <Box>
          <Typography sx={{ fontWeight: 600, fontSize: '0.8rem', mb: 0.25 }}>Weapons:</Typography>
          {template.weapons.map((weapon, idx) => (
            <Typography key={idx} sx={{ fontSize: '0.72rem' }}>
              • {weapon.names[language] || weapon.names.en}
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

/** Single compact icon badge used in the default templates grid */
function DefaultTemplateIcon({
  template,
  onApply,
}: {
  template: TemplateData;
  onApply: (t: TemplateData) => void;
}) {
  const firstWeapon = template.weapons[0];
  const gearKey = firstWeapon?.gear_key;

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
          : <Typography sx={{ fontSize: '0.65rem', color: '#adb5bd', textAlign: 'center', lineHeight: 1.2 }}>{template.name}</Typography>
        }
        <Typography sx={{ fontSize: '0.6rem', color: '#6c757d', textAlign: 'center', lineHeight: 1.1, maxWidth: 60, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {template.name}
        </Typography>
      </Box>
    </Tooltip>
  );
}

/** Compact list row for custom templates */
function CustomTemplateRow({
  template,
  onApply,
  onDelete,
  applyLabel,
}: {
  template: TemplateData;
  onApply: (t: TemplateData) => void;
  onDelete: (id: string) => void;
  applyLabel: string;
}) {
  const firstWeapon = template.weapons[0];
  const gearKey = firstWeapon?.gear_key;

  return (
    <Paper sx={{ px: 1, py: 0.75, mb: 0.75, backgroundColor: '#2c3034', border: '1px solid #495057' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
        {isGearIconKey(gearKey) && <Icon type="gear" iconKey={gearKey as GearIconKey} size={18} />}
        <Typography sx={{ color: '#adb5bd', fontWeight: 600, fontSize: '0.85rem', flexGrow: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {template.name}
        </Typography>
        <Tooltip title={<TemplateTooltipContent template={template} />} arrow placement="top">
          <IconButton size="small" sx={{ color: '#6c757d', p: '2px' }}>
            <InfoIcon sx={{ fontSize: '0.95rem' }} />
          </IconButton>
        </Tooltip>
        <Button
          size="small"
          onClick={() => onApply(template)}
          sx={{ backgroundColor: '#495057', color: '#f8f9fa', textTransform: 'none', px: 1, py: 0.25, minWidth: 0, fontSize: '0.75rem', '&:hover': { backgroundColor: '#5a6268' } }}
        >
          {applyLabel}
        </Button>
        <IconButton size="small" onClick={() => onDelete(template.id)} sx={{ color: '#842029', p: '2px', '&:hover': { color: '#dc3545' } }}>
          <DeleteIcon sx={{ fontSize: '0.95rem' }} />
        </IconButton>
      </Box>
    </Paper>
  );
}

function TemplatesTab({
  defaultTemplates,
  customTemplates,
  onApplyTemplate,
  onSaveTemplate,
  onDeleteTemplate,
}: TemplatesTabProps) {
  const { t } = useI18n();
  const [templateName, setTemplateName] = useState('');

  const handleSave = () => {
    if (!templateName.trim()) return;
    onSaveTemplate(templateName);
    setTemplateName('');
  };

  return (
    <Box>
      <Typography variant="body1" sx={{ fontSize: '1.5rem', fontWeight: 600, mb: 1.5, color: '#adb5bd' }}>
        {t.tabs.templates}
      </Typography>

      {/* Default templates — compact icon grid */}
      <Typography sx={{ fontSize: '1rem', fontWeight: 600, mb: 1, color: '#adb5bd' }}>
        {t.templates.defaultTitle}
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2.5 }}>
        {defaultTemplates.map((template) => (
          <DefaultTemplateIcon key={template.id} template={template} onApply={onApplyTemplate} />
        ))}
      </Box>

      {/* Custom templates */}
      <Typography sx={{ fontSize: '1rem', fontWeight: 600, mb: 1, color: '#adb5bd' }}>
        {t.templates.customTitle}
      </Typography>
      <Box sx={{ display: 'flex', gap: 1, mb: 1.5 }}>
        <TextField
          size="small"
          fullWidth
          value={templateName}
          onChange={(e) => setTemplateName(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSave()}
          placeholder={t.templates.namePlaceholder}
          sx={{
            '& .MuiOutlinedInput-root': {
              backgroundColor: '#2c3034',
              '& fieldset': { borderColor: '#495057' },
              '&:hover fieldset': { borderColor: '#6c757d' },
              '&.Mui-focused fieldset': { borderColor: '#adb5bd' },
            },
          }}
        />
        <Button
          onClick={handleSave}
          sx={{ backgroundColor: '#495057', color: '#f8f9fa', textTransform: 'none', px: 2, whiteSpace: 'nowrap', '&:hover': { backgroundColor: '#5a6268' } }}
        >
          {t.templates.saveCurrent}
        </Button>
      </Box>

      {customTemplates.length === 0 ? (
        <Typography sx={{ fontSize: '0.85rem', color: '#6c757d' }}>{t.templates.emptyCustom}</Typography>
      ) : (
        customTemplates.map((template) => (
          <CustomTemplateRow
            key={template.id}
            template={template}
            onApply={onApplyTemplate}
            onDelete={onDeleteTemplate}
            applyLabel={t.templates.apply}
          />
        ))
      )}
    </Box>
  );
}

export default TemplatesTab;
