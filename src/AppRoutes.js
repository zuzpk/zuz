import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import {
    BrowserRouter,
    Routes,
    Route,
    Redirect,
    Switch
} from "react-router-dom";
import { setCookie, getCookie, removeCookie } from "./zuz";
import { base, debug } from "./config";

//Core
import Error404 from "./pages/Error404";
import Landing from "./pages/Landing";
import Auth from "./pages/Auth";

//IMPORT YOUR PAGES HERE


function AppRoutes(props) {

    const {
        debug,
        loaded,
        session
    } = useSelector(state => state.App);

    return (
        <Routes>
            {/* Landing */}
            <Route 
            path="/" 
            element={<Landing />}
            />

            {/* DON'T EDIT BELOW */}
            {/* Account */}
            <Route path={`/u`}>
                <Route 
                path={`:section`} 
                element={<Auth />} >
                    <Route 
                        path={`:accesstoken`} 
                        element={<Auth />}
                    />
                </Route>
            </Route>

            
            {/**404 */}   
            <Route 
            path="*" 
            element={<Error404 />}
            />

        </Routes>
    );
}

export default AppRoutes;