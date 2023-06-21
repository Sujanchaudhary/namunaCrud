import { Box, Divider, Typography } from "@mui/material";
import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";

const SingleBlog = () => {
  const { id } = useParams();
  const [blog, setBlog] = React.useState({});
  const getSingleBlog = async () => {
    const res = await axios.get(
      `https://648fc4121e6aa71680ca0aea.mockapi.io/blog/${id}`
    );
    setBlog(res.data);
    console.log(res.data)
  };

  React.useEffect(() => {
    getSingleBlog();
  }, []);
  return (
    <div>
      <Box>
        <Typography variant="h3" sx={{ pt: 3, pb: 2, textAlign: "center" }}>
          {blog.title}
        </Typography>

        <img src={blog.image} style={{ width: "100%", height: "500px" }} />
        <Typography sx={{ pt: 3, pb: 2 }}>@{blog.author}</Typography>
        <Divider />
        <Typography sx={{ pt: 3 }}>{blog.description}</Typography>
      </Box>
    </div>
  );
};

export default SingleBlog;
