import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Moment from 'react-moment';

export default class EventPage extends Component {
    render() {
        return (
            <tr>
            <td><Link to={`/events/${this.props.id}`}><Moment format="MM/DD/YY">{this.props.date}</Moment></Link></td>
            <td><Link to={`/events/${this.props.id}`}><Moment format="hh:mm A">{this.props.date}</Moment></Link></td>
            <td><Link to={`/events/${this.props.id}`}>{this.props.meetingName}</Link></td>
            <td><Link to={`/events/${this.props.id}`}>{this.props.contact}</Link></td>
            </tr>
        )
    }
}
