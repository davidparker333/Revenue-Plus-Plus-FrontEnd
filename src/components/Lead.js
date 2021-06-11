import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Lead extends Component {
    render() {
        return (
            <tr>
            <td><Link to='/leads/1'>Mark</Link></td>
            <td><Link to='/leads/1'>Otto</Link></td>
            <td><Link to='/leads/1'>(207)957-8375</Link></td>
            <td><Link to='/leads/1'>The Saco Deli & Co</Link></td>
            </tr>
        )
    }
}
