import React from 'react';
import { Link } from "react-router-dom";
import { siteName } from "../config";
import _logo from "./app-logo.png";

function Logo({
    to,
    fontSize,
    albl
}) {
    return (
        <div className="logo flex sticky">
            <Link to={to || "/"} className={`flex link noul color font b aic s${fontSize || 20} nous`}>
                    <div className={`rel cfff font b fav nous flex aic`}>
                        <img src={_logo} className={`nous`} />
                    </div>
                    {siteName}
            </Link>
            {albl && <span className={`abs albl s10 font`}>{albl}</span>}
        </div>
    );
}

export default Logo;