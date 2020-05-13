export default (state=[],action) =>{
    switch(action.type){
        case "current_conversation":
            return action.payload
        default:
        return state;
        
    }
}