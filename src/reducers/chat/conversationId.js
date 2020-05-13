export default (state='',action) =>{
    switch(action.type){
        case "conversation_id":
            return action.payload
        default:
        return state;
        
    }
}