export default (state='',action) =>{
    switch(action.type){
        case "img_path":
            return action.payload
        default:
        return state;
        
    }
}