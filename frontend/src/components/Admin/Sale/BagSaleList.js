import React, { useEffect, useState } from 'react'
import { Button, Container, Row, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { AiFillDashboard } from 'react-icons/ai'
import { IoIosCreate } from "react-icons/io";
import Layout from '../../Header/Layout';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

const SaleUrl = "http://localhost:4000/api/v1/bagsaleorders"


const BagSaleList = () => {

  const [getsale, setSale] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    axios.get(SaleUrl).then((response) => {
      setSale(response.data)
      console.log(response, "sale-list")
    })
  }, [getsale])

  const deleteData = (id) => {
    // console.log(id)
    axios.delete(`http://localhost:4000/api/v1/bagsaleorder/${id}`).then(response => {
      alert("Unit Order has been deleted successfully")
      toast.success("Item deleted Succesfully")
    })
      .catch(error => {
        console.log(error)
      })

  }



  if (!getsale) return null;


  return (
    <>
      <Layout />
      <Container className='main-col' >
        <Table striped bordered hover className='main-table'>
          <thead>
            <tr>
              <th><h5><AiFillDashboard /> &nbsp; Dashboard/ Unit Sale List</h5></th>
            </tr>
          </thead>
        </Table>
        <Row>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>
                  <div className='table-div' >

                    <Button className="table-btn" variant="success" onClick={() => navigate("/unitsale")} >
                      <IoIosCreate />&nbsp;
                      New Unit Sale
                    </Button>

                    <Button className="table-btn total-sale" variant="success" onClick={() => navigate("/checkunitsale")} >
                      <IoIosCreate />&nbsp;
                     Check Total Unit Sale
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
                    <Button className="table-btn float-end" variant="success" onClick={() => navigate("/salehistory")} >
                      <IoIosCreate />&nbsp;
                      Check Sale History
                    </Button>
                    {/* <Button className='table-btn' variant="light" >
                      <IoIosCreate />&nbsp;<Link to="/sale">Create</Link>
                    </Button> */}
                  </div>
                </th>
              </tr>
            </thead>
          </Table>

        </Row>
      </Container>


      <div className='form-div' >
        <h5 className="w3-center w3-flat-midnight-blue w3-padding-48 w3-border-blue-grey w3-grey text text-center mb-5 mt-3">Unit Sale List</h5>
        <Container>
          <Row>



            <Table responsive>
              <table class="table table-bordered border-secondary">
                <thead>
                  <tr>
                    <th>Serial Number</th>
                    <th>Customer Name</th>
                    <th>Mobile No</th>
                    <th>Total Amount</th>
                    <th>Payable Amount</th>
                    <th>Remaining Amount</th>
                    <th>Item Name</th>
                    <th>Action Edit</th>
                    <th>Action View</th>
                    <th>Action Delete</th>


                  </tr>
                </thead>
                <tbody>
                  {getsale.bagsaleorders
                    .filter(saleOrder =>
                      searchQuery === "" || saleOrder.customerName.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .map((saleOrder, index) => (
                      <tr key={saleOrder._id}>
                        <td>{index + 1}</td>
                        <td>{saleOrder.customerName}</td>
                        <td>{saleOrder.mobileNumber}</td>
                        <td>{saleOrder.totalAmount}</td>
                        <td>{saleOrder.payableAmount}</td>
                        <td>{saleOrder.remainingAmount}</td>
                        <td>
                          {saleOrder.Items.map((item, itemIndex) => (
                            <span key={item._id}>
                              {item.itemName}
                              {itemIndex !== saleOrder.Items.length - 1 ? ', ' : ''}
                            </span>
                          ))}
                        </td>

                        <td>
                          <Link to={`/editunitsale/${saleOrder._id}`}>
                            <Button className='table-btn' variant="success">&#128065; Edit</Button>
                          </Link>
                        </td>
                        <td>
                          <Link to={`/unitbilling/${saleOrder._id}?invoiceNumber=${index + 1}`}>
                            <Button className='table-btn' variant="success">&#128065; View</Button>
                          </Link>
                        </td>
                        <td>
                          <Button
                            className='table-btn'
                            variant="success"
                            onClick={() => deleteData(saleOrder._id)}
                            value={"Delete"}>
                            <span className='delete-icon'>&#x2717;</span> Delete
                          </Button>
                        </td>
                      </tr>
                    ))}
                  {searchQuery && 
                    getsale.bagsaleorders.filter(saleOrder =>
                      saleOrder.customerName.toLowerCase().includes(searchQuery.toLowerCase())
                    ).length === 0 && (
                      <tr>
                        <td colSpan="10" className="text-center">  No customers found for the given search criteria.</td>
                      </tr>
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

export default BagSaleList
