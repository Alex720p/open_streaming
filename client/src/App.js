import Grid from '@mui/material/Grid'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Header from './components/header.js'
import Main from './components/main.js'
import SignIn from './components/login.js'
import SignUp from './components/register.js';

const theme = createTheme({
  palette: {
    mode: 'dark',
  },

});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <SignUp />
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
