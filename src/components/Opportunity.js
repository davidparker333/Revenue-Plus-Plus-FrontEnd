import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Opportunity extends Component {
    render() {
        return (
            <tr>
            <td><Link to={`/opportunities/${this.props.id}`}>{this.props.firstName} {this.props.lastName}</Link></td>
            <td><Link to={`/opportunities/${this.props.id}`}>{this.props.company}</Link></td>
            {this.props.id ? <td><Link to={`/opportunities/${this.props.id}`}>${this.props.value}</Link></td> : <td></td>}
            <td><Link to={`/opportunities/${this.props.id}`}>{this.props.status}</Link></td>
            </tr>
        )
    }
}
