import React from 'react';
import Toast from './toast';

function Tokener({
    items,
    placeholder,
    onChange
}) {

    const addItem = e => {
        var k = e.which || e.keyCode;
        if(e.target.value !== "" && k == 13 && onChange){
            if(items.indexOf(e.target.value) == -1){
                items.push(e.target.value);
                onChange(items);
            }else{
                Toast.show({ html: `That keyword already exists!`, time: 5 });
            }
            e.target.value = "";
        }
    }

    const removeItem = val => {
        onChange(items.filter(x => x !== val));
    }

    return (
        <div className={`tokener flex aic`}>
            {items.map(item => <div key={`tokenr-${item}`} className={`tokenr flex iflex aic cfff`}>
                <div className={`tlbl wordwrap s14`}>{item}</div>
                <button className={`icon-close s12 cfff`} onClick={ev => removeItem(item)}/>
            </div>)}
            <input type={`text`} onKeyUp={addItem} placeholder={placeholder} className={`s15 font`} />
        </div>
    );
}

export default Tokener;