import { useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { useInitUser, useLogin } from "../../hooks/useUserHook";
import { StepOne, StepTwo, StepThree } from "./components";
import { useSnackbar } from "../../hoc/snack-bar";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { AUTH_STORAGE_KEY } from "../../contants";

interface School {
  schoolId: string;
  schoolName: string;
  schoolLogo?: string;
}

const Login = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [schools, setSchools] = useState<School[]>([]);
  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();

  const { mutate: initUser, isPending } = useInitUser();
  const { mutate: login, isPending: isLoggingIn } = useLogin();

  const handleEmailSubmit = (actions: any) => {
    initUser(email, {
      onSuccess: (res) => {
        showSnackbar(res?.message || "School Found", "success");
        setSchools((res.data as School[]) ?? []);
        setStep(2);
      },
      onError: (err) => {
        console.log(err);
        showSnackbar(
          err?.response?.data?.message || "unexpected error",
          "error",
        );
      },
      onSettled: () => actions.setSubmitting(false),
    });
  };

  const handleLogin = (actions: any) => {
    if (!email || !selectedSchool?.schoolId || !password) return;

    login(
      {
        email,
        password,
        schoolId: selectedSchool.schoolId,
      },
      {
        onSuccess: (res: any) => {
          localStorage.setItem(AUTH_STORAGE_KEY, res?.data?.token);
          showSnackbar(res?.message || "Login Successful", "success");
          navigate("/dashboard");
        },
        onError: (err) => {
          console.log(err);
          showSnackbar(
            err?.response?.data?.message || "unable to error",
            "error",
          );
        },
        onSettled: () => actions.setSubmitting(false),
      },
    );
  };

  return (
    <Box
      minHeight="100dvh"
      height="100%"
      width="100%"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      alignItems="center"
      sx={{ backgroundColor: "#f5f5f7" }}
    >
      {/* Main content center */}
      <Box flex={1} display="flex" alignItems="center" width="100%">
        <Stack
          spacing={2}
          sx={{
            width: { xs: "90%", sm: "320px" },
            mx: "auto",
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              {step === 1 && (
                <StepOne
                  isPending={isPending}
                  onSubmit={handleEmailSubmit}
                  email={email}
                  onChangeEmail={setEmail}
                />
              )}
              {step === 2 && (
                <StepTwo
                  email={email}
                  schools={schools}
                  selectedSchool={selectedSchool}
                  onBack={() => {
                    setStep(1);
                    setSelectedSchool(null);
                  }}
                  onSelect={setSelectedSchool}
                  onContinue={() => setStep(3)}
                />
              )}
              {step === 3 && (
                <StepThree
                  email={email}
                  school={selectedSchool}
                  password={password}
                  onBack={() => {
                    setStep(2);
                    setPassword("");
                  }}
                  onChangePassword={setPassword}
                  onLogin={handleLogin}
                  isLoading={isLoggingIn}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </Stack>
      </Box>

      {/* Footer */}
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        sx={{
          mt: 4,
          py: 2,
          fontFamily: `"Inter", sans-serif`,
          fontSize: "12px",
        }}
      >
        © {new Date().getFullYear()} Lightweb Ltd. All rights reserved.{" "}
        <a href="/terms" style={{ textDecoration: "underline" }}>
          Terms and condition
        </a>
        {" . "}
        <a href="/privacy-policy" style={{ textDecoration: "underline" }}>
          Privacy Policy
        </a>
      </Typography>
    </Box>
  );
};

export default Login;
