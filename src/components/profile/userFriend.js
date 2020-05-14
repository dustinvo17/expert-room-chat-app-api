import React from 'react'
import { connect } from 'react-redux'
import {acceptFriend,denyFriend,initConversation} from '../../actions/index'
import AddFriendModal from './addFriendModal'
class UserFriend extends React.Component {
    state ={ isFriend:true,searchInput:'', addFriendOpen:false}

    showRequest =() => {
        this.setState({isFriend:false})
    }
    showFriend =() => {
        this.setState({isFriend:true})
    }
    filterSearch = (friend) => {
        return friend.requester.username.includes(this.state.searchInput) || friend.recipient.username.includes(this.state.searchInput)
       
    }
    returnLength = () => {
        return (this.props.friends.filter(friend => friend.status === 3)).length 
        
     
    }
    handleDenyFriend =(userId,status) => {
        if(status === 1) {
            this.props.denyFriend(userId,true)
        }
        else {
            this.props.denyFriend(userId)
        }
    }
    renderFriendRequest = () => {
        let requestList;
        requestList = this.props.friends.filter(friend => friend.status !== 3 && (this.filterSearch(friend)))

        
        return requestList.map(friend => {
            let user;
            if (friend.recipient._id === this.props.user._id) {
                user = friend.requester

            }
            else {
                user = friend.recipient
            }
            return <li key={user._id} className="my-4">
                <div className="conversation-part flex items-center">
                    <div>
                        <img className="w-10 h-10 object-cover rounded-full mr-4" src={`${this.props.imgPath}${user.img}`} />
                    </div>
                    <div>
                        <p className="text-md text-gray-800 mb-2">{user.name} {friend.status === 1 ? '(Requested)' : '(Pending)'}</p>
        <p className="text-sm text-gray-600">{user.job ? user.job : 'Not specified'}</p>

              
                    </div>
                    <div className="ml-auto flex">
                        {friend.status !== 1 ?     <button className="w-8 h-8 text-white bg-green-400 rounded-full mr-4 hover:bg-green-600"  onClick={()=>this.props.acceptFriend(user._id)}>
                    <i className="fa fa-check"></i>  
                    </button> : ''}
                
                    <button className="w-8 h-8 text-white bg-pink-600 rounded-full hover:bg-pink-600" onClick={() => this.handleDenyFriend(user._id,friend.status)}>
                    <i className="fa fa-close"></i>  
                    </button>
                 
                    </div>

           
                    
                </div>
            </li>
        })
    }
    renderFriendList = () => {
        let friendList = this.props.friends.filter(friend => friend.status === 3 && (this.filterSearch(friend)))
     
        return friendList.map(friend => {
            let user;
            if (friend.recipient._id === this.props.user._id) {
                user = friend.requester

            }
            else {
                user = friend.recipient
            }
            return <li key={user._id} className="my-4 cursor-pointer" onClick={() => {
                this.props.initConversation(user._id)
                if(window.innerWidth <= 900){
                    this.props.showMsg()
                }
                this.props.closeProfile()
               
            }}>
                <div className="conversation-part flex items-center">
                    <div>
                        <img className="w-10 h-10 object-cover rounded-full mr-4" src={`${this.props.imgPath}${user.img}`} />
                    </div>
                    <div>
                        <p className="text-md text-gray-800 mb-2">{user.name}</p>
                        <p className="text-sm text-gray-600">{user.job ? user.job : 'Not specified'}</p>


                    </div>
                </div>
            </li>
        })
    }
    handleCloseAddFriend =() => {
        this.setState({addFriendOpen:false})
    }
    renderUserFriends = () => {

        return <div>
            <AddFriendModal isOpen={this.state.addFriendOpen} handleCloseAddFriend={this.handleCloseAddFriend}/>
            <div className="side-bar absolute right-0 top-0 h-full bg-white w-1/5 z-40 shadow-2xl p-4">
                <div className="side-bar-top flex justify-between items-center">
                 <h1 className="text-2xl ">Friends</h1>
                 <div classname="flex justify-between">
                 <button onClick={()=>this.setState({addFriendOpen:true,isFriend:false})}  className="mr-2">
                        <i className="fa fa-user-plus text-xl bg-white border border-gray-400 text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-700 hover:text-white"></i>
                    </button>
                    <button onClick={()=>this.props.closeProfile()} >
                        <i className="fa fa-close text-xl bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-700"></i>
                    </button>
                 </div>
                  

                </div>
                <div className="w-full my-8 border-gray-300 border-2 px-4  rounded-lg  text-gray-600">
                    <button className="w-1/2 border-r-2" onClick={()=> this.showFriend()} >
                        <i className="fa fa-users" ></i>
                    </button>
                    <button className="w-1/2"  onClick={()=> this.showRequest()} >
                        <i className="fa fa-book" ></i>
                    </button>
                </div>
                <div className="my-4">
                    <input onChange={(e)=>{this.setState({searchInput:e.target.value})}} className="border-2 border-gray-400 rounded-md w-full p-2" placeholder="Search" />
                </div>
                <div className={`text-md text-gray-600 my-4 ${!this.state.isFriend ? 'hidden' : ''}`}>
                    {this.returnLength()} {this.returnLength() > 1 ? 'Friends' : 'Friend'}
                </div>
                <ul>
                    {this.state.isFriend ? this.renderFriendList() : this.renderFriendRequest()}
                </ul>

            </div>
        </div>

    }
    render() {
    
        return <div>  {Object.keys(this.props.user).length !== 0 ?  this.renderUserFriends() : ''}</div>
    }
}
const mapStateToProps = state => {
    return {
        user: state.userProfile,
        imgPath:state.imgPath,
        friends:state.userFriends,
    }
}
export default connect(mapStateToProps, {acceptFriend,denyFriend,initConversation})(UserFriend)