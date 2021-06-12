import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Event extends Component {
    render() {
        return (
            <tr>
            <td><Link to='/events/1'>10:30 AM</Link></td>
            <td><Link to='/events/1'>Meeting @ Jensen's with Carl</Link></td>
            </tr>
        )
    }
}
