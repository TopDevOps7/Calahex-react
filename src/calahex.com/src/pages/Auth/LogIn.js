import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { 
  Grid,
  Hidden
} from '@material-ui/core';
import LoginForm  from '../../components/Auth/LoginForm';
import ControlledAccordions from '../../components/Auth/ControlledAccordions';
import logoImg from "../../assets/logo.png";
import clsx from 'clsx';

import jsonData from "../../resources/auth.json";

const useStyles = makeStyles(theme => ({
  root: {
    color: theme.palette.primary.main,
  },
  formContainer: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: `calc(100vh - ${theme.mixins.toolbar['@media (min-width:600px)'].minHeight}px)`,
    maxWidth: 350,
    [theme.breakpoints.down("sm")]: {
      maxWidth: '100%'
    },
  },
  title: {
    marginBottom: 20,
    fontWeight: 400,
    fontSize: 35,
    color: theme.palette.primary.main,
  },
  sider: {
    background: theme.palette.primary.main,
    minHeight: `calc(100vh - ${theme.mixins.toolbar['@media (min-width:600px)'].minHeight}px + 64px)`,
    display: 'flex',
    alignItems: 'center',
    paddingTop: '25%',
    flexDirection: 'column',
    color: 'white',
    [theme.breakpoints.up("md")]: {
      paddingTop: '10%'
    },
    [theme.breakpoints.down("xs")]: {
      paddingTop: '10%',
      paddingRight: 5,
      paddingLeft: 5
    },
  },
  siderTitle: {
    color: 'white',
    fontWeight: 400,
  },
  logoImg: {
    marginBottom: theme.spacing(2)
  },
  center: {
    textAlign: 'center',
    marginTop: 100,
  }
}));

const Login = () => {
  const classes = useStyles();
  const { accordions } = jsonData;

  return (
    <div className={classes.root}>
        <Grid container space={1}>
          <Hidden xsDown>
          <Grid item md={3} xs={4} className={classes.sider}>
            <h2 className={clsx(classes.siderTitle, classes.center)}>Calahex News</h2>
            {
              accordions.map((item, index) => {
                return (
                  <ControlledAccordions key={index} keyword={`panel${index}`}  title={item.title} subitems={item.subitems}>
                  </ControlledAccordions>
                )
              })
            }
          </Grid>

          </Hidden>
          <Grid item md={2} sm={1} xs={1}/>
          <Grid item xs={10} sm={6} md={6}>
            <div className={classes.formContainer}>
              <img src={logoImg} className={classes.logoImg} alt="logo" />
              <LoginForm />
            </div>
          </Grid>
        </Grid>
    </div>
  );
};

export default Login;
