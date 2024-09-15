import { createRoot } from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { persistor } from './stores/store';
import { PersistGate } from 'redux-persist/integration/react';
import { store } from 'stores/store';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

function Root() {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <PersistGate loading={null} persistor={persistor}>
            <App />
          </PersistGate>
        </BrowserRouter>
      </Provider>
    </React.StrictMode>
  );
}
root.render(<Root />);
