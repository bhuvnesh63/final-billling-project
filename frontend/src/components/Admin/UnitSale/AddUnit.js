import React, { useEffect, useState } from 'react'
import Layout from '../../Header/Layout'
import { Button, Container, Row, Table } from 'react-bootstrap'
import { Form, Link, useNavigate } from 'react-router-dom'
import { AiFillDashboard, AiFillDelete, AiFillEdit, AiFillSetting } from 'react-icons/ai';
import { IoIosCreate } from 'react-icons/io';
import axios from 'axios';
import './addunit.css';
import { toast } from 'react-toastify';

const AddUnit = () => {



  const [unitName, setUnitName] = useState("");
  const [pieceInUnit, setPieceInUnit] = useState("");



  const navigate = useNavigate();


  const submitform = async (event) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:4000/api/v1/unit/new", {

        "unitName":unitName,
        "pieceInUnit":pieceInUnit,


   


      })
      toast.success("Unit Add Successfully");
      navigate("/unitlist");

    } catch (error) {
      console.log(error.response);

    }
  }

  return (
    <>

      <Layout />
      <Container style={{ width: '90%', marginTop: '20px' }}>
        <Table striped bordered hover className="main-table">
          <thead>
            <tr>
              <th>
                <h5>
                  <AiFillDashboard /> &nbsp;Dasboard / Add Unit
                </h5>
              </th>
            </tr>
          </thead>
        </Table>
        <Row>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>
                  <div className="table-div">
                  
               

                    <Button className="table-btn" variant="success" onClick={()=> navigate("/unitlist")} >
                      <IoIosCreate />&nbsp;
                      Unit List
                    </Button>

                    <Button className="table-btn float-end" variant="success" onClick={()=> navigate("/unithistory")} >
                      <IoIosCreate />&nbsp;
                       Check Unit History
                    </Button>
                  </div>
                </th>
              </tr>
            </thead>
          </Table>

        </Row>
      </Container>


      <div className="form-div">
        <h5 className="w3-center w3-flat-midnight-blue w3-padding-48 w3-border-blue-grey w3-grey text text-center mb-5 mt-3">Add Unit </h5>
        <Container>
          <Row>
            <form className="row g-4 p-3 registration-form">
            

              <div class="col-md-4 position-relative">
                <label className="label">Unit Name </label>
                <input
                  type="text"
                  class="form-control"
                  value={unitName}
                  onChange={(e) => setUnitName(e.target.value)}
                  required
                />
              </div>
              <div class="col-md-4 position-relative">
                <label className="label">Piece In Unit</label>
                <input
                  type="number"
                  class="form-control"
                  value={pieceInUnit}
                  onChange={(e) => setPieceInUnit(e.target.value)}
                  required
                />
              </div>
          
            
              <center>
                <Button
                  className="stu_btn"
                  variant="success"
                  type="submit"
                  onClick={(event) => submitform(event)}
                >
                  Submit
                </Button>
             
              </center>
            </form>
          </Row>
        </Container>
      </div>


    </>

  )
}

export default AddUnit
