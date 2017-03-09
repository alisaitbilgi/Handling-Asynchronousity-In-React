/*
  for quickly understand: 
  
    applyMiddleWare function of redux provides to middlewares, "store.dispatch" and "store.getState()" methods, because
  a middleware needs "store.dispatch" and "store.getState()" methods to be available inside of itself. 
  
  if you need more to understand: https://medium.com/@meagle/understanding-87566abcfb7a#.yv2xvtvqj 
*/
export default function applyMiddleware(...middlewares) {
  return (next) => 
    (reducer, initialState) => {
      
      var store = next(reducer, initialState);
      var dispatch = store.dispatch;
      var chain = [];
      
      var middlewareAPI = {
        getState: store.getState,
        dispatch: (action) => dispatch(action)
      };

      chain = middlewares.map(middleware =>
                    middleware(middlewareAPI));
      
      dispatch = compose(...chain, store.dispatch);
      
      return {
        ...store,
        dispatch
      };

   };
}
