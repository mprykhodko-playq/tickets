import React from 'react';
import Checkbox from "@material-ui/core/Checkbox";
import ListItemText from "@material-ui/core/ListItemText";

const TicketFilter = ({ filters, handleCheck, checkedValues }) => (
    <div id="radio-block" className="card">
            <h5>КОЛИЧЕСТВО ПЕРЕСАДОК</h5>
            {filters.map(filter =>
                <div className="card-group justify-content-center">
                    <Checkbox
                        color = "primary"
                        checked={checkedValues.includes(filter)}
                        name = {filter}
                        disableRipple={true}
                        onChange={e => handleCheck(e, filter)}
                        style={{margin: 0}}
                    />
                    <ListItemText primary={filter} className="text-left card-body"/>
                </div>
            )}
    </div>
);

export default TicketFilter;