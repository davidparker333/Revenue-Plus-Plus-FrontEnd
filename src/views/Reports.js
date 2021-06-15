import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';

export default class Reports extends Component {
    render() {
        if (this.props.isLoggedIn === false) {
            return <Redirect to='/login' />
        }
        return (
            <div>
                This is the reports page
            </div>
        )
    }
}
