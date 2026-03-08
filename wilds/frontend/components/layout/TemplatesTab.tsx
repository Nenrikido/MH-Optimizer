import React, { useState } from 'react';
import { Box, Typography, Button, Paper, TextField, IconButton, Tooltip } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { useI18n } from '../../lib/i18nContext';
import { TemplateData } from '../../model/Template';

interface TemplatesTabProps {
  defaultTemplates: TemplateData[];
  customTemplates: TemplateData[];
  onApplyTemplate: (template: TemplateData) => void;
  onSaveTemplate: (name: string) => void;
  onDeleteTemplate: (templateId: string) => void;
}

function TemplateCard({
  template,
  onApply,
  onDelete,
  canDelete,
  applyLabel,
  deleteLabel,
}: {
  template: TemplateData;
  onApply: (template: TemplateData) => void;
  onDelete?: (templateId: string) => void;
  canDelete?: boolean;
  applyLabel: string;
  deleteLabel: string;
}) {
  const { language } = useI18n();

  const tooltipContent = (
    <Box sx={{ maxWidth: 400 }}>
      {template.skills.length > 0 && (
        <Box sx={{ mb: 1 }}>
          <Typography sx={{ fontWeight: 600, fontSize: '0.85rem', mb: 0.5 }}>Skills:</Typography>
          {template.skills.map((skill, idx) => (
            <Typography key={idx} sx={{ fontSize: '0.75rem' }}>
              • {skill.names[language] || skill.names.en} ({skill.max_points}/{skill.weight})
            </Typography>
          ))}
        </Box>
      )}
      {template.sets.length > 0 && (
        <Box sx={{ mb: 1 }}>
          <Typography sx={{ fontWeight: 600, fontSize: '0.85rem', mb: 0.5 }}>Sets:</Typography>
          {template.sets.map((set, idx) => (
            <Typography key={idx} sx={{ fontSize: '0.75rem' }}>
              • {set.names[language] || set.names.en} ({set.min_pieces} pieces)
            </Typography>
          ))}
        </Box>
      )}
      {template.weapons.length > 0 && (
        <Box>
          <Typography sx={{ fontWeight: 600, fontSize: '0.85rem', mb: 0.5 }}>Weapons:</Typography>
          {template.weapons.map((weapon, idx) => (
            <Typography key={idx} sx={{ fontSize: '0.75rem' }}>
              • {weapon.names[language] || weapon.names.en}
            </Typography>
          ))}
        </Box>
      )}
      {template.skills.length === 0 && template.sets.length === 0 && template.weapons.length === 0 && (
        <Typography sx={{ fontSize: '0.75rem', fontStyle: 'italic' }}>Empty template</Typography>
      )}
    </Box>
  );

  return (
    <Paper sx={{ p: 1.25, mb: 1, backgroundColor: '#2c3034', border: '1px solid #495057' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, flexGrow: 1, overflow: 'hidden' }}>
          <Typography sx={{ color: '#adb5bd', fontWeight: 600 }}>{template.name}</Typography>
          <Tooltip title={tooltipContent} arrow placement="top">
            <IconButton size="small" sx={{ color: '#adb5bd', padding: '2px' }}>
              <InfoIcon sx={{ fontSize: '1rem' }} />
            </IconButton>
          </Tooltip>
          <Typography sx={{ color: '#6c757d', fontSize: '0.75rem', ml: 'auto', flexShrink: 0 }}>
            {template.skills.length}s / {template.sets.length}a / {template.weapons.length}w
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1, flexShrink: 0 }}>
          <Button
            size="small"
            onClick={() => onApply(template)}
            sx={{
              backgroundColor: '#495057',
              color: '#f8f9fa',
              border: 'none',
              '&:hover': {
                backgroundColor: '#5a6268',
              },
              textTransform: 'none',
              px: 1.5,
              py: 0.5,
            }}
          >
            {applyLabel}
          </Button>
          {canDelete && onDelete && (
            <Button
              size="small"
              onClick={() => onDelete(template.id)}
              sx={{
                backgroundColor: '#6c1c1c',
                color: '#f8f9fa',
                border: 'none',
                '&:hover': {
                  backgroundColor: '#8b2424',
                },
                textTransform: 'none',
                px: 1.5,
                py: 0.5,
              }}
            >
              {deleteLabel}
            </Button>
          )}
        </Box>
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
      <Typography variant="body1" sx={{ fontSize: '1.5rem', fontWeight: 600, mb: 1, color: '#adb5bd' }}>
        {t.tabs.templates}
      </Typography>

      <Typography sx={{ fontSize: '1rem', fontWeight: 600, mb: 1, color: '#adb5bd' }}>
        {t.templates.defaultTitle}
      </Typography>
      {defaultTemplates.map((template) => (
        <TemplateCard
          key={template.id}
          template={template}
          onApply={onApplyTemplate}
          applyLabel={t.templates.apply}
          deleteLabel={t.templates.delete}
        />
      ))}

      <Typography sx={{ fontSize: '1rem', fontWeight: 600, mt: 2, mb: 1, color: '#adb5bd' }}>
        {t.templates.customTitle}
      </Typography>
      <Box sx={{ display: 'flex', gap: 1, mb: 1.5 }}>
        <TextField
          size="small"
          fullWidth
          value={templateName}
          onChange={(e) => setTemplateName(e.target.value)}
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
          sx={{
            backgroundColor: '#495057',
            color: '#f8f9fa',
            border: 'none',
            '&:hover': {
              backgroundColor: '#5a6268',
            },
            textTransform: 'none',
            px: 2,
            whiteSpace: 'nowrap',
          }}
        >
          {t.templates.saveCurrent}
        </Button>
      </Box>

      {customTemplates.length === 0 ? (
        <Typography sx={{ fontSize: '0.85rem', color: '#adb5bd' }}>{t.templates.emptyCustom}</Typography>
      ) : (
        customTemplates.map((template) => (
          <TemplateCard
            key={template.id}
            template={template}
            onApply={onApplyTemplate}
            onDelete={onDeleteTemplate}
            canDelete
            applyLabel={t.templates.apply}
            deleteLabel={t.templates.delete}
          />
        ))
      )}
    </Box>
  );
}

export default TemplatesTab;
