import { Stack, Box, Typography, IconButton, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { FormField } from "../../../../components"; // Adjust path as needed

interface School {
  schoolId: string;
  schoolName: string;
  schoolLogo?: string;
}

interface StepPasswordProps {
  email: string;
  school: School | null;
  password: string;
  onBack: () => void;
  onChangePassword: (value: string) => void;
  onLogin: (actions: any) => void;
  isLoading: boolean;
}

const StepThree = ({
  email,
  school,
  password,
  onBack,
  onChangePassword,
  onLogin,
  isLoading,
}: StepPasswordProps) => {
  return (
    <Formik
      initialValues={{ password }}
      validationSchema={Yup.object({
        password: Yup.string().min(6).required("Password is required"),
      })}
      onSubmit={(_, actions) => onLogin(actions)}
    >
      {({ handleChange, handleBlur, values }) => (
        <Form>
          <Stack spacing={2}>
            <Box display="flex" alignItems="center">
              <IconButton onClick={onBack}>
                <ArrowBackIcon />
              </IconButton>
            </Box>
            <Typography
              variant="h4"
              align="center"
              fontWeight="bold"
              sx={{
                fontFamily: `"Inter", sans-serif`,
                color: "rgb(56, 58, 63)",
                fontSize: "28px",
                fontWeight: "bold",
                textTransform: "capitalize",
              }}
            >
              Password
            </Typography>
            <Stack spacing={0}>
              <Typography
                variant="body2"
                align="center"
                sx={{
                  fontFamily: `"Inter", sans-serif`,
                  color: "rgb(56, 58, 63)",
                  fontSize: "12px",
                  textTransform: "uppercase",
                  fontWeight: "bold",
                }}
              >
                {school?.schoolName}
              </Typography>
              <Typography
                variant="body2"
                align="center"
                sx={{
                  fontFamily: `"Inter", sans-serif`,
                  color: "rgb(56, 58, 63)",
                  fontSize: "12px",
                }}
              >
                {email}
              </Typography>
            </Stack>
            <Typography
              variant="body2"
              align="center"
              sx={{
                fontFamily: `"Inter", sans-serif`,
                fontSize: "12px",
                color: "rgb(56, 58, 63)",
              }}
            >
              Enter your password to proceed
            </Typography>
            <FormField
              name="password"
              label="Password"
              type="password"
              value={values.password}
              handleChange={(e) => {
                handleChange(e);
                onChangePassword(e.target.value);
              }}
              handleBlur={handleBlur}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={isLoading}
              sx={{
                textTransform: "capitalize",
                fontFamily: `"Inter", sans-serif`,
              }}
            >
              Sign In
            </Button>
          </Stack>
        </Form>
      )}
    </Formik>
  );
};

export default StepThree;
