import React, { useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Logo from "../../ui/logo";
import {
    Cover,
    Form,
    Toast
} from "../../zuz/ui";
import {
    focus,
    isValidEmail,
    isValidPassword,
    grab,
    setCookie
} from "../../zuz";
import { siteName, base } from "../../config";

function Signin(props) {

    const {
        debug,
        session,
        loading,
        recaptcha,
        ucaptcha,
        googleGA
    } = useSelector(state => state.App);
    const dispatch = useDispatch();
    const setState = async state => dispatch({ type: "APP_STATE", state: { ...state, _tmp: Math.random() }});
    const { forms } = useSelector(state => state.Form);
    const formID = "signin";
    let navigate = useNavigate();

    const _Signin = () => {
        const { username, password, _recaptcha } = forms[formID];
        if(null == username){
            Toast.show({ html: "You need to enter your email.", time: 5 });
            focus(".input-username");
        }else if(!isValidEmail(username)){
            Toast.show({ html: "This email is invalid. Make sure it's written like example@email.com", time: 5 });
            focus(".input-username");
        }else if(null == password){
            Toast.show({ html: "You need to enter a password.", time: 5 });
            focus(".input-password");
        }else if(!isValidPassword(password)){
            Toast.show({ html: "Only use letters, numbers and common punctuation characters.", time: 5 });
            focus(".input-password");
        }
        // else if(window.grecaptcha && window.grecaptcha.getResponse().length == 0){
        //     Toast.show({ html: "You must verify you are not robot!", time: 5 }); 
        // }
        else{
            setState({ loading: true });
            debug && console.log(`Signing in...`);
            grab(
                `u/signin`,
                {
                    em: username,
                    psw: password
                }
            )
            .then(resp => {
                setCookie("__ha", resp.hash); //Hash
                setCookie("__ut", resp.ut); //Hash
                setCookie("__at", resp.at || `__`); //Hash
                setCookie("__ud", resp.accesstoken); //UDATA
                setState({ session: true, user: resp.me })
                .then(() => window.location = `${base}drive`)
                .catch(err => {
                    debug && console.log(err);
                    window.grecaptcha && window.grecaptcha.reset();
                    setState({ loading: false });
                });        
            })
            .catch(err => {
                debug && console.log(err);
                window.grecaptcha && window.grecaptcha.reset();
                Toast.show({ html: err.reason || `Request no processed.`, time: 5 }); 
                setState({ loading: false });
            });
        }
    }

    useEffect(() => {
        window.document.title = `Sign in`;
    }, [])

    return (
        <div className={`account rel`}>

            {loading && <Cover />}

            <div className="ahead">
                <Logo fontSize={24} />                
                <h2 className={'slogan s20 b font'}>Sign in.</h2>  
                <h2 className={'slogan2 s16 font'}>Never enter your password on a device that you do not fully trust. Do not log into your account from a shared or public computer.</h2>   
            </div>

            <Form 
                id={formID}
                onSubmit={_Signin}
                items={[
                    { name: "username", type: "text", placeholder: "Enter your email." },
                    { name: "password", type: "password", placeholder: "Your password." },
                    // { name: "captcha", type: "captcha", client: recaptcha || captchaKey },
                    { name: "submit", type: "submit", label: "Sign in" },
                ]}
            />

            <div className={`aftr s16`}>                
                <Link to={`/u/recover`} className={`s16 b color font noul noulh`}>Forgot Password?</Link><br />
                New to {siteName}? <Link to={`/u/signup`} className={`s16 b color font noul noulh`}>Create Account</Link>
            </div>

        </div>
    );
}

export default Signin;