"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("react-dom/client");
var App_1 = require("./App");
var react_redux_1 = require("react-redux");
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var store_1 = require("./stores/store");
var react_2 = require("redux-persist/integration/react");
var store_2 = require("stores/store");
var container = document.getElementById('root');
var root = (0, client_1.createRoot)(container);
function Root() {
    return (<react_1.default.StrictMode>
      <react_redux_1.Provider store={store_2.store}>
        <react_router_dom_1.BrowserRouter>
          <react_2.PersistGate loading={null} persistor={store_1.persistor}>
            <App_1.default />
          </react_2.PersistGate>
        </react_router_dom_1.BrowserRouter>
      </react_redux_1.Provider>
    </react_1.default.StrictMode>);
}
root.render(<Root />);
