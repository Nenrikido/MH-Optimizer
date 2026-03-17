import React from 'react';
import { Box, Typography } from '@mui/material';
import DefaultTemplateIcon from './DefaultTemplateIcon';
import { DefaultTemplatesSectionProps } from './types';

function DefaultTemplatesSection({ title, templates, onApplyTemplate }: DefaultTemplatesSectionProps) {
  return (
    <>
      <Typography sx={{ fontSize: '1rem', fontWeight: 600, mb: 1, color: 'text.primary' }}>
        {title}
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2.5 }}>
        {templates.map((template) => (
          <DefaultTemplateIcon key={template.id} template={template} onApply={onApplyTemplate} />
        ))}
      </Box>
    </>
  );
}

export default DefaultTemplatesSection;

