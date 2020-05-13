
import React from 'react'
import { connect } from 'react-redux'
import { logOut } from '../../actions/index'
import './navbar.scss'

class Navbar extends React.Component {
    state = { showDropdown: false }
    handleLogout = () => {
        this.props.logOut()
        this.props.handleLogout()
    }
    render() {

        return <div className="flex  navbar text-white relative py-4  pr-32 bg-blue-500  ">
            {window.innerWidth <= 900 && this.props.showMsg ? <div onClick={() => this.props.backToHistoryList()} className="ml-10 text-2xl"> <i className="fa fa-long-arrow-left"></i> </div> : ''} 
            <div className="flex justify-end items-center w-full navbar-right ">
             
                <div className="navbar-user flex justify-end relative">
                    <ul className={`dropdown absolute bg-white rounded-lg shadow-lg text-gray-600 w-40 ${this.state.showDropdown ? '' : 'hidden'}`} >
                        <li onClick={() => {
                            this.props.showProfile()
                            this.setState({ showDropdown: false })
                        }} className="px-4 py-2 cursor-pointer" >Profile</li>
                               <hr></hr>
                         <li onClick={() => {
                                this.props.showProfile(1)
                                this.setState({showDropdown:false})
                         } } className="px-4 py-2  cursor-pointer">Friends</li>
                        <hr></hr>
                        <li className="px-4 py-2 text-red-700 cursor-pointer" onClick={() => this.handleLogout()}>Logout</li>
                    </ul>
                    <div className="flex items-center cursor-pointer" onClick={() => this.setState({ showDropdown: !this.state.showDropdown })}>
                        <span>{this.props.user.name}</span>
                        <img className="w-8 h-8 object-cover rounded-full ml-4" src={`${this.props.imgPath}${this.props.user.img}`} />

                    </div>


                </div>

            </div>


        </div>
    }
}

const mapStateToProps = (state, ownProps) => {

    return {
        user: state.userProfile,
        imgPath:state.imgPath
    }
}

export default connect(mapStateToProps, { logOut })(Navbar)
