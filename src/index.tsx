import { createRoot } from 'react-dom/client';
import App from './App';
import { Provider, useSelector } from 'react-redux';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { persistor } from './stores/store';
import { PersistGate } from 'redux-persist/integration/react';

// import rootReducer, { persistedReducer } from 'stores/reducer';
// import RootRoute from 'route/RootRoute';
import { store } from 'stores/store';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './styles/theme';
import { RootState } from './stores/store';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

function Root() {
  const darkMode = useSelector((state: RootState) => state.darkMode.theme);
  const theme = darkMode === 'dark' ? darkTheme : lightTheme;

  return (
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <PersistGate loading={null} persistor={persistor}>
            <ThemeProvider theme={theme}>
              <App />
            </ThemeProvider>
          </PersistGate>
        </BrowserRouter>
      </Provider>
    </React.StrictMode>
  );
}

// root.render(

// );

root.render(<Root />);
