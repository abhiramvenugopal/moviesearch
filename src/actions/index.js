export const increment=(value)=>{
    return {
        type:'INCREMENT',
        payload : value
    }
}
export const decrement=()=>{
    return {
        type:'DECREMENT'
    }
}
export const append=(value)=>{
    return {
        type:'APPEND',
        payload : value
    }
}
export const remove=(value)=>{
    return {
        type:'REMOVE',
        payload : value
    }
}