export default (state={},action) =>{
    switch(action.type){
        case "get_conversation_history":
            return action.payload
        default:
        return state;
        
    }
}