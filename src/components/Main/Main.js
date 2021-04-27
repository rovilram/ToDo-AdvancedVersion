import './Main.css';
import React from 'react';
import Task from '../Task/Task';
import Search from '../Search/Search';
import Form from '../Form/Form';
import { getTasks, setTasks } from '../../dataProvider/dataProvider';

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      action: this.props.action,
      filter: '',
      tasks: [],
      edit: '',
      user: '',
      pass: '',
    };
  }

  componentDidMount() {
    let tasks = getTasks();
    tasks = tasks ? tasks : [];
    console.log('MONTAJE', tasks);
    this.setState({
      tasks: [...this.state.tasks, ...tasks],
    });
  }

  componentDidUpdate() {
    setTasks(this.state.tasks);
    console.log('ACTUALIZANDO', getTasks());
  }

  searchTask = (searchText) => {
    this.setState({ filter: searchText });
  };

  setDoneTask = (index) => {
    const newState = this.state.tasks.map((task) => {
      task.done = task.id === index ? !task.done : task.done;
      return task;
    });
    this.setState({ tasks: newState });
  };

  addTask = (task) => {
    task = {
      title: task.title,
      id: Date.now(),
      done: false,
      priority: 'baja',
    };

    this.setState({ tasks: [...this.state.tasks, task], action: '' });
    setTasks(this.state.tasks);
  };

  editTaskBtn = (index) => {
    this.setState({ edit: index, action: 'edit' });
  };

  actionAdd = () => {
    this.setState({ action: 'add' });
  };

  actionEdit = () => {
    this.setState({ action: 'edit' });
  };

  clearAction = () => {
    this.setState({ action: '' });
  };

  editTask = (task) => {
    const newTasks = this.state.tasks.map((el) => {
      return task.id === el.id ? task : el;
    });

    this.setState({ tasks: newTasks, edit: '', action: '' });
    setTasks(this.state.tasks);
  };

  delTask = (index) => {
    const newState = this.state.tasks.filter((task) => task.id !== index);
    this.setState({ tasks: newState });
  };

  changePriority = (priority, id) => {
    const newTasks = this.state.tasks.map((el) => {
      if (priority === 'alta') {
        el.priority = el.id === id ? priority : 'baja';
      } else {
        el.priority = el.id === id ? priority : el.priority;
      }
      return el;
    });
    this.setState({ tasks: newTasks });
  };

  drawTasks = (tasks) => {
    console.log('TASKS', tasks);
    let tasksArray = [];
    if (tasks.length !== 0) {
      tasksArray = tasks
        .filter((task) =>
          task.title.toLowerCase().includes(this.state.filter.toLowerCase()),
        )
        .map((task) => (
          <Task
            delTask={this.delTask}
            editTaskBtn={this.editTaskBtn}
            key={task.id}
            tarea={{
              title: task.title,
              id: task.id,
              done: task.done,
              priority: task.priority,
            }}
            setDoneTask={this.setDoneTask}
            changePriority={this.changePriority}
          />
        ));
      return tasksArray;
    } else return <div className="errorNoTasks">NO HAY TAREAS</div>;
  };

  userHandler = (e) => {
    this.setState({ user: e.target.value });
  };

  passHandler = (e) => {
    this.setState({ pass: e.target.value });
  };

  logBtnHandler = () => {
    if (this.state.user === 'admin' && this.state.pass === 'admin1234') {
      this.setState({user:"", pass:""})
      console.log('LOGGED!!!!!!!');
      this.props.setLog();
    } else console.log('USUARIO Y CONTRASEÑA INCORRECTOS');
  };

  cancelBtnHandler = () => {
    this.props.delLoginAction()
  }

  render() {
    return (
      <main>
        <div className="wrapper">
          {!this.props.action && this.state.action === '' ? (
            <Search searchTask={this.searchTask} />
          ) : (
            ''
          )}
          {!this.props.action && this.state.action === 'add' ? (
            <Form
              formSubmit={this.addTask}
              clearAction={this.clearAction}
              text="Añadir Tarea"
            />
          ) : (
            ''
          )}
          {!this.props.action && this.state.action === 'edit' ? (
            <Form
              formSubmit={this.editTask}
              clearAction={this.clearAction}
              task={
                this.state.tasks.filter(
                  (task) => task.id === this.state.edit,
                )[0]
              }
              text="Editar Tarea"
            />
          ) : (
            ''
          )}
          {!this.props.action && this.state.action === '' && this.props.logged && (
            <div className="addBtnWrapper">
              <button onClick={this.actionAdd}>Añadir</button>
            </div>
          )}
          {!this.props.action && this.state.action === '' ? (
            <div className="taskWrapper">
              <ul className="tasks">{this.drawTasks(this.state.tasks)}</ul>
            </div>
          ) : (
            ''
          )}
          {this.props.action === 'login' && (
            <>
              <h2>LOGIN</h2>
              <div className="loginWrapper">
                <label htmlFor="userInput">Usuario: </label>
                <input type="text" id="userInput" onChange={this.userHandler} />
                <br />
                <label htmlFor="passInput">Contraseña: </label>
                <input type="text" id="passInput" onChange={this.passHandler} />
                <button onClick={this.logBtnHandler}>Enviar</button>
                <button onClick={this.cancelBtnHandler}>Cancelar</button>
              </div>
            </>
          )}
        </div>
      </main>
    );
  }
}
export default Main;
