import { ChakraProvider } from '@chakra-ui/react';
import App from '@/App.tsx';
import React from 'react';
import ReactDOM from 'react-dom/client';
import theme from '@/config/theme';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
);
