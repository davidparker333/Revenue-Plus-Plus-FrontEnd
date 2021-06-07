import React, { Component } from 'react'

export default class Message extends Component {
    render() {
        return (
            <div className={`alert alert-${this.props.category} alert-dismissible fade show`} role="alert">
            <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={() => this.props.clearMessage()}> 
                <span aria-hidden="true">&times;</span>
            </button>
            {this.props.message}
            </div>
        )
    }
}
