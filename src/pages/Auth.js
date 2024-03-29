import React from 'react';
import { useParams } from "react-router-dom";
import Signin from "./u/signin";
import Signup from "./u/signup";
import Verify from "./u/verify";
import Recover from "./u/recover";

function Auth(props) {

    const { section } = useParams();

    return (
        <div className={`auth rel`}>
            {section == `signin` && <Signin />}
            {section == `signup` && <Signup />}
            {section == `verify` && <Verify />}
            {section == `recover` && <Recover />}
        </div>
    );
}

export default Auth;