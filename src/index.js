import React from 'react';
import { render } from 'react-dom';
import ReactLoading from "react-loading";
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import { startGetCategories } from './actions/categories';
import { startGetLocations } from './actions/locations';

import './index.css';

const store = configureStore();

let hasRendered = false;
const renderApp = () => {
    if (!hasRendered) {
        const jsx = (
            <Provider store={store}>
                <AppRouter />
            </Provider>
        );
        render(jsx, document.getElementById('app'));
        hasRendered = true;
    }
};

if (navigator.userAgent.toLowerCase().indexOf('msie') > -1 || navigator.userAgent.toLowerCase().indexOf('trident') > -1 || navigator.userAgent.toLowerCase().indexOf('edge') > -1 ){
    render(<div className="app__preloader"><img src="/images/ie-preloader.gif" alt=""/></div>, document.getElementById('app'));
} else {
    render(<div className="app__preloader"><ReactLoading type="spinningBubbles" color="#666665" /></div>, document.getElementById('app'));
}

store.dispatch(startGetCategories()).then(() => {
    store.dispatch(startGetLocations()).then(() => {
        renderApp();
    });
});

