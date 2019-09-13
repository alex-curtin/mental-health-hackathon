import React from 'react';
import { Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import feed from '../assets/icons/feed-grey.png';
import task from '../assets/icons/task-grey.png';
import mood from '../assets/icons/mood-grey.png';
import prof from '../assets/icons/prof-grey.png';

export default function Footer(props) {
  return (
    <div className="footer">
      <Link to="/">
        <img className="footer-icon" src={feed} />
      </Link>
      <Link to={`/users/${props.user.id}/tasks`}>
        <img className="footer-icon" src={task} />
      </Link>
      <Link>
        <img className="footer-icon" src={mood} />
      </Link>
      <Link>
        <img className="footer-icon" src={prof} />
      </Link>
    </div>
  )
}
