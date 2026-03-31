import React, {ChangeEvent, RefObject, useRef} from 'react';
import {Box, Button, styled, Typography} from '@mui/material';
import {useI18n} from '../../../../lib/i18n/i18nContext';
import {AmuletsSectionProps} from '../types';
import AmuletBadgeList from './AmuletBadgeList';
import { FileUpload } from "@mui/icons-material";
import {parseGameCatAmulets} from '../../../../lib/amuletsImport';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

function AmuletsSection({amulets, setAmulets, availableSkills}: AmuletsSectionProps) {
  const {t} = useI18n();
  const amuletsImportRef: RefObject<HTMLInputElement | null> = useRef(null);

  const handleAddAmulet = () => {
    setAmulets((prev) => ([
      ...prev,
      {name: 'Custom Amulet', skills: [{value: 0}, {value: 0}, {value: 0}], slots: ''},
    ]));
  };

  const handleImportAmulets = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const textContent = typeof reader.result === 'string' ? reader.result : '';
          const parsed: unknown = JSON.parse(textContent);
          if (!Array.isArray(parsed)) {
            console.warn('Unsupported amulets import format: expected a JSON array.');
            return;
          }

          const importedAmulets = parseGameCatAmulets(parsed, availableSkills);

          if (importedAmulets.length > 0) {
            setAmulets(importedAmulets);
          } else {
            console.warn('No valid amulets found in imported JSON.');
          }
        } catch (error) {
          console.error('Failed to import amulets JSON file.', error);
        }
      };
      reader.readAsText(file);
    }

    // reset file input
    if (amuletsImportRef.current?.files)
      amuletsImportRef.current.value = "";
  };

  return (
    <Box>
      <Typography variant="body1" sx={{fontSize: '1rem', fontWeight: 600, mb: 1.5, color: 'text.primary'}}>
        {t.filters.amulets.title}
      </Typography>
      <AmuletBadgeList amulets={amulets} setAmulets={setAmulets} availableSkills={availableSkills} />
      <Button variant="contained" color="secondary" onClick={handleAddAmulet} sx={{mt: 1}}>
        + {t.filters.amulets.addAmulet}
      </Button>
      <Button
        component="label"
        variant="contained"
        color="primary"
        startIcon={<FileUpload />}
        sx={{ml: 1, mt: 1}}>
        {t.filters.amulets.importAmulets}
        <VisuallyHiddenInput
          type="file"
          ref={amuletsImportRef}
          onChange={handleImportAmulets}
          multiple
        />
      </Button>
    </Box>
  );
}

export default AmuletsSection;

