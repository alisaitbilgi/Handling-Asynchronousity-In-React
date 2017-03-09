
/*
and if you're using react-redux, same with the Step 1.
*/

// Component Bla-Bla
this.props.dispatch({ type: 'SHOW_NOTIFICATION', text: 'You logged in.' });
setTimeout(() => {
	this.props.dispatch({ type: 'HIDE_NOTIFICATION' });
}, 5000)

