import React, {useState} from 'react'
import { Modal, Card, Row, Col, Input, Form } from 'antd';
import "antd/dist/antd.css";
import './PatientsList.css'
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';

const PatientsList = (props) => {

    const [modalOpen, setModalOpen] = useState(false)
    const [values, setValues] = useState({
        name: '',
        email: '',
        phone: '',
    });

    const handleNameInputChange = (event) => {
        event.persist();
        setValues((values) => ({
            ...values,
            name: event.target.value,
        }));
    };

    const openEditModal = (patient_id, patient_name, patient_email, patient_phone, patient_diagnosis, patient_medication, patient_address, patient_country, patient_region, patient_city, patient_pincode) => {
        setModalOpen(true);
        setValues((values) => ({
            ...values,
            name: patient_name,
        }));
    }

    const EditModal = () => <Modal
    title="Edit Patient Info"
    centered
    visible={modalOpen}
    // onOk={setPatientData}
    onCancel={() => setModalOpen(false)}
    >
        <Form>
            <p>Email:</p>
            <Input placeholder="Enter email" />
            <p>Full Name:</p>
            <Input placeholder="Enter firstname and lastname" value={values.name} onChange={e => handleNameInputChange(e)}/>
            <p>Phone:</p>
            <Input placeholder="Enter mobile" />
            <p>Diagnosis:</p>
            <Input placeholder="Enter diagnosis" />
            <p>Medication:</p>
            <Input placeholder="Enter prescribed medication" />
            <p>Address:</p>
            <Input.TextArea placeholder="Enter address" />
            <p>Country and Region</p>
            <CountryDropdown
            // value={country}
            // onChange={(val) => setCountry(val)}
            />
            <RegionDropdown
            // country={country}
            // value={region}
            // onChange={(val) => setRegion(val)}
            />
            <p>City:</p>
            <Input placeholder="Enter city" />
            <p>Pincode:</p>
            <Input placeholder="Enter pincode" />
        </Form>
    </Modal>
    return (
        <div style={{margin: '2%'}}>
            <Row style={{marginTop: '50px'}} gutter={16}>
            {props.list.map((patient) => (
                <Col key={patient.id} xs={24} lg={8}>
                    <Card key={patient.id} title={patient.name} bordered={true} style={{marginTop: '10px'}}>
                        <Row >
                            <Col xs={12} className='padding'>
                                <span style={{float: 'left'}}>Email:&nbsp;</span>
                                <span className='patient-info-text'>{patient.email}</span>
                            </Col>
                            <Col xs={12} className='padding'>
                                <span style={{float: 'left'}}>Phone:&nbsp;</span>
                                <span className='patient-info-text'>{patient.phone}</span>
                            </Col>
                            <Col xs={24} className='padding'>
                                <span style={{float: 'left'}}>Diagnosis:&nbsp;</span>
                                <span className='patient-info-text'>{patient.diagnosis}</span>
                            </Col>
                            <Col xs={24} className='padding'>
                                <span style={{float: 'left'}}>Medication:&nbsp;</span>
                                <span className='patient-info-text'>{patient.medication}</span>
                            </Col>
                            <Col xs={24} className='padding'>
                                <span style={{float: 'left'}}>Address:&nbsp;</span>
                                <span className='patient-info-text'>{patient.address}</span>
                            </Col>
                            <Col xs={24} className='padding'>
                                <span className='patient-info-text'>{patient.city},&nbsp;</span>
                                <span className='patient-info-text'>{patient.region},&nbsp;</span>
                                <span className='patient-info-text'>{patient.country}.</span>
                            </Col>
                            <Col xs={24} className='padding'>
                                <span style={{color: 'blue', float:'left', cursor: 'pointer'}}
                                onClick={() => openEditModal(patient.id, patient.name, patient.email, patient.phone, patient.diagnosis, patient.medication, patient.address, patient.country, patient.region, patient.city, patient.pincode)}>Edit</span>
                                <span style={{color: 'blue', float:'left', marginLeft:'10px', cursor: 'pointer'}} onClick={() => props.deletePatient(patient.id)}>Delete</span>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            ))}
            </Row>
            <EditModal />
        </div>
    )
}

export default PatientsList
