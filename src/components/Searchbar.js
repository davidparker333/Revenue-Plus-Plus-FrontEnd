import React, { Component } from 'react'
import { Row } from 'react-bootstrap'

export default class Searchbar extends Component {
    render() {
        return (
            <Row>
                <div className='col-12'>
                    <div class="input-group">
                    <input type="text" class="form-control" placeholder="Search" />
                    <div class="input-group-append">
                        <button class="btn btn-secondary" type="button">
                            <i class="fa fa-search"></i>
                        </button>
                        </div>
                    </div>
                </div>
            </Row>
        )
    }
}
