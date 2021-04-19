import './Main.css';
import React from 'react';
import Task from '../Task/Task';
import Form from '../Form/Form';

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tareas: ['a', 'b'],
    };
  }

  componentDidMount() {
    this.setState(JSON.parse(localStorage.getItem('state')));
  }

  componentDidUpdate() {
    console.log("HAY CAMBIOS")
    localStorage.setItem('state', JSON.stringify({ tareas: this.state.tareas }));
  }

  killTask = (task) => {
    this.setState((prevState) => ({
      tareas: prevState.tareas.filter((tarea) => tarea !== task),
    }));
  };

  drawTasks = (tasks) => {
    let tareasArray = [];
    console.log('TAREAS', tasks);
    if (tasks.length !== 0) {
      tareasArray = tasks.map((task, taskIndex) => (
        <Task
          key={task}
          tarea={{
            title: task,
            id: task,
          }}
          killTask={this.killTask}
          saveTask={this.saveTask}
        />
      ));
    }
    return tareasArray;
  };

  addNewTask = (task) => {
    this.setState((prevState) => ({
      tareas: [...prevState.tareas, task],
    }));
  };

  saveTask = (task) => {
    this.setState((prevState) => {
      const newState = prevState.tareas.map((tarea) => {
        if (tarea === task.id) {
          console.log(`MODIFICADO ${task.id}`);
          return task.tarea;
        } else {
          return tarea;
        }
      });
      console.log('NUEVO ESTADO', newState);
      localStorage.setItem('state', JSON.stringify({ tareas: newState }));
      return newState;
    });
  };
  render() {
    return (
      <main>
        <Form addNewTask={this.addNewTask} />
        <ul className="tasks">{this.drawTasks(this.state.tareas)}</ul>
      </main>
    );
  }
}

export default Main;
