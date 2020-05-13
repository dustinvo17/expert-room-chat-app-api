import React from 'react'
import HistoryChat from './historyChat'
import Messages from './messages'
import {connect} from 'react-redux'

class Conversation extends React.Component {
 

    renderResponsive = () =>{
        if(window.innerWidth <= 900) {
            return <div className="flex-grow flex relative ">

            {!this.props.showMsg ? <HistoryChat showProfile={this.props.showProfile} showMsg={this.props.showMsgResponsive}/> :''}      
            {this.props.showMsg  ? <Messages /> : '' }
       
              
            </div>
        }
        else {
            return <div className="flex-grow flex relative ">

            <HistoryChat showProfile={this.props.showProfile} showMsg={this.showMsgResponsive}/>         
            <Messages /> 
       
              
            </div>
        }
    }    

   
 
  
    render() {
     
        return this.renderResponsive()
    }
}

const mapStateToProps = state  => {
    return {
        user:state.userProfile
    }
}
export default connect(mapStateToProps,{})(Conversation)
