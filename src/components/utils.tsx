import { IconButton, InputAdornment } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import React from "react";

export const getVisibilityAdornment = (
  showPassword: boolean,
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>
) => {
  return (
    <InputAdornment position="end">
      <IconButton
        aria-label="toggle password visibility"
        onClick={() => setShowPassword((show) => !show)}
        onMouseDown={(event) => event.preventDefault()}
        edge="end"
      >
        {showPassword ? <VisibilityOff /> : <Visibility />}
      </IconButton>
    </InputAdornment>
  );
};
