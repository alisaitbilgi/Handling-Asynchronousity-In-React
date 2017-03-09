/*

 Usually your reducers contain the business logic for determining the next state.
 However, reducers only kick in after the actions are dispatched. What if you have a side effect
 (such as calling an API) in a thunk action creator, and you want to prevent it under some condition?

 */

 // ********** instead of doing this in component
 // component.js

if (this.props.areNotificationsEnabled) {
  showNotificationWithTimeout(this.props.dispatch, 'You just logged in.')
}

/*

 However, the point of extracting an action creator was to centralize this repetitive logic across many components.
    Fortunately, Redux Thunk offers you a way to read the current state of the Redux store. In addition to dispatch,
    it also passes getState as the second argument to the function you return from your thunk action creator.
    This lets the thunk read the current state of the store.

*/

//actions.js

let nextNotificationId = 0;

export function showNotificationWithTimeout(text) {
  return function (dispatch, getState) {

    // Unlike in a regular action creator, we can exit early in a thunk
    // Redux doesn’t care about its return value (or lack of it)

    // *********** you do this.
    if (!getState().areNotificationsEnabled) {
      return
    }

    const id = nextNotificationId++;
    dispatch(showNotification(id, text));

    setTimeout(() => {
      dispatch(hideNotification(id));
    }, 5000);

  }

}

/*

 Don’t abuse this pattern. If you use getState() only to conditionally dispatch different actions, consider putting
    the business logic into the reducers instead !!!

*/