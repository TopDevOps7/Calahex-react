import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { 
  Grid,
  Hidden
} from '@material-ui/core';
import SignUpForm  from '../../components/Auth/SignUpForm';
import ControlledAccordions from '../../components/Auth/ControlledAccordions';

import { SignupUser } from '../../redux/actions/auth';

import jsonData from "../../resources/auth.json";
import { connect } from 'react-redux';
import clsx from 'clsx';


const useStyles = makeStyles(theme => ({
  root: {
    color: theme.palette.primary.main,
  },
  formContainer: {
    // height: '100%',
    marginBottom: 20,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: `calc(100vh - ${theme.mixins.toolbar['@media (min-width:600px)'].minHeight}px)`,
    maxWidth: 350,
    [theme.breakpoints.down("sm")]: {
      maxWidth: '100%'
    },
    //margin: `0 50px`,
  },
  title: {
    marginBottom: 20,
    fontWeight: 400,
    fontSize: 35,
    color: theme.palette.primary.main,
    [theme.breakpoints.down("xs")]: {
      fontSize: 25,
      marginBottom: 15,
      marginTop:60,
    },
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
  },
  siderlist: {
    fontSize: 12,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '80%'
  },
  siderTitle: {
    color: 'white',
    fontWeight: 400,
  },
  section: {
    paddingTop: 0,
    paddingBottom: 0,
  },
  font11: {
    fontSize: 10
  },
  marginBottom50: {
    marginBottom: 80
  },
  center: {
    textAlign: 'center',
    marginTop: 100,
  }
}));

const SignUp = (props) => {
  const classes = useStyles();
  const { accordions } = jsonData;

  return (
    <div className={classes.root}>
        <Grid container space={10}>
          <Hidden xsDown>
            <Grid item xs={4} md={3} className={classes.sider}>
              <h2 className={clsx(classes.siderTitle, classes.center)}>Calahex News</h2>
              {
                accordions.map((item, index) => {
                  return (
                      <ControlledAccordions key={index} keyword={`panel${index+1}`}  title={item.title} subitems={item.subitems} />
                  )
                })
              }
            </Grid>
          </Hidden>
          <Grid item md={2} sm={1} xs={1}/>
          <Grid item xs={10} sm={6} md={6}>
            <div className={classes.formContainer}>
              <h1 className={classes.title}>SIGN UP</h1>
              <SignUpForm onSubmit={props.SignupUser}/>
            </div>
          </Grid>
        </Grid>
    </div>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.token.isAuthenticated
});

const mapDispatchToProps = {
  SignupUser
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
