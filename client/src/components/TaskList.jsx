import React, { Component } from 'react'

export default class TaskList extends Component {

  componentDidMount() {
    this.props.loadTasks();
  }

  render() {
    return (
      <div>

      </div>
    )
  }
}
