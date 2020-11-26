import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import ReactLoading from "react-loading";
import CategoriesPage from '../pages/CategoriesPage';
// import NotFoundPage from '../containers/NotFoundPage';

const createHistory = require("history").createBrowserHistory;


let loadImage = "";
if (navigator.userAgent.toLowerCase().indexOf('msie') > -1 || navigator.userAgent.toLowerCase().indexOf('trident') > -1 || navigator.userAgent.toLowerCase().indexOf('edge') > -1 ){
    loadImage = <div style={{width:'100vw', height:'100vh', display:'flex', justifyContent:'center', alignItems:'center'}}><img src="/images/ie-preloader.gif" alt="mylocations" /></div>;
} else {
    loadImage = <div style={{width:'100vw', height:'100vh', display:'flex', justifyContent:'center', alignItems:'center'}}><ReactLoading type="spinningBubbles" color="#666665" /></div>;
}

export const history = typeof(window) !== "undefined" ? createHistory() : createMemoryHistory();

class AppRouter extends React.Component {
    render() {
        return (
            <Router history={history}>
                <div>
                    <Switch>
                        <Route path="/" render={(props) => ( <CategoriesPage {...props} />)} exact={true} />
                        
                    </Switch>
                </div>
            </Router>
        )
    }
};

export default AppRouter;



{/* <Route path="/:category" render={(props) => ( <CategoryPage {...props} />)} exact={true} />
                        <Route component={NotFoundPage} /> */}
