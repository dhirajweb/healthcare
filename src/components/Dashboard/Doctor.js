import React, { useState,useEffect } from 'react'
import { Button, Form, Modal, Input, Row, Col } from 'antd';
import "antd/dist/antd.css";
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import axios from 'axios'
import PatientsList from '../PatientsList'
import Logout from '../Logout' 
import './Doctor.css'

const Doctor = () => {
    const [modalOpen, setModalOpen] = useState(false)
    const [email, setEmail] = useState(null)
    // const [password, setPassword] = useState(null)
    const [name, setName] = useState(null)
    const [phone, setPhone] = useState(null)
    const [diagnosis, setDiagnosis] = useState(null)
    const [medication, setMedication] = useState(null)
    const [address, setAddress] = useState(null)
    const [country, setCountry] = useState('')
    const [region, setRegion] = useState('')
    const [city, setCity] = useState(null)
    const [pincode, setPincode] = useState(null)
    const [list, setList] = useState([])
    const [formSubmitted, setFormSubmitted] = useState(false)
    const [patientDeleted, setPatientDeleted] = useState(false)
    const [error, setError] = useState(null)
    const [emailExists, setEmailExists] = useState(false)

    useEffect(() => {
        getData();
        return () => {
            
        }
    }, [formSubmitted, patientDeleted])

    const deletePatient = (id) => {
        if(id) {
            axios.delete('http://localhost:8000/patients/'+id, {
    
            }).then((response) => {
                setPatientDeleted(!patientDeleted)
            }, (error) => {
                alert('Error deleting patient')
            });
        }
    }

    const getData = () => {
        axios.get('http://localhost:8000/patients')
        .then((response) => {
            setList(response.data)
        });
    }

    const validateEmailExists = (email) => {
        axios.get('http://localhost:8000/patients?email='+email)
        .then(async (response) => {
            if(response.data.length > 0) {
                await setEmailExists(true)
            } else {
                await setEmailExists(false)
            }
        });

        if(emailExists) {
            return true
        } else {
            return false
        }

    }

    const validateEmail = (email) => {
        const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return reg.test(String(email).toLowerCase());
    }

    const validateFullName = (name) => {
        const reg = /^[a-zA-Z]+ [a-zA-Z]+$/;
        return reg.test(name);
    }

    const validatePhone = (phone) => {
        if(phone.length !== 10) {
            return false;
        } else {
            const reg = /^\d+$/;
            return reg.test(phone);
        }
    }

    const validatePincode = (pincode) => {
        if(pincode.length !== 6) {
            return false;
        } else {
            const reg = /^\d+$/;
            return reg.test(pincode);
        }
    }

    const submitForm = () => {

        let formData = {
            email: email,
            password: 'Healthcare',
            name: name,
            phone: phone,
            diagnosis: diagnosis,
            medication: medication,
            address: address,
            country: country,
            region: region,
            city: city,
            pincode: pincode
        }
        if(validateEmailExists(formData.email)) {
            setError('Email already exists')
        } else if(formData.email === null || formData.password === null || formData.name === null || formData.phone === null ||
            formData.diagnosis === null || formData.medication === null || formData.pincode === null) {
            setError('Please fill all the required fields')
        } else if(!validateEmail(formData.email)) {
            setError('Please enter a valid email')
        } else if(!validateFullName(formData.name)) {
            setError('Incorrect name format')
        } else if(!validatePhone(formData.phone)) {
            setError('Phone should only contain numeric values & exactly 10 characters')
        } else if(!validatePincode(formData.pincode)) {
            setError('Pincode should only contain numeric values & exactly 6 characters')
        } else {
            setError('')
            formData = JSON.stringify(formData);
            axios.post('http://localhost:8000/patients', formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => {
                setModalOpen(false)
                setFormSubmitted(!formSubmitted)
                setEmail(null)
                setName(null)
                setPhone(null)
                setDiagnosis(null)
                setMedication(null)
                setAddress(null)
                setCountry('')
                setRegion('')
                setCity(null)
                setPincode(null)
            }, (error) => {
            
            });
        }
    }

    return (
        <div>
            <Button style={{marginTop: '50px'}} type="primary" onClick={() => setModalOpen(true)}>
            Add Patient
            </Button>
            <Button style={{marginTop: '50px', marginLeft: '10px'}} type="primary">
                <Logout />
            </Button>
            <Modal
            title="Add Patient Info"
            centered
            visible={modalOpen}
            onOk={() => submitForm()}
            onCancel={() => setModalOpen(false)}
            >
                <Form>
                    <Row gutter={8}>
                        <Col xs={12}>
                            <p className='margin'>Email:</p>
                            <Input placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                        </Col>
                        {/* <Col xs={12}>
                            <p className='margin'>Password:</p>
                            <Input.Password placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                        </Col> */}
                        <Col xs={12}>
                            <p className='margin'>Full Name:</p>
                            <Input placeholder="Enter firstname and lastname" value={name} onChange={(e) => setName(e.target.value)}/>
                        </Col>
                        <Col xs={12}>
                            <p className='margin'>Phone:</p>
                            <Input placeholder="Enter mobile" value={phone} onChange={(e) => setPhone(e.target.value)}/>
                        </Col>
                        <Col xs={24}>
                            <p className='margin'>Diagnosis:</p>
                            <Input placeholder="Enter diagnosis" value={diagnosis} onChange={(e) => setDiagnosis(e.target.value)}/>
                        </Col>
                        <Col xs={24}>
                            <p className='margin'>Medication:</p>
                            <Input placeholder="Enter prescribed medication" value={medication} onChange={(e) => setMedication(e.target.value)}/>
                        </Col>
                        <Col xs={24}>
                            <p className='margin'>Address:</p>
                            <Input.TextArea placeholder="Enter address" value={address} onChange={(e) => setAddress(e.target.value)}/>
                        </Col>
                        <Col xs={24}>
                            <p className='margin'>Country and Region</p>
                            <CountryDropdown
                            value={country}
                            onChange={(val) => setCountry(val)} />
                        </Col>
                        <Col xs={24}>
                            <RegionDropdown
                                country={country}
                                style={{marginTop: '5px'}}
                                value={region}
                                onChange={(val) => setRegion(val)} />
                        </Col>
                        <Col xs={12}>
                            <p className='margin'>City:</p>
                            <Input placeholder="Enter city" value={city} onChange={(e) => setCity(e.target.value)}/>
                        </Col>
                        <Col xs={12}>
                            <p className='margin'>Pincode:</p>
                            <Input placeholder="Enter pincode" value={pincode} onChange={(e) => setPincode(e.target.value)}/>
                        </Col>
                        <Col xs={24} style={{textAlign: 'center'}}>
                            <p style={{color: 'red', fontSize: '12px', fontWeight: 'normal'}} className='margin'>{error}</p>
                        </Col>
                    </Row>
                </Form>
            </Modal>
            <PatientsList list={list} deletePatient={deletePatient} getData={getData}/>
        </div>
    )
}

export default Doctor
