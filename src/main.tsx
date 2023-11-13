import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { ThemeProvider } from '@mui/system';
import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { teal, yellow } from '@mui/material/colors';
import { Provider } from 'react-redux';
import { store } from './app/store.ts';

let theme = createTheme({
  palette: {
    primary: teal,
    secondary: yellow,
  },
});
theme = responsiveFontSizes(theme);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);
