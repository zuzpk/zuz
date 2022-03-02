import React, { useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Logo from "../../assets/logo";
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
import { 
    siteName, 
    ubase,
    COOKIE_AT,
    COOKIE_UT,
    COOKIE_HA 
} from "../../config";

function Signup(props) {

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
    const formID = "signup";
    let navigate = useNavigate();

    const _Signup = () => {
        const { fullname, username, password, _recaptcha } = forms[formID];
        if(null == fullname){
            Toast.show({ html: "You need to enter your fullname.", time: 5 });
            focus(".input-fullname");
        }else if(null == username){
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
        }else if(window.grecaptcha && window.grecaptcha.getResponse().length == 0){
            Toast.show({ html: "You must verify you are not robot!", time: 5 }); 
        }else{
            setState({ loading: true });
            debug && console.log(`Signing up...`);
            grab(
                `u/signup`,
                {
                    nm: fullname,
                    em: username,
                    psw: password
                }
            )
            .then(resp => {
                setCookie(COOKIE_HA, resp.ha); //Hash
                setCookie(COOKIE_UT, resp.ut); //UT
                setCookie(COOKIE_AT, resp.at || `__`); //AT
                setState({ session: true, user: resp.me })
                .then(() => window.location = `${ubase}`)
                .catch(err => {
                    debug && console.log(err);
                    window.grecaptcha && window.grecaptcha.reset();
                    setState({ loading: false });
                });        
            })
            .catch(err => {
                debug && console.log(err);
                window.grecaptcha && window.grecaptcha.reset();
                Toast.show({ html: err.message || err.reason || `Request no processed.`, time: 5 }); 
                setState({ loading: false });
            });
        }
    }

    useEffect(() => {
        if(session) navigate(`/`);
        window.document.title = `Create Account`;
    }, [])

    return (
        <div className={`account rel`}>

            {loading && <Cover />}

            <div className="ahead">
                <Logo fontSize={24} />                
                <h2 className={'slogan s20 b font'}>Join {siteName}</h2>  
                <h2 className={'slogan2 s16 font'}>Create {siteName} account and feel the power of our system.</h2>   
            </div>

            <Form 
                id={formID}
                onSubmit={_Signup}
                items={[
                    { name: "fullname", type: "text", placeholder: "Your name.", autoFill: false },
                    { name: "username", type: "text", placeholder: "Enter your email.", autoFill: false },
                    { name: "password", type: "password", placeholder: "Your password.", autoFill: false },
                    // { name: "captcha", type: "captcha", client: recaptcha || captchaKey },
                    { name: "submit", type: "submit", label: "Create Account" },
                ]}
            />

            <div className={`aftr s16`}>                
                Already have account? <Link to={`/u/signin`} className={`s16 b color font noul noulh`}>Sign in here</Link>
            </div>

        </div>
    );
}

export default Signup;