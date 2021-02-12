import React, { useState } from 'react'
import { Input, Button , Row, Col, Select, Form } from 'antd';
import "antd/dist/antd.css";
import './Login.css'
import { loginDr } from '../../actions'
import { connect } from 'react-redux'
import { withRouter } from 'react-router';

const { Option } = Select;

const Login = (props) => {
    const [loginRole, setLoginRole] = useState('doctor')
    const [emailValue, setEmailValue] = useState('')
    const [passwordValue, setPasswordValue] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [generalError, setGeneralError] = useState('')

    const handleChange = (value) => {
        setLoginRole(value)
    }

    const handleEmailInput = (e) => {
        setEmailValue(e.target.value)
    }

    const handlePasswordInput = (e) => {
        setPasswordValue(e.target.value)
    }

    const loginSubmit = (event) => {
        event.preventDefault();

        if(emailValue === '' || passwordValue === '') {
            setGeneralError('Please fill all the required fields')
            setEmailError('')
            return
        } else {
            setGeneralError('')
        }
        if(!validateEmail(emailValue)) {
            setEmailError('Enter a valid email');
            setGeneralError('')
            return
        }
        if(loginRole === 'doctor') {
            if(emailValue === 'doctor@healthcare.com' && passwordValue === 'healthcare') {
                props.dispatch(loginDr(emailValue, passwordValue))
                props.history.push('/doctor')
            } else {
                setGeneralError('Invalid email or password')
            }
        }
    }

    const validateEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    return (
        <div className='LoginDiv'>
            <h1>React Healthcare</h1>
            <Form onSubmitCapture={loginSubmit}>
                <Row style={{justifyContent: 'center'}}>
                    <Col xs={16}>
                        <span style={{marginRight: '10px'}}>Login as</span>
                        <Select defaultValue="doctor" style={{ width: 120 }} onChange={handleChange}>
                            <Option value="doctor">Doctor</Option>
                            <Option value="patient">Patient</Option>
                        </Select>
                    </Col>
                    <Col xs={16} className='LoginInput'>
                        <Input placeholder="Email" onChange={(e) => handleEmailInput(e)}/>
                        <p style={{color: 'red', textAlign: 'left', fontSize: '10px'}}>{emailError}</p>
                    </Col>
                    <Col xs={16} className='LoginInput'>
                        <Input.Password placeholder="Password" onChange={(e) => handlePasswordInput(e)}/>
                        <p style={{color: 'red', textAlign: 'left', fontSize: '10px'}}>{passwordError}</p>
                    </Col>
                    <Col xs={16}>
                        <p style={{color: 'red', fontSize: '10px'}}>{generalError}</p>
                    </Col>
                    <Col xs={16} className='LoginInput'>
                        <Button className='login-btn' type="primary" onClick={loginSubmit}>Login</Button>
                    </Col>
                </Row>
            </Form>
        </div>
    )
}

export default connect()(withRouter((Login)));
