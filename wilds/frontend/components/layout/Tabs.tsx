import React, {useState} from 'react';
import {Box, Tab, Tabs, Typography} from '@mui/material';
import ResultsTab from './ResultsTab';
import AmuletBadgeList from '../blocks/AmuletBadgeList';
import AddAmuletButton from '../blocks/AddAmuletButton';
import TemplatesTab from './TemplatesTab';
import {Result} from '../../model/Result';
import {Amulet} from '../../model/Amulet';
import { NamedEntity } from '../../model/Localized';
import { useI18n } from '../../lib/i18nContext';

interface TabsProps {
  results: Result[] | string[];
  amulets: Amulet[];
  setAmulets: (amulets: Amulet[]) => void;
  availableSkills: NamedEntity[];
  loading: boolean;
}

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

function TabsComponent({results, amulets, setAmulets, availableSkills, loading}: TabsProps) {
  const [value, setValue] = useState(0);
  const { t } = useI18n();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleAddAmulet = () => {
    setAmulets([
      ...amulets,
      {name: '', skills: [], slots: ''}
    ]);
  };

  return (
      <Box sx={{
        width: {xs: '100%', lg: '40%'},
        minWidth: {xs: '100%', lg: '40vw'},
        maxWidth: {xs: '100%', lg: '40vw'},
        height: {xs: '600px', lg: 'calc(100vh - 75px)'},
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
                disabled
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
            <ResultsTab results={results} loading={loading} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Typography variant="body1"
                        sx={{fontSize: '1.5rem', fontWeight: 600, mb: 1, color: '#adb5bd'}}>{t.tabs.filters}</Typography>
            <AmuletBadgeList amulets={amulets} setAmulets={setAmulets} availableSkills={availableSkills} />
            <AddAmuletButton onAdd={handleAddAmulet} />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <TemplatesTab />
          </TabPanel>
        </Box>
      </Box>
  );
}

export default TabsComponent;
