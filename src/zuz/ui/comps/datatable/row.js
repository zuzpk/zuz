import React, { useEffect, useRef } from 'react';
import Column from "./column";

function Row({
    cols,
    item,
    head,
    fontSize,
    orderBy,
    sortBy,
    onContext,
    onDoubleClick,
    onRowClick,
    busy,
    switchBy
}) {

    let ref = useRef();

    const _handleContext = ev => {
        ev.preventDefault();
        ev.stopPropagation();
        !head && onContext(ev, item);
    }

    const _handleDblClick = ev => {
        ev.preventDefault();
        ev.stopPropagation();
        !head && onDoubleClick(ev, item);
    }
    
    useEffect(() => {
        ref.current?.addEventListener('contextmenu', _handleContext);
        !head && item?.isFolder && ref.current?.addEventListener('dblclick', _handleDblClick);
    }, [])

    return (
        <div 
            ref={ref} key={item?.ID} 
            className={`data-row ${head ? `data-row-head` : ``} flex aic nous pointer`}>
            {cols.length && cols.length > 0 && cols.map(_item => "_key" in _item ? null : <Column 
                fontSize={fontSize || 14} 
                orderBy={orderBy || `asc`}
                sortBy={sortBy || `id`}
                head={head || false}
                item={item}
                switchBy={switchBy}
                meta={_item} />)}
        </div>
    )

}

export default Row;