import React from "react";
import { Grid, CircularProgress, Container } from "@material-ui/core";
import { useSelector } from "react-redux";

import Post from "./Post/Post";
import useStyles from "./styles";

const Posts = () => {
  const classes = useStyles();
  const posts = useSelector((state) => state.posts);

  // !posts.length
  return !posts.length ? (
    <Container>
      <CircularProgress />
    </Container>
  ) : (
    <Grid
      className={classes.mainContainer}
      container
      alignItems="stretch"
      spacing={3}
    >
      {posts.map((post) => (
        <Grid key={post._id} item xs={12} sm={6}>
          <Post post={post} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Posts;
