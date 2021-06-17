import React, { Component } from 'react'

export default class ClosedOpportunityFooter extends Component {
    render() {
        return (
            <tr>
            <td><b>Total</b></td>
            {this.props.total ? <td><b>${this.props.total}</b></td> : <td></td>}
            </tr>
        )
    }
}
