import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Modal, Card, Row, Col, Input, Form } from 'antd';
import "antd/dist/antd.css";
import './PatientsList.css'
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import { EditTwoTone, DeleteTwoTone } from '@ant-design/icons';

const PatientsList = (props) => {

    const [modalOpen, setModalOpen] = useState(false)
    const [formSubmitted, setFormSubmitted] = useState(false)
    const [error, setError] = useState(null)
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
        diagnosis: '',
        medication: '',
        address: '',
        country: '',
        region: '',
        city: '',
        pincode: ''
    });

    const handleNameInputChange = (event) => {
        event.persist();
        setValues((values) => ({
            ...values,
            name: event.target.value,
        }));
    };

    const handleEmailInputChange = (event) => {
        event.persist();
        setValues((values) => ({
            ...values,
            email: event.target.value,
        }));
    }

    const handlePhoneInputChange = (event) => {
        event.persist();
        setValues((values) => ({
            ...values,
            phone: event.target.value,
        }));
    }

    const handleDiagnosisInputChange = (event) => {
        event.persist();
        setValues((values) => ({
            ...values,
            diagnosis: event.target.value,
        }));
    }

    const handleMedicationInputChange = (event) => {
        event.persist();
        setValues((values) => ({
            ...values,
            medication: event.target.value,
        }));
    }

    const handleAddressInputChange = (event) => {
        event.persist();
        setValues((values) => ({
            ...values,
            address: event.target.value,
        }));
    }

    const handleCountryInputChange = (val) => {
        setValues((values) => ({
            ...values,
            country: val,
        }));
    }

    const handleRegionInputChange = (val) => {
        setValues((values) => ({
            ...values,
            region: val,
        }));
    }

    const handleCityInputChange = (event) => {
        event.persist();
        setValues((values) => ({
            ...values,
            city: event.target.value,
        }));
    }

    const handlePincodeInputChange = (event) => {
        event.persist();
        setValues((values) => ({
            ...values,
            pincode: event.target.value,
        }));
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

    const editPatient = (patient) => {
        if(values.email === null || values.name === null || values.phone === null ||
            values.diagnosis === null || values.medication === null || values.pincode === null) {
            setError('Please fill all the required fields')
        } else if(!validateEmail(values.email)) {
            setError('Please enter a valid email')
        } else if(!validateFullName(values.name)) {
            setError('Incorrect name format')
        } else if(!validatePhone(values.phone)) {
            setError('Phone should only contain numeric values & exactly 10 characters')
        } else if(!validatePincode(values.pincode)) {
            setError('Pincode should only contain numeric values & exactly 6 characters')
        } else {
            setError('')
            axios.put('http://localhost:8000/patients/'+patient.id, JSON.stringify(patient), {
            headers: {
                'Content-Type': 'application/json'
            }
            })
            .then(response => {
                setModalOpen(false)
                setFormSubmitted(!formSubmitted)
            })
        }
    }

    const openEditModal = (patient_id, patient_name, patient_email, patient_password, patient_phone, patient_diagnosis, patient_medication, patient_address, patient_country, patient_region, patient_city, patient_pincode) => {
        setModalOpen(true);
        setValues((values) => ({
            ...values,
            id: patient_id,
            name: patient_name,
            email: patient_email,
            password: patient_password,
            phone: patient_phone,
            diagnosis: patient_diagnosis,
            medication: patient_medication,
            address: patient_address,
            country: patient_country,
            region: patient_region,
            city: patient_city,
            pincode: patient_pincode
        }));
    }

    useEffect(() => {
        props.getData();
        return () => {
        }
    }, [formSubmitted])
    
    return (
        <div style={{margin: '2%'}}>
            <Row style={{marginTop: '20px'}} gutter={16}>
            {props.list.map((patient) => (
                <Col key={patient.id} xs={24} md={12} lg={8}>
                    <Card key={patient.id} title={patient.name} bordered={true} style={{marginTop: '20px', boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'}}>
                        <Row >
                            <Col xs={24} className='padding'>
                                <span className='patient-info-text'>Email:&nbsp;</span>
                                <span className='patient-info-text bold'>{patient.email}</span>
                            </Col>
                            <Col xs={24} className='padding'>
                                <span className='patient-info-text'>Phone:&nbsp;</span>
                                <span className='patient-info-text bold'>{patient.phone}</span>
                            </Col>
                            <Col xs={24} className='padding'>
                                <span className='patient-info-text'>Diagnosis:&nbsp;</span>
                                <span className='patient-info-text bold'>{patient.diagnosis}</span>
                            </Col>
                            <Col xs={24} className='padding'>
                                <span className='patient-info-text'>Medication:&nbsp;</span>
                                <span className='patient-info-text bold'>{patient.medication}</span>
                            </Col>
                            <Col xs={24} className='padding'>
                                <span className='patient-info-text'>Address:&nbsp;</span>
                                <span className='patient-info-text bold'>{patient.address}</span>
                            </Col>
                            <Col xs={24} className='padding'>
                                <span className='patient-info-text bold'>{patient.city},&nbsp;</span>
                                <span className='patient-info-text bold'>{patient.region},&nbsp;</span>
                                <span className='patient-info-text bold'>{patient.country}.</span>
                            </Col>
                            <Col xs={24} className='padding'>
                            <EditTwoTone
                            style={{ float:'left', cursor: 'pointer', fontSize: '20px' }}
                            onClick={() => openEditModal(patient.id, patient.name, patient.email, patient.password,
                            patient.phone, patient.diagnosis, patient.medication, patient.address, patient.country, patient.region, patient.city, patient.pincode)}/>
                            <DeleteTwoTone 
                            style={{ float:'left', marginLeft:'10px', cursor: 'pointer', fontSize: '20px' }}
                            onClick={() => props.deletePatient(patient.id)}
                            />
                            </Col>
                        </Row>
                    </Card>
                </Col>
            ))}
            </Row>
            
            <Modal
            title="Edit Patient Info"
            centered
            visible={modalOpen}
            onOk={() => editPatient(values)}
            onCancel={() => setModalOpen(false)}
            >
                <Form>
                    <Row gutter={8}>
                        <Col xs={12}>
                            <p className='margin'>Email:</p>
                            <Input placeholder="Enter email" value={values.email} onChange={handleEmailInputChange}/>
                        </Col>
                        <Col xs={12}>
                            <p className='margin'>Full Name:</p>
                            <Input placeholder="Enter firstname and lastname" value={values.name} onChange={handleNameInputChange}/>
                        </Col>
                        <Col xs={12}>
                            <p className='margin'>Phone:</p>
                            <Input placeholder="Enter mobile" value={values.phone} onChange={handlePhoneInputChange}/>
                        </Col>
                        <Col xs={24}>
                            <p className='margin'>Diagnosis:</p>
                            <Input placeholder="Enter diagnosis" value={values.diagnosis} onChange={handleDiagnosisInputChange}/>
                        </Col>
                        <Col xs={24}>
                            <p className='margin'>Medication:</p>
                            <Input placeholder="Enter prescribed medication" value={values.medication} onChange={handleMedicationInputChange}/>
                        </Col>
                        <Col xs={24}>
                            <p className='margin'>Address:</p>
                            <Input.TextArea placeholder="Enter address" value={values.address} onChange={handleAddressInputChange}/>
                        </Col>
                        <Col xs={24}>
                            <p className='margin'>Country and Region:</p>
                            <CountryDropdown
                            value={values.country}
                            onChange={(val) => handleCountryInputChange(val)}
                            />
                        </Col>
                        <Col xs={24}>
                        <RegionDropdown
                            country={values.country}
                            style={{marginTop: '5px'}}
                            value={values.region}
                            onChange={(val) => handleRegionInputChange(val)}
                            />
                        </Col>
                        <Col xs={12}>
                            <p className='margin'>City:</p>
                            <Input placeholder="Enter city" value={values.city} onChange={handleCityInputChange}/>
                        </Col>
                        <Col xs={12}>
                            <p className='margin'>Pincode:</p>
                            <Input placeholder="Enter pincode" value={values.pincode} onChange={handlePincodeInputChange}/>
                        </Col>
                        <Col xs={24} style={{textAlign: 'center'}}>
                            <p style={{color: 'red', fontSize: '12px', marginTop: '10px'}} >{error}</p>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </div>
    )
}

export default PatientsList
