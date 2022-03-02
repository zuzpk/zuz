import React, { useEffect } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Logo from "../../assets/logo";
import {
    Loader,
    Toast
} from "../../zuz/ui";
import {
    focus,
    isValidEmail,
    isValidPassword,
    grab,
    setCookie
} from "../../zuz";
import { 
    siteName, 
    ubase,
    COOKIE_AT,
    COOKIE_UT,
    COOKIE_HA 
} from "../../config";

function Verify(props) {

    const {
        debug,
        loading,
        verified,
        verifyMsg,
        session
    } = useSelector(state => state.App);
    const dispatch = useDispatch();
    const setState = async state => dispatch({ type: "APP_STATE", state: { ...state, _tmp: Math.random() }});
    const { forms } = useSelector(state => state.Form);
    const formID = "signup";
    let navigate = useNavigate();
    const { accesstoken } = useParams();

    const _Verify = () => {
        debug && console.log(`Verifying...`);
        grab(
            `u/verify`,
            { token: accesstoken }
        )
        .then(resp => {
            setState({ loading: false, verified: resp.kind, verifyMsg: resp.reason })
            .then(() => {})
            .catch(err => {
                debug && console.log(err);
                window.grecaptcha && window.grecaptcha.reset();
                setState({ loading: false });
            });        
        })
        .catch(err => {
            debug && console.log(err);
            setState({ loading: false, verified: false, verifyMsg: `Verification request failed. Reload and try again.` })
            setState({ loading: false });
        });
    }

    useEffect(() => {
        window.document.title = `Verify Email`;
        setState({ loading: true })
        .then(_Verify);
        //sendGA(googleGA)
    }, [])

    return (
        <div className={`account rel`} style={{width: 500}}>

            {loading && <div className={`task-done flex col`}>
                <Loader />
                <h2 className="s18 font tc msg">Verifying...</h2>
            </div>}

            {!loading && verified && <div className={`task-done flex col`}>
                <div className={`checked rel`}>
                    <div className={`icon-check abs abc cfff`} style={{ fontSize: 70 }}>
                        <span className={`path1`} /><span className={`path2`} />
                    </div>
                </div>
                <h2 className="s18 font msg">{verifyMsg}</h2>
				<button style={{ marginTop: 30 }} className="button s15 font b cfff" onClick={()=> navigate(session ? "/me" : "/u/signin")}>Goto Account</button>
            </div>}

            {!loading && !verified && <div className={`task-done flex col`}>
                <div className={`checked rel`} style={{ backgroundColor: `rgb(156, 25, 26)` }}>
                    <div className={`icon-error abs abc s50 cfff`}>
                        <span className={`path1`} /><span className={`path2`} />
                    </div>
                </div>
                <h2 className="s18 font msg">{verifyMsg}</h2>
                <button style={{ marginTop: 30 }} className="button s15 font b cfff" onClick={()=> navigate("/")}>Continue</button>
            </div>}

            

        </div>
    );
}

export default Verify;