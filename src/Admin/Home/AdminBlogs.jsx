import axios from "axios";

import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {
  Button,
  CardActionArea,
  CardActions,
  Box,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function AdminBlogs() {
  const navigate = useNavigate();

  const [blogs, setBlogs] = React.useState([]);

  const [loading, setLoading] = React.useState(true);
  const [isDeleting, setIsDeleting] = React.useState(null);
  const getBlogs = async () => {
    const res = await axios.get(
      "https://648fc4121e6aa71680ca0aea.mockapi.io/blog"
    );
    setBlogs(res.data.reverse());
    setLoading(false);
  };

  const handleDelete = async (id) => {
    setIsDeleting(id);
    await axios.delete(
      `https://648fc4121e6aa71680ca0aea.mockapi.io/blog/${id}`
    );
    getBlogs();
  };

  React.useEffect(() => {
    getBlogs();
  }, []); //array dependency
  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        justifyContent: "center",
        flexWrap: "wrap",
      }}
    >
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "60vh",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        blogs.map((data) => {
          return (
            <Card key={data.id} sx={{ maxWidth: 345 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image={data.image}
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {data.title.slice(0, 20)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {data.description.slice(0, 100)}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small" color="primary" onClick={()=> navigate(`/admin/edit/${data.id}`)}>
                  Edit
                </Button>
                <Button
                  size="small"
                  color="warning"
                  onClick={() => handleDelete(data.id)}
                >
                  {isDeleting === data.id ? "deleting...." : "delete"}
                </Button>
              </CardActions>
            </Card>
          );
        })
      )}
    </Box>
  );
}
