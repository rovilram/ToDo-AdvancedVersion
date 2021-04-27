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
    if (logged) setLogged(false);
    else {
      setAction('login');
    }
    //setLogged(!logged);
  };

  const delLoginAction = () => {
    setAction('');
  };

  const setLog = () => {
    setAction('');
    setLogged(true);

    console.log('LOGADO', action, logged);
  };

  return (
    <div className="App">
      <LoggedProvider value={logged}>
        <Header actionLogin={actionLogin} logged={logged} />
        <Main
          action={action}
          logged={logged}
          setLog={setLog}
          delLoginAction={delLoginAction}
        />
        <Footer />
      </LoggedProvider>
    </div>
  );
}

export default App;
