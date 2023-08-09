import React, { useEffect, useState } from 'react'
import { Button, Container, Row, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { AiFillDashboard } from 'react-icons/ai'
import { IoIosCreate } from "react-icons/io";
import Layout from '../../Header/Layout';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

const SaleUrl = "http://localhost:4000/api/v1/bagsaleorders"


const BagSaleList = () => {
  const [getsale, setSale] = useState(null);
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
      // alert("Item has been deleted successfully")
      // toast.success("Item deleted Succesfully")
    })
      .catch(error => {
        console.log(error)
      })

  }
  console.log("ddd",getsale)

  if (!getsale) return null;


  return (
    <>
      <Layout />
      <Container className='main-col' >
        <Table striped bordered hover className='main-table'>
          <thead>
            <tr>
              <th><h5><AiFillDashboard /> &nbsp; Dashboard/ Item-Details</h5></th>
            </tr>
          </thead>
        </Table>
        <Row>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>
                  <div className='table-div' >

                    <Button className="table-btn" variant="success" onClick={() => navigate("/sale")} >
                      <IoIosCreate />&nbsp;
                      New Sale
                    </Button>
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
        <h5 className="w3-center w3-flat-midnight-blue w3-padding-48 w3-border-blue-grey w3-grey text text-center mb-5 mt-3">Item Details</h5>
        <Container>
          <Row>




            <Table responsive>
              <table class="table table-bordered border-secondary">
                <thead>
                  <tr>
                    <th>Serial Number</th>
                    <th>Customer Name</th>
                    <th>Mobile No</th>
                    <th>Item Name</th>
                    {/* <th>Amount without GST</th> */}
                    {/* <th>CGST Applied</th> */}
                    {/* <th>SGST Applied</th>  */}
                    {/* <th>Price per item</th> */}
                    {/* <th>Quantity</th> */}
                    {/* <th>Total price</th> */}
                    {/* <th>Item Name (2)</th> */}
                    <th>Action View</th>
                    <th>Action Delete</th>


                  </tr>
                </thead>
                <tbody>

                  {getsale.bagsaleorders.map((item, index) => (
                    <tr key={item._id}>
                      <td>{index + 1}</td>
                      <td>{item.customerName}</td>
                      <td>{item.mobileNumber}</td>
                      {item.Items.map((item) => (
                        <React.Fragment key={item._id}>
                          <td>{item.itemName}</td>
                          {/* <td>{item.amountWithoutGST}</td>
                          <td>{item.cgstapplied}</td>
                          <td>{item.sgstapplied}</td>
                          <td>{item.pricePerItem}</td>
                          <td>{item.quantity}</td>
                          <td>{item.totalPrice}</td> */}
                        </React.Fragment>
                      ))}


                      <td>
                        <Link to={`/unitbilling/${item._id}?invoiceNumber=${index + 1}`}>
                          <Button className='table-btn'
                            variant="success" >
                            &#128065;View</Button>
                        </Link>
                      </td>

                      <td>
                        <Button className='table-btn' variant="success"
                          onClick={(e) => { deleteData(item._id) }}
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

export default BagSaleList
