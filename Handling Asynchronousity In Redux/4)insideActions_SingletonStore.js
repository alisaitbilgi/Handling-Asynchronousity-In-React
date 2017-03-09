/*
    React is a library and stays in the VIEW part of the MVC architectural pattern. However,
  Redux with React provides us M-V-C pattern and almost a total skeleton for a client-side application. 
    In this point of view, we have; 
    
    Store => Modal (M)
    Components => View (V)
    Actions + Reducers => Controller (C)

    By using this approach, we'll have a better reusable both components and actions, loosly coupled and modular js files.
  This seperation of concerns requires, async operations to be handled inside of "ACTIONS" not #components#. So, the easiest 
  and not a good way of handling async operations inside of actions is; importing store in an action creator and making 
  store.dispatch() inside, because to make an async operation inside of action we need store.dispatch method to be available 
  in actions.
*/

// store.js
export default createStore(reducer)

// actions.js
import store from './store'; // (this line makes store a singleton object.)

let nextNotificationId = 0;

export function showNotificationWithTimeout(text) {

  const id = nextNotificationId++;
  store.dispatch(showNotification(id, text));

  setTimeout(() => {
    store.dispatch(hideNotification(id));
  }, 5000);

}

// component.js
showNotificationWithTimeout('You just logged in.');

// otherComponent.js
showNotificationWithTimeout('You just logged out.');

/*

PROS:

  - RACE CONDITION SOLVED.

  - BETTER REUSABLE.

  - CODE SIZE DECREASES.

CONS:

  - NOT RECOMMENDED APPROACH. STORE IS FORCED TO BE SINGLETON BECAUSE *ACTION CREATOR* HAS DIRECT ACCESS
      TO DISPATCH AND STORE.

    # THIS MAKES VERY HARD TO IMPLEMENT SERVER-SIDE RENDERING.

    # AND ALSO TESTING

    (Recommended usage is not importing store in order for it not to be a singleton object.)

*/
