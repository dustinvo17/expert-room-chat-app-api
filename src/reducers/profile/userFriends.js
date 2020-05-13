export default (state=[],action) =>{
    switch(action.type){
        case "user_friends":
            return action.payload
        default:
        return state;
        
    }
}