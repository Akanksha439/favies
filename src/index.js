import React from 'react';
import ReactDOM from 'react-dom';
import {createStore,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import './index.css';
import App from './components/App';
//import movies from './reducers';
import rootReducer from './reducers';

//function logger(ob,next,action)
//logger(obj)(next)(action)
/*const logger=function({dispatch,getState}){
  return function(next){
    return function(action){
      //middleware code
      console.log('ACTION_TYPE=',action.type);
      next(action);
    }
  }
}*/

//modified logger middleware code
const logger=({dispatch,getState})=>(next)=>(action)=>{
  //console.log('ACTION_TYPE=',action.type);
  next(action);
}

//const thunk=({dispatch,getState})=>(next)=>(action)=>{
  //if(typeof action==='function'){
    //action(dispatch);
    //return;
  //}
//next(action);
//}

const store=createStore(rootReducer,applyMiddleware(logger,thunk));
//console.log('store',store);
//console.log('STATE',store.getState());
//store.dispatch({
  //type:'ADD_MOVIES',
  //movies:[{name:'Superman'}]
//});
ReactDOM.render(
 <App store={store} />,
  document.getElementById('root')
);


