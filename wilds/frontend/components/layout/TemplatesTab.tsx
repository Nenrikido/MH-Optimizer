import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useI18n } from '../../lib/i18nContext';
import DefaultTemplatesSection from './templates/DefaultTemplatesSection';
import CustomTemplatesSection from './templates/CustomTemplatesSection';
import { useAppState } from '../../lib/appStateContext';

function TemplatesTab() {
  const { t } = useI18n();
  const [templateName, setTemplateName] = useState('');
  const {
    defaultTemplates,
    customTemplates,
    applyTemplate,
    saveTemplate,
    deleteTemplate,
  } = useAppState();

  const handleSave = () => {
    if (!templateName.trim()) return;
    saveTemplate(templateName);
    setTemplateName('');
  };

  return (
    <Box>
      <Typography variant="body1" sx={{ fontSize: '1.5rem', fontWeight: 600, mb: 1.5, color: '#adb5bd' }}>
        {t.tabs.templates}
      </Typography>

      <DefaultTemplatesSection
        title={t.templates.defaultTitle}
        templates={defaultTemplates}
        onApplyTemplate={applyTemplate}
      />

      <CustomTemplatesSection
        title={t.templates.customTitle}
        templates={customTemplates}
        templateName={templateName}
        onTemplateNameChange={setTemplateName}
        onSaveTemplate={handleSave}
        onApplyTemplate={applyTemplate}
        onDeleteTemplate={deleteTemplate}
        labels={{
          apply: t.templates.apply,
          saveCurrent: t.templates.saveCurrent,
          namePlaceholder: t.templates.namePlaceholder,
          emptyCustom: t.templates.emptyCustom,
        }}
      />
    </Box>
  );
}

export default TemplatesTab;
