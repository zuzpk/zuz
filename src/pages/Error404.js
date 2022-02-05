import React from 'react';

function Error404({
    code,
    msg
}) {
    return (
        <div className={`error-404 jc flex aic abs abc`}>
            <h2 className={`s16 font b`}>{code || `404`}</h2>
            <div className={`line`} />
            <h2 className={`s16 font`}>{msg || `That page does not exist!`}</h2>
        </div>
    );
}

export default Error404;