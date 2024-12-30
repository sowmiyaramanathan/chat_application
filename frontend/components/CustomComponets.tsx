import { TextField, styled } from "@mui/material";

const CustomTextField = styled(TextField)(({ theme }) => ({
  "& .MuiFormLabel-root": {
    color: theme.palette.msgBg.main, // Default label color
    "&.Mui-focused": {
      color: theme.palette.primary.light, // Focused label color
    },
  },

  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.msgBg.main, // Default border color
  },
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.primary.light, // Border color when focused
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.primary.light, // Border color on hover
    },
  },

  "& .MuiInputBase-input": {
    color: theme.palette.primary.light, // Input text color
  },
}));

const MessageField = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-input::placeholder": {
    color: theme.palette.primary.contrastText,
  },

  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.msgBg.main,
  },
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.primary.contrastText,
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.primary.contrastText,
    },
  },

  "& .MuiInputBase-input": {
    color: theme.palette.primary.contrastText,
  },
}));

export { CustomTextField, MessageField };
