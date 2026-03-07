import React, {useState} from 'react';
import {Box, Tab, Tabs, Typography} from '@mui/material';
import ResultsTab from './ResultsTab';
import AmuletBadgeList from './AmuletBadgeList';
import AddAmuletButton from './AddAmuletButton';
import TemplatesTab from './TemplatesTab';
import {Result} from '../model/Result';
import {Amulet} from '../model/Amulet';

interface TabsProps {
  results: Result[] | string[];
  amulets: Amulet[];
  setAmulets: (amulets: Amulet[]) => void;
  availableSkills: string[];
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
          style={{ height: '100%', overflow: 'hidden' }}
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
      <Box sx={{width: '100%', minWidth: '40vw', maxWidth: '40vw', height: 'calc(100vh - 75px)', display: 'flex', flexDirection: 'column', overflow: 'hidden'}}>
        <Box sx={{borderBottom: 1, borderColor: 'divider', flexShrink: 0}}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Results" {...a11yProps(0)} />
            <Tab label="Filters" {...a11yProps(1)} />
            <Tab label="Templates (WIP)" {...a11yProps(2)} disabled />
          </Tabs>
        </Box>
        <Box sx={{ flexGrow: 1, overflow: 'hidden', minHeight: 0 }}>
          <TabPanel value={value} index={0}>
            <ResultsTab results={results} loading={loading} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Typography variant="body1" sx={{ fontSize: '1.5rem', fontWeight: 600, mb: 1, color: '#adb5bd' }}>Amulets</Typography>
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
