import { createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

import rootReducer from "./store";

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["navigation"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const configure = (modules) => {
  // const store = createStore(modules);
  const devTools =
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__();
  const store = createStore(modules, devTools);

  return store;
};
const store = configure(persistedReducer);
const persistor = persistStore(store);
export { store, persistor };
