import React from 'react';
import {Box, Card, CardContent, Chip, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from '@mui/material';
import {BuildItem, BuildSkill, Result} from "../model/Result";

interface BuildCardProps {
  build: Result;
}

function BuildCard({ build }: BuildCardProps) {
  const getSlotIcon = (type: string) => {
    return type === 'W' ? '⬤' : '◆';
  };

  const formatAmuletName = (item: BuildItem) => {
    if (!item.amulet_details) return item.name;
    const { rarity, groups, skills } = item.amulet_details;
    const skillsStr = Object.entries(skills).map(([name, value]) => `${name}: ${value}`).join(', ');
    return `R${rarity}, G${groups.join('|')}, ${skillsStr}`;
  };

  const getSkillProgress = (skill: BuildSkill) => {
    return (skill.current / skill.max) * 100;
  };

  const getMaxScore = (build: Result) => {
    return build.skills.reduce((sum, skill) => sum + skill.max * skill.weight, 0);
  }

  return (
    <Card sx={{ mb: 2, backgroundColor: '#343a40', border: '1px solid #495057', overflow: 'hidden' }}>
      <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" sx={{ color: '#adb5bd', fontSize: '1.1rem', fontWeight: 600 }}>
            Build {build.id}
          </Typography>
          <Chip
            label={`Score: ${build.score} / ${getMaxScore(build)}`}
            size="small"
            sx={{
              backgroundColor: '#a19423',
              color: '#000',
              fontWeight: 600,
              fontSize: '0.8rem'
            }}
          />
        </Box>

        <Typography variant="subtitle2" sx={{ color: '#adb5bd', mb: 1, fontWeight: 600, fontSize: '0.875rem' }}>
          Items:
        </Typography>
        <TableContainer component={Paper} sx={{ mb: 2, backgroundColor: '#212529', overflowX: 'auto', maxWidth: '100%' }}>
          <Table size="small" sx={{ tableLayout: 'fixed', width: '100%' }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: '#adb5bd', fontWeight: 600, borderBottom: '1px solid #495057', fontSize: '0.8rem', py: 0.75, width: '15%' }}>Slot</TableCell>
                <TableCell sx={{ color: '#adb5bd', fontWeight: 600, borderBottom: '1px solid #495057', fontSize: '0.8rem', py: 0.75, width: '35%' }}>Item</TableCell>
                <TableCell sx={{ color: '#adb5bd', fontWeight: 600, borderBottom: '1px solid #495057', fontSize: '0.8rem', py: 0.75, width: '50%' }}>Decorations</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {build.items.map((item: BuildItem) => (
                <TableRow key={item.slot}>
                  <TableCell sx={{ color: '#f8f9fa', borderBottom: '1px solid #495057', textTransform: 'capitalize', fontSize: '0.8rem', py: 0.75 }}>
                    {item.slot}
                  </TableCell>
                  <TableCell sx={{ color: '#f8f9fa', borderBottom: '1px solid #495057', fontSize: '0.8rem', py: 0.75, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {item.slot === 'amulet' ? formatAmuletName(item) : item.name}
                  </TableCell>
                  <TableCell sx={{ color: '#f8f9fa', borderBottom: '1px solid #495057', fontSize: '0.8rem', py: 0.75 }}>
                    <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                      {item.decorations.map((deco, idx) => (
                        <Chip
                          key={idx}
                          label={`${getSlotIcon(deco.type)} ${deco.decoration || '-'}`}
                          size="small"
                          sx={{
                            backgroundColor: deco.decoration ? '#495057' : '#2c3034',
                            color: deco.decoration ? '#f8f9fa' : '#6c757d',
                            fontSize: '0.7rem',
                            height: '20px',
                            '& .MuiChip-label': { px: 1, py: 0 }
                          }}
                        />
                      ))}
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Typography variant="subtitle2" sx={{ color: '#adb5bd', mb: 1, fontWeight: 600, fontSize: '0.875rem' }}>
          Skills:
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.375 }}>
          {build.skills.map((skill: BuildSkill) => {
            const progress = getSkillProgress(skill);
            const isComplete = skill.current >= skill.max;
            return (
              <Chip
                key={skill.name}
                label={`${skill.name}: ${skill.current}/${skill.max} (w: ${skill.weight})`}
                size="small"
                sx={{
                  backgroundColor: isComplete ? '#198754' : (progress >= 50 ? '#856404' : '#495057'),
                  color: '#f8f9fa',
                  fontSize: '0.75rem',
                  height: '24px',
                  minWidth: 'calc(25% - 3px)',
                  maxWidth: 'calc(25% - 3px)',
                  justifyContent: 'flex-start',
                  '& .MuiChip-label': {
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }
                }}
              />
            );
          })}
        </Box>
      </CardContent>
    </Card>
  );
}

export default BuildCard;

