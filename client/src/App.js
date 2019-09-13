import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import decode from 'jwt-decode';
import Login from './components/Login'
import Register from './components/Register'
import Header from './components/Header';
import TaskForm from './components/TaskForm';
import MoodForm from './components/MoodForm';
import TaskList from './components/TaskList';

import {
  loginUser,
  registerUser,
  verifyUser,
  createEntry,
  fetchEntries
} from './services/api-helper'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      authFormData: {
        name: "",
        email: "",
        password: ""
      },
      entryFormData: {
        type: '',
        title: '',
        details: '',
        mood: 'neutral',
        status: 'incomplete',
        self_care: true,
        user_id: null,
      },
      tasks: [],
      mood: '',
    };
  }

  async componentDidMount() {
    const user = await verifyUser();
    if (user) {
      this.setState(prevState => ({
        currentUser: user,
        entryFormData: {
          ...prevState.entryFormData,
          user_id: user.id,
        }
      }))
    }
  }


  // -------------- AUTH ------------------

  handleLoginButton = () => {
    this.props.history.push("/login")
  }

  handleLogin = async () => {
    const userData = await loginUser(this.state.authFormData);
    this.setState({
      currentUser: userData
    })
  }

  handleRegister = async (e) => {
    e.preventDefault();
    await registerUser(this.state.authFormData);
    this.handleLogin();
  }

  handleLogout = () => {
    localStorage.removeItem("authToken");
    this.setState({
      currentUser: null
    })
  }

  authHandleChange = (e) => {
    const { name, value } = e.target;
    this.setState(prevState => ({
      authFormData: {
        ...prevState.authFormData,
        [name]: value
      }
    }));
  }

  //--------TASKS--------//
  entryHandleChange = (e) => {
    const { name, value } = e.target;
    this.setState(prevState => ({
      entryFormData: {
        ...prevState.entryFormData,
        [name]: value
      }
    }));
  }

  taskHandleSubmit = async (e) => {
    e.preventDefault();
    const data = this.state.entryFormData;
    const id = this.state.currentUser.id
    const task = await createEntry(data);
    this.setState(prevState => ({
      tasks: [...prevState.tasks, task]
    }))
    // this.props.history.push('/tasks');
  }

  loadTasks = async (id) => {
    const tasks = await fetchEntries(id);
    this.setState({
      tasks: tasks,
    })
  }

  //----MoodForm----//
  moodHandleSubmit = async (data) => {
    const mood = await createEntry(data);
    //update user mood
    this.setState({
      mood: mood,
    })
  }



  render() {
    return (
      <div className="App">
        <Header />
        <header>
          <div>
            {this.state.currentUser
              ?
              <>
                <p>{this.state.currentUser.name}</p>
                <button onClick={this.handleLogout}>logout</button>
              </>
              :
              <button onClick={this.handleLoginButton}>Login/register</button>
            }
          </div>
        </header>
        <Route exact path="/login" render={() => (
          <Login
            handleLogin={this.handleLogin}
            handleChange={this.authHandleChange}
            formData={this.state.authFormData} />)} />
        <Route exact path="/register" render={() => (
          <Register
            handleRegister={this.handleRegister}
            handleChange={this.authHandleChange}
            formData={this.state.authFormData} />)} />
        <Route exact path="/add_task" render={() => (
          <TaskForm
            formData={this.state.entryFormData}
            handleChange={this.entryHandleChange}
            handleSubmit={this.taskHandleSubmit}
          />
        )} />
        <Route exact path="/set_mood" render={() => (
          <MoodForm
            formData={this.state.entryFormData}
            handleChange={this.entryHandleChange}
            handleSubmit={this.moodHandleSubmit}
          />
        )} />
        <Route exact path="/users/:id/tasks" render={(props) => (
          <TaskList
            loadTasks={this.loadTasks}
            tasks={this.state.tasks}
            id={parseInt(props.match.params.id)}
          />
        )} />
      </div>
    )
  }
}

export default withRouter(App);