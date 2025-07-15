import { Fragment, useState, useEffect, useRef } from 'react';
import Modal from '../modal';
import { Box, Typography } from '@mui/material';
import { useGetSchoolSessions } from '../../hooks';
import { CreateSession } from '../../pages/session/components';
import { TemplateModal } from '../../pages/class-arms/components';
import { CreateClassLevels } from '../../pages/class-levels/components';
import { RadioGroup } from '../form';

export default function FinishSetup() {
  const [steps, setSteps] = useState<number>(0);

  const [arms, setArms] = useState<boolean>(false);
  const [hideOnboarding, setHideOnBoarding] = useState<boolean>(true);

  const { data: session } = useGetSchoolSessions();
  const currentSession = session?.data?.find((entry: any) => entry.isCurrent);

  const timeoutId = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    timeoutId.current = setTimeout(() => {
      setHideOnBoarding(!!currentSession);
    }, 1500);
    return () => {
      if (timeoutId.current) clearTimeout(timeoutId.current);
    };
  }, [currentSession]);

  if (hideOnboarding || steps === 4) return <Fragment></Fragment>;

  if (steps === 1) {
    return <TemplateModal isOnboarding open={true} onClose={() => setSteps(2)} />;
  }

  if (steps === 2) {
    return <CreateClassLevels isOnboarding open={true} onClose={() => setSteps(3)} />;
  }
  if (steps === 3) {
    return <CreateSession isOnboarding open={true} onClose={() => setSteps(4)} />;
  }

  return (
    <Modal
      open={true}
      onClose={() => {
        /** noop */
      }}
      onSubmit={() => setSteps(arms ? 1 : 2)}
      submitText={'Next'}
      title={`Welcome 👋`}
      error={false}
      maxWidth='xs'
    >
      <Typography variant='body2' fontWeight={400} mb={2} fontSize={14}>
        Let's finish setting your account for you!
      </Typography>
      <Box flexBasis='100%'>
        <RadioGroup
          name='arm'
          label='Do you have school arms'
          value={arms}
          options={[
            { value: true, label: 'Yes' },
            { value: false, label: 'No' },
          ]}
          handleChange={(e) => setArms(e.target.value === 'true')}
        />
      </Box>
      <Typography variant='caption' color='text.secondary' mt={1} display='block'>
        Arms are used to divide a class into smaller groups like A, B, or C (e.g., JSS1A, JSS1B).
      </Typography>
    </Modal>
  );
}
