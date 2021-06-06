import React, { Component } from 'react'

export default class Message extends Component {
    render() {
        return (
            <div class={`alert alert-${this.props.category} alert-dismissible fade show`} role="alert">
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
            {this.props.message}
            </div>
        )
    }
}
