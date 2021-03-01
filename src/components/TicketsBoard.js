import React, {Component} from 'react';
import Link from "react-router-dom";
import TicketItem from "./Ticket/TicketItem";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {getBacklog} from "../actions/ticketActions";


class TicketsBoard extends Component {
    componentDidMount() {
        this.props.getBacklog();
    }
    render() {

        const {tickets} = this.props.tickets;

        let TicketContent;
        let items = [];

        const TicketAlgorithm = tickets => {
            if (tickets.length < 1) {
                return(
                    <div className="alert alert-info text-center" role="alert">
                        No tickets
                    </div>
                )
            } else {
                for (let i = 0; i < tickets.length; i++){
                    items.push(<TicketItem key={i} ticket={tickets[i]}/>)
                }
            }

            return (
                <React.Fragment>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-7">
                                <div className="card text-center mb-2">
                                    <div className="card-header bg-secondary text-white">
                                        <h3>TO DO</h3>
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