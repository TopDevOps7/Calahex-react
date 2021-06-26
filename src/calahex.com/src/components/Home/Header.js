import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: 20
  },
  image: {
    boxShadow:
      '25px 60px 125px -25px rgba(80,102,144,.1), 16px 40px 75px -40px rgba(0,0,0,.2)',
    borderRadius: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      maxWidth: 500,
    },
  },
  Title: {
    textAlign: 'center',
    fontSize: 60,
    fontWeight: 600,
    color: theme.palette.primary.main,
    fontFamily: '"Segoe UI", Arial, sans-serif',
    [theme.breakpoints.down("sm")]: {
      fontSize: 50
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: 25
    },
  },
  center: {
    textAlign: 'center'
  },
  signup: {
    borderRadius: 20,
    margin: 10,
    textTransform: 'none'
  },
  login: {
    borderRadius: 20,
    margin: 10,
    border: `1px solid ${theme.palette.primary.main}`,
    background: 'white',
    textTransform: 'none',
    color: theme.palette.primary.main,
  },
  links: {
    marginTop: theme.spacing(3),
  },
  link: {
    textDecoration: 'none',
    margin: '0 3%',
    fontSize: 20,
    color: theme.palette.primary.main
  },
  nonDecoration: {
    textDecoration: 'none',
  },
  itemWrap: {
    width: 700,
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
    margin: '0 auto'
  },
  navigationContainer: {
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down("sm")]: {
        display: 'block',
        alignItems: 'center'
    },
  },
  copyrightListItem: {
    width: 'auto',
  },
  listItemText: {
    color: theme.palette.primary.main,
    text: 'center',
    textDecoration: 'none',
    lineHeight: '1'
  },

}));

const Header = props => {
  const { className, isAuthenticated, ...rest } = props;
  const classes = useStyles();
  const menuItems = [
    {
        name: 'Token Listint',
        link: '/dashboard',
    },
    {
        name: 'Token Exchange',
        link: '/dashboard',
    },
    {
        name: 'Buy Crypto',
        link: '/dashboard',
    },
    {
        name: 'New',
        link: '/dashboard',
    },
   
];



  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <h1 className={classes.Title}>
          Caribbean and Latin America <br />
            Hybrid Exchange
        </h1> 
        {!isAuthenticated && 
          <div className={classes.center}>
          <Link to="sign-up" className={classes.nonDecoration}>
            <Button
              color="primary"
              variant="contained"
              size="large"
              className={classes.signup}
            >
              Sign Up
            </Button>
          </Link>
          <Link to="login" className={classes.nonDecoration}>
            <Button
              color="default"
              variant="contained"
              size="large"
              className={classes.login}
            >
              Log In
            </Button>
          </Link>
        </div>
        }
        <Grid container className={classes.itemWrap}>
          <Grid item md={3} sm={6} xs={12} className={clsx(classes.center, classes.links)}>
            <Link to={''} className={classes.link} >Token Listing</Link>
          </Grid>
          <Grid item md={4} sm={6} xs={12} className={clsx(classes.center, classes.links)}>
            <Link to={''} className={classes.link} >Token Exchange</Link>
          </Grid>
          <Grid item md={3} sm={6} xs={12} className={clsx(classes.center, classes.links)}>
            <Link to={''} className={classes.link} >Buy Crypto</Link>
          </Grid>
          <Grid item md={2} sm={6} xs={12} className={clsx(classes.center, classes.links)}>
            <Link to={''} className={classes.link} >New</Link>
          </Grid>
        </Grid>
    </div>
  );
};

Header.propTypes = {
  /**
   * External classes
   */
  className: PropTypes.string,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
