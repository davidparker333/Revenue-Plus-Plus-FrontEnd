import React, { Component } from 'react'
import { Spinner } from 'react-bootstrap'

export default class Load extends Component {
    render() {
        return (
            <div className="loading-container" id="load-spinner">
                <Spinner animation="border" role="status" className="loading">
                    <span className="sr-only">Loading...</span>
                </Spinner>  
            </div>
        )
    }
}
