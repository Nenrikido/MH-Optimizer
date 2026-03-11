import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useI18n } from '../../lib/i18nContext';
import { TemplateData } from '../../model/Template';
import DefaultTemplatesSection from './templates/DefaultTemplatesSection';
import CustomTemplatesSection from './templates/CustomTemplatesSection';

interface TemplatesTabProps {
  defaultTemplates: TemplateData[];
  customTemplates: TemplateData[];
  onApplyTemplate: (template: TemplateData) => void;
  onSaveTemplate: (name: string) => void;
  onDeleteTemplate: (templateId: string) => void;
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

      <DefaultTemplatesSection
        title={t.templates.defaultTitle}
        templates={defaultTemplates}
        onApplyTemplate={onApplyTemplate}
      />

      <CustomTemplatesSection
        title={t.templates.customTitle}
        templates={customTemplates}
        templateName={templateName}
        onTemplateNameChange={setTemplateName}
        onSaveTemplate={handleSave}
        onApplyTemplate={onApplyTemplate}
        onDeleteTemplate={onDeleteTemplate}
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
