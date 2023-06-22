import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import axios from "axios";
import React from "react";

export default function AddBlog() {
 

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    let formData = {
      title: data.get("title"),
      author: data.get("author"),
      image: data.get("image"),
      description: data.get("description"),
    };
    let res = await axios.post(
      "https://648fc4121e6aa71680ca0aea.mockapi.io/blog",
      formData
    );
    alert('added successfully')
  };
  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "25ch" },
        display: "grid",
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <TextField
        id="outlined-basic"
        label="title"
        variant="outlined"
        name="title"
      />
      <TextField
        id="outlined-basic"
        label="author"
        variant="outlined"
        name="author"
      />

      <TextField
        id="outlined-basic"
        label="image"
        variant="outlined"
        name="image"
      />
      <TextField
        id="outlined-basic"
        label="description"
        variant="outlined"
        name="description"
      />

      <Button type="submit">Add blog</Button>
    </Box>
  );
}
