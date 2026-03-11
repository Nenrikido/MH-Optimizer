import { TemplateData } from '../../../model/Template';

export interface TemplateActionLabels {
  apply: string;
  saveCurrent: string;
  namePlaceholder: string;
  emptyCustom: string;
}

export interface DefaultTemplatesSectionProps {
  title: string;
  templates: TemplateData[];
  onApplyTemplate: (template: TemplateData) => void;
}

export interface CustomTemplatesSectionProps {
  title: string;
  templates: TemplateData[];
  templateName: string;
  onTemplateNameChange: (value: string) => void;
  onSaveTemplate: () => void;
  onApplyTemplate: (template: TemplateData) => void;
  onDeleteTemplate: (templateId: string) => void;
  labels: TemplateActionLabels;
}

