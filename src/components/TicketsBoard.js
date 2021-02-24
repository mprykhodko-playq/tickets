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
        return (
            <div className="container">
                <a href="/addProjectTask" className="btn btn-primary mb-3">
                    <i className="fas fa-plus-circle"> Create Project Task</i>
                </a>
                <br/>
                <hr/>
                <div className="container">
                    <div className="row">
                        <div className="col-md-7">
                            <div className="card text-center mb-2">
                                <div className="card-header bg-secondary text-white">
                                    <h3>TO DO</h3>
                                </div>
                            </div>
                            {
                                // <!-- SAMPLE PROJECT TASK STARTS HERE -->
                            }{" "}
                            <TicketItem/>
                            {
                                // <!-- SAMPLE PROJECT TASK ENDS HERE -->
                            }{" "}
                        </div>
                    </div>
                </div>
                {
                    //<!-- Backlog ENDS HERE -->
                }{" "}
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