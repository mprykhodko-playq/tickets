import React from 'react';
import Checkbox from "@material-ui/core/Checkbox";
import ListItemText from "@material-ui/core/ListItemText";

const TicketFilter = ({ filters, handleCheck, checkedValues }) => (
    <div className="card mb-1 bg-light col-md-4">
        <div className="card-body bg-light">
            <h5>Количество пересадок</h5>
            {filters.map(filter =>
                <div className="card-group justify-content-center">
                    <Checkbox
                        className="text-left card-body"
                        checked={checkedValues.includes(filter)}
                        name = {filter}
                        disableRipple={true}
                        tabIndex={-1}
                        onChange={e => handleCheck(e, filter)}
                    />
                    <ListItemText primary={filter} className="text-left card-body"/>
                </div>
            )}
        </div>
    </div>
);

export default TicketFilter;