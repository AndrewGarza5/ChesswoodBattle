import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import './styles/index.css';
import emmaLogo from './images/emma-logo-rainbow.png'

class Home extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      total: 1,
      errorMessage: null
    }
  }
  CreateNewGame() {
    // Simple GET request using fetch
    fetch('http://localhost:5000/api/create-new-game')
        .then(async response =>{
          
          console.log(response)
        })
        .catch(error => {
            this.setState({ errorMessage: error.toString() });
            console.error('There was an error!', error);
        });
  }

  NewGameClick = () => {
    //create stuff in back end
    this.CreateNewGame()


    //move front end page
  }

  render(){
    //this.GetInfo() *** CALLS INDEFINITELY!
    let { errorMessage } = this.state
    return (
      <div className="app">
        <div className='app-header'>
          <p>Chesswood Battle!</p>
          <img src={emmaLogo} className='app-logo'></img>
          
        </div>

        <div className='game-selections'>
          <div className='new-game-container'>
            <div className='new-game-filler-space'></div>
              <div className='new-game-button' onClick={this.NewGameClick}>
                New Game
              </div>
            </div>
          <div className='new-join-inner-space'>

          </div>
          <div className='join-game-container'>
            <form>
              <input className='join-game-texbox' type="text" id='name-input' placeholder='Enter 4 letter code'></input>
            </form>
            
            <div className='join-game-filler-space'></div>
            <div className='join-game-button'>
              Join Game
            </div>
          </div>

        </div>
      </div>
    );
  }
}

ReactDOM.render(

    <Home />,

  document.getElementById('root')
);


/*GETRequest() {
  // Simple GET request using fetch
  fetch('localhost:3000/api/create-new-game')
      .then(async response =>{
        const data = await response.json();
        if (!response.ok) {
          // get error message from body or default to response statusText
          const error = (data && data.message) || response.statusText;
          return Promise.reject(error);
        }

        this.setState({ total: data.total })
      })
      .catch(error => {
          this.setState({ errorMessage: error.toString() });
          console.error('There was an error!', error);
      });
}*/