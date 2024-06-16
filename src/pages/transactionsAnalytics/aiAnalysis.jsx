import React from 'react';
import { Paper, Grid, Box, Divider, TextField, Typography, List, ListItem, ListItemIcon, ListItemText, Avatar, Fab } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { styled } from '@mui/system';

const ChatSection = styled(Paper)({
  width: '100%',
  height: '80vh',
});

const BorderRight500 = styled(Box)({
  borderRight: '1px solid #e0e0e0',
});

const MessageArea = styled(List)({
  height: '70vh',
  overflowY: 'auto',
});

const AiAnalysis = () => {
  return (
    <Box>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h5" className="header-message">Chat</Typography>
        </Grid>
      </Grid>
      <ChatSection>
        <Grid container>
          <Grid item xs={3}>
            <BorderRight500>
              <List>
                <ListItem button key="RemySharp">
                  <ListItemIcon>
                    <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" />
                  </ListItemIcon>
                  <ListItemText primary="John Wick" />
                </ListItem>
              </List>
              <Divider />
              <Box sx={{ padding: '10px' }}>
                <TextField id="outlined-basic-email" label="Search" variant="outlined" fullWidth />
              </Box>
              <Divider />
              <List>
                <ListItem button key="RemySharp">
                  <ListItemIcon>
                    <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" />
                  </ListItemIcon>
                  <ListItemText primary="Remy Sharp" />
                  <ListItemText secondary="online" align="right" />
                </ListItem>
                <ListItem button key="Alice">
                  <ListItemIcon>
                    <Avatar alt="Alice" src="https://material-ui.com/static/images/avatar/3.jpg" />
                  </ListItemIcon>
                  <ListItemText primary="Alice" />
                </ListItem>
                <ListItem button key="CindyBaker">
                  <ListItemIcon>
                    <Avatar alt="Cindy Baker" src="https://material-ui.com/static/images/avatar/2.jpg" />
                  </ListItemIcon>
                  <ListItemText primary="Cindy Baker" />
                </ListItem>
              </List>
            </BorderRight500>
          </Grid>
          <Grid item xs={9}>
            <MessageArea>
              <ListItem key="1">
                <Grid container>
                  <Grid item xs={12}>
                    <ListItemText align="right" primary="Hey man, What's up ?" />
                  </Grid>
                  <Grid item xs={12}>
                    <ListItemText align="right" secondary="09:30" />
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem key="2">
                <Grid container>
                  <Grid item xs={12}>
                    <ListItemText align="left" primary="Hey, I am Good! What about you ?" />
                  </Grid>
                  <Grid item xs={12}>
                    <ListItemText align="left" secondary="09:31" />
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem key="3">
                <Grid container>
                  <Grid item xs={12}>
                    <ListItemText align="right" primary="Cool. I am good, let's catch up!" />
                  </Grid>
                  <Grid item xs={12}>
                    <ListItemText align="right" secondary="10:30" />
                  </Grid>
                </Grid>
              </ListItem>
            </MessageArea>
            <Divider />
            <Grid container sx={{ padding: '20px' }}>
              <Grid item xs={11}>
                <TextField id="outlined-basic-email" label="Type Something" fullWidth />
              </Grid>
              <Grid item xs={1} align="right">
                <Fab color="primary" aria-label="send">
                  <SendIcon />
                </Fab>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </ChatSection>
    </Box>
  );
};

export default AiAnalysis;