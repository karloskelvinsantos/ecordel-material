import React, { FormEvent, useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import MenuAppBar from "../components/MenuAppBar";
import Copyright from "../components/Copyright";
import { InputAdornment, TextField } from "@material-ui/core";
import { SearchOutlined } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

const cards = [1, 2, 3, 4, 5];

export default function Home() {
  const classes = useStyles();
  const [cordels, setCordels] = useState<any>([]);
  const [serchText, setSearchText] = useState<string>("");

  useEffect(() => {
    fetch("https://ecordel-restapi.herokuapp.com/cordels")
      .then((response) => response.json())
      .then((data) => setCordels(data.content));
  }, []);

  function handleSearchCordel(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    fetch(`https://ecordel-restapi.herokuapp.com/cordels?title=${serchText}`)
      .then((response) => response.json())
      .then((data) => setCordels(data.content));
  }

  return (
    <React.Fragment>
      <MenuAppBar />
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              E-cordel App
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="textSecondary"
              paragraph
            >
              Visite nosso site para saber mais sobre o projeto.
            </Typography>
            <Grid container spacing={2} justify="center">
              <Grid item>
                <Button variant="contained" color="primary">
                  Ver Site
                </Button>
              </Grid>
            </Grid>
          </Container>
        </div>
        <div className={classes.heroButtons}>
          <Container maxWidth="lg">
            <form noValidate autoComplete="off" onSubmit={handleSearchCordel}>
              <TextField
                size="medium"
                fullWidth={true}
                id="outlined-basic"
                label="Pesquise por título"
                variant="outlined"
                onChange={(e) => setSearchText(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchOutlined />
                    </InputAdornment>
                  ),
                }}
              />
            </form>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {cordels.map((cordel) => (
              <Grid item key={cordel.id} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={cordel.xilogravuraUrl}
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {cordel.title}
                    </Typography>
                    <Typography>
                      This is a media card. You can use this section to describe
                      the content.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary">
                      View
                    </Button>
                    <Button size="small" color="primary">
                      Edit
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography
          variant="subtitle1"
          align="center"
          color="textSecondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}
