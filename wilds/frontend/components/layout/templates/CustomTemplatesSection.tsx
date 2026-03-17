import React from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import CustomTemplateRow from './CustomTemplateRow';
import { CustomTemplatesSectionProps } from './types';

function CustomTemplatesSection({
  title,
  templates,
  templateName,
  onTemplateNameChange,
  onSaveTemplate,
  onApplyTemplate,
  onDeleteTemplate,
  labels,
}: CustomTemplatesSectionProps) {
  return (
    <>
      <Typography sx={{ fontSize: '1rem', fontWeight: 600, mb: 1, color: 'text.primary' }}>
        {title}
      </Typography>
      <Box sx={{ display: 'flex', gap: 1, mb: 1.5 }}>
        <TextField
          size="small"
          fullWidth
          value={templateName}
          onChange={(e) => onTemplateNameChange(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && onSaveTemplate()}
          placeholder={labels.namePlaceholder}
        />
        <Button
          onClick={onSaveTemplate}
          sx={{
            backgroundColor: 'action.selected',
            color: 'text.primary',
            textTransform: 'none',
            px: 2,
            whiteSpace: 'nowrap',
            '&:hover': { backgroundColor: 'action.hover' },
          }}
        >
          {labels.saveCurrent}
        </Button>
      </Box>

      {templates.length === 0 ? (
        <Typography sx={{ fontSize: '0.85rem', color: 'text.secondary' }}>{labels.emptyCustom}</Typography>
      ) : (
        templates.map((template) => (
          <CustomTemplateRow
            key={template.id}
            template={template}
            onApply={onApplyTemplate}
            onDelete={onDeleteTemplate}
            applyLabel={labels.apply}
          />
        ))
      )}
    </>
  );
}

export default CustomTemplatesSection;

