import React, { useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { toast } from 'react-toastify';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  appBar: {
    backgroundColor: 'transparent !important',
    boxShadow: 'none !important',
  },
}));

export default function Navbar() {
  const classes = useStyles();
  const [user, setUser] = React.useState(!!localStorage.getItem('user'));
  const navigate = useNavigate();
  const clickHandler = () => {
    axios.post('/auth/logout')
      .then((res) => {
        if (res.status === 200) {
          toast.success(res.data.message);
          localStorage.clear();
          setUser(false);
          navigate('/login');
        }
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  useEffect(() => {
    const usr = localStorage.getItem('user');
    if (usr) {
      setUser(() => true);
    }
  }, []);

  return (
    <AppBar className={classes.appBar}>
      <Box sx={{ flexGrow: 1 }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} />
          {user && (
            <Button
              color="inherit"
              sx={{
                textTransform: 'uppercase',
                height: '40px',
                borderRadius: '40px',
                backgroundColor: '#eec10f',
                border: 'none',
                outline: 'none',
                cursor: 'pointer',
                fontSize: '1em',
                color: 'black',
                fontWeight: 'bold',
                padding: '0 70px 0 70px',
                '&:hover': {
                  backgroundColor: '#eec10f',
                },
                '@media (max-width: 768px)': {
                  padding: '0 25px 0 25px',
                  fontSize: '0.8em',
                },
                fontFamily: 'poppins',
              }}
              onClick={clickHandler}
            >
              Logout
            </Button>
          ) }
        </Toolbar>
        {/* </AppBar> */}
      </Box>
    </AppBar>
  );
}
