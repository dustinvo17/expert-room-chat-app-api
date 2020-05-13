export default (state=[],action) =>{
    switch(action.type){
        case "user_search":
            return action.payload
        default:
        return state;
        
    }
}