import React from 'react'
import { connect } from 'react-redux'
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'
import openSocket from 'socket.io-client';
import { handleUploadImage, handleMessageSend } from '../../actions/index'
import './message.scss'
import Modal from 'react-modal';
const customStyles = {

    content: {

        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }, overlay: {
        background: "rgba(0,0,0,0.5)"
    }
};
Modal.setAppElement('#root')
class Messages extends React.Component {
    constructor(props) {
        super(props)
        this.inputOpenFileRef = React.createRef()
        this.state = { showEmoji: false, chatInput: '', openModal: false, imgUrl: '' }
        this.lastMsg = React.createRef()
        this.socket = openSocket('https://expert-room-277120.uc.r.appspot.com', {
            query: {
                access_token: localStorage.getItem('access_token')
            }
        })
    }
    componentDidMount() {
        this.socket.on('chat', data => {
            console.log(data)
            this.props.handleMessageSend(data)
        })
        if (this.lastMsg.current) {
            this.lastMsg.current.scrollIntoView()
        }


    }
    componentDidUpdate(prevProps, prevState) {
        if (this.props.messages.length > prevProps.messages.length) {
            if (this.lastMsg.current) {
                this.lastMsg.current.scrollIntoView()
            }

        }
    }

    renderMessages = () => {

        if (this.props.messages.length !== 0 && Object.keys(this.props.user).length !== 0) {

            return this.props.messages.map((msg, index) => {
              
             
                // check if current user is owner of msg to build start --end messages layout
          
                let owner = msg.user._id === this.props.user._id
            
                return <li ref={index === this.props.messages.length - 1 ? this.lastMsg : ''} className={`${owner ? 'self-start' : 'self-end'} flex relative items-center my-4 single-msg`} key={msg._id}>
                    <div className={`text-base p-2 rounded-lg ${owner ? 'order-1 bg-white text-gray-700 ml-4' : 'bg-black text-white mr-4'}`}>
                        {msg.status === 0 ? <span >{msg.body}</span> :
                            <img onClick={() => this.handleModalImage(msg.body)} src={`${this.props.imgPath}${msg.body}`} className="img-msg w-64 h-32 rounded-lg object-cover cursor-pointer" />
                        }
                    </div>



                    <img className="w-8 h-8 object-cover rounded-full cursor-pointer " src={`${this.props.imgPath}${msg.user.img}`} />

                </li>
            })
        }


    }
    handleModalImage = (url) => {

        this.setState({ openModal: true, imgUrl: url })
    }
    addEmoji = (e, event) => {

        this.setState({ chatInput: this.state.chatInput + e.native })

    }
    toggleEmojiSheet = () => {
        this.setState({ showEmoji: !this.state.showEmoji })
    }
    turnOffsheet = () => {
        if (this.state.showEmoji) {
            this.setState({ showEmoji: false })
        }
    }
    handleImageUpload = (e) => {
        const formData = new FormData();
        formData.append('file', e.target.files[0])
        this.props.handleUploadImage(formData, this.props.conversationId)
    }
    handleMessageSend = (e) => {
        e.preventDefault()
        this.turnOffsheet()
        if (this.state.chatInput.length !== 0) {
            const data = {
                conversationId: this.props.conversationId,
                message: this.state.chatInput,

            }
            this.socket.emit('chat', data)
            this.setState({ chatInput: '' })
        }
    }
    render() {
      
        return <div className="w-3/4 px-8 pt-8 pb-0 bg-gray-400 flex flex-col messages-part">
            <div onClick={(e) =>

                this.setState({ openModal: false })
            }
            >
                <Modal

                    isOpen={this.state.openModal}

                    style={customStyles}
                    contentLabel="Example Modal">
                    <div className="flex justify-end mb-4">
                        <i className="fa fa-close text-blue-700 cursor-pointer" onClick={() => this.setState({ openModal: false })}></i>
                    </div>

                    <img style={{ maxHeight: '500px', maxWidth: '500px' }} className="object-cover img-modal" alt={this.state.imgUrl} src={`https://chatapp.s3.us-east-2.amazonaws.com/${this.state.imgUrl}`}></img>

                </Modal >
            </div>

            <ul className="flex flex-col flex-grow overflow-auto p-8 h-64 list-msg">

                {this.renderMessages()}

            </ul>
            <div className="py-8 chat-input-part">
                <form className=" bg-white flex rounded-lg p-4 relative items-center" onSubmit={(e) => this.handleMessageSend(e)}>
                    <Picker onSelect={this.addEmoji} set='apple' style={{ display: `${this.state.showEmoji ? 'block' : 'none'}` }} />
                    <div className="mr-4 py-2 px-4  chat-input-part-btn rounded-lg bg-gray-300  cursor-pointer hover:bg-gray-400" onClick={() => this.toggleEmojiSheet()}>
                        <i className="text-gray-700 fa fa-smile-o text-xl "></i>
                    </div>

                    <input onFocus={() => this.turnOffsheet()} value={this.state.chatInput} onChange={(e) => this.setState({ chatInput: e.target.value })} className="focus:border-blue-500 flex-grow border-gray-400 border-2 p-2 rounded-lg" placeholder="Write a message" />
                    <input type="file" id="file" onChange={(e) => this.handleImageUpload(e)} ref={this.inputOpenFileRef} style={{ display: "none" }} />
                    <div onClick={() => this.inputOpenFileRef.current.click()} className="mx-4 py-2 px-4 rounded-lg bg-gray-300  cursor-pointer hover:bg-gray-400">
                        <i className="text-gray-700 fa fa-image text-xl "></i>
                    </div>

                    <div className="py-2 px-4 rounded-lg bg-blue-500 text-white  cursor-pointer hover:bg-blue-600">
                        <button type="submit"><i className="fa fa-send text-sm "></i></button>
                    </div>

                </form>
            </div>

        </div>
    }
}

const mapStateToProps = (state, ownProps) => {

    return {
        messages: state.messages,
        user: state.userProfile,
        conversationId: state.conversationId,
        imgPath:state.imgPath
    }
}

export default connect(mapStateToProps, { handleUploadImage, handleMessageSend })(Messages)