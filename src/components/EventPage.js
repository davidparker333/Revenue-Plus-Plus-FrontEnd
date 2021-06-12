import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class EventPage extends Component {
    render() {
        return (
            <tr>
            <td><Link to='/events/1'>6/16/21</Link></td>
            <td><Link to='/events/1'>10:30 AM</Link></td>
            <td><Link to='/events/1'>Meeting @ Jensen's</Link></td>
            <td><Link to='/events/1'>Carl Munroe</Link></td>
            </tr>
        )
    }
}
