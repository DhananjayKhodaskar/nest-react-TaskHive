import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

const Input = ({ input, setInput }) => {
  return (
    <Box
      component="form"
      sx={{ "& > :not(style)": { m: 1, width: "25ch" } }}
      noValidate
      autoComplete="off"
    >
      <TextField
        label="Outlined secondary"
        color="secondary"
        onChange={(e) => setInput(e.target.value)}
        value={input}
      />
    </Box>
  );
};

export default Input;
