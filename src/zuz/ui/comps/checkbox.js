import React, { 
    useState, 
    useEffect, 
    forwardRef,
    useImperativeHandle
} from 'react';

const Checkbox = (props, ref) => {

    const { checked, label, onChange, classic } = props;
    const [_checked, setChecked] = useState(checked || false);

    useEffect(() => {}, [_checked || props.checked])

    useImperativeHandle(ref, () => ({
        setChecked: st => setChecked(st || false)
    }))

    const cb = () => {
        return <button onClick={evt=>{
            onChange && onChange(!_checked)
            setChecked(!_checked)            
        }} className={`checkbox rel${_checked ? " active" : ""}`} />
    }

    return (
        classic ? <button 
            onClick={evt=>{
                onChange && onChange(!_checked)
                setChecked(!_checked)            
            }}
            className={`check-box icon-check ${_checked ? `checked` : ``}`} />
        : label ? <div className={`flex aic`}>
            {cb()}
            <h2 className={`zf-cb-label`}>{label}</h2>
        </div> : cb()
    );
}

export default forwardRef(Checkbox);