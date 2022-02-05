import React, { useEffect } from 'react';

function Show({
    when,
    children
}) {

    useEffect(() => {}, [when])

    return (
        when ? children : null
    );
}

export default Show;