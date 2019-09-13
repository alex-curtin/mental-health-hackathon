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
import Footer from './components/Footer';
import Home from './components/Home';
import MoodList from './components/MoodList';

import feed from './assets/icons/feed-grey.png';
import task from './assets/icons/task-grey.png';
import mood from './assets/icons/mood-grey.png';
import prof from './assets/icons/prof-grey.png';

import {
  loginUser,
  registerUser,
  verifyUser,
  createEntry,
  fetchEntries,
  fetchAllEntries
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
      taskFormData: {
        category: 'task',
        title: '',
        details: '',
        mood: 'neutral',
        status: 'incomplete',
        self_care: true,
        user_id: null,
      },
      moodFormData: {
        category: 'mood',
        title: '',
        details: '',
        mood: 'neutral',
        status: '',
        self_care: true,
        user_id: null,
      },
      tasks: [],
      mood: '',
      feed: '',
    };
  }

  async componentDidMount() {
    const user = await verifyUser();
    if (user) {
      this.setState(prevState => ({
        currentUser: user,
        taskFormData: {
          ...prevState.taskFormData,
          user_id: user.id,
        },
        moodFormData: {
          ...prevState.moodFormData,
          user_id: user.id
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
      taskFormData: {
        ...prevState.taskFormData,
        [name]: value
      }
    }));
  }

  moodHandleChange = (e) => {
    const { name, value } = e.target;
    this.setState(prevState => ({
      moodFormData: {
        ...prevState.moodFormData,
        [name]: value
      }
    }));
  }

  taskHandleSubmit = async (e) => {
    e.preventDefault();
    const data = this.state.taskFormData;
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
  moodHandleSubmit = async (e) => {
    e.preventDefault();
    const data = this.state.moodFormData;
    const mood = await createEntry(data);
    //update user mood
    this.setState({
      mood: mood,
    })
  }


  //---------FEED-------------//
  loadFeed = async () => {
    const feed = await fetchAllEntries();
    this.setState({
      feed: feed,
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
        <Route exact path="/" render={() => (
          <Home
            loadFeed={this.loadFeed}
            feed={this.state.feed}
          />
        )}

        />
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
            formData={this.state.taskFormData}
            handleChange={this.entryHandleChange}
            handleSubmit={this.taskHandleSubmit}
          />
        )} />
        <Route exact path="/set_mood" render={() => (
          <MoodForm
            formData={this.state.moodFormData}
            handleChange={this.moodHandleChange}
            handleSubmit={this.moodHandleSubmit}
          />
        )} />
        <Route exact path="/users/:id/moods" render={(props) => (
          <MoodList
            loadTasks={this.loadTasks}
            tasks={this.state.tasks}
            id={parseInt(props.match.params.id)}
          />
        )} />
        <Route exact path="/users/:id/tasks" render={(props) => (
          <TaskList
            loadTasks={this.loadTasks}
            tasks={this.state.tasks}
            id={parseInt(props.match.params.id)}
          />
        )} />
        {this.state.currentUser &&
          <Footer
            user={this.state.currentUser}
          />}
      </div>
    )
  }
}

export default withRouter(App);