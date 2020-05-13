import React from 'react';


import './tailwind.generated.css';
import './App.scss';
import AuthPage from './components/auth/auth.js'
import Chat from './components/chat/chat'
export default class App extends React.Component {
  state = { login: localStorage.getItem('access_token') ? true : false}
  handleLogin =() => {
    this.setState({login:true})
  }
  handleLogout =() => {
    this.setState({login:false})
  }
    render(){
      return this.state.login ? <Chat handleLogout={this.handleLogout}/> : <AuthPage handleLogin={this.handleLogin}/>
    }
}


