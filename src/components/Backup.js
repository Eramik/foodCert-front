import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { createStyles, withStyles } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import { useCookies } from 'react-cookie';
import cfg from '../config/config'
import { getBackup, sendBackup } from '../services/data';
import { useFilePicker } from 'use-file-picker';


const styles = (theme) => createStyles({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

export default withStyles(styles)(function Backup({ classes }) {
  const [openFileSelector, { filesContent, loading }] = useFilePicker({
    accept: '.json',
  });
  const [cookies] = useCookies();
  const [fileProcessed, setFileProcessed] = useState(true);
  const [displayText, setDisplayText] = useState('');
  const langPack = cfg[cookies.lang ? cookies.lang : 'en'];

  const handleDownloadBackup = async () => {
    await getBackup(cookies.auth_token);
  }

  const handleUploadBackup = () => {
    openFileSelector();
    setFileProcessed(false);
  }
  const processBackup = async () => {
    try {
      setFileProcessed(true);
      setDisplayText('Processing backup.');
      await sendBackup(cookies.auth_token, JSON.parse(filesContent[0].content));
      setDisplayText('Backup uploaded successfully.');
    } catch (e) {
      setDisplayText(e.message);
    }
  }

  useEffect(() => {
    if (!fileProcessed && filesContent.length > 0) {
      processBackup();
    }
  }, [filesContent]);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          {langPack.dataBackups}
        </Typography>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleDownloadBackup}
          >
            {langPack.download}
          </Button>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleUploadBackup}
          >
            {langPack.upload}
          </Button>
          <Typography component="h1" variant="subtitle1">
            {displayText}
          </Typography>
      </div>
    </Container>
  );
});