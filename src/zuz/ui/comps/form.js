import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from "react-redux";
import ReCAPTCHA from "react-google-recaptcha";
import Tokener from "./tokener";
import Checkbox from "./checkbox";

function Form({
    id,
    cols,
    items,
    fontSize,
    onSubmit,
    onModified
}) {

    const {
        forms
    } = useSelector(state => state.Form);
    const dispatch = useDispatch();
    const setState = async state => dispatch({ type: "FORM_STATE", state: { ...state, _tmp: Math.random() }});

    const _update = (k, v) => {
        forms[id][k] = v;
        setState({ forms: forms })
        .then(() => {
            onModified && onModified(true);
        });
    }

    let _autoRef = useRef();

    const toElement = item => {
        switch(item.type){
            case "label":
                return (
                    <h2 className={`s15 font`}>{item.value}</h2>
                )
            break;
            case "text":
            case "password":
            case "number":
                return (
                    <input
                        onChange={ev => _update(item.name, ev.target.value == "" ? null : ev.target.value)} 
                        value={forms[id] ? forms[id][item.name] ? forms[id][item.name] : "" : ""}
                        type={item.type} 
                        placeholder={item.placeholder}
                        className={`zf-item font input input-${item.name} s${fontSize || "16"}`}
                    />
                )
                break;
            case "textarea":
                return (
                    <textarea
                        onChange={ev => _update(item.name, ev.target.value == "" ? null : ev.target.value)} 
                        defaultValue={item.defaultValue || null}
                        value={forms[id] ? forms[id][item.name] ? forms[id][item.name] : "" : ""}
                        type={item.type} 
                        placeholder={item.placeholder}
                        className={`zf-item font input input-${item.name} s${fontSize || "16"}`}
                        style={{ height: item.height || `auto`, resize: item.resize || `auto` }}
                    />
                )
                break;
            case "file":
                return (
                    <input
                        onChange={ev => item.onChange(ev)} 
                        type={item.type} 
                        placeholder={item.placeholder}
                        className={`zf-item font input input-${item.name} s${fontSize || "16"}`}
                    />
                )
                break;
            case "select":
                    return (
                        <select
                            onChange={ev => _update(item.name, ev.target.value == "" ? null : ev.target.value)} 
                            value={forms[id] ? forms[id][item.name] ? forms[id][item.name] : "" : ""}
                            className={`zf-item font input input-${item.name} s${fontSize || "16"}`}>
                            {item.options.map(o => <option value={o.value}>{o.label}</option>)}
                        </select>
                    )
                break;
            case "submit":
                    return (
                        <button
                            onClick={onSubmit}
                            type={item.type} 
                            className={`zf-item font b cfff button s${fontSize || "16"}`}
                        >{item.label}</button>
                    )
                break;
            case "captcha":
                    return (<div className={`captcha`} id={`captcha`}>
                        {item.client ? 
                            <ReCAPTCHA
                                sitekey={item.client}
                                onChange={value => _update("_recaptcha", value)}
                        /> : null }
                    </div>)
                break;
            case "tokener":
                    return (
                        <Tokener
                            onChange={item.onChange} 
                            items={item.items}
                            placeholder={item.placeholder}
                        />
                    )
                break;
            case "checkbox":
                    return (
                        <Checkbox 
                            ref={item.ref || _autoRef}
                            onChange={status => {
                                item.onChange && item.onChange(status)
                                _update(item.name, status)
                            }}
                            key={`zf-cb-${item.name}`} 
                            checked={item.checked} 
                            label={item.label} />
                    )
                break;
            case "group":
                return (item.items.map(itemm => <div className={`zf-box ${itemm.name}`}>
                    {itemm.title && <div className={`zf-lbl flex aic`}>
                        <h2 className={`s14 font b`}>{itemm.title}</h2>
                        {itemm.action && <div className={`actn flex je`}>
                            <button className={`link button noulh color font s14 b`} onClick={itemm.action.onClick}>{itemm.action.label}</button>
                        </div>}
                    </div>}
                    {toElement(itemm)}
                </div>)
                )
            break;
            default:
                return null;
        }
    }

    useEffect(() => {
        if(!forms[id]){
            forms[id] = {};
            items.map(item => forms[id][item.name] = item?.value || null);
            setState({ forms: forms });
        }
    }, [forms])

    return (
        <div className={`zuz-form flex col-${cols || 1}`}>
            {items.map(item => <div className={`zf-box`}>
                {item.title && <div className={`zf-lbl flex aic`}>
                    <h2 className={`s14 font b`}>{item.title}</h2>
                    {item.action && <div className={`actn flex je`}>
                        <button className={`link button noulh color font s14 b`} onClick={item.action.onClick}>{item.action.label}</button>
                    </div>}
                </div>}
                {item.note && <div className={`zf-lbl flex aic`}>
                    <h2 className={`s13 font c777`}>{item.note}</h2>
                </div>}
                {item.type == "group" && item.dir == "row" ? 
                    <div className={`zf-box zf-group flex aic`}>{toElement(item)}</div>
                    : toElement(item)}
            </div>)}
        </div>
    );

}

export default Form;