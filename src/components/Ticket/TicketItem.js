import React, {Component} from 'react';
import DateTime from "luxon/src/datetime";

class TicketItem extends Component {

    render() {
        const {ticket} = this.props;
        const logoURL = `//pics.avs.io/99/36/${ticket.carrier}.png`;
        const fromStartToEndTime = (date, duration) => {
            return DateTime.fromISO(date).toFormat('HH:mm')
                + ' - '
                + DateTime.fromISO(date).plus({minutes: duration}).toFormat('HH:mm');
        };
        const flyTime = (duration) => {
            return Math.trunc(duration/60) + 'ч ' + duration%60 + 'м'
        };
        const transCount = (trans) => {
            switch (trans.length) {
                case 0: return "ПЕРЕСАДОК НЕТ";
                case 1: return trans.length + " ПЕРЕСАДКА";
                default: return trans.length + " ПЕРЕСАДКИ"
            }
        };
        const transNames = (trans) => {
            return trans.length == 0 ? '-' : trans.toString();
        };

        const TicketContent = (segment) => {
            return (
                <React.Fragment>
                    <div id="ticket-content">
                        <div id="ticket-content-particle">
                            <div className="text-left" style={{color: "darkgrey"}}>
                                {segment.origin} - {segment.destination}
                            </div>
                            <div className="text-left">
                                {fromStartToEndTime(segment.date, segment.duration)}
                            </div>
                        </div>
                        <div id="ticket-content-particle">
                            <div className="text-left" style={{color: "darkgrey"}}>
                                В ПУТИ
                            </div>
                            <div className="text-left">
                                {flyTime(segment.duration)}
                            </div>
                        </div>
                        <div id="ticket-content-particle">
                            <div className="text-left" style={{color: "darkgrey"}}>
                                {transCount(segment.stops)}
                            </div>
                            <div className="text-left">
                                {transNames(segment.stops)}
                            </div>
                        </div>
                    </div>
                </React.Fragment>
            )
        };

        return (
            <div id="ticket-item">
                <div style={{position: "relative", height:"40%"}}>
                    <h4 id="price">
                        {ticket.price} P
                    </h4>
                    <div id="logo">
                        <img src={logoURL} style={{width:"60%"}}/>
                    </div>
                </div>
                {TicketContent(ticket.segments[0])}
                {TicketContent(ticket.segments[1])}
            </div>
        );
    }
}

export default TicketItem;