export default function countReducer(preState, action) {
  const {type, data} = action;
  switch(type) {
    case 'goMap':
      data.props.push('mmap');
      return preState;
    default:
      return preState;
  }
}