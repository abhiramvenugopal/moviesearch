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