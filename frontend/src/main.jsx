
// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import { Provider } from 'react-redux';  // Redux provider
// import store from './redux/store.js';  // Redux store import
// import { persistStore } from 'redux-persist';  // Persist store for redux
// import { PersistGate } from 'redux-persist/integration/react';  // Integrating persist
// import App from './App.jsx';  // Main App component
// import './index.css';  // Import your global CSS
// import { Toaster } from './components/ui/sonner.jsx';  // Import toast notifications

// const persistor = persistStore(store);  // Create persistor for rehydration

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <Provider store={store}>  {/* Provide Redux store to the app */}
//       <PersistGate loading={null} persistor={persistor}>  {/* Persisted Redux state */}
//         <App />
//         <Toaster />  {/* Toast notifications */}
//       </PersistGate>
//     </Provider>
//   </React.StrictMode>
// );

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import App from './App';
import store from './redux/store';
import './index.css';

const persistor = persistStore(store);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
