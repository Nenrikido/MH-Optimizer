import React, {useState} from 'react';
import {Box, Tab, Tabs} from '@mui/material';
import ResultsTab from './ResultsTab';
import FiltersTab from './FiltersTab';
import TemplatesTab from './TemplatesTab';
import {useI18n} from '../../lib/i18nContext';

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
  const {t} = useI18n();

  const tabSx = {
    color: 'text.secondary',
    border: '1px solid transparent',
    borderBottom: '1px solid transparent',
    minHeight: 40,
    px: 2,
    '&.Mui-selected': {
      color: 'text.primary',
      borderColor: 'divider',
      borderBottomColor: 'background.paper',
      borderRadius: '10px 10px 0 0',
      mb: '-1px',
      zIndex: 1,
      backgroundColor: 'background.paper',
    },
  } as const;

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
          slotProps={{
            list: {
              style: {height: '100%'}
            },
            indicator: {
              style: {display: 'none'}
            }
          }}
        >
          <Tab
            label={t.tabs.results}
            {...a11yProps(0)}
            sx={tabSx}
          />
          <Tab
            label={t.tabs.filters}
            {...a11yProps(1)}
            sx={tabSx}
          />
          <Tab
            label={t.tabs.templates}
            {...a11yProps(2)}
            sx={tabSx}
          />
        </Tabs>
      </Box>
      <Box sx={{
        flexGrow: 1,
        overflow: 'hidden',
        minHeight: 0,
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: '0 10px 10px 10px',
        mt: '-1px',
        backgroundColor: 'background.paper'
      }}>
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
