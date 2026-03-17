import React, {useState} from 'react';
import {Box, Tab, Tabs} from '@mui/material';
import ResultsTab from './ResultsTab';
import FiltersTab from './FiltersTab';
import TemplatesTab from './TemplatesTab';
import { useI18n } from '../../lib/i18nContext';

function TabPanel(props: { children?: React.ReactNode; index: number; value: number }) {
  const {children, value, index, ...other} = props;

  return (
      <div
          role="tabpanel"
          hidden={value !== index}
          id={`simple-tabpanel-${index}`}
          aria-labelledby={`simple-tab-${index}`}
          style={{height: '100%', overflow: 'hidden'}}
          {...other}
      >
        {value === index && (
            <Box
                sx={{
                  p: 3,
                  height: '100%',
                  overflowY: 'auto',
                  overflowX: 'hidden'
                }}
            >
              {children}
            </Box>
        )}
      </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function TabsComponent() {
  const [value, setValue] = useState(0);
  const { t } = useI18n();

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
      <Box sx={{
        width: {xs: '100%', lg: '45%'},
        minWidth: {xs: '100%', lg: '45vw'},
        maxWidth: {xs: '100%', lg: '45vw'},
        height: {xs: 'auto', lg: 'calc(100vh - 75px)'},
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        p: 3
      }}>
        <Box sx={{borderBottom: 0, borderColor: 'divider', flexShrink: 0}}>
          <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
              slotProps={{
                indicator: {
                  style: {display: 'none'}
                }
              }}
          >
            <Tab
                label={t.tabs.results}
                {...a11yProps(0)}
                sx={{
                  border: '2px solid transparent',
                  borderBottom: '2px solid transparent',
                  '&.Mui-selected': {
                    color: '#f8f9fa',
                    border: '1px solid rgb(255, 255, 255, 0.15)',
                    borderBottomColor: '#343a40',
                    borderRadius: '10px 10px 0 0',
                    mb: '-1px',
                    zIndex: 1,
                    backgroundColor: '#343a40',
                  },
                }}
            />
            <Tab
                label={t.tabs.filters}
                {...a11yProps(1)}
                sx={{
                  border: '2px solid transparent',
                  borderBottom: '2px solid transparent',
                  '&.Mui-selected': {
                    color: '#f8f9fa',
                    border: '1px solid rgb(255, 255, 255, 0.15)',
                    borderBottomColor: '#343a40',
                    borderRadius: '10px 10px 0 0',
                    mb: '-1px',
                    zIndex: 1,
                    backgroundColor: '#343a40',
                  },
                }}
            />
            <Tab
                label={t.tabs.templates}
                {...a11yProps(2)}
                sx={{
                  border: '2px solid transparent',
                  borderBottom: '2px solid transparent',
                  '&.Mui-selected': {
                    color: '#f8f9fa',
                    border: '1px solid rgb(255, 255, 255, 0.15)',
                    borderBottomColor: '#343a40',
                    borderRadius: '10px 10px 0 0',
                    mb: '-1px',
                    zIndex: 1,
                    backgroundColor: '#343a40',
                  },
                }}
            />
          </Tabs>
        </Box>
        <Box sx={{flexGrow: 1, overflow: 'hidden', minHeight: 0, border: '1px solid rgb(255, 255, 255, 0.15)', borderTop: '1px solid rgb(255, 255, 255, 0.15)', borderRadius: '0 0 10px 10px', mt: '-1px', backgroundColor: '#343a40'}}>
          <TabPanel value={value} index={0}>
            <ResultsTab />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <FiltersTab />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <TemplatesTab />
          </TabPanel>
        </Box>
      </Box>
  );
}

export default TabsComponent;
