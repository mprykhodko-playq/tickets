import React, {Component} from 'react';
import TicketItem from "./Ticket/TicketItem";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {getBacklog} from "../actions/ticketActions";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemText from "@material-ui/core/ListItemText";


class TicketsBoard extends Component {

    constructor() {
        super();
        this.state = {
            /*all: true,
            none: false,
            one: false,
            two: false,
            three: false,*/
            filters: ["all", "none", "one", "two", "three"],
            checkedValues: ["all"],
            mostCheap: false,
            mostFast: false,
        };
        // this.onChange = this.onChange.bind(this);
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

    /*onChange(e) {
        this.setState({
        [e.target.name]: e.target.checked
        })
    }*/

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

    render() {

        const {tickets} = this.props.tickets;

        let TicketContent;
        let FilterContent;
        let sortedItems = [];
        let items = [];

        const FilterAlgorithm = () => {

            return(
                <div className="card mb-1 bg-light col-md-4">
                    <div className="card-body bg-light">
                        <h5>Количество пересадок</h5>
                        {this.state.filters.map(x =>
                            <div className="card-group justify-content-center">
                                <Checkbox
                                    className="text-left card-body"
                                    checked={this.state.checkedValues.includes(x)}
                                    name = {x}
                                    disableRipple={true}
                                    tabIndex={-1}
                                    onChange={e => this.handleCheck(e,x)}
                                />
                                <ListItemText primary={x} className="text-left card-body"/>
                            </div>
                        )}
                    </div>
                </div>
            )
        };

        const TicketAlgorithm = tickets => {

            for (let i = 0; i < tickets.length; i++){
                if (this.state.checkedValues.includes('all')){
                    items.push(tickets[i]);
                } else {
                    const none = this.state.checkedValues.includes('none') && ((tickets[i].segments[0].stops.length == 0) || (tickets[i].segments[1].stops.length == 0));
                    const one = this.state.checkedValues.includes('one') && ((tickets[i].segments[0].stops.length == 1) || (tickets[i].segments[1].stops.length == 1));
                    const two = this.state.checkedValues.includes('two') && ((tickets[i].segments[0].stops.length == 2) || (tickets[i].segments[0].stops.length == 2));
                    const three = this.state.checkedValues.includes('three') && ((tickets[i].segments[0].stops.length == 3) || (tickets[i].segments[0].stops.length == 3));

                    if (none || one || two || three){
                        items.push(tickets[i]);
                    }
                }
            }

            if (items.length < 1){
                return(
                    <div className="alert alert-info text-center" role="alert">
                        No tickets
                    </div>
                )
            }

            if (this.state.mostCheap) {
                items.sort((a, b) => {
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
                items.sort((a,b) => {
                    if ((a.segments[0].duration + a.segments[1].duration) > (b.segments[0].duration + b.segments[1].duration)){
                        return 1;
                    }
                    if ((a.segments[0].duration + a.segments[1].duration) < (b.segments[0].duration + b.segments[1].duration)){
                        return -1;
                    }
                    return 0;
                })
            }

            for (let i = 0; i < items.length; i++){
                sortedItems.push(<TicketItem key={i} ticket={items[i]}/>)
            }

            return (
                <React.Fragment>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-7">
                                <div className="card text-center mb-2">
                                    <div className="card-header bg-secondary text-white">
                                        <button className="btn btn-primary mb-3 text-left" onClick={this.handleClick} name="mostCheap">
                                            САМЫЙ ДЕШЕВЫЙ
                                        </button>
                                        <button className="btn btn-primary mb-3 text-left" onClick={this.handleClick} name="mostFast">
                                            САМЫЙ БЫСТРЫЙ
                                        </button>
                                    </div>
                                </div>
                                {sortedItems}
                            </div>
                        </div>
                    </div>
                </React.Fragment>
            )
        };

        TicketContent = TicketAlgorithm(tickets);
        FilterContent = FilterAlgorithm();

        return (
            <div className="container">
                {/*<div className="card mb-1 bg-light col-md-4">
                    <div className="card-body bg-light">
                        <h5>Количество пересадок</h5>
                        <div className="card-group justify-content-center">
                            <Checkbox
                                className="text-left card-body"
                                checked={this.state.all}
                                name = "all"
                                disableRipple={true}
                                tabIndex={-1}
                                onChange={this.onChange}
                            />
                            <ListItemText primary="Все" className="text-left card-body"/>
                        </div>
                        <div className="card-group justify-content-center">
                            <Checkbox
                                className="text-left card-body"
                                checked={this.state.none}
                                name = "none"
                                disableRipple={true}
                                tabIndex={-1}
                                onChange={this.onChange}
                            />
                            <ListItemText primary="Без пересадок" className="text-left card-body"/>
                        </div>
                        <div className="card-group">
                            <Checkbox
                                className="text-left card-body"
                                checked={this.state.one}
                                name = "one"
                                disableRipple={true}
                                tabIndex={-1}
                                onChange={this.onChange}
                            />
                            <ListItemText primary="1 пересадка" className="text-left card-body"/>
                        </div>
                        <div className="card-group">
                            <Checkbox
                                className="text-left card-body"
                                checked={this.state.two}
                                name = "two"
                                disableRipple={true}
                                tabIndex={-1}
                                onChange={this.onChange}
                            />
                            <ListItemText primary="2 пересадки" className="text-left card-body"/>
                        </div>
                        <div className="card-group">
                            <Checkbox
                                className="text-left card-body"
                                checked={this.state.three}
                                name = "three"
                                disableRipple={true}
                                tabIndex={-1}
                                onChange={this.onChange}
                            />
                            <ListItemText primary="3 пересадки" className="text-left card-body"/>
                        </div>
                    </div>
                </div>*/}
                {FilterContent}
                {TicketContent}
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