import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { styled } from '@mui/system';

const WhiteCard = styled(Card)({
  backgroundColor: '#FFFFFF',
  padding: '20px',
  marginBottom: '20px',
});

const SinglePrediction = () => {
  const [displayName, setDisplayName] = React.useState('');
  const [transactionDate, setTransactionDate] = React.useState('');
  const [transactionTime, setTransactionTime] = React.useState('');
  const [transactionType, setTransactionType] = React.useState('');
  const [involvedParty, setInvolvedParty] = React.useState('');
  const [arg2, setArg2] = React.useState('');
  const [location, setLocation] = React.useState('');
  const [open, setOpen] = React.useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({
      displayName,
      transactionDate,
      transactionTime,
      transactionType,
      involvedParty,
      arg2,
      location,
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <WhiteCard>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Transaction Scenario
          </Typography>
          <form onSubmit={handleFormSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Display Name"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  label="Transaction Date"
                  type="date"
                  value={transactionDate}
                  onChange={(e) => setTransactionDate(e.target.value)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  label="Transaction Time"
                  type="time"
                  value={transactionTime}
                  onChange={(e) => setTransactionTime(e.target.value)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel id="transaction-type-label">Transaction Type</InputLabel>
                  <Select
                    label="Transaction Type"
                    labelId="transaction-type-label"
                    id="transaction-type"
                    value={transactionType}
                    onChange={(e) => setTransactionType(e.target.value)}
                  >
                    <MenuItem value="Action 1">Action 1</MenuItem>
                    <MenuItem value="Action 2">Action 2</MenuItem>
                    <MenuItem value="Action 3">Action 3</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  label="Involved Party"
                  value={involvedParty}
                  onChange={(e) => setInvolvedParty(e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Arg 2"
                  value={arg2}
                  onChange={(e) => setArg2(e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </Grid>
            </Grid>
            <Box mt={2} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button type="submit" variant="contained" color="primary">
                Predict
              </Button>
            </Box>
          </form>
        </CardContent>
      </WhiteCard>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Prediction Result</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This transaction is 88% likely to be money laundering.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SinglePrediction;