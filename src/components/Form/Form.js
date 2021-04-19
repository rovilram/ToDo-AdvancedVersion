import './Form.css';
import React from 'react';

class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tareas: '',
    };
  }

  formSubmit = (e) => {
    e.preventDefault();
    //const task = e.target.newTaskText.value;
    console.log("ESTADO",this.state)
    this.props.addNewTask(this.state.tareas);
  };

  handleTitle = (e) => {
    console.log("INPUT",e.target.value)
    this.setState(() => ({
      tareas: e.target.value,
    }));
  };

  render() {
    return (
      <form onSubmit={(e) => this.formSubmit(e)}>
        <input type="text" onChange={this.handleTitle} />
        <input type="submit" value="Añadir Tarea" />
      </form>
    );
  }
}

export default Form;
