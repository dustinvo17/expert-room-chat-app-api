import {combineReducers} from 'redux'
import {reducer as reduxForm} from 'redux-form'
import authReducer from './auth/authReducer'
import userProfile from './auth/userProfile'
import imgPath from  './imgPath'
import userSearch from  './profile/usersearch'
import userFriends from './profile/userFriends'
import conversationHistory from './chat/conversationHistory'
import conversationId from './chat/conversationId'
import currentConversation from './chat/currentConversation'
import indexConversation from './chat/indexConversation'
const appReducer = combineReducers({
    access_token: authReducer,
    userProfile,
    conversationHistory,
    messages:currentConversation,
    indexConversation,
    imgPath,
    form: reduxForm,
    userSearchList:userSearch,
    conversationId,
    userFriends
})
const rootReducer = (state, action) => {   
    // Clear all data in redux store to initial.
    if(action.type ==='logout')
       state = undefined;
    
    return appReducer(state, action);
 };
 export default rootReducer;
