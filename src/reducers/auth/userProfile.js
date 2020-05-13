export default (state={},action) =>{
    switch(action.type){
        case "user_profile":
            return action.payload
        default:
        return state;
        
    }
}