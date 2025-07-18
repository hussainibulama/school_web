import {
  LandingPageHeader,
  StarterPricing,
  ProfessionalPricingCard,
  EnterprisePricingCard,
  FeatureCard,
} from './container';
import { Box, Button, Divider, Typography, darken } from '@mui/material';
import { LandingPageMainBg } from '../../assets';
import { LogoVireo } from '../../container';
import { useNavigate } from 'react-router';
import {
  LandingPageIcon1,
  LandingPageIcon2,
  LandingPageIcon3,
  LandingPageIcon4,
  LandingPageIcon5,
  LandingPageIcon6,
} from '../../assets';

const features = [
  {
    title: 'Student Management',
    label:
      'Comprehensive student profiles, enrollment tracking, and academic history management in one centralized system.',
    icon: LandingPageIcon1,
    color: '#DBEAFE',
  },
  {
    title: 'Grade Management',
    label:
      'Streamlined grading system with automated calculations, report cards, and progress tracking for all students.',
    icon: LandingPageIcon2,
    color: '#DCFCE7',
  },
  {
    title: 'Schedule Management',
    label:
      'Intelligent timetable creation, class scheduling, and resource allocation with conflict detection.',
    icon: LandingPageIcon3,
    color: '#F3E8FF',
  },
  {
    title: 'Analytics & Reports',
    label:
      'Detailed insights into student performance, attendance patterns, and institutional metrics.',
    icon: LandingPageIcon4,
    color: '#FFEDD5',
  },
  {
    title: 'Curriculum Planning',
    label:
      'Organize lesson plans, track curriculum progress, and manage educational resources effectively.',
    icon: LandingPageIcon5,
    color: '#E0E7FF',
  },
  {
    title: 'Secure & Compliant',
    label:
      'Enterprise-grade security with FERPA compliance and role-based access control for data protection.',
    icon: LandingPageIcon6,
    color: '#FEE2E2',
  },
];
export default function HomePage() {
  const navigate = useNavigate();

  return (
    <Box>
      <LandingPageHeader />
      <Box
        display='flex'
        sx={{
          flexDirection: { sm: 'row', xs: 'column' },
          backgroundImage: `linear-gradient(to bottom right, #eff6ff 0%, #f0fdf4 100%)`, //#eacda0ff
        }}
      >
        <Box
          display='flex'
          flexDirection='column'
          maxWidth={'550px'}
          sx={{
            px: { sm: 5, xs: 2 },
            py: { sm: 10, xs: 5 },
            gap: { sm: 3, xs: 2 },
            maxWidth: { sm: '550px', xs: '100%' },
          }}
        >
          <Box
            sx={{
              position: 'relative',
              display: 'flex',
              flexDirection: 'row',
              gap: 0.5,
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgb(219, 234, 254)',
              py: '0.15rem',
              px: '0.75rem',
              borderRadius: 10,
              width: 'fit-content',
            }}
          >
            <Box
              component='span'
              sx={{
                position: 'relative',
                display: 'flex',
                background: '#3B82F6',
                width: '8px',
                height: '8px',
                borderRadius: '50%',
              }}
            />
            <Typography
              sx={{
                fontFamily: '"DM Sans", sans-serif',
                fontSize: '0.775rem',
                fontWeight: 500,
                color: '#1D4ED8',
              }}
            >
              Trusted by 500+ Schools
            </Typography>
          </Box>
          <Typography
            sx={{
              color: 'rgb(17, 24, 39)',
              fontSize: { sm: '3.75rem', xs: '2.25rem' },
              lineHeight: { sm: 1, xs: 1.25 },
              fontWeight: 700,
              fontFamily: '"DM Sans", sans-serif',
            }}
          >
            Modern School{' '}
            <Box component='span' color='rgb(37, 99, 235)'>
              Management
            </Box>{' '}
            Made Simple
          </Typography>
          <Typography
            variant='body2'
            sx={{
              fontFamily: '"DM Sans", sans-serif',
              fontSize: '1rem',
              color: 'rgb(75, 85, 99)',
              lineHeight: 1.625,
            }}
          >
            Streamline your school operations with our comprehensive management system. From student
            enrollment to grade tracking, we've got everything covered.
          </Typography>
          <Button
            variant='contained'
            onClick={() => navigate('/signup')}
            sx={{
              px: '1rem',
              py: '0.75rem',
              width: { sm: 'fit-content', xs: 'auto' },
              height: '2rem',
              color: 'white',
              fontWeight: 500,
              fontSize: '0.775rem',
              backgroundColor: 'rgb(37, 99, 235)',
              fontFamily: '"DM Sans", sans-serif',
              borderRadius: '0.4rem',
              textTransform: 'capitalize',
              boxShadow: 0,
              '&:hover': {
                boxShadow: 0,
                backgroundColor: darken('rgb(37, 99, 235)', 0.2),
              },
            }}
          >
            Start Free Trial &nbsp; →
          </Button>
          <Divider />
          <Box display='flex' gap={2}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Typography
                sx={{
                  color: 'rgb(17, 24, 39)',
                  fontFamily: '"DM Sans", sans-serif',
                  fontWeight: 700,
                  fontSize: '1.3rem',
                  lineHeight: '2rem',
                }}
              >
                500+
              </Typography>
              <Typography
                sx={{
                  color: 'rgb(75, 85, 99)',
                  fontFamily: '"DM Sans", sans-serif',
                  fontSize: '0.775rem',
                  lineHeight: '1.25rem',
                }}
              >
                Schools
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Typography
                sx={{
                  color: 'rgb(17, 24, 39)',
                  fontFamily: '"DM Sans", sans-serif',
                  fontWeight: 700,
                  fontSize: '1.3rem',
                  lineHeight: '2rem',
                }}
              >
                50K+
              </Typography>
              <Typography
                sx={{
                  color: 'rgb(75, 85, 99)',
                  fontFamily: '"DM Sans", sans-serif',
                  fontSize: '0.775rem',
                  lineHeight: '1.25rem',
                }}
              >
                Students
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Typography
                sx={{
                  color: 'rgb(17, 24, 39)',
                  fontFamily: '"DM Sans", sans-serif',
                  fontWeight: 700,
                  fontSize: '1.3rem',
                  lineHeight: '2rem',
                }}
              >
                99.9%
              </Typography>
              <Typography
                sx={{
                  color: 'rgb(75, 85, 99)',
                  fontFamily: '"DM Sans", sans-serif',
                  fontSize: '0.775rem',
                  lineHeight: '1.25rem',
                }}
              >
                Uptime
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box display='flex' justifyContent='center' alignItems='center' width='100%'>
          <Box
            component='img'
            src={LandingPageMainBg}
            sx={{
              borderRadius: { sm: 2, xs: 4 },
              width: { xs: '95%', sm: '90%' },
              height: { xs: 300, sm: 'auto' },
              objectFit: { sx: 'contain', xs: 'cover' },
            }}
          />
        </Box>
      </Box>
      <Box
        width={'100%'}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            justifySelf: 'center',
            textAlign: 'center',
            width: { sm: '50%', xs: '95%' },
            py: 5,
          }}
        >
          <Typography
            sx={{
              fontFamily: '"DM Sans", sans-serif',
              color: 'rgb(17, 24, 39)',
              fontWeight: 700,
              fontSize: { sm: '2rem', xs: '1.475rem' },
              lineHeight: '2rem',
              mb: 2,
            }}
          >
            Everything You Need to Manage Your School
          </Typography>
          <Typography
            sx={{
              fontFamily: '"DM Sans", sans-serif',
              color: 'rgb(75, 85, 99)',
              fontSize: { sm: '1rem', xs: '1rem' },
              lineHeight: '1.55rem',
            }}
          >
            Our comprehensive platform provides all the tools you need to streamline operations,
            improve communication, and enhance the educational experience.
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          px: { sm: 5, xs: 3 },
          gap: 5,
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {features.map((item, key) => (
          <FeatureCard
            key={key}
            title={item.title}
            label={item.label}
            color={item.color}
            icon={item.icon}
          />
        ))}
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          py: { sm: 10, xs: 5 },
          px: 2,
        }}
      >
        <Typography
          sx={{
            color: 'rgb(17, 24, 39)',
            fontSize: { sm: '2rem', xs: '1.475rem' },
            fontFamily: '"DM Sans", sans-serif',
            textAlign: 'center',
            fontWeight: 700,
            lineHeight: '2.5rem',
          }}
        >
          Simple, Transparent Pricing
        </Typography>
        <Typography
          variant='body2'
          sx={{
            color: 'rgb(75, 85, 99)',
            fontSize: { sm: '1rem', xs: '1rem' },
            lineHeight: 1.625,
            fontFamily: '"DM Sans", sans-serif',
            textAlign: 'center',
            width: { xs: '100%', sm: '50%' },
            my: 1,
          }}
        >
          Choose the perfect plan for your school. All plans include a 30-day free trial and can be
          upgraded or downgraded at any time.
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { sm: 'row', xs: 'column' },
            gap: { sm: 2, xs: 4 },
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            mt: 4,
          }}
        >
          <StarterPricing />
          <ProfessionalPricingCard /> <EnterprisePricingCard />
        </Box>
        <Typography
          sx={{
            color: 'rgb(75, 85, 99)',
            fontSize: '0.875rem',
            fontFamily: '"DM Sans", sans-serif',
            textAlign: 'center',
            mt: 4,
          }}
        >
          All plans include a 30-day free trial. No credit card required.
        </Typography>
      </Box>
      <Box
        display='flex'
        sx={{
          py: 5,
          px: 2,
          flexDirection: 'column',
          backgroundImage: `linear-gradient(to bottom right, #2563eb 100%, #1d4ed8 100%, #1e40af 100%)`,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          sx={{
            color: '#fff',
            fontSize: { sm: '3rem', xs: '1.7rem' },
            fontWeight: 700,
            fontFamily: '"DM Sans", sans-serif',
            textAlign: 'center',
            mt: 4,
            lineHeight: 1,
            width: { sm: '70%', xs: '100%' },
          }}
        >
          Ready to Transform Your School Management?
        </Typography>
        <Typography
          sx={{
            color: 'rgb(219, 234, 254)',
            fontSize: { sm: '1.3rem', xs: '0.875rem' },
            lineHeight: 1.625,
            fontFamily: '"DM Sans", sans-serif',
            textAlign: 'center',
            mt: 4,
            width: { sm: '60%', xs: '100%' },
          }}
        >
          Join hundreds of schools already using VireoSchool to streamline operations, improve
          communication, and enhance the educational experience.
        </Typography>
      </Box>
      <Box
        sx={{
          px: { xs: 3, sm: 5 },
          py: 5,
          background: 'rgb(17, 24, 39)',
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
        }}
      >
        <LogoVireo textColor='white' logoSize={35} nameSize={30} />

        <Typography
          sx={{
            color: 'rgb(156, 163, 175)',
            fontSize: '0.875rem',
            lineHeight: 1.625,
            fontFamily: '"DM Sans", sans-serif',
          }}
        >
          UK: A2 NN Central Building, <br />
          Sheep Street NN1 2LU, Northampton.
        </Typography>
        <Typography
          sx={{
            color: 'rgb(156, 163, 175)',
            fontSize: '0.875rem',
            lineHeight: 1.625,
            fontFamily: '"DM Sans", sans-serif',
          }}
        >
          NG: 12 Floor 3 Apo Sparklight Mall <br />
          Apo Abuja.
        </Typography>
      </Box>
    </Box>
  );
}
