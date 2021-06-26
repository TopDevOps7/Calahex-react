import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { FormControl, Grid, makeStyles, MenuItem, Select, Typography } from '@material-ui/core';
import validate from 'validate.js';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    padding: '30px 20px',
    boxShadow: '1px 1px 8px 4px #5855551e'
  },
  font13: {
    fontSize: 12
  },
  label: {
    textAlign: 'right',
    marginTop: 10
  },
  formControl: {
    minWidth: 150
  },
  fileInput: {
    marginTop: 10
  }
}));

const schema = {
  tokenName: {
    presence: { allowEmpty: false, message: 'is required' },
    // tokenName: true,
    length: {
      maximum: 300,
    },
  },
  tokenId: {
    presence: { allowEmpty: false, message: 'is required' },
    // length: {
    //   minimum: 8,
    // },
  },
  tokenSymbol: {
    presence: { allowEmpty: false, message: 'is required' },
  },
  // logoUrl: {
  //   presence: { allowEmpty: false, message: 'is required' },
  // },
};

export default function AddModal(props) {
  const { isVisible, onClose, fullWidth, maxWidth } = props;
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    setOpen(isVisible);
  }, [isVisible])


  const [formState, setFormState] = React.useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {},
  });

  React.useEffect(() => {
    const errors = validate(formState.values, schema);

    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {},
    }));
  }, [formState.values]);

  const handleChange = event => {
    event.persist();

    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.type === 'checkbox'
            ? event.target.checked
            : event.target.value,
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true,
      },
    }));
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (formState.isValid) {
      props.createToken(formState.values);
      // console.log(formState.values, '--=-=-=-===----==-000-')
    }

    console.log(formState)

    setFormState(formState => ({
      ...formState,
      touched: {
        ...formState.touched,
        ...formState.errors,
      },
    }));
  };

  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;

  return (
    <div>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="form-dialog-title"
        fullWidth={fullWidth}
        maxWidth={maxWidth}
      >
        <DialogTitle id="form-dialog-title">Token Listing</DialogTitle>
        <DialogContent>
          <form name="password-reset-form" method="post" onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={4} className={classes.label}>
                <label htmlFor="tokenName" className="required">Base Token Name</label>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  placeholder="Base Token Name"
                  // label="E-mail *"
                  className={classes.font13}
                  variant="outlined"
                  size="small"
                  name="tokenName"
                  fullWidth
                  helperText={hasError('tokenName') ? formState.errors.tokenName[0] : null}
                  error={hasError('tokenName')}
                  onChange={handleChange}
                  type="type"
                  value={formState.values.tokenName || ''}
                />
              </Grid>
              <Grid item xs={4} className={classes.label}>
                <label htmlFor="tokenId" className="required">Base Token ID</label>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  placeholder="Only support TRC20 token yet"
                  // label="Password *"
                  className={classes.font13}
                  variant="outlined"
                  size="small"
                  name="tokenId"
                  fullWidth
                  helperText={
                    hasError('tokenId') ? formState.errors.tokenId[0] : null
                  }
                  error={hasError('tokenId')}
                  onChange={handleChange}
                  type="text"
                  value={formState.values.tokenId || ''}
                />
              </Grid>
              <Grid item xs={4} className={classes.label}>
                <label htmlFor="tokenSymbol" className="required">Base Token Symbol</label>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  placeholder="Base Token Symbol"
                  // label="Confirm Password *"
                  className={classes.font13}
                  variant="outlined"
                  size="small"
                  name="tokenSymbol"
                  fullWidth
                  helperText={
                    hasError('tokenSymbol') ? formState.errors.tokenSymbol[0] : null
                  }
                  error={hasError('tokenSymbol')}
                  onChange={handleChange}
                  type="text"
                  value={formState.values.tokenSymbol || ''}
                />
              </Grid>
              <Grid item xs={4} className={classes.label}>
                <label htmlFor="decimal">Decimal</label>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  // label="Confirm Password *"
                  className={classes.font13}
                  variant="outlined"
                  size="small"
                  name="decimal"
                  fullWidth
                  helperText={
                    hasError('decimal') ? formState.errors.decimal[0] : null
                  }
                  error={hasError('decimal')}
                  onChange={handleChange}
                  type="number"
                  value={formState.values.decimal || 0}
                />
              </Grid>
              <Grid item xs={4} className={classes.label}>
                <label htmlFor="whitePaper">Whitepaper</label>
              </Grid>
              <Grid item xs={8}>
                <input type="file" className={classes.fileInput} name="whitepaper" />
              </Grid>
              <Grid item xs={4} className={classes.label}>
                <label htmlFor="pairType" className="required">Pair Type</label>
              </Grid>
              <Grid item xs={8}>
                <FormControl variant="outlined" size="small" className={classes.formControl}>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    name="pairType"
                    onChange={handleChange}
                    value={formState.values.pairType || 10}
                  >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={4} className={classes.label}>
                <label htmlFor="logoUrl" className="required">Logo URL</label>
              </Grid>
              <Grid item xs={8}>
                <input type="file" className={classes.fileInput} name="logoUrl" />
              </Grid>
              <Grid item xs={6} />
              <Grid item xs={3}>
                <Button
                  size="small"
                  variant="contained"
                  type="submit"
                  color="primary"
                  fullWidth
                >
                  Submit
                </Button>
              </Grid>
              <Grid item xs={3}>
                <Button onClick={onClose} size="small"
                  variant="contained"
                  fullWidth
                  color="secondary">
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
        </DialogActions>
      </Dialog>
    </div>
  );
}