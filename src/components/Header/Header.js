import './Header.css';
import React from 'react';

class Header extends React.Component {
  logHandler = () => {
    this.props.actionLogin();
  }

  render() {
    return (
      <header>
        <h1>ToDo List</h1>
        <button onClick={this.logHandler}>LOGEAR</button>
      </header>
    );
  }
}

export default Header;
