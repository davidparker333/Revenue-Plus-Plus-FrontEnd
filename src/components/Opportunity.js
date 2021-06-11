import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Opportunity extends Component {
    render() {
        return (
            <tr>
            <td><Link to='/opportunities/1'>Jacob Thornton</Link></td>
            <td><Link to='/opportunities/1'>Central Provisions</Link></td>
            <td><Link to='/opportunities/1'>$450</Link></td>
            <td><Link to='/opportunities/1'>Meeting Held</Link></td>
            </tr>
        )
    }
}
