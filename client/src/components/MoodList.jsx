import React, { Component } from 'react'

export default class MoodList extends Component {

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