import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { Modal, Row, Col, Input, Form, Button } from 'antd';
import "antd/dist/antd.css";
import './Patient.css'
import Logout from '../Logout'

const Patient = (props) => {
    const [patientData, setPatientData] = useState([])
    const [modalOpen, setModalOpen] = useState(false)
    const [currentPasswordInput, setCurrentPasswordInput] = useState(null)
    const [newPasswordInput, setNewPasswordInput] = useState(null)
    const [error, setError] = useState(null)
    const [formSubmitted, setFormSubmitted] = useState(false)

    const validatePassword = (password) => {
        if(password.length < 8) {
            return false;
        } else {
            const reg = /(?=.*[a-z])(?=.*[A-Z])/
            return reg.test(password);
        }
    }

    const changePassword = () => {
        if(currentPasswordInput === null || newPasswordInput === null) {
            setError('Please fill all the fields')
        } else if(currentPasswordInput !== patientData[0].password) {
            setError('Incorrect current password')
        } else if(currentPasswordInput === newPasswordInput) {
            setError('Current and new password cannot be same')
        } else if(!validatePassword(newPasswordInput)) {
            setError('Password should contain atleast 8 characters, one uppercase & one lowercase letter')
        } else {
            patientData[0].password = newPasswordInput;
            axios.put('http://localhost:8000/patients/'+patientData[0].id, JSON.stringify(patientData[0]), {
            headers: {
                'Content-Type': 'application/json'
            }
            })
            .then(response => {
                setModalOpen(false)
                setFormSubmitted(!formSubmitted)
                setCurrentPasswordInput(null)
                setNewPasswordInput(null)
            })
            setError('')
        }
    }

    useEffect(() => {
        if(localStorage.getItem('email')) {
            axios.get('http://localhost:8000/patients?email='+localStorage.getItem('email'))
            .then((response) => {
                setPatientData(response.data)
            });
        }
    }, [formSubmitted])
    return (
        <div>
                <h2 style={{marginTop: '20px'}}>Profile</h2>
                <Row style={{justifyContent: 'center'}}>
                {patientData.map((patient) => (
                    <Form className='patient-form' key={patient.id} style={{textAlign: 'left', marginTop:'10px', backgroundColor: '#fff', padding: '20px', boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'}}>
                        <Row style={{justifyContent: 'center'}} gutter={16}>
                            <Col xs={24} md={12} lg={12}>
                                <p className='margin'>Email:</p>
                                <Input placeholder="Enter email" value={patient.email} disabled/>
                            </Col>
                            <Col xs={24} md={12} lg={12}>
                                <p className='margin'>Full Name:</p>
                                <Input placeholder="Enter firstname and lastname" value={patient.name} disabled/>
                            </Col>
                            <Col xs={24} md={12} lg={12}>
                                <p className='margin'>Phone:</p>
                                <Input placeholder="Enter mobile" value={patient.phone} disabled/>
                            </Col>
                            <Col xs={24} md={12} lg={12}>
                                <p className='margin'>Diagnosis:</p>
                                <Input placeholder="Enter diagnosis" value={patient.diagnosis} disabled/>
                            </Col>
                            <Col xs={24} md={12} lg={12}>
                                <p className='margin'>Medication:</p>
                                <Input placeholder="Enter prescribed medication" value={patient.medication} disabled/>
                            </Col>
                            <Col xs={24} md={12} lg={12}>
                                <p className='margin'>Address:</p>
                                <Input placeholder="Enter address" value={patient.address} disabled/>
                            </Col>
                            <Col xs={24} md={12} lg={12}>
                                <p className='margin'>Country:</p>
                                <Input placeholder="Enter prescribed medication" value={patient.country} disabled/>
                            </Col>
                            <Col xs={24} md={12} lg={12}>
                                <p className='margin'>Region:</p>
                                <Input placeholder="Enter prescribed medication" value={patient.region} disabled/>
                            </Col>
                            <Col xs={24} md={12} lg={12}>
                                <p className='margin'>City:</p>
                                <Input placeholder="Enter city" value={patient.city} disabled/>
                            </Col>
                            <Col xs={24} md={12} lg={12}>
                                <p className='margin'>Pincode:</p>
                                <Input placeholder="Enter pincode" value={patient.pincode} disabled/>
                            </Col>
                            <Col xs={24} lg={24}>
                                <Button style={{marginTop: '20px'}} type="primary" onClick={() => setModalOpen(true)}>
                                Update Password
                                </Button>
                                <Button style={{marginTop: '20px', marginLeft: '10px'}} type="primary" onClick={() => setModalOpen(true)}>
                                    <Logout />
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                ))}
                </Row>
            <Modal
            title="Update Password"
            centered
            visible={modalOpen}
            onOk={() => changePassword()}
            onCancel={() => setModalOpen(false)}
            >
                <Row gutter={8}>
                    <Col xs={12}>
                        <Input.Password placeholder="Current password" value={currentPasswordInput} onChange={e => setCurrentPasswordInput(e.target.value)}/>
                    </Col>
                    <Col xs={12}>
                        <Input.Password placeholder="New password" value={newPasswordInput} onChange={e => setNewPasswordInput(e.target.value)}/>
                    </Col>
                </Row>
                <p style={{color: 'red', marginTop: '10px', textAlign: 'center'}}>{error}</p>
            </Modal>
        </div>
    )
}

const mapStateToProps = (state) => {
    return state
}

export default connect(mapStateToProps)(Patient)
