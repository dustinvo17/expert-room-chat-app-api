import React from 'react'
import { connect } from 'react-redux'
import {uploadImageProfile, updateUserProfile} from '../../actions/index'
import './userProfile.scss'
class UserProfile extends React.Component {

    constructor(props){
        super(props)
        this.inputOpenFileRef = React.createRef()
        this.state = {name:props.user.name , job:props.user.job}

    }

    handleImageUpload = (e) => {
        const formData = new FormData();
        formData.append('file', e.target.files[0])
        this.props.uploadImageProfile(formData)
    }
    handleUpdateProfile = (e) => {
        e.preventDefault()
        this.props.updateUserProfile(this.state.name,this.state.job)
    }
    render() {
       
        return <div className="side-bar absolute right-0 top-0 h-full bg-white w-1/5 z-50 shadow-2xl p-4">
            <div className="side-bar-top flex justify-between items-center">
                <h1 className="text-2xl ">Profile</h1>
                <button onClick={() => this.props.closeProfile()}>
                    <i className="fa fa-close text-xl bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-700"></i>
                </button>
            </div>
            <div className="side-bar-profile flex flex-col justify-center items-center my-4 " >

                <img src={`${this.props.imgPath}${this.props.user.img}`} className="w-24 h-24 rounded-full mt-4 mb-2 object-cover img-profile ">
                
                </img>
                <button className="text-gray-500 hover:text-gray-600  btn-profile  border border-gray-500 hover:border-gray-600 " onClick={()=>this.inputOpenFileRef.current.click()}>
                    <i className="fa fa-camera "></i>
                </button>
            
            </div>
          
            <form className="side-bar-form mt-8 text-gray-700">
            <input type="file" id="file"  onChange={(e) => this.handleImageUpload(e)}  ref={this.inputOpenFileRef} style={{ display: "none" }} />
                <div>
                    <label className="font-bold" htmlFor="name">Name</label>
                    <input id="name" value={`${this.state.name}`} onChange={(e)=>this.setState({name:e.target.value})} className="p-2 border-2 border-gray-300 rounded-lg w-full my-4 shadow-md"></input>
                </div>
                <div className="my-4">
                    <label className="font-bold" htmlFor="job">Job</label>
                    <input id="job" value={this.state.job} onChange={(e)=>this.setState({job:e.target.value})}  className="p-2 border-2 border-gray-300 rounded-lg w-full my-4 shadow-md" ></input>
                </div>
                <div className="flex justify-center mt-auto">
                    <button className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded" onClick={() => this.handleUpdateProfile()}>
                        Update
</button>
                </div>
                <div>

                </div>

            </form>
        </div>
    }


}
const mapStateToProps = state => {

    return {
        user: state.userProfile,
       
        imgPath: state.imgPath
    }
}
export default connect(mapStateToProps, {uploadImageProfile, updateUserProfile})(UserProfile)
