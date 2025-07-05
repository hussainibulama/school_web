import { useState } from "react";
import { Modal } from "../../../../components";
import { Box, Avatar, CircularProgress } from "@mui/material";
import { Person } from "@mui/icons-material";
import { useFormik, FormikProvider } from "formik";
import { FormField, FormSelect } from "../../../../components";
import { useFetchUserById } from "../../../../hooks/useUserHook";

const ViewStaff = ({
  userId,
  open,
  onClose,
}: {
  userId?: string;
  open: boolean;
  onClose: () => void;
}) => {
  const { data: user, isLoading } = useFetchUserById(userId);

  const [preview, setPreview] = useState<string | null>(null);

  const initialValues = {
    firstName: user?.data?.firstName || "",
    middleName: user?.data?.middleName || "",
    lastName: user?.data?.lastName || "",
    email: user?.data?.email || "",
    password: user?.data?.password || "",
    phone: user?.data?.phone || "",
    gender: user?.data?.gender || "",
    address: user?.data?.address || "",
    dob: user?.data?.dob || "",
  };
  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: () => {},
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
      title="View Parent"
      submitText={"Add Parent"}
      onSubmit={formik.handleSubmit}
      hideActions
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
          </Box>

          {/* Form Fields */}
          <Box display="flex" flexWrap="wrap" gap={2} justifyContent="center">
            {/* Email Full Width */}
            <Box flexBasis="100%">
              <FormField
                name="email"
                label="Email"
                type="email"
                value={formik.values.email}
                handleChange={formik.handleChange}
                handleBlur={formik.handleBlur}
                disabled
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
                    disabled
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
                    disabled
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
                disabled
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

export default ViewStaff;
