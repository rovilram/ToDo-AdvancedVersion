import './Task.css';
import React from 'react';

class Task extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tarea: props.tarea.title,
      id: props.tarea.id,
    };
  }

  removeTaskHandler = (e) => {
    const task = e.target.querySelector('textarea').value;
    this.props.killTask(task);
  };

  changeTask = (e) => {
    e.stopPropagation();
    this.setState({ tarea: e.target.value });
    console.log(this.state);
    console.log(e.target.value);
  };

  saveTaskHandler = () => {
    console.log('A EDITAR', this.state);
    this.props.saveTask(this.state);
  };

  render() {
    return (
      <li className="task" onClick={this.removeTaskHandler}>
        <textarea
          value={this.state.tarea}
          onChange={this.changeTask}
          onClick={(e) => e.stopPropagation()}
          onBlur={this.saveTaskHandler}
        ></textarea>
      </li>
    );
  }
}

export default Task;
