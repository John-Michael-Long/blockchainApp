import React from 'react';

const UserInfoDisplay = (props) => (
  <div className="user-info-display">USER INFO DISPLAY
    <div className="welcome-div">WELCOME:    { props.username }</div>
    <div className="balance-div">YOUR CURRENT BALANCE IS: { props.currentBalance } </div>
  </div>
);

export default UserInfoDisplay;