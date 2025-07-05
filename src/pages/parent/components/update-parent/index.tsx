import { useState } from "react";
import { Modal } from "../../../../components";
import {
  Button,
  Typography,
  Box,
  Avatar,
  CircularProgress,
} from "@mui/material";
import { Person } from "@mui/icons-material";
import { useFormik, FormikProvider } from "formik";
import * as Yup from "yup";
import { FormField, FormSelect } from "../../../../components";
import {
  useFetchUserById,
  useUpdateUserById,
  UpdateUserByIdPayload,
} from "../../../../hooks/useUserHook";

import { useSnackbar } from "../../../../hoc/snack-bar";

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  middleName: Yup.string(),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string().required("Phone number is required"),
  gender: Yup.string()
    .oneOf(["m", "f"], "Invalid gender")
    .required("Gender is required"),

  address: Yup.string(),

  dob: Yup.date().max(new Date(), "Date of birth cannot be in the future"),
});

const UpdateStaff = ({
  userId,
  open,
  onClose,
}: {
  userId?: string;

  open: boolean;
  onClose: () => void;
}) => {
  const { data: user, isLoading } = useFetchUserById(userId);
  const { mutate: updateUser, isPending: isSubmitting } = useUpdateUserById();
  const { showSnackbar } = useSnackbar();
  const [preview, setPreview] = useState<string | null>(null);

  const initialValues: UpdateUserByIdPayload = {
    userId: userId || "",
    firstName: user?.data?.firstName || "",
    middleName: user?.data?.middleName || "",
    lastName: user?.data?.lastName || "",
    email: user?.data?.email || "",
    phone: user?.data?.phone || "",
    gender: user?.data?.gender || "",
    address: user?.data?.address || "",
    dob: user?.data?.dob || "",
  };
  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values, actions) => {
      const filteredValues = Object.fromEntries(
        Object.entries(values).filter(
          ([_, value]) => value !== "" && value !== null && value !== undefined,
        ),
      );

      updateUser(filteredValues as UpdateUserByIdPayload, {
        onSuccess: (res: any) => {
          showSnackbar(res?.message || "User data updated", "success");
          handleClose();
        },
        onError: (err) => {
          showSnackbar(
            err?.response?.data?.message || "Unable to update user",
            "error",
          );
        },
        onSettled: () => actions.setSubmitting(false),
      });
    },
  });
  const handleClose = () => {
    formik.resetForm();
    setPreview(null);
    onClose();
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      title="Update Parent"
      submitText={"update Parent"}
      onSubmit={formik.handleSubmit}
      isSubmitting={isSubmitting}
    >
      {isLoading && (
        <Box
          position="absolute"
          top={0}
          left={0}
          width="100%"
          height="100%"
          display="flex"
          alignItems="center"
          justifyContent="center"
          zIndex={10}
          bgcolor="rgba(255,255,255,0.6)"
        >
          <CircularProgress />
        </Box>
      )}
      <FormikProvider value={formik}>
        <form>
          {/* Image Upload Section */}
          <Box display="flex" alignItems="center" mb={4}>
            <Avatar
              src={preview || undefined}
              sx={{ width: 64, height: 64, mr: 2 }}
            >
              {!preview && <Person />}
            </Avatar>

            <Box display="flex" flexDirection="column" justifyContent="center">
              <Button
                variant="outlined"
                component="label"
                sx={{
                  background: "#4d8cec",
                  fontFamily: `"Inter", sans-serif`,
                  fontSize: "12px",
                  textTransform: "capitalize",
                  height: "28px",
                  color: "white",
                  alignSelf: "flex-start",
                  "&:hover": {
                    backgroundColor: "#357ab7",
                  },
                  "&:disabled": {
                    backgroundColor: "#8aacc8",
                  },
                }}
              >
                Upload Photo
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) => {
                    const file = e.currentTarget.files?.[0];
                    if (file) {
                      setPreview(URL.createObjectURL(file));
                    }
                  }}
                />
              </Button>
              <Typography sx={{ fontSize: "10px" }}>
                At least 132 x 132px PNG or JPEG file.
              </Typography>
            </Box>
          </Box>

          {/* Form Fields */}
          <Box display="flex" flexWrap="wrap" gap={2} justifyContent="center">
            {/* Email Full Width */}
            <Box flexBasis="100%">
              <FormField
                name="email"
                label="Email"
                type="email"
                value={String(formik.values.email)}
                handleChange={formik.handleChange}
                handleBlur={formik.handleBlur}
                slotProps={{
                  inputLabel: { shrink: true, sx: { fontSize: "14px" } },
                  input: { sx: { fontSize: "14px" } },
                }}
                sx={{
                  "& .MuiInputBase-root": { height: 36 },
                  "& .MuiInputBase-input": { padding: "8px 12px" },
                }}
              />
            </Box>

            {[
              { name: "firstName", label: "First Name" },
              { name: "middleName", label: "Middle Name" },
              { name: "lastName", label: "Last Name" },
              { name: "phone", label: "Phone Number" },
              {
                name: "gender",
                label: "Gender",
                type: "select",
                options: [
                  { value: "m", label: "Male" },
                  { value: "f", label: "Female" },
                ],
              },

              {
                name: "dob",
                label: "Date of Birth",
                type: "date",
              },
            ].map((field) => (
              <Box key={field.name} flexBasis="32%" flexGrow={1}>
                {field.type === "select" ? (
                  <FormSelect
                    name={field.name}
                    label={field.label}
                    value={String(
                      formik.values[field.name as keyof typeof initialValues],
                    )}
                    options={field.options || []}
                    handleChange={formik.handleChange}
                    handleBlur={formik.handleBlur}
                    slotProps={{
                      inputLabel: { shrink: true, sx: { fontSize: "14px" } },
                      input: { sx: { fontSize: "14px" } },
                    }}
                    sx={{
                      "& .MuiInputBase-root": { height: 36 },
                      "& .MuiInputBase-input": { padding: "8px 12px" },
                    }}
                  />
                ) : (
                  <FormField
                    name={field.name}
                    label={field.label}
                    type={field.type || "text"}
                    value={String(
                      formik.values[field.name as keyof typeof initialValues],
                    )}
                    handleChange={formik.handleChange}
                    handleBlur={formik.handleBlur}
                    slotProps={{
                      inputLabel: { shrink: true, sx: { fontSize: "14px" } },
                      input: { sx: { fontSize: "14px" } },
                    }}
                    sx={{
                      "& .MuiInputBase-root": { height: 36 },
                      "& .MuiInputBase-input": { padding: "8px 12px" },
                    }}
                  />
                )}
              </Box>
            ))}

            {/* Address Full Width with 2-line height */}
            <Box flexBasis="100%">
              <FormField
                name="address"
                label="Address"
                multiline
                value={formik.values.address || ""}
                handleChange={formik.handleChange}
                handleBlur={formik.handleBlur}
                slotProps={{
                  inputLabel: { shrink: true, sx: { fontSize: "14px" } },
                  input: { sx: { fontSize: "14px" } },
                }}
                sx={{
                  "& .MuiInputBase-root": { minHeight: 60 },
                  "& .MuiInputBase-input": { padding: "8px 12px" },
                }}
              />
            </Box>
          </Box>
        </form>
      </FormikProvider>
    </Modal>
  );
};

export default UpdateStaff;
