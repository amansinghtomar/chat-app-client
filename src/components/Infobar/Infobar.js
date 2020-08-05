import React from 'react';

import onlineIcon from '../../icons/onlineIcon.png';
import closeIcon from '../../icons/closeIcon.png';
import './Infobar.css';

const InfoBar = ({ room, status }) => (
  console.log(room),
  (
    <div className="infoBar">
      <div className="leftInnerContainer">
        <img className="onlineIcon" src={onlineIcon} alt="online icon" />
        <div>
        <h4 className="title">{room}</h4>
         <p className="status">{status}</p>
        </div>
      </div>

      <div className="rightInnerContainer">
        <a href="/">
          <img src={closeIcon} alt="close icon" />
        </a>
      </div>
    </div>
  )
);

export default InfoBar;