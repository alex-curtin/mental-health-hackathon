import React, { Component } from 'react';
import { Icon } from 'semantic-ui-react';

export default class Home extends Component {

  componentDidMount() {
    this.props.loadFeed();
  }
  render() {
    return (
      <div className="home" >
        {this.props.feed &&
          this.props.feed.map(el => (
            el.category === 'mood' ?
              <div className="mood">
                <Icon name="circle" color="grey" size="medium" />
                <p>{el.user.name}</p>
                <p>feeling {el.mood}</p>
                <p>{el.details}</p>
                <p>Self care: {el.self_care ? "yes" : "no"}</p>
              </div> :
              <div className="task">
                <Icon name="circle" color="grey" />
                <p><span className="name">{el.user.name}</span> added a task</p>
                <p>{el.title}</p>
                <p>{el.mood}</p>
                <p>{el.details}</p>
                <p>Self care: {el.self_care ? "yes" : "no"}</p>
              </div>
          ))
        }

      </div>
    )
  }
}
