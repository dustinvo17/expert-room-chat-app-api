import React from 'react';
import {connect} from 'react-redux'
import {logOut,fetchUser,imgPath} from '../../actions/index'
import Conversation from './conversation'
import UserProfile from '../profile/userProfile'
import UserFriend from '../profile/userFriend'
import Navbar from './navbar'

class Chat extends React.Component {
   state = {showProfile:false, profile:0 ,showMsg:false}
  
    componentDidMount(){
        // this.props.logOut()
        this.props.fetchUser()
        this.props.imgPath()
      
     
    }
    showMsgResponsive = () => {
        this.setState({showMsg:true})
    }
    backToHistoryList =() => {
        this.setState({showMsg:false})
    }
    showProfile = (profile  = 0) => {
        if(profile === 1) {
            this.setState({showProfile:true,profile:1})
        }
        else {
            this.setState({showProfile:true,profile:0})
        }
    }
    closeProfile = () => {
        this.setState({showProfile:false})
    }
    render(){
        return <div className="flex flex-col h-screen justify-start overflow-hidden"><Navbar backToHistoryList={this.backToHistoryList} showMsg={this.state.showMsg} handleLogout={this.props.handleLogout} showProfile={this.showProfile}  />
        
            <Conversation  showProfile={this.showProfile} showMsg={this.state.showMsg} showMsgResponsive={this.showMsgResponsive} />
            {this.state.showProfile ? (this.state.profile === 0 ? <UserProfile closeProfile={this.closeProfile}/>  : <UserFriend  showMsg={this.showMsgResponsive} closeProfile={this.closeProfile}/>): ''}
      
        </div>
    }
}

  export default connect(null,{logOut,fetchUser,imgPath})(Chat);