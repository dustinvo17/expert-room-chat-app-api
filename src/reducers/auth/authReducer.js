export default (state={},action) =>{
    switch(action.type){
        case "auth":
            return action.payload
        default:
        return state;
        
    }
}