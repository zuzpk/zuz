import React, { useEffect, useRef } from 'react';
import { Checkbox } from "../../index";

function Column({
    head,
    item,
    meta,
    fontSize,
    orderBy,
    sortBy,
    switchBy
}) {

    const cb = useRef();

    const { 
        id, 
        label, 
        labelIcon,
        checked,
        onChange,
        width 
    } = meta;

    useEffect(() => {
        cb.current?.setChecked(checked);
    }, [checked])

    return (
        <div 
            onClick={ev => {
                head && switchBy && id != `checkbox` && switchBy(id);
                if(!head && meta?.onClick){
                    meta.onClick(ev, item);
                }
            }}   
            className={`data-col flex aic s${fontSize}${head ? ` b ${id == `checkbox` ? `` : `pointer`}` : ''}${label == `_checkbox_` ? ` jc` : ``} rel`} 
            style={{
                maxWidth: width || `auto`
            }}
        >
            {label == `_checkbox_` && <Checkbox 
                ref={cb}
                classic={true}
                checked={checked || false}
                onChange={checked => onChange(checked, item)}
            />}
            {label !== `_checkbox_` && <>
                {labelIcon && <div className={`${labelIcon} s24 label-icon`}><span className={`path1`} /><span className={`path2`} /></div>}
                {label}
                {head && sortBy == id && <div className={`chevron s18 icon-chevron-${orderBy == `asc` ? "up" : "down"}`} />}
            </>}
            
        </div>
    );
}

export default Column;