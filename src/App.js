import './App.css';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Footer from './components/Footer/Footer';
import { LoggedProvider } from './contexts/loggedContext';
import React, { useState } from 'react';

function App() {
  const [logged, setLogged] = useState(false);
  const [action, setAction] = useState('');

  const actionLogin = () => {
    setAction('login');
  };

  return (
    <div className="App">
      <LoggedProvider value={logged}>
        <Header actionLogin={actionLogin} />
        <Main action={action} logged={true} />
        <Footer />
      </LoggedProvider>
    </div>
  );
}

export default App;
