import React, { Component } from 'react'

export default class TaskList extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.loadTasks(this.props.id);
  }

  render() {
    return (
      <div>
        {this.props.tasks.filter(el => el.category === 'task').map(task => (
          <div key={task.id}>
            <p><b>{task.title}</b></p>
            <p>{task.details}</p>
            <p>mood: {task.mood}</p>
            <p>{task.status}</p>
            <p>Taken time for yourself: {task.self_care ? "yes" : "no"}</p>
          </div>
        ))}
      </div>
    )
  }
}
