
/*
    As we can see, step5 is really good enough. However there were some small problems with that approach too. 
  If we're facing with those problems mentioned in step5 as "cons", Dan Abramov says that:
  
  "Those problems was the motivation for finding a way to “legitimize” this pattern of providing 
  dispatch to a helper function, and help Redux “see” such asynchronous action creators 
  as a special case of normal action creators rather than totally different functions."
  
    You will need a middleware. (Or better to say, you might need a middleware)

    In step6 we're observing Redux-Thunk middleware. To enable Redux-Thunk we must config our store and pass
  it to applyMiddleware function as an argument. To understand how we apply this, i've written applyMiddleWare
  function in the same named file. You can deeply understand the idea behind a middleware by looking at this.
*/


// store.js
import {createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import rootReducer from "../reducers";

export default function configStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk)
  );
}

// index.js
import {configStore} from "../store";
const store = configStore();


// actions.js
function showNotification(id, text) {
  return { type: 'SHOW_NOTIFICATION', id, text }
}

function hideNotification(id) {
  return { type: 'HIDE_NOTIFICATION', id }
}

let nextNotificationId = 0;
export function showNotificationWithTimeout(text) {
  return function (dispatch) {
    const id = nextNotificationId++;
    dispatch(showNotification(id, text));
    setTimeout(() => {
      dispatch(hideNotification(id));
    }, 5000);
  }
}

// component.js

import { connect } from 'react-redux';
// ...
this.props.showNotificationWithTimeout('You just logged in.');
// ...
export default connect(
  mapStateToProps,
  {showNotificationWithTimeout}
)(MyComponent)

/*
  WHEN REDUX-THUNK IS ENABLED, ANY TIME DISPATCHING A FUNCTION IS ATTEMPTED (INSTEAD OF AN ACTION OBJECT),
MIDDLEWARE WILL CALL THIS FUNCTION WITH DISPATCH METHOD AS ITS FIRST ARGUMENT.
*/
