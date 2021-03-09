import React, {Component} from 'react';
import TicketItem from "./Ticket/TicketItem";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {getBacklog} from "../actions/ticketActions";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import ListItemText from "@material-ui/core/ListItemText";


class TicketsBoard extends Component {

    constructor() {
        super();
        this.state = {
            all: true,
            none: false,
            one: false,
            two: false,
            three: false,
            mostCheap: false,
            mostFast: false,
        };
        this.onChange = this.onChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    onChange(e) {
        this.setState({
        [e.target.name]: e.target.checked
        })
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

    render() {

        const {tickets} = this.props.tickets;

        let TicketContent;
        let items = [];
        let endItems = [];

        const TicketAlgorithm = tickets => {

            for (let i = 0; i < tickets.length; i++){
                if (this.state.all){
                    // items.push(<TicketItem key={i} ticket={tickets[i]}/>)
                    endItems.push(tickets[i]);
                } else {
                    const none = this.state.none && ((tickets[i].segments[0].stops.length == 0) || (tickets[i].segments[1].stops.length == 0));
                    const one = this.state.one && ((tickets[i].segments[0].stops.length == 1) || (tickets[i].segments[1].stops.length == 1));
                    const two = this.state.two && ((tickets[i].segments[0].stops.length == 2) || (tickets[i].segments[0].stops.length == 2));
                    const three = this.state.three && ((tickets[i].segments[0].stops.length == 3) || (tickets[i].segments[0].stops.length == 3));

                    if (none || one || two || three){
                        // items.push(<TicketItem key={i} ticket={tickets[i]}/>)
                        endItems.push(tickets[i]);
                    }
                }
            }

            if (endItems.length < 1){
                return(
                    <div className="alert alert-info text-center" role="alert">
                        No tickets
                    </div>
                )
            }

            if (this.state.mostCheap) {
                endItems.sort((a, b) => {
                    if (a.price > b.price) {
                        return 1;
                    }
                    if (a.price < b.price) {
                        return -1;
                    }
                    return 0;
                });
            }

            for (let i = 0; i < endItems.length; i++){
                items.push(<TicketItem key={i} ticket={endItems[i]}/>)
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
                                {items}
                            </div>
                        </div>
                    </div>
                </React.Fragment>
            )
        };

        TicketContent = TicketAlgorithm(tickets);

        return (
            <div className="container">
                <a href="/addProjectTask" className="btn btn-primary mb-3">
                    <i className="fas fa-plus-circle"> Create Project Task</i>
                </a>
                <br/>
                <hr/>

                <div className="card mb-1 bg-light col-md-4">
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
                </div>

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