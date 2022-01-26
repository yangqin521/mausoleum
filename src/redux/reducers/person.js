const initState = [{id:'001', name:'tom', age:'18'}];
export default function personReducer(preState=initState, action) {
  const {type, person} = action;
  switch(type) {
    case 'add':
      return [person, ...preState];
    default:
      return preState;
  }
  
}