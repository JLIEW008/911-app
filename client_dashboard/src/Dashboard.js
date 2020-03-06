import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { mainListItems, secondaryListItems } from './listItems';
import { ChatFeed, Message } from 'react-chat-ui';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import Chart from './Chart';
import CallerInfo from './CallerInfo';
import AlertInfo from './AlertInfo';

// firebase API
import firebase from './config/firebase';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));

export default function Dashboard() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  /* Hardcode messages */
  const state = {
    messages: [
      new Message({
        id: 1,
        message: "Help!!!!!!",
      }), // Gray bubble
      new Message({ id: 0, message: "What is the current situation?" }), // Blue bubble
    ]
  };

  const [alarm, setAlarm] = React.useState(false);
  // Initialize with listening to our
    // messages collection. The second argument
    // with the empty array makes sure the
    // function only executes once
  useEffect(() => {
    listenForAlarm();
  }, []);


  // Use firestore to listen for changes within
  // our newly created collection
  const listenForAlarm = () => {
      firebase.firestore().collection('alarm')
      .doc('alarm').get().then(function (doc) {
        if (doc.exists) {
          setAlarm(doc.data());
        }
      }).catch(function (error) {
        console.log("Error getting document:", error);
      });
  }

  /* Hardcode map details */
  const MyMapComponent = withScriptjs(withGoogleMap((props) =>
    <GoogleMap
      defaultZoom={12}
      defaultCenter={{ lat: 37.8719, lng: -122.2585 }}
    >
      {props.isMarkerShown && <Marker position={{ lat: 37.8715, lng: -122.2730 }} />}
    </GoogleMap>
  ));

  return (
    <div className={classes.root}>
      <CssBaseline />
      {
      // <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
      //   <Toolbar className={classes.toolbar}>
      //     <IconButton
      //       edge="start"
      //       color="inherit"
      //       aria-label="open drawer"
      //       onClick={handleDrawerOpen}
      //       className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
      //     >
      //       <MenuIcon />
      //     </IconButton>
      //     <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
      //       Dashboard
      //     </Typography>
      //     <IconButton color="inherit">
      //       <Badge badgeContent={4} color="secondary">
      //         <NotificationsIcon />
      //       </Badge>
      //     </IconButton>
      //   </Toolbar>
      // </AppBar>
      // <Drawer
      //   variant="permanent"
      //   classes={{
      //     paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
      //   }}
      //   open={open}
      // >
      //   <div className={classes.toolbarIcon}>
      //     <IconButton onClick={handleDrawerClose}>
      //       <ChevronLeftIcon />
      //     </IconButton>
      //   </div>
      //   <Divider />
      //   <List>{mainListItems}</List>
      //   <Divider />
      //   <List>{secondaryListItems}</List>
      // </Drawer>
      }
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {/* Chart - top left */}
            <Grid item xs={12} md={8} lg={6}>
              <Paper className={fixedHeightPaper}>
                <Chart />
              </Paper>
            </Grid>
            {/* top right */}
            <Grid item xs={12} md={5} lg={6}>
              <Paper className={fixedHeightPaper}>
                <CallerInfo />
              </Paper>
            </Grid>
            {/* Bottom left */}
            <Grid item xs={12} md={5} lg={6}>
              <Paper className={classes.paper}>
              <MyMapComponent
                isMarkerShown
                googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `400px` }} />}
                mapElement={<div style={{ height: `100%` }} />}
                />
              </Paper>
            </Grid>
            {/* IOT devices - Bottom right */}
            <Grid item xs={12} md={5} lg={6}>
              <AlertInfo/>
            </Grid>

            {/* Chat - Bottom right */}
            {/*}<Grid item xs={12} md={5} lg={6}>
              <Paper className={fixedHeightPaper}>
                <ChatFeed
                  messages={state.messages} // Boolean: list of message objects
                  isTyping={state.is_typing} // Boolean: is the recipient typing
                  hasInputField={false} // Boolean: use our input, or use your own
                  showSenderName // show the name of the user who sent the message
                  bubblesCentered={false} //Boolean should the bubbles be centered in the feed?
                  // JSON: Custom bubble styles
                  bubbleStyles={
                    {
                      text: {
                        fontSize: 14
                      },
                      chatbubble: {
                        borderRadius: 70,
                        padding: 10
                      }
                    }
                  }
                  />
              </Paper>
            </Grid>
            */}
          </Grid>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
}
