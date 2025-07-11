import { Box } from '@mui/material';
import { SettingsCard, SettingsHeader } from '../../components';
import { ClassArmIcon, ClassSectionIcon, SubjectsIcon } from '../../assets';
import { useNavigate } from 'react-router-dom';

export default function Settings() {
  const navigate = useNavigate();

  const settingsConfig = [
    {
      title: 'General',
      cards: [
        { label: 'Class Level', icon: ClassSectionIcon, onClick: () => navigate('class-levels') },
        { label: 'Class Arms', icon: ClassArmIcon, onClick: () => navigate('class-arms') },
      ],
    },
    {
      title: 'Academics',
      cards: [{ label: 'Subjects', icon: SubjectsIcon, onClick: () => navigate('subjects') }],
    },
  ];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
      {settingsConfig.map((section) => (
        <Box key={section.title}>
          <SettingsHeader title={section.title} />
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 2,
              justifyContent: { xs: 'flex-start', md: 'flex-start' },
            }}
          >
            {section.cards.map((card) => (
              <Box key={card.label} sx={{ flex: '0 1 auto', minWidth: { xs: '100%', sm: 'auto' } }}>
                <SettingsCard label={card.label} icon={card.icon} onClick={card.onClick} />
              </Box>
            ))}
          </Box>
        </Box>
      ))}
    </Box>
  );
}
