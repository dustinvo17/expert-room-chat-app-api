import React from 'react';
import Modal from 'react-modal';
import {connect} from 'react-redux'
import {getUserByName, addFriend} from '../../actions/index'

 
const customStyles = {
  content : {
   
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    padding:'30px 15px',

  },overlay: {
    zIndex: 99,
    background: "rgba(0,0,0,0.6)"
}
};
 
// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root')
 
class AddFriendModal extends React.Component{
    state ={nameSearch:''}
    handleSearch =(e) => {
        e.preventDefault()
  
        if(this.state.nameSearch.length > 0) {
            this.props.getUserByName(this.state.nameSearch)
            this.setState({nameSearch:''})
        }
    }
    handleAddFriendClick = async (user) => {
        const result = await this.props.addFriend(user._id)
        console.log(result)
        let icon = document.getElementById(user._id)

        if(!result) {
            icon.className = (icon.className.replace('fa-user-plus','fa-warning')).replace('text-blue','text-red')
        }
        else {
            icon.className = (icon.className.replace('fa-user-plus','fa-check')).replace('text-blue','text-green')
        }
    }
    renderResult = () => {
        return this.props.results.map(user => {
        return <li key={user._id} className="mb-4">
        <div className="conversation-part flex items-center">
            <div>
                <img className="w-10 h-10 object-cover rounded-full mr-4" src={`${this.props.imgPath}${user.img}`} />
            </div>
            <div>
                <p className="text-md text-gray-800 mb-2">{user.name}</p>
                <p className="text-sm text-gray-600">Dental Hygienist</p>


            </div>
            <button className="ml-auto" id={`button${user._id}`} onClick={(e)=> this.handleAddFriendClick(user)  }>
                <i className={`fa fa-user-plus text-blue-500 text-xl `} id={user._id}></i>
            </button>
            
        </div>
    </li>
        })
    }
  render(){
    return (
        <div className="relative " >
      
          <Modal
            isOpen={this.props.isOpen}
            style={customStyles}
            contentLabel="Example Modal">
        <button className="absolute" style={{top:'5px',right:'10px'}} onClick={()=>this.props.handleCloseAddFriend()}>
            <i className="fa fa-close text-md text-gray-600"></i>
        </button>
        <form >
            <div className="flex items-center">
            <input value={this.state.nameSearch} onChange={(e)=>{this.setState({nameSearch:e.target.value})}} className="border-2 border-gray-400 rounded-md w-full p-2 mr-2" placeholder="Search User" />
            <button onClick={(e) => this.handleSearch(e)} ><i className="fa fa-search text-2xl text-gray-600"></i></button>
            </div>
           
        </form>
        <ul className="mt-4">
        {this.props.results.length !== 0 ? this.renderResult() : ''}
        </ul>
  
   
          </Modal>
        </div>
      );
  }
    
}
const mapStateToProps = (state) => {
    return {
        results: state.userSearchList,
        imgPath: state.imgPath,
        user: state.userProfile
    }

}
export default connect(mapStateToProps,{getUserByName,addFriend})(AddFriendModal)
 
