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
      <Typography sx={{ fontSize: '1rem', fontWeight: 600, mb: 1, color: '#adb5bd' }}>
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
          onClick={onSaveTemplate}
          sx={{
            backgroundColor: '#495057',
            color: '#f8f9fa',
            textTransform: 'none',
            px: 2,
            whiteSpace: 'nowrap',
            '&:hover': { backgroundColor: '#5a6268' },
          }}
        >
          {labels.saveCurrent}
        </Button>
      </Box>

      {templates.length === 0 ? (
        <Typography sx={{ fontSize: '0.85rem', color: '#6c757d' }}>{labels.emptyCustom}</Typography>
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

