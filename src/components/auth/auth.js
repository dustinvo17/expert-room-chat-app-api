import React from 'react'
import AuthForm from './form.js'
import login from '../../images/login.jpeg'
import logo from '../../images/logo.png'
import register from '../../images/register.jpeg'

import {authUser} from '../../actions/index.js'
import {connect} from 'react-redux'
import './auth.scss'
class AuthPage extends React.Component {
    state ={login:true}
   submit = async values => {
    if(values.username && values.password) {
        const user = await this.props.authUser(values,this.state.login)
        if(user) {
            this.props.handleLogin()
        }
     
    }
     
    
  }
 
  renderButtonAuthClass() {

        return "bg-white text-blue-700 rounded-r-full"
  
       
    
  }
  render() {
    return <div className="grid grid-cols-2 h-screen auth-container">
   
       
        <div className="flex flex-col justify-center items-center px-32">
          <img src={logo}/>
          <AuthForm onSubmit={this.submit} login={this.state.login} buttonName={this.state.login ? 'Login' :'Register'} />
        </div>
        <div className="relative auth-option">   
        <button onClick={()=> this.setState({login:true})} className={`text-xl z-10 px-8 absolute login-title left-0  font-black py-2 ${this.state.login ? this.renderButtonAuthClass(): 'text-white'}`}type="submit">Login</button>
        <button onClick={() => this.setState({login:false})} className={`text-xl z-10 px-8 absolute register-title left-0 font-black py-2 ${this.state.login ===  false? this.renderButtonAuthClass(): 'text-white'}`}type="submit">Register</button>
        <img  alt="login page "src={this.state.login ? login : register} className="h-screen object-cover  img-auth" />
        </div>
        
       
        </div>
  }
}

export default connect(null,{authUser})(AuthPage)