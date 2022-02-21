import Grid from '@mui/material/Grid'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Header from './components/header.js'
import Main from './components/main.js'
import Login from './components/auth/login.js'
import Register from './components/auth/register.js';

const theme = createTheme({
  palette: {
    mode: 'dark',
  },

});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Login />
    </ThemeProvider>
  );
}

/*
      <Grid container>
        <Grid item xs={12}>
          <Header />
        </Grid>
        <Grid item xs={12} sx={{marginTop: theme.spacing(20)}}>
          <Main />
        </Grid>
      </Grid>
*/

export default App;
