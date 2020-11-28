import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import categoriesReducer from '../reducers/categories';
import locationsReducer from '../reducers/locations';
import currentLocationsReducer from '../reducers/currentLocations';

const composeEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    }) : compose;

const Store = () => {
    const store = createStore(
        combineReducers({
            categories: categoriesReducer,
            locations: locationsReducer,
            currentLocations: currentLocationsReducer
        }),
        composeEnhancers(applyMiddleware(thunk))
    );
    return store;
};

export default Store;