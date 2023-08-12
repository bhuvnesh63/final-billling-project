import React, { useEffect, useState } from 'react'
import Layout from '../../Header/Layout'
import { Button, Container, Row, Table } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { AiFillDashboard } from 'react-icons/ai'
import { IoIosCreate } from "react-icons/io";
import axios from 'axios';
import {toast} from 'react-toastify';



const AccountUrl = "http://localhost:4000/api/v1/gstorders"


const GstSaleList = () => {

  const navigate = useNavigate();
  const [gstSaleList, setGstSaleList] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    axios.get(AccountUrl).then((response) => {
      setGstSaleList(response.data)
      console.log(response)
    })
  }, [gstSaleList])


  const deleteData = (id) => {
    // console.log(id)
    axios.delete(`http://localhost:4000/api/v1/gstorder/${id}`).then(response => {
      // alert("Item has been deleted successfully")
      toast.success("Order deleted Succesfully")
    })
      .catch(error => {
        console.log(error)
      })

  }

  if (!gstSaleList) return null;

  const filteredOrders = gstSaleList.orders.filter(order =>
    order.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Layout />
      <Container className='main-col' >
        <Table striped bordered hover >
          <thead>
            <tr>
              <th><h5><AiFillDashboard /> &nbsp; Dashboard/ GST Sale List</h5></th>
            </tr>
          </thead>
        </Table>
        <Row>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>
                  <div className='table-div' >
                    <Button className="table-btn" variant="success" onClick={() => navigate("/gstsale")} >
                      <IoIosCreate />&nbsp;
                      New Sale
                    </Button>
                    <Button className="table-btn total-sale" variant="success" onClick={() => navigate("/checktotalgstsale")} >
                      <IoIosCreate />&nbsp;
              Check Total GST Sale
                    </Button>
                    <span className="search-bar">
                      Search
                      <input
                        type="text"
                        placeholder="Search by Customer Name"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="input-search"
                      />
                    </span>
                    <Button className="table-btn float-end" variant="success" onClick={() => navigate("/gstsalehistory")} >
                      <IoIosCreate />&nbsp;
                      Check GST Sale  History
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
                    <th>Serial Number</th>
                    <th>Customer name</th>
                    <th>Phone No</th>
                    <th>Email ID</th>
                    <th>Address</th>
                    <th>GST No</th>
                    <th>View Bill </th>
                    <th>Edit payment</th>
                    <th>Action Delete</th>


                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.length === 0 ? (
                    <tr>
                      <td colSpan="8" className="text-center">No customers found for the given search criteria.</td>
                    </tr>
                  ) : (

                    gstSaleList?.orders?.map((items, index) => (
                      <tr key={items._id}>
                        <td>{index + 1}</td>
                        <td>{items.name}</td>
                        <td>{items.phoneNumber}</td>
                        <td>{items.email}</td>
                        <td>{items.address}</td>
                        <td>{items.gstNumber}</td>
                        <td>
                          <Link to={`/gstbill/${items._id}?invoiceNumber=${index + 1}`}>
                            <Button className='table-btn'
                              variant="success" >
                              &#128065;View</Button>
                          </Link>
                        </td>
                        <td>
                          <Link to={`/editgstsale/${items._id}`}>
                            <Button className='table-btn'
                              variant="success" >
                              &#128065;Edit</Button>
                          </Link>
                        </td>
                        <td>
                          <Button className='table-btn' variant="success"
                            onClick={(e) => { deleteData(items._id) }}
                            value={"Delete"} >
                            <span className='delete-icon'>&#x2717;</span>Delete
                          </Button>
                        </td>

                      </tr>


                    ))
                  )}
                </tbody>
              </table>
            </Table>
          </Row>
        </Container>

      </div>


    </>

  )
}

export default GstSaleList
