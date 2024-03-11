import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createTheme, StyledEngineProvider, ThemeProvider } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';

const theme = createTheme({
  components: {
    MuiPopover: {
      defaultProps: {
        container: document.getElementById('root'),
      },
    },
    MuiPopper: {
      defaultProps: {
        container: document.getElementById('root'),
      },
    },
    MuiDialog: {
      defaultProps: {
        container: document.getElementById('root'),
      },
    },
    MuiModal: {
      defaultProps: {
        container: document.getElementById('root'),
      },
    },
  },
});

ReactDOM.render(
  <StyledEngineProvider injectFirst>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </BrowserRouter>
    </ThemeProvider>
  </StyledEngineProvider>,
  document.getElementById('root')
);

reportWebVitals();
