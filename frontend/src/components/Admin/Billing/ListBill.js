import React, { useEffect, useState } from 'react'
import Layout from '../../Header/Layout'
import { Button, Container, Row, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { AiFillDashboard } from 'react-icons/ai'
import { IoIosCreate } from "react-icons/io";
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

const ItemsUrl = "http://localhost:4000/api/v1/saleorders"

const Itemlist = ({ items }) => {
  const [getitems, setGetItems] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    axios.get(ItemsUrl).then((response) => {
      setGetItems(response.data)
      console.log(response)
    })
  }, [getitems])



  const deleteData = (id) => {
    // console.log(id)
    axios.delete(`http://localhost:4000/api/v1/saleorder/${id}`).then(response => {
      // alert("Item has been deleted successfully")
      // toast.success("Item deleted Succesfully")
    })
      .catch(error => {
        console.log(error)
      })

  }


  // console.log("deepanshu",getitems)
  if (!getitems) return null;
  return (
    <>
      <Layout />
      <Container className='main-col' >
        <Table striped bordered hover className='main-table'>
          <thead>
            <tr>
              <th><h5><AiFillDashboard /> &nbsp; Dashboard/ Sale Bill List</h5></th>
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
                    {/* 
                    <Button className='table-btn' variant="light" >
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
                    <th>Serial No.</th> {/* Add the Serial No. column */}

                    <th>Customer Name</th>
                    <th>Phone Number</th>


                    <th>View Bill</th>
                    <th>Delete Bill</th>
                  </tr>
                </thead>

                <tbody>
                  {getitems?.saleorders?.map((item, index) => (
                    <tr key={item._id}>
                      <td>{index + 1}</td>
                      <td>{item.customerName}</td>
                      <td>{item.mobileNumber}</td>
                      <td>

                        <Link to={`/billing/${item._id}?invoiceNumber=${index + 1}`}>
                          <Button className='table-btn'
                            variant="success" >
                            &#128065;   View Bill
                          </Button>
                        </Link>
                      </td>
                      <td>
                        <Button className='table-btn'
                          variant="success" onClick={(e) => { deleteData(item._id) }} value={"Delete"}
                        >
                          <span className='delete-icon'>&#x2717;</span>Delete
                        </Button>
                      </td>
                      {/* <td>
                      <Button className='table-btn' variant="light"
                        onClick={() => handleModel(items)}
                      >
                        &#128065;View
                      </Button>
                    </td>
                    {open && (
                      <ModalComp
                        open={open}
                        setOpen={setOpen}
                        {...user}
                      />
                    )} */}

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

export default Itemlist;
