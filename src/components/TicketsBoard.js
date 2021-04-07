import React, {Component} from 'react';
import TicketItem from "./Ticket/TicketItem";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {getBacklog} from "../actions/ticketActions";
import TicketFilter from './TicketFilter';


class TicketsBoard extends Component {

    constructor() {
        super();
        this.state = {
            filters: ["all", "none", "one", "two", "three"],
            checkedValues: ["all"],
            mostCheap: false,
            mostFast: false,
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
    }

    handleCheck(e,x) {
        this.setState(state => ({
            checkedValues: state.checkedValues.includes(x)
                ? state.checkedValues.filter(c => c !== x)
                : [...state.checkedValues, x]
        }));
    }

    componentDidMount() {
        this.props.getBacklog();
    }

    handleClick(e){
        if (e.target.name === 'mostCheap') {
            this.setState({
                mostCheap: !this.state.mostCheap
            })
        }
        if (e.target.name === 'mostFast') {
            this.setState({
                mostFast: !this.state.mostFast
            })
        }
    }

    /*handleClick(e, tickets) {
        if (e.target.name === 'mostCheap') {
            return tickets.sort((a, b) => {
                if (a.price > b.price) {
                    return 1;
                }
                if (a.price < b.price) {
                    return -1;
                }
                return 0;
            });
        }
        if (e.target.name === 'mostFast') {
            if (this.state.mostFast) {
                return tickets.sort((a,b) => {
                    if ((a.segments[0].duration + a.segments[1].duration) > (b.segments[0].duration + b.segments[1].duration)){
                        return 1;
                    }
                    if ((a.segments[0].duration + a.segments[1].duration) < (b.segments[0].duration + b.segments[1].duration)){
                        return -1;
                    }
                    return 0;
                })
            }
        }
    }*/

    ticketsFilter(tickets, filters) {
        if (filters.includes('all')) {
            return tickets;
        }
        const result = tickets.filter(t => t.segments.find(s => {
            if (filters.includes('none')){
                return s.stops.length === 0;
            }
            if (filters.includes('one')){
                return s.stops.length === 1;
            }
            if (filters.includes('two')){
                return s.stops.length === 2;
            }
            if (filters.includes('three')){
                return s.stops.length === 3;
            }
        }));
        return result;
    }

    ticketAlgorithm = (tickets) => {
        /*const filteredOne = tickets.filter(t => t.segments.find(s => {
            return s.stops.length === 1;
        }));*/

        let sortedItems = [];

        tickets = this.ticketsFilter(tickets, this.state.checkedValues);

        if (tickets.length < 1){
            return(
                <div className="alert alert-info text-center" role="alert" style={{width: "70%", float: "right"}}>
                    No tickets
                </div>
            )
        }

        if (this.state.mostCheap) {
            tickets.sort((a, b) => {
                if (a.price > b.price) {
                    return 1;
                }
                if (a.price < b.price) {
                    return -1;
                }
                return 0;
            });
        }

        if (this.state.mostFast) {
            tickets.sort((a,b) => {
                if ((a.segments[0].duration + a.segments[1].duration) > (b.segments[0].duration + b.segments[1].duration)){
                    return 1;
                }
                if ((a.segments[0].duration + a.segments[1].duration) < (b.segments[0].duration + b.segments[1].duration)){
                    return -1;
                }
                return 0;
            })
        }

        for (let i = 0; i < tickets.length; i++){
            sortedItems.push(<TicketItem key={i} ticket={tickets[i]}/>)
        }

        return (
            <React.Fragment>
                <div id="tickets-block">
                    <div>
                        <button className="btn btn-primary mb-3 text-center" onClick={this.handleClick} name="mostCheap">
                            САМЫЙ ДЕШЕВЫЙ
                        </button>
                        <button className="btn btn-primary mb-3 text-center" onClick={this.handleClick} name="mostFast">
                            САМЫЙ БЫСТРЫЙ
                        </button>
                        {sortedItems}
                    </div>
                </div>
            </React.Fragment>
        )
    };

    render() {

        const {tickets} = this.props.tickets;
        const { filters, checkedValues } = this.state;

        return (
            <div className="container">
                <TicketFilter filters={filters} handleCheck={this.handleCheck} checkedValues={checkedValues} />
                {this.ticketAlgorithm(tickets)}
            </div>
        );
    }
}

TicketsBoard.propTypes = {
    getBacklog: PropTypes.func.isRequired,
    tickets: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
   tickets: state.ticket
});

export default connect(mapStateToProps, {getBacklog}) (TicketsBoard);