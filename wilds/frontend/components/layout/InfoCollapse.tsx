import React from 'react';
import {Accordion, AccordionDetails, AccordionSummary, Typography} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useI18n } from '../../lib/i18nContext';

function InfoCollapse() {
  const { t } = useI18n();

  return (
      <Accordion>
        <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="info-content"
            id="info-header"
        >
          <Typography>ⓘ {t.info.help}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{t.info.howToUse}</Typography>
          <ul>
            <li>{t.info.howToUseSteps.step1}</li>
            <li>{t.info.howToUseSteps.step2}</li>
            <li>{t.info.howToUseSteps.step3}</li>
            <li>{t.info.howToUseSteps.step4}</li>
          </ul>
          <Typography>{t.info.notes}</Typography>
          <ul>
            <li>{t.info.notesItems.dataUpToDate}</li>
            <li>{t.info.notesItems.defaultValues}</li>
            <li>{t.info.notesItems.noBuild}</li>
            <li>{t.info.notesItems.gogFilters}</li>
            <li>{t.info.notesItems.customTemplates}</li>
          </ul>
        </AccordionDetails>
      </Accordion>
  );
}

export default InfoCollapse;
