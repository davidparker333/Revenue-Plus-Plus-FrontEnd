import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class LeadPreview extends Component {
    render() {
        return (
            <tr>
            <td><Link to={`/leads/${this.props.id}`}>{this.props.firstName}</Link></td>
            <td><Link to={`/leads/${this.props.id}`}>{this.props.lastName}</Link></td>
            <td><Link to={`/leads/${this.props.id}`}>{this.props.phoneNumber}</Link></td>
            <td><Link to={`/leads/${this.props.id}`}>{this.props.company}</Link></td>
            </tr>
        )
    }
}
