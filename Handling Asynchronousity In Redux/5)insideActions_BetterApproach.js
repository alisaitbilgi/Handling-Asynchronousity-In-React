
/*
    In step4, we were in a good place to operate async actions. However this was still a bad way, we made our 
  store a singleton object and this makes server side rendering and testing so hard. Because in order for
  server side rendering idea's advantages to be applied, we must provide a new store for each different user
  with different initial values. If store is singleton, we give same initial values to each different user.
  (Read: http://redux.js.org/docs/recipes/ServerRendering.html for more information.)
  
    Now, without a middleware in step5, we want to dispatch async operations in "actions" and for that reason,
  we need store.dispatch method to be avaliable inside of actions and we cannot import store, so what we can do is,
  passing store.dispatch method from component to an action as a "parameter". 
    As you can see, without a middleware we're in the "BEST" place to handle asynchronousity in redux applications.
*/


// actions.js
function showNotification(id, text) {
  return { type: 'SHOW_NOTIFICATION', id, text }
}

function hideNotification(id) {
  return { type: 'HIDE_NOTIFICATION', id }
}

let nextNotificationId = 0;
export function showNotificationWithTimeout(dispatch, text) {

  const id = nextNotificationId++;
  dispatch(showNotification(id, text));

  setTimeout(() => {
    dispatch(hideNotification(id));
  }, 5000);

}

// component.js
showNotificationWithTimeout(this.props.dispatch, 'You just logged in.');

// otherComponent.js
showNotificationWithTimeout(this.props.dispatch, 'You just logged out.');

/*

PROS:

  - PROBLEMS ARE TOTALLY SOLVED, FROM 1 TO 4.

  - FOR SIMPLE APPS AND NORMAL-SITUATIONS THIS APPROACH IS GOOD ENOUGH AND NO NEED TO HAVE A MIDDLEWARE.

CONS:

  - IN LARGER APPS, THERE MIGHT BE INCONVENIENCES.

    # BEING HAVE TO PASSING "DISPATCH" AROUND, BREAKS "SEPARATION OF PRESENTATIONAL-CONTAINER COMPONENTS DESIGN"
        BECAUSE, ACTION-CREATORS WHICH DISPATCHES ACTIONS ASYNCHRONOUSLY HAS TO ACCEPT DISPATCH AS A PROP.

    # YOU CANNOT BIND ACTION-CREATORS WITH CONNECT() BECAUSE "showNotificationWith...()" DOESN'T RETURN AN ACTION AND
        IT'S NOT AN ACTION CREATOR.

    # IT'S HARD TO REMEMBER WHICH FUNCTIONS ARE SYNC ACTION CREATORS OR ASYNC HELPERS.
    
    what we need might be a middleware like 'redux-thunk' or 'redux-saga'. 
    To understand what is a middleware and how redux supplies us middleware suitable applications, please move
    applyMiddleware.js file before learning redux-thunk.

*/
