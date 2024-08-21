var _client = require('react-dom/client');
var _App = _interopRequireDefault(require('./App'));
var _reactRedux = require('react-redux');
var _react = _interopRequireDefault(require('react'));
var _reactRouterDom = require('react-router-dom');
var _store = require('./stores/store');
var _react2 = require('redux-persist/integration/react');
var _store2 = require('stores/store');
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : { default: e };
}
const container = document.getElementById('root');
const root = (0, _client.createRoot)(container);
function Root() {
  return /*#__PURE__*/ _react.default.createElement(
    _react.default.StrictMode,
    null,
    /*#__PURE__*/ _react.default.createElement(
      _reactRedux.Provider,
      {
        store: _store2.store,
      },
      /*#__PURE__*/ _react.default.createElement(
        _reactRouterDom.BrowserRouter,
        null,
        /*#__PURE__*/ _react.default.createElement(
          _react2.PersistGate,
          {
            loading: null,
            persistor: _store.persistor,
          },
          /*#__PURE__*/ _react.default.createElement(_App.default, null)
        )
      )
    )
  );
}
root.render(/*#__PURE__*/ _react.default.createElement(Root, null));

// import { createRoot } from 'react-dom/client';
// import App from './App';
// import { Provider } from 'react-redux';
// import React from 'react';
// import { BrowserRouter } from 'react-router-dom';
// import { store, persistor } from './stores/store';
// import { PersistGate } from 'redux-persist/integration/react';

// const container = document.getElementById('root');
// const root = createRoot(container);

// function Root() {
//   return (
//     <React.StrictMode>
//       <Provider store={store}>
//         <BrowserRouter>
//           <PersistGate loading={null} persistor={persistor}>
//             <App />
//           </PersistGate>
//         </BrowserRouter>
//       </Provider>
//     </React.StrictMode>
//   );
// }

// root.render(<Root />);
