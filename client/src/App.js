import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import decode from 'jwt-decode';
import Login from './components/Login'
import Register from './components/Register'
import Header from './components/Header';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

import {
  loginUser,
  registerUser,
  verifyUser,
  createEntry
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
        mood: 0,
        status: 'incomplete',
        self_care: true,
        user_id: '',
      },
      tasks: [],
    };
  }

  async componentDidMount() {
    const user = await verifyUser();
    if (user) {
      this.setState({
        currentUser: user
      })
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

  //--------TaskForm--------//
  entryHandleChange = (e) => {
    const { name, value } = e.target;
    this.setState(prevState => ({
      entryFormData: {
        ...prevState.entryFormData,
        [name]: value
      }
    }));
  }

  taskHandleSubmit = async (data) => {
    const task = await createEntry(data);
    this.setState(prevState => ({
      tasks: [...prevState.tasks, task]
    }))
    this.props.history.push('/tasks')
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
          />
        )} />
      </div>
    )
  }
}

export default withRouter(App);