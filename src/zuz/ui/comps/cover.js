import React, { useState, useEffect } from 'react';
import Loader from "./loader";

function Cover(props) {
    const [loading, setLoading] = useState(true);
    const { ID, success } = props;
    return (
        <div className="cover abs fill" id={ID || "__cover__"}>
            <div id="_coverextra_" className="abs abc">
                {loading === true && <Loader />}
            </div>
        </div>
    )    
}

export default Cover;