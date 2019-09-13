import React from 'react';
import moodcast from '../assets/icons/moodcast.png'

export default function Header() {
  return (
    <div className="header">
      <img className="logo" src={moodcast} alt='moodcast' />
    </div>
  )
}
