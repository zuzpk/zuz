import React, { useEffect, useRef } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  useRoutes,
  useNavigate
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useIdleTimer } from 'react-idle-timer'
import { ErrorBoundary } from "react-error-boundary"
import { 
  setCookie, 
  getCookie, 
  removeCookie,
  grab,
  sessionExpired
} from "./zuz";
import { base } from "./config";

//Core
import Catch from "./Catch";
import Splash from "./pages/Splash";
import AppRoutes from "./AppRoutes"

import "./css/app.scss";

function App(props) {

  const {
    debug,
    loaded,
    session,
    sessionTime,
    userExpired
  } = useSelector(state => state.App);
  const dispatch = useDispatch();
  const setState = async state => dispatch({ type: "APP_STATE", state: { ...state, _tmp: Math.random() }});
  const idle = useRef();

  const initialize = async () => {
    if(loaded) return;
    var defaults = {
      sessionTime: null,
      recaptcha: null
    }
    grab(`app/init`)
    .then(resp => {
      defaults = {
        sessionTime: resp.sessionTime || null,
        recaptcha: resp.recaptcha || null
      }
      if("kind" in resp){
          setState({ 
              loaded: true, 
              session: true, 
              user: resp.u.me, 
              ...defaults
          });        
      }else{
          setState({ 
            loaded: true, 
            session: false, 
            user: null, 
            ...defaults
          });            
      }
    })
    .catch(err => {
        debug && console.log(err);
        setState({ 
          loaded: true, 
          session: false, 
          user: null, 
          ...defaults
        }); 
    })
  }

  useEffect(() => {
      userExpired && sessionExpired()
      !userExpired && initialize()
  }, [session, loaded, userExpired])

  return (
    <ErrorBoundary
      FallbackComponent={Catch}
      onReset={() => window.location.href = base}>
      <BrowserRouter>
        {loaded ? <div className={`app-main flex `}>
            <AppRoutes />
        </div> : <Splash />}
      </BrowserRouter>
    </ErrorBoundary>
  )
}

export default App;