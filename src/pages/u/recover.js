import React, { useEffect, useState } from 'react';
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
    setCookie,
    getUriParams
} from "../../zuz";
import { siteName, base } from "../../config";

function Recover(props) {

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
    const formID = "recover";
    let navigate = useNavigate();
    const [done, setDone] = useState(null);

    const _Recover = () => {
        const { username, _recaptcha } = forms[formID];
        if(null == username){
            Toast.show({ html: "You need to enter your email.", time: 5 });
            focus(".input-username");
        }else if(!isValidEmail(username)){
            Toast.show({ html: "This email is invalid. Make sure it's written like example@email.com", time: 5 });
            focus(".input-username");
        }else if(window.grecaptcha && window.grecaptcha.getResponse().length == 0){
            Toast.show({ html: "You must verify you are not robot!", time: 5 }); 
        }else{
            setState({ loading: true });
            debug && console.log(`Sending Recover Code...`);
            grab(
                `u/recover`,
                {
                    em: username
                }
            )
            .then(resp => {
                setDone(1);
                setState({ loading: false })
                .then(() => {})
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

    const verifyRecoverToken = () => {
        
        setState({ loading: true });
        debug && console.log(`Sending Recover Code...`);
        grab(
            `u/verify_recover_token`,
            {
                token: getUriParams().token
            }
        )
        .then(resp => {
            setDone(2);
            setState({ loading: false })
            .then(() => {})
            .catch(err => {
                debug && console.log(err);
                window.grecaptcha && window.grecaptcha.reset();
                setState({ loading: false });
            });        
        })
        .catch(err => {
            debug && console.log(err);
            window.grecaptcha && window.grecaptcha.reset();
            //Toast.show({ html: err.message || err.reason || `Request no processed.`, time: 5 }); 
            setState({ loading: false });
            setDone(4);
        });
        
    }

    const _UpdatePassw = () => {
        const { passw, repassw, _recaptcha } = forms[formID];
        if(null == passw){
            Toast.show({ html: "Enter your new password.", time: 5 });
            focus(".input-passw");
        }else if(repassw !== passw){
            Toast.show({ html: "Repeat password not matched.", time: 5 });
            focus(".input-repassw");
        }else if(window.grecaptcha && window.grecaptcha.getResponse().length == 0){
            Toast.show({ html: "You must verify you are not robot!", time: 5 }); 
        }else{
            setState({ loading: true });
            debug && console.log(`Updating passw...`);
            grab(
                `u/update_passw`,
                {
                    token: getUriParams().token,
                    passw: repassw
                }
            )
            .then(resp => {
                setDone(3);
                setState({ loading: false })
                .then(() => {})
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
        window.document.title = `Recover Account`;
        if("token" in getUriParams()){
            verifyRecoverToken()
        }
    }, [])

    return (
        <div className={`account rel`} style={{ width: [1,2,3,4].indexOf(done) == -1 ? 302 : `auto`}}>

            {loading && <Cover />}

            {done == 1 ? <div className={`task-done flex col`}>
                <div className={`checked rel`}>
                    <div className={`icon-check abs abc s50 cfff`} style={{ fontSize: 70 }}>
                        <span className={`path1`} /><span className={`path2`} />
                    </div>
                </div>
                <h2 className="s18 font msg b">That was easy :)</h2>
                <h2 className="s16 font em">An email with recovery code has been sent to<br /><span class="b">{forms[formID].username}</span>.<br /><br />Go Check</h2>
            </div> :
            done == 3 ? <div className={`task-done flex col`}>
                <div className={`checked rel`}>
                    <div className={`icon-check abs abc s50 cfff`} style={{ fontSize: 70 }}>
                        <span className={`path1`} /><span className={`path2`} />
                    </div>
                </div>
                <h2 className="s18 font msg b">That was easy :)</h2>
                <h2 className="s16 font em">Password change was successully. You can continue signing in now.</h2>
                <Link to={`/u/signin`} style={{ marginTop: 25 }} className={`button s16 b cfff font noul`}>Sign in</Link><br />
            </div> :
            done == 4 ? <div className={`task-done flex col`}>
                <div className={`checked rel`}>
                    <div className={`icon-error abs abc s50 cfff`} style={{ fontSize: 70 }}>
                        <span className={`path1`} /><span className={`path2`} />
                    </div>
                </div>
                <h2 className="s18 font msg b">That was embarrassing :(</h2>
                <h2 className="s16 font em">Recover token seem invalid or expired. Good try though.</h2>
                <Link to={`/`} style={{ marginTop: 25 }} className={`button s16 b cfff font noul`}>Continue</Link><br />
            </div> :             
            done == 2 ? <>
                <div className="ahead">
                    <Logo fontSize={24} />                
                    <h2 className={'slogan s20 b font'}>Update Password.</h2>  
                    <h2 className={'slogan2 s16 font'}>Enter your new password.</h2>   
                </div>

                <Form 
                    id={formID}
                    onSubmit={_UpdatePassw}
                    items={[
                        { name: "passw", type: "password", placeholder: "New Password.", autoFill: false },
                        { name: "repassw", type: "password", placeholder: "Repeat Password.", autoFill: false },
                        // { name: "captcha", type: "captcha", client: recaptcha || captchaKey },
                        { name: "submit", type: "submit", label: "Continue" },
                    ]}
                />
            </> : <>

            <div className="ahead">
                <Logo fontSize={24} />                
                <h2 className={'slogan s20 b font'}>Recover Password.</h2>  
                <h2 className={'slogan2 s16 font'}>Enter your email and we are good.</h2>   
            </div>

            <Form 
                id={formID}
                onSubmit={_Recover}
                items={[
                    { name: "username", type: "text", placeholder: "Enter your email." },
                    // { name: "captcha", type: "captcha", client: recaptcha || captchaKey },
                    { name: "submit", type: "submit", label: "Continue" },
                ]}
            />

            <div className={`aftr s16`}>                
                <Link to={`/u/signin`} className={`s16 b color font noul noulh`}>Sign in</Link><br />
                <Link to={`/u/signup`} className={`s16 b color font noul noulh`}>Create Account</Link>
            </div>

            </>}

        </div>
    );
}

export default Recover;