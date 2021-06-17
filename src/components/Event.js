import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Moment from 'react-moment';

export default class Event extends Component {
    render() {
        return (
            <tr>
            <td><Link to={`/events/${this.props.id}`}><Moment format="hh:mm A">{this.props.time}</Moment></Link></td>
            <td><Link to={`/events/${this.props.id}`}>{this.props.eventName}</Link></td>
            </tr>
        )
    }
}
