/**
 * Custom hook for managing template operations.
 * Handles loading, saving, applying, and deleting custom templates with localStorage persistence.
 *
 * @param getCurrentConfig - Function that returns the current application configuration
 * @param applyConfig - Function that applies a configuration to the application state
 * @returns Object containing custom templates array and management functions
 */

import { useState, useEffect } from 'react';
import { TemplateData } from '../model/Template';
import { loadCustomTemplates, saveCustomTemplates } from '../lib/configStorage';
import { cloneTemplate, createTemplate, TemplateConfig } from '../lib/templateUtils';

interface UseTemplatesResult {
  customTemplates: TemplateData[];
  applyTemplate: (template: TemplateData) => void;
  saveTemplate: (name: string) => void;
  deleteTemplate: (templateId: string) => void;
}

export function useTemplates(
  getCurrentConfig: () => TemplateConfig,
  applyConfig: (config: TemplateConfig) => void
): UseTemplatesResult {
  const [customTemplates, setCustomTemplates] = useState<TemplateData[]>([]);

  useEffect(() => {
    setCustomTemplates(loadCustomTemplates());
  }, []);

  /**
   * Applies a template to the current configuration.
   * Deep clones the template data before applying to prevent mutations.
   */
  const applyTemplate = (template: TemplateData) => {
    const cloned = cloneTemplate(template);
    applyConfig(cloned);
  };

  /**
   * Saves the current configuration as a new custom template.
   * Generates a unique ID and persists to localStorage.
   */
  const saveTemplate = (name: string) => {
    const trimmedName = name.trim();
    if (!trimmedName) return;

    const template = createTemplate(trimmedName, getCurrentConfig());
    const nextTemplates = [...customTemplates, template];
    setCustomTemplates(nextTemplates);
    saveCustomTemplates(nextTemplates);
  };

  /**
   * Deletes a custom template by ID.
   * Updates state and persists changes to localStorage.
   */
  const deleteTemplate = (templateId: string) => {
    const nextTemplates = customTemplates.filter((template) => template.id !== templateId);
    setCustomTemplates(nextTemplates);
    saveCustomTemplates(nextTemplates);
  };

  return {
    customTemplates,
    applyTemplate,
    saveTemplate,
    deleteTemplate,
  };
}
