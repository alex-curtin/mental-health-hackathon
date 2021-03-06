import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';

export default class TaskList extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.loadTasks(this.props.id);
  }

  render() {
    return (
      <div className="list-page">
        <div className="list-page-top">
          <h3>TASKS</h3>
          <Link to="/add_task"><Icon name="add circle" color="green" /></Link>
        </div>
        {this.props.tasks.filter(el => el.category === 'task').map(task => (
          <div key={task.id} className="list-item">
            <p><b>{task.title}</b></p>
            <Icon name="circle outline" />
          </div>
        ))}
      </div>
    )
  }
}
