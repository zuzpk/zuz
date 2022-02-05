import React, { useEffect } from 'react';
import { grab, getCookie } from "./zuz";
import { api, COOKIE_AT, COOKIE_UT } from "./config";

function Catch({
    error, resetErrorBoundary
}) {

    const sendReport = () => {
        //debug && console.log(`Sending Error Report`)
        grab(
            `${api}misc/report_error`,
            {
                msg: error.message,
                detail: error.stack.toString(),
                uri: window.location.href,
                ut: getCookie(COOKIE_UT) || "__",
                at: getCookie(COOKIE_AT) || "__"
            },
            resp => {},
            err => {}
        );
    }

    useEffect(() => {
        if(window.location.host.indexOf(`localhost:300`) == -1){
            sendReport();
        }
    }, [error])

    

    return (
        <div className={`error-404 jc flex col abs abc`}>
            <h2 className={`s18 font b`}>Something went wrong</h2>
            <pre className={`s16`} style={{ marginTop: 10 }}>This is not you this is us. Well that's embarrassing.</pre>
            <button onClick={resetErrorBoundary} style={{ padding: 6, margin: `20px auto`, width: 140 }} className={`button cfff font s15 b`}>Go Back Home</button>
        </div>
    )
}

export default Catch;