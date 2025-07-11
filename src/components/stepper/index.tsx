import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { useMediaQuery, useTheme } from '@mui/material';

interface ICustomStepperProps {
  steps?: string[];
  activeStep?: number;
}

export default function CustomStepper({ steps = [], activeStep = 0 }: ICustomStepperProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Stepper
      activeStep={activeStep}
      orientation={isMobile ? 'horizontal' : 'vertical'}
      sx={{
        minWidth: isMobile ? '100%' : 'auto',
        width: isMobile ? '100%' : '100%',
      }}
    >
      {steps.map((step, index) => (
        <Step key={index}>
          <StepLabel>{step}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
}
