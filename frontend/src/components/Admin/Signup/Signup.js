import React, { useState, useEffect } from 'react';
import Header from '../../Header/Header'
import { Container, Col, Row, Table, Button, Form } from 'react-bootstrap';
import { AiFillDashboard } from 'react-icons/ai';
import './signup.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const Signup = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const navigate = useNavigate();

  const submitform = (event) => {
    event.preventDefault();
    try {
      axios.post("http://localhost:4000/api/v1/auth/signup", {
        "email": email,
        "password": password,

      })
      toast.success("User Add Succesfully")
 
      navigate("/dashboard")
    } catch (error) {
      console.log(error.response)
    }
  }
  // console.log("saloni")
  return (
    <>

      <Header />
      <Container style={{ width: "90%", marginTop: "20px" }}>
        <Table striped bordered hover className='main-table'>
          <thead>
            <tr>
              <th><h5><AiFillDashboard /> &nbsp;Dasboard / Signup</h5></th>
            </tr>
          </thead>
        </Table>
      </Container>



      <div className='form-divs' >
        <Container>
          <Row>
            <Col sm={12}>
              <div className='signup-form'>
                <Form>

                  <Form.Group className="mb-5" controlId="formBasicEmail">
                    <Form.Control
                      className='inputs-feilds'
                      type="email" placeholder="Enter Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Form.Group>



                  <Form.Group className="mb-5" controlId="formBasicPassword">
                    <Form.Control
                      className='inputs-feilds'
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Form.Group>

                  <center>
                    <Button
                      variant="success"
                      type="submit"
                      onClick={(event) => submitform(event)}
                    >
                      Submit
                    </Button>
                  </center>


                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </div>


    </>
  )
}

export default Signup