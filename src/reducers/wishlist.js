
const wishlistReducer= (state={},action)=>{
    switch(action.type){
        case 'APPEND':
            state[action.payload.id]=action.payload.value
            return  state
        case 'REMOVE':
            delete state[action.payload.id]
            return state
        default :
            return state
    }
}
export default wishlistReducer