import React from 'react';
import Row from "./row";

function DataTable(props) {

    const { columns, rows, inverted, busy } = props;
    
    return (
        <div className={`data-table${inverted ? " dt_inverted" : ""} flex col`}>
            <Row
                cols={columns} 
                head={true}
                {...props}    
            />
            {rows.length > 0 && rows.map((row, ri) => "item" in row ? <Row 
                key={`row-${ri}`}
                item={row?.item} 
                cols={row?.data}
                busy={busy || false}
                fontSize={props.fontSize || 14}
                onContext={props.onContext ? props.onContext : () => {}}
                onDoubleClick={props.onDoubleClick ? props.onDoubleClick : () => {}}
                onRowClick={props.onRowClick ? props.onRowClick : () => {}}
            /> : <div className={`data-row breath`} />)}
        </div>
    );

}

export default DataTable;