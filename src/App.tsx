import React from 'react';
import { Provider } from 'react-redux';
import './App.css';
import store from './redux/store';
import ConfigRoutes from './routes/Config.routes'
function App() {
  return (
    <div className="App">
      <div className="App-header">
        <Provider store={store}>
          <ConfigRoutes />
        </Provider>
      </div>
    </div>
  );
}

export default App;
