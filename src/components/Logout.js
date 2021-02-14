import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router';
import { logout } from '../actions'

const Logout = (props) => {
    const logoutAction = async () => {
        await props.dispatch(logout());
        props.history.push('/')
    }
    return (
        <div>
            <span style={{cursor: 'pointer'}} onClick={logoutAction}>Logout</span>
        </div>
    )
}

export default connect()(withRouter((Logout)));
