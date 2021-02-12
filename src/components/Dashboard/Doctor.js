import React, { useState,useEffect } from 'react'
import { Button, Form, Modal, Input, Row, Col } from 'antd';
import "antd/dist/antd.css";
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import axios from 'axios'
import PatientsList from '../PatientsList'

const Doctor = () => {
    const [modalOpen, setModalOpen] = useState(false)
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [name, setName] = useState(null)
    const [phone, setPhone] = useState(null)
    const [diagnosis, setDiagnosis] = useState(null)
    const [medication, setMedication] = useState(null)
    const [address, setAddress] = useState(null)
    const [country, setCountry] = useState(null)
    const [region, setRegion] = useState(null)
    const [city, setCity] = useState(null)
    const [pincode, setPincode] = useState(null)
    const [list, setList] = useState([])
    const [formSubmitted, setFormSubmitted] = useState(false)
    const [patientDeleted, setPatientDeleted] = useState(false)

    useEffect(() => {
        axios.get('http://localhost:8000/patients')
        .then((response) => {
            setList(response.data)
        });
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

    const editPatient = (patient) => {
        console.log(patient)
    }

    const submitForm = () => {

        let formData = {
            email: email,
            password: password,
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

        formData = JSON.stringify(formData);

        axios.post('http://localhost:8000/patients', formData, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((response) => {
            setModalOpen(false)
            setFormSubmitted(!formSubmitted)
        }, (error) => {
        
        });
    }

    return (
        <div>
            <Button style={{marginTop: '50px'}} type="primary" onClick={() => setModalOpen(true)}>
            Add Patient
            </Button>
            <Modal
            title="Add Patient Info"
            centered
            visible={modalOpen}
            onOk={() => submitForm()}
            onCancel={() => setModalOpen(false)}
            >
                <Form>
                    <p>Email:</p>
                    <Input placeholder="Enter email" onChange={(e) => setEmail(e.target.value)}/>
                    <p>Password:</p>
                    <Input.Password placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                    <p>Full Name:</p>
                    <Input placeholder="Enter firstname and lastname" onChange={(e) => setName(e.target.value)}/>
                    <p>Phone:</p>
                    <Input placeholder="Enter mobile" onChange={(e) => setPhone(e.target.value)}/>
                    <p>Diagnosis:</p>
                    <Input placeholder="Enter diagnosis" onChange={(e) => setDiagnosis(e.target.value)}/>
                    <p>Medication:</p>
                    <Input placeholder="Enter prescribed medication" onChange={(e) => setMedication(e.target.value)}/>
                    <p>Address:</p>
                    <Input.TextArea placeholder="Enter address" onChange={(e) => setAddress(e.target.value)}/>
                    <p>Country and Region</p>
                    <CountryDropdown
                    value={country}
                    onChange={(val) => setCountry(val)} />
                    <RegionDropdown
                    country={country}
                    value={region}
                    onChange={(val) => setRegion(val)} />
                    <p>City:</p>
                    <Input placeholder="Enter city" onChange={(e) => setCity(e.target.value)}/>
                    <p>Pincode:</p>
                    <Input placeholder="Enter pincode" onChange={(e) => setPincode(e.target.value)}/>
                </Form>
            </Modal>
            <PatientsList list={list} deletePatient={deletePatient} editPatient={editPatient}/>
        </div>
    )
}

export default Doctor
