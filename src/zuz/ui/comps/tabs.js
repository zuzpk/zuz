import React, { useEffect } from 'react';
import { Link } from "react-router-dom";

function Tabs({
    pages
}) {
    return (
        <>
            <div className={`tabs flex aic rel`}>
                {pages.map(tab => <button className={`tab aic s15 font b`}>{tab.label}</button>)}
                <div className={`tab_dot abs`} />
            </div>
        </>
    );
}

export default Tabs;