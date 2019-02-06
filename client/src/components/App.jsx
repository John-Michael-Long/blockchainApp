import React from 'react';
import UserInfoDisplay from './UserInfoDisplay'
import SendCoinsMenu from './SendCoinsMenu'
//import axios from 'axios';
//IMPORT OTHER COMPONENTS

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'JML',
      userID: '1234',
      currentBalance: 100,
      sendCoinMenuDisplay: false
    };

    //ADD BINDINGS HERE
    this.handleSendCoinMenuDisplayClick = this.handleSendCoinMenuDisplayClick.bind(this)
  }

  handleSendCoinMenuDisplayClick(e) {
    this.setState({
      sendCoinMenuDisplay: !this.state.sendCoinMenuDisplay
    })
  }

  render() {
    console.log('state:', this.state.sendCoinMenuDisplay)

    return (
      <div className="app-container">
        <nav className="navbar">
            TOP NAVBAR
        </nav>
        <div className="user-info-container">
          <UserInfoDisplay 
            username={this.state.username} 
            userID={this.state.userID} 
            currentBalance={this.state.currentBalance} 
          />
        </div>
        <div className="option-buttons">
          <button 
            className="send-coins-btn"
            onClick={this.handleSendCoinMenuDisplayClick} 
            >
            Send Coins
          </button>
          <button
            className="mine-block-btn"
            >
            Mine Block
          </button>
        </div>
        <div className="send-coins-container">
          {
            this.state.sendCoinMenuDisplay &&
            <SendCoinsMenu />
          }
        </div>
        <div className="mine-block-container">
          STATE: {this.state.sendCoinMenuDisplay}
        </div>
      </div>
    );
  }
}

export default App;
