import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';

export default class MoodList extends Component {
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
          <h3>MOOD</h3>
          <Link to="/set_mood"><Icon name="add circle" color="green" /></Link>
        </div>
        {this.props.tasks.filter(el => el.category === 'mood').map(mood => (
          <div key={mood.id} className="list-item">
            <p><b>{mood.mood}</b></p>
          </div>
        ))}
      </div>
    )
  }
}
