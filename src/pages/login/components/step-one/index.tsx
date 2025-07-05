import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Button, Stack, Typography } from "@mui/material";
import { FormField } from "../../../../components";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
});

interface StepEmailProps {
  isPending: boolean;
  email: string;
  onChangeEmail: (value: string) => void;
  onSubmit: (actions: any) => void;
}
const StepOne = ({
  isPending,
  email,
  onChangeEmail,
  onSubmit,
}: StepEmailProps) => (
  <Formik
    initialValues={{ email }}
    validationSchema={LoginSchema}
    onSubmit={(_, actions) => onSubmit(actions)}
  >
    {({ handleChange, handleBlur, values }) => (
      <Form>
        <Stack spacing={2}>
          <Typography
            variant="h4"
            align="center"
            fontWeight="bold"
            sx={{
              fontFamily: `"Inter", sans-serif`,
              color: "rgb(56, 58, 63)",
              fontSize: "28px",
              fontWeight: "bold",
            }}
          >
            Login
          </Typography>
          <Typography
            variant="body2"
            align="center"
            sx={{
              fontFamily: `"Inter", sans-serif`,
              fontSize: "12px",
              color: "rgb(56, 58, 63)",
            }}
          >
            Enter your email address below to display your schools
          </Typography>
          <FormField
            name="email"
            label="Email Address"
            value={values.email}
            handleChange={(e) => {
              handleChange(e);
              onChangeEmail(e.target.value);
            }}
            handleBlur={handleBlur}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={isPending}
            sx={{
              textTransform: "capitalize",
              fontFamily: `"Inter", sans-serif`,
            }}
          >
            Continue
          </Button>
        </Stack>
      </Form>
    )}
  </Formik>
);
export default StepOne;
