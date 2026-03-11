import React from 'react';
import {Box, Card, CardContent, Chip, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from '@mui/material';
import {BuildItem, BuildSkill, Result} from '../../model/Result';
import { useI18n } from '../../lib/i18nContext';
import { GearIconKey, Icon, isGearIconKey, isSkillIconKey } from '../../lib/icon';

interface BuildCardProps {
  build: Result;
}

function BuildCard({ build }: BuildCardProps) {
  const { t, language } = useI18n();

  const getSlotIcon = (type: string) => (type === 'W' ? '⬤' : '◆');

  const formatAmuletName = (item: BuildItem) => {
    if (!item.amulet_details) return item.names[language] || item.names.en;
    const { rarity, groups, skills } = item.amulet_details;
    const skillsStr = skills.map((skill) => `${skill.names[language] || skill.names.en}: ${skill.value}`).join(', ');
    return `R${rarity}, G${groups.join('|')}, ${skillsStr}`;
  };

  const getSkillProgress = (skill: BuildSkill) => (skill.current / skill.max) * 100;

  const getMaxScore = (result: Result) => result.skills.reduce((sum, skill) => sum + skill.max * skill.weight, 0);

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
          {t.results.armorLabel}:
        </Typography>
        <TableContainer component={Paper} sx={{ mb: 2, backgroundColor: '#212529', overflowX: 'auto', maxWidth: '100%' }}>
          <Table size="small" sx={{ tableLayout: 'fixed', width: '100%' }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: '#adb5bd', fontWeight: 600, borderBottom: '1px solid #495057', fontSize: '0.8rem', py: 0.75, width: '10%' }}>Slot</TableCell>
                <TableCell sx={{ color: '#adb5bd', fontWeight: 600, borderBottom: '1px solid #495057', fontSize: '0.8rem', py: 0.75, width: '40%' }}>Item</TableCell>
                <TableCell sx={{ color: '#adb5bd', fontWeight: 600, borderBottom: '1px solid #495057', fontSize: '0.8rem', py: 0.75, width: '50%' }}>Decorations</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {build.items.map((item: BuildItem) => (
                <TableRow key={`${item.slot}:${item.id}`}>
                  <TableCell sx={{ color: '#f8f9fa', borderBottom: '1px solid #495057', textTransform: 'capitalize', fontSize: '0.8rem', py: 0.75 }}>
                    {isGearIconKey(item.gear_key) ? <Icon type="gear" iconKey={item.gear_key as GearIconKey} /> : null}
                  </TableCell>
                  <TableCell sx={{ color: '#f8f9fa', borderBottom: '1px solid #495057', fontSize: '0.8rem', py: 0.75, overflow: 'hidden' }}>
                    {item.slot === 'amulet' ? formatAmuletName(item) : (item.names[language] || item.names.en)}
                  </TableCell>
                  <TableCell sx={{ color: '#f8f9fa', borderBottom: '1px solid #495057', fontSize: '0.8rem', py: 0.75 }}>
                    <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                      {item.decorations.map((deco, idx) => (
                        <Chip
                          key={idx}
                          label={`${getSlotIcon(deco.type)} ${deco.decoration_names ? (deco.decoration_names[language] || deco.decoration_names.en) : '-'}`}
                          size="small"
                          sx={{
                            backgroundColor: deco.decoration_id ? '#495057' : '#2c3034',
                            color: deco.decoration_id ? '#f8f9fa' : '#6c757d',
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

        {(build.set_bonuses?.length || build.group_bonuses?.length) ? (
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" sx={{ color: '#adb5bd', mb: 1, fontWeight: 600, fontSize: '0.875rem' }}>
              Set / Group Bonuses:
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {(build.set_bonuses || []).map((bonus) => (
                <Chip
                  key={`build-set-${bonus.id}`}
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                      {isSkillIconKey(bonus.icon) ? <Icon type="skills" iconKey={bonus.icon} /> : null}
                      <span>{`${bonus.names[language] || bonus.names.en} (${bonus.count})`}</span>
                    </Box>
                  }
                  size="small"
                  sx={{ backgroundColor: '#3b5b7a', color: '#f8f9fa', fontSize: '0.72rem' }}
                />
              ))}
              {(build.group_bonuses || []).map((bonus) => (
                <Chip
                  key={`build-group-${bonus.id}`}
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                      {isSkillIconKey(bonus.icon) ? <Icon type="skills" iconKey={bonus.icon} /> : null}
                      <span>{`${bonus.names[language] || bonus.names.en} (${bonus.count})`}</span>
                    </Box>
                  }
                  size="small"
                  sx={{ backgroundColor: '#5f3b7a', color: '#f8f9fa', fontSize: '0.72rem' }}
                />
              ))}
            </Box>
          </Box>
        ) : null}

        <Typography variant="subtitle2" sx={{ color: '#adb5bd', mb: 1, fontWeight: 600, fontSize: '0.875rem' }}>
          {t.results.skillsLabel}:
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.375 }}>
          {build.skills.map((skill: BuildSkill) => {
            const progress = getSkillProgress(skill);
            const isComplete = skill.current >= skill.max;
            const skillName = skill.names[language] || skill.names.en;
            return (
              <Chip
                key={skill.id}
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, minWidth: 0 }}>
                    {isSkillIconKey(skill.icon) ? <Icon type="skills" iconKey={skill.icon} /> : null}
                    <span>{`${skillName}: ${skill.current}/${skill.max} (w: ${skill.weight})`}</span>
                  </Box>
                }
                size="small"
                sx={{
                  backgroundColor: isComplete ? '#198754' : (progress >= 50 ? '#856404' : '#495057'),
                  color: '#f8f9fa',
                  fontSize: '0.75rem',
                  height: '24px',
                  minWidth: 'calc(25% - 6px)',
                  maxWidth: 'calc(25% - 6px)',
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

