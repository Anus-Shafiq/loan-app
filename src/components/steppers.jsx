import React, { useState, useEffect } from "react";
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  TextField,
} from "@mui/material";
import { useForm, FormProvider } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/client";
import { useUser } from "@/context/store";

const steps = [
  "Personal Information",
  "Income Source",
  "Loan Details",
  "Review",
];

function PersonalInfoForm() {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <Box>
      <TextField
        label="Full Name"
        fullWidth
        margin="normal"
        {...register("fullName", { required: "Full name is required" })}
        error={!!errors.fullName}
        helperText={errors.fullName?.message}
      />
      <TextField
        label="Email"
        type="email"
        fullWidth
        margin="normal"
        {...register("email", {
          required: "Email is required",
          pattern: {
            value: /^\S+@\S+\.\S+$/,
            message: "Invalid email address",
          },
        })}
        error={!!errors.email}
        helperText={errors.email?.message}
      />
    </Box>
  );
}

function IncomeSourceForm() {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <Box>
      <TextField
        label="Occupation"
        fullWidth
        margin="normal"
        {...register("occupation", { required: "Occupation is required" })}
        error={!!errors.occupation}
        helperText={errors.occupation?.message}
      />
      <TextField
        label="Monthly Income"
        type="number"
        fullWidth
        margin="normal"
        {...register("income", {
          required: "Income is required",
          valueAsNumber: true,
          min: { value: 1, message: "Income must be a positive number" },
        })}
        error={!!errors.income}
        helperText={errors.income?.message}
      />
    </Box>
  );
}

function LoanDetailsForm() {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <Box>
      <TextField
        label="Loan Amount"
        type="number"
        fullWidth
        margin="normal"
        {...register("loanAmount", {
          required: "Loan Amount is required",
          valueAsNumber: true,
          min: { value: 1, message: "Loan amount must be a positive number" },
        })}
        error={!!errors.loanAmount}
        helperText={errors.loanAmount?.message}
      />
      <TextField
        label="Loan Purpose"
        fullWidth
        margin="normal"
        {...register("loanPurpose", { required: "Purpose is required" })}
        error={!!errors.loanPurpose}
        helperText={errors.loanPurpose?.message}
      />
    </Box>
  );
}

function ReviewForm({ formData }) {
  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Review Information
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: 2,
          mx: 2,
        }}
      >
        <Typography>
          <strong>Full Name:</strong> {formData.fullName}
        </Typography>
        <Typography>
          <strong>Email:</strong> {formData.email}
        </Typography>
        <Typography>
          <strong>Occupation:</strong> {formData.occupation}
        </Typography>
        <Typography>
          <strong>Income:</strong> {formData.income}
        </Typography>
        <Typography>
          <strong>Loan Amount:</strong> {formData.loanAmount}
        </Typography>
        <Typography>
          <strong>Purpose:</strong> {formData.loanPurpose}
        </Typography>
      </Box>
    </Box>
  );
}

const useFormContext = () => {
  return React.useContext(FormContext);
};

const FormContext = React.createContext();

export default function LoanApplicationStepper() {
  const { user } = useUser();
  console.log(user);
  const methods = useForm({
    mode: "onTouched",
  });
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({});
  useEffect(() => {
    console.log(formData);
  }, [formData]);

  async function addData(formData) {
    try {
      const { error } = await supabase.from("loanDetails").insert({
        fullName: formData.fullName,
        email: formData.email,
        occupation: formData.occupation,
        income: formData.income,
        loanAmount: formData.loanAmount,
        loanPurpose: formData.loanPurpose,
        userId: user.userId,
      });

      if (error) throw error;
    } catch (error) {}
  }
  const navigate = useNavigate();

  const onNext = (data) => {
    const updatedFormData = { ...formData, ...data };

    if (activeStep === steps.length - 1) {
      addData(updatedFormData)
        .then(() => {
          setFormData(updatedFormData);
          setActiveStep((prev) => prev + 1);
        })
        .catch((error) => {
          console.error("Error submitting form:", error);
          alert("There was an issue submitting your loan request.");
        });
    } else {
      setFormData(updatedFormData);
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    methods.reset();
    setFormData({});
  };

  const onSubmit = methods.handleSubmit(onNext);

  return (
    <FormProvider {...methods}>
      <FormContext.Provider value={methods}>
        <Box
          sx={{
            width: "95%",
            mx: "auto",
            p: 3,
            bgcolor: "#b2ebf2",
            borderRadius: 6,
            padding: 2,
          }}
        >
          <Stepper activeStep={activeStep}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <form onSubmit={onSubmit}>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h3" sx={{ mt: 5, mb: 5 }}>
                  Loan request successfully made!
                </Typography>

                <Box sx={{ display: "flex", justifyContent: "center", pt: 2 }}>
                  <Button
                    onClick={handleReset}
                    variant="contained"
                    sx={{ mr: 2 }}
                  >
                    Make Another Request
                  </Button>
                </Box>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Box sx={{ mt: 3, mb: 2 }}>
                  {activeStep === 0 && <PersonalInfoForm />}
                  {activeStep === 1 && <IncomeSourceForm />}
                  {activeStep === 2 && <LoanDetailsForm />}
                  {activeStep === 3 && <ReviewForm formData={formData} />}
                </Box>

                <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                  <Button
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                  >
                    Back
                  </Button>
                  <Box sx={{ flex: "1 1 auto" }} />
                  <Button type="submit">
                    {activeStep === steps.length - 1 ? "Finish" : "Next"}
                  </Button>
                </Box>
              </React.Fragment>
            )}
          </form>
        </Box>
      </FormContext.Provider>
    </FormProvider>
  );
}
