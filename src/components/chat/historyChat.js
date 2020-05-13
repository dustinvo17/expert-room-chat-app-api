import React from 'react'
import { connect } from 'react-redux'
import { getConversationHistory, getCurrentConversation ,injectConversationID,setIndexConversation } from '../../actions/index'
import ReactTimeAgo from 'react-time-ago'
import './historyChat.scss'

// "custom-tooltip" component.
// Requires React >= 16.

class HistoryChat extends React.Component {

    async componentDidMount() {
       
        const data = await this.props.getConversationHistory()
        const {payload} = data
       
        if(payload.length !== 0){
            this.props.injectConversationID(payload[this.props.indexConversation]._id)
            this.props.getCurrentConversation(payload[this.props.indexConversation].messages)
        }
 
    }
    renderConversation = () => {
        if (this.props.conversations.length > 0) {
            return this.props.conversations.map((conversation,i) => {
                const { name,img} = conversation.members.find(member => member._id !== this.props.user._id)
        
                const { messages } = conversation
                const lastMsg = messages[messages.length -1]
                
                return <li onClick={() => {
                    this.props.getCurrentConversation(conversation.messages)
                    this.props.setIndexConversation(i)
                    if(window.innerWidth <= 900) {
                        this.props.showMsg()
                    }
                   
                } } key={conversation._id} className={` cursor-pointer flex justify-between w-full py-4   ${i === this.props.indexConversation? 'border-b-2 border-blue-500': 'border-gray-200'} `}>
                    <div className="conversation-part flex items-center">
                        <div>
                            <img className="w-10 h-10 object-cover rounded-full mr-4" src={`${this.props.imgPath}${img}`} />
                        </div>
                        <div>
                            <p className="font-bold text-blue-400">{name}</p>
                            {lastMsg ?   <p className="text-sm text-gray-600">{lastMsg.status === 0 ? lastMsg.body : <div>
                                <i className="fa fa-camera  "></i> Photo
                            </div> }  </p> : ''}
                          

                        </div>
                    </div>
                    {lastMsg ?  <div className="time-part text-gray-500 text-xs flex items-end">
                        <ReactTimeAgo date={lastMsg.createdAt} />

                    </div> :'' }
                  

                </li>
            })
        }
        else {
            return <li>New Chat</li>
        }

    }
    render() {
      
        return <div className="w-1/4 h-full flex flex-col history-chat">
            <h1 className="p-4 text-2xl ">Chats</h1>
            <div className="p-4">
                <input className="border-2 border-gray-400 rounded-md w-full p-2" placeholder="Search" />
            </div>
            <div className="flex flex-col justify-between flex-grow p-4 ">
                <ul className="w-full flex-grow mb-auto overflow-y-auto ">
                    {this.renderConversation()}
                </ul>
                <div className="py-4 cursor-pointer" onClick={() => this.props.showProfile(1)}>
                    <button className="px-8 self-start bg-blue-500 hover:bg-blue-500 text-white font-bold py-2 rounded-lg w-full">New chat</button>
                </div>
            </div>


        </div>
    }
}
const mapStateToProps = (state, ownProps) => {

    return {
        user: state.userProfile,
        conversations: state.conversationHistory,
        imgPath: state.imgPath,
        indexConversation: state.indexConversation
    }
}
export default connect(mapStateToProps, { getConversationHistory,getCurrentConversation , injectConversationID,setIndexConversation })(HistoryChat)