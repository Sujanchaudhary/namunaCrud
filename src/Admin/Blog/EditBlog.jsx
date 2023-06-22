import * as React from "react";
import Box from "@mui/material/Box";
import { Button, Input, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function EditBlog() {
  const [clicked, setClicked] = React.useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const [singleBlog, setSingleBlog] = React.useState({
    title: "",
    author: "",
    image: "",
    description: "",
  });

  const getSingleBlog = async () => {
    let res = await axios.get(
      `https://648fc4121e6aa71680ca0aea.mockapi.io/blog/${id}`
    );
    setSingleBlog(res.data);
  };
  React.useEffect(() => {
    getSingleBlog();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      singleBlog.title === "" ||
      singleBlog.description === "" ||
      singleBlog.author === "" ||
      singleBlog.image === ""
    ) {
      alert("Please fill all the fields");
      return;
    }
    setClicked(true);
    await axios.put(
      `https://648fc4121e6aa71680ca0aea.mockapi.io/blog/${id}`,
      singleBlog
    );
    navigate("/admin/home");
  };

  return (
    <Box
      component="form"
      sx={{ display: "grid", gap: 5 }}
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <Input
        type="text"
        id="filled-basic"
        variant="filled"
        name="title"
        onChange={(e) =>
          setSingleBlog({ ...singleBlog, title: e.target.value })
        }
        value={singleBlog.title}
      />
      <Typography color="error">
        {" "}
        {singleBlog.title == "" ? "Title is empty" : ""}
      </Typography>
      <Input
        type="url"
        id="filled-basic"
        variant="filled"
        name="image"
        onChange={(e) =>
          setSingleBlog({ ...singleBlog, image: e.target.value })
        }
        value={singleBlog.image}
      />
      <Input
        placeholder={singleBlog.author}
        id="filled-basic"
        variant="filled"
        name="author"
        onChange={(e) =>
          setSingleBlog({ ...singleBlog, author: e.target.value })
        }
        value={singleBlog.author}
      />
      <Input
        placeholder={singleBlog.description}
        id="filled-basic"
        label="description"
        variant="filled"
        name="description"
        onChange={(e) =>
          setSingleBlog({ ...singleBlog, description: e.target.value })
        }
        value={singleBlog.description}
      />
      <Button type="submit" variant="contained">
        Edit blog
      </Button>
    </Box>
  );
}
