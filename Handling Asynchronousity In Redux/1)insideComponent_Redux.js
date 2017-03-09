
/*
First way of handling asynchronousity in redux applications is doing it inside of the component.
*/


// Component Bla-Bla
store.dispatch({ type: 'SHOW_NOTIFICATION', text: 'You logged in.' });
setTimeout(() => {
	store.dispatch({ type: 'HIDE_NOTIFICATION' });
}, 5000);
