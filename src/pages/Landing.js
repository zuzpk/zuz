import React, { useEffect } from 'react';
import Logo from "../assets/logo";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { 
    Dialog,
    Logout
} from "../zuz";
import { base } from "../config"

function Landing(props) {

    const {
        debug,
        session,
        user,
    } = useSelector(state => state.App);
    const dispatch = useDispatch();
    const setState = async state => dispatch({ type: "APP_STATE", state: { ...state, _tmp: Math.random() }});

    useEffect(() => {
        
    }, [])

    return (
        <>
            <a href="https://github.com/zuzpk/zuz" className={`github abs noul flex aic font c333`}>
                <div class="icon-github s24" />
                <h2 className={`c333 b`}>Github</h2>
            </a>
            {session && <div className={`youp abs flex aic font b s15`}>
                <div>Hi, {user?.name?.first || `There`}</div>
                <button className={`button link s15 noul noulh b font`} onClick={e => Logout().then(() => {
                    setState({ session: false, user: null })
                    .then(() => window.location = base ); 
                })}>Sign out</button>
            </div>}
            <div className={`landing abs abc flex col jc`}>

                <Logo fontSize={50} />
                
                <h2 className={'tc slogan s24 b font'}>Say Hello To Zuz CMS</h2>  
                <h2 className={'tc slogan2 s18 font'}>Create Web Apps With Ease</h2>  
                
                <div className={`btns flex aic jc`}>
                    <Link to={`/u/signin`} className={`button cfff noul b6`}>Sign in</Link>
                    <Link to={`/u/signup`} className={`button noul cfff b6`}>Create Account</Link>
                    {/* <Link to={`/components`} className={`button noul cfff b6`}>Browse Zuz UI</Link> */}
                </div>
                
            </div>
        </>
    )
}

export default Landing;