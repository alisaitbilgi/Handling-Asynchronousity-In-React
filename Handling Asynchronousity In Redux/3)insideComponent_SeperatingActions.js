
/*
	A better approach against step1 and step2 is rather than dispatching actions inside components,
dispatching action "creators" that produceses actions. This way we'll have better reusable
components and actions. But as you can see, we're still handling our async job inside component.
*/

// actions.js
export function showNotification(text) {
  return {type: 'SHOW_NOTIFICATION', text}
}

export function hideNotification() {
  return {type: 'HIDE_NOTIFICATION'}
}

// component blabla.js
import {showNotification, hideNotification} from "../actions";

this.props.dispatch(showNotification('You just logged in.'));
setTimeout(() => {
  this.props.dispatch(hideNotification())
}, 5000);


/*

PROS:

- WORKS ON SIMPLE CASES.

CONS:

- CODE DUPLICATION. (SetTimeout usage) 

- RACE CONDITION OCCURS, NOTIFICATIONS HAVE NO IDs.

- OPERATION SHOULD NOT BE DONE IN THE COMPONENT, DECREASES CODE-REUSE. 

*/
