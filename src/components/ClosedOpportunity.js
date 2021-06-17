import React, { Component } from 'react'

export default class ClosedOpportunity extends Component {
    render() {
        return (
            <tr>
            <td>{this.props.company}</td>
            {this.props.id ? <td>${this.props.value}</td> : <td></td>}
            </tr>
        )
    }
}
