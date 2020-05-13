export default (state=0,action) =>{
    switch(action.type){
        case "index_conversation":
            return action.payload
        default:
        return state;
        
    }
}