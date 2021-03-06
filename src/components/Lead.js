import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Lead extends Component {
    render() {
        return (
            <tr>
            <td><Link to={`/leads/${this.props.id}`}>{this.props.firstName}</Link></td>
            <td><Link to={`/leads/${this.props.id}`}>{this.props.lastName}</Link></td>
            <td><Link to={`/leads/${this.props.id}`}>{this.props.phoneNumber}</Link></td>
            <td><Link to={`/leads/${this.props.id}`}>{this.props.company}</Link></td>
            <td className='d-none d-lg-block'><Link to={`/leads/${this.props.id}`}>{this.props.hot ? <i className="fas fa-check"></i>: ""}</Link></td>
            </tr>
        )
    }
}
