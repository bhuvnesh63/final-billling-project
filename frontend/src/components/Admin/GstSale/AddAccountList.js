import React, { useEffect, useState } from 'react'
import { Button, Container, Row, Table } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { AiFillDashboard } from 'react-icons/ai'
import { IoIosCreate } from "react-icons/io";
import Layout from '../../Header/Layout';
import axios from 'axios';
import { toast } from 'react-toastify';


const AccountUrl = "http://localhost:4000/api/v1/accounts"

const AddAccountList = () => {
  const navigate = useNavigate();
  const [getaccounts, setGetAccounts] = useState(null);
 

  useEffect(() => {
    axios.get(AccountUrl).then((response) => {
      setGetAccounts(response.data)
      console.log(response)
    })
  }, [getaccounts])


  const deleteData = (id) => {
    // console.log(id)
    axios.delete(`http://localhost:4000/api/v1/account/${id}`).then(response => {
      // alert("Item has been deleted successfully")
      toast.success("Item deleted Succesfully")
    })
      .catch(error => {
        console.log(error)
      })

  }
  if (!getaccounts) return null;
  return (
    <>
      <Layout />
      <Container className='main-col' >
        <Table striped bordered hover >
          <thead>
            <tr>
              <th><h5><AiFillDashboard /> &nbsp; Dashboard/ Add-Account-Details</h5></th>
            </tr>
          </thead>
        </Table>
        <Row>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>
                  <div className='table-div' >
                  <Button className="table-btn" variant="success" onClick={()=> navigate("/addaccount")} >
                      <IoIosCreate />&nbsp;
                       Create New Account
                    </Button>
                  </div>
                </th>
              </tr>
            </thead>
          </Table>

        </Row>
      </Container>

      <div className='form-div' >
        <h5 className="w3-center w3-flat-midnight-blue w3-padding-48 w3-border-blue-grey w3-grey text text-center mb-5 mt-3">Item Details</h5>
        <Container>
          <Row>




            <Table responsive>
              <table class="table table-bordered border-secondary">
                <thead>
                  <tr>

                    <th>Name</th>
                    <th>Phone No</th>
                    <th>Email ID</th>
                    <th>Address</th>
                    <th>GST No</th>
                    <th>Action Edit</th>
                    <th>Action View</th>


                  </tr>
                </thead>
                <tbody>

                  {getaccounts?.accounts?.map((account) => (
                  <tr>
                    <td>{account.name}</td>
                    <td>{account.phoneNumber}</td>
                    <td>{account.email}</td>
                    <td>{account.address}</td>
                    <td>{account.gstNumber}</td>
  
                    <td>
                      <Link to={`/editaccount/${account._id}`}>
                      <Button className='table-btn'
                        variant="success" >
                        &#9998;Edit</Button>
                      </Link>
                    </td>

                    <td>
                      <Button className='table-btn' variant="success"
                        onClick={(e) => { deleteData(account._id) }}
                        value={"Delete"} >
                        <span className='delete-icon'>&#x2717;</span>Delete
                      </Button>
                    </td>

                  </tr>


                   ))} 



                </tbody>
              </table>
            </Table>
          </Row>
        </Container>

      </div>




    </>
  )
}

export default AddAccountList
