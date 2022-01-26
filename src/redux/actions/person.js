export const add_person = (person)=> {
  return (dispatch) => {
    dispatch({type:'add', person})
  }
}