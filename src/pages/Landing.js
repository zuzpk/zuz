import React, { useEffect } from 'react';
import Logo from "../ui/logo";
import { Link } from "react-router-dom";
import { Dialog } from "../zuz";

function Landing(props) {

    useEffect(() => {
        // Dialog(
        //     `Hello World`,
        //     <h2>Hello THere</h2>,
        //     {
        //         label: `Cancel`
        //     }
        // );
    }, [])

    return (
        <div className={`landing abs abc`}>

            <Logo fontSize={50} />
            
            <h2 className={'slogan s30 b6 font'}>Say Hello To Zuz CMS</h2>  
            <h2 className={'slogan2 s20 font'}>Create Web Apps With Ease</h2>  
            
            <div className={`btns flex aic`}>
                <Link to={`/u/signin`} className={`button cfff noul b6`}>Sign in</Link>
                <Link to={`/u/signup`} className={`button noul cfff b6`}>Create Account</Link>
            </div>
            
        </div>
    )
}

export default Landing;