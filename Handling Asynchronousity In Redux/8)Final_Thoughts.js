/*
	In this study, i've covered how to handle promise-based async operations with or without Redux-Thunk.
As you can see and Dan Abramov stated, "Middleware like Redux Thunk or Redux Promise just gives you 
“syntax sugar” for dispatching thunks or promises, but you don’t have to use it."
*/

	// instead of writing this;

	// action creator
	function loadData(dispatch, userId) { // needs to dispatch, so it is first argument
	  return fetch(`http://data.com/${userId}`)
	    .then(res => res.json())
	    .then(
	      data => dispatch({ type: 'LOAD_DATA_SUCCESS', data }),
	      err => dispatch({ type: 'LOAD_DATA_FAILURE', err })
	    );
	}

	// component
	componentWillMount() {
	  loadData(this.props.dispatch, this.props.userId); // don't forget to pass dispatch
	}

	// You can write this with Redux-Thunk;

	// action creator
	function loadData(userId) {
	  return dispatch => fetch(`http://data.com/${userId}`) // Redux Thunk handles these
	    .then(res => res.json())
	    .then(
	      data => dispatch({ type: 'LOAD_DATA_SUCCESS', data }),
	      err => dispatch({ type: 'LOAD_DATA_FAILURE', err })
	    );
	}

	// component
	componentWillMount() {
	  this.props.dispatch(loadData(this.props.userId)); // dispatch like you usually do
	}
/*
	Again Dan says: 

	"So the benefit of using middleware like Redux Thunk or Redux Promise is that components aren’t aware of 
how action creators are implemented, and whether they care about Redux state, whether they are synchronous or asynchronous, 
and whether or not they call other action creators. The downside is a little bit of indirection, 
but we believe it’s worth it in real applications.

	Finally, Redux Thunk and friends is just one possible approach to asynchronous requests in Redux apps. 
Another interesting approach is Redux Saga which lets you define long-running daemons (“sagas”) that take actions as they come, 
and transform or perform requests before outputting actions. This moves the logic from action creators into sagas. 
You might want to check it out, and later pick what suits you the most."
*/
