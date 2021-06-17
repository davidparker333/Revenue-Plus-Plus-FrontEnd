import React, { Component } from 'react';
import Moment from 'react-moment';

export default class Activity extends Component {
    render() {
        return (
            <tr>
            <td>{this.props.type}</td>
            <td><Moment format="MM/DD/YY">{this.props.date}</Moment></td>
            <td>{this.props.notes}</td>
            </tr>
        )
    }
}
