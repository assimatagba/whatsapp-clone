import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import './App.css';
import Sidebar from './components/sidebar/Sidebar';
import Chat from './components/chat/Chat';
import Login from './components/auth/Login';
import { useStateValue } from './StateProvider';


function App() {
  // eslint-disable-next-line
  const [{user}, dispatch] = useStateValue();

  return (
    <div className="app">

      {!user ? (
        <Login />
      ) : ( 
      <div className="app-body">
        <Router>
          <Sidebar />

          <Switch>

            <Route path="/rooms/:roomId">
              <Chat />
            </Route>

            <Route path="/">
              <Chat />
            </Route>
          </Switch>
        </Router>
      </div>
      )}
    </div>
  );
}

export default App;
