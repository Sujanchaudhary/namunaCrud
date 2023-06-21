import axios from "axios";

import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const [blogs, setBlogs] = React.useState([]);
  const getBlogs = async () => {
    const res = await axios.get(
      "https://648fc4121e6aa71680ca0aea.mockapi.io/blog"
    );
    setBlogs(res.data);
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
      {blogs.map((data) => {
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
              <Button size="small" color="primary" onClick={()=> navigate(`/blog/${data.id}`)} >
                Learn More
              </Button>
            </CardActions>
          </Card>
        );
      })}
    </Box>
  );
}
