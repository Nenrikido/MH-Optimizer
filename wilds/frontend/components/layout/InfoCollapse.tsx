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
          <Typography>How to use :</Typography>
          <ul>
            <li>Type your desired skills, sets and weapons in the input boxes (autocomplete available)</li>
            <li>Choose your max amount of skill points and the weight of each skill, and the min amount of pieces from
              each set
            </li>
            <li>In the "Filters" tab, you can choose the amulets you have in your box</li>
            <li>Click on "Optimize" and wait for the results</li>
          </ul>
          <Typography>Notes :</Typography>
          <ul>
            <li>Data is up to date with TU4.1 (AT Arkveld)</li>
            <li>Yes the default values are for LS, yes i'm a weeb</li>
          </ul>
          <Typography>Features to come :</Typography>
          <ul>
            <li>Skill & set templates</li>
            <li>Armor pieces filters</li>
            <li>Better design (I suck at design sry)</li>
          </ul>
        </AccordionDetails>
      </Accordion>
  );
}

export default InfoCollapse;
