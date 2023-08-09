
import React, { useEffect, useState } from 'react'
import Layout from '../../Header/Layout'
import { Button, Container, Row, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { AiFillDashboard } from 'react-icons/ai'
import { IoIosCreate } from "react-icons/io";
import axios from 'axios'
import './purchase.css';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const PurchaseOrderdetails = "http://localhost:4000/api/v1/purchaseorders"

const Purchasetransaction = ({ items }) => {
    const [getpurchase, setGetpurchase] = useState(null);
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const navigate= useNavigate();
    useEffect(() => {
        axios.get(PurchaseOrderdetails).then((response) => {
            setGetpurchase(response.data)
            console.log(response)
        })
    }, [])

    const handleSearch = (id) => {
        // console.log(id)
        axios.get(`http://localhost:4000/api/v1/purchaseorder/${startDate}/${endDate}`).then(response => {
            setGetpurchase(response.data)

            // alert("Item has been deleted successfully")
            toast.success("Item Fetched Succesfully")
        })
            .catch(error => {
                console.log(error)
            })

    }


    // if (!getpurchase) return null;
    return (
        <>
            <Layout />
            <Container className='main-col' >
                <Table striped bordered hover className='main-table'>
                    <thead>
                        <tr>
                            <th><h5><AiFillDashboard /> &nbsp; Dashboard/ Purchase History</h5></th>
                        </tr>
                    </thead>
                </Table>
                <Row>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>
                                    <div className='table-div' >
                                        <Button className="table-btn" variant="success" onClick={() => navigate("/additem")} >
                                            <IoIosCreate />&nbsp;
                                            Add New Item
                                        </Button>
                                        {/* <Button className='table-btn' variant="light" >
                                            <IoIosCreate />&nbsp;<Link to="/additem">Create</Link>
                                        </Button> */}
                                        <span className='date-button'>
                                            Start Date :-
                                            <input
                                                type='date'
                                                value={startDate}
                                                className='date-input'
                                                onChange={(event) => { setStartDate(event.target.value) }}

                                            />
                                        </span>


                                        <span className='date-button'>
                                            End Date :-
                                            <input
                                                type='date'
                                                value={endDate}
                                                className='date-input'
                                                onChange={(event) => { setEndDate(event.target.value) }}
                                            />
                                        </span>

                                        <Button className='table-btn' variant="success" onClick={handleSearch} >
                                            Filter
                                        </Button>
                                    </div>
                                </th>
                            </tr>
                        </thead>
                    </Table>

                </Row>
            </Container>


            <div className='form-div' >
                <h5 className="w3-center w3-flat-midnight-blue w3-padding-48 w3-border-blue-grey w3-grey text text-center mb-5 mt-3">Purchase History</h5>

                <Container>
                    <Row>

                    <span className='note'>Note:<h6 className='note-text'>By default you have current month history</h6></span >



                        <Table responsive>
                            <table class="table table-bordered border-secondary">
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Item Name</th>
                                        <th>MRP</th>
                                        <th>Total Amount</th>
                                        <th>Stock</th>
                                        <th>CGST</th>
                                        <th>SGST</th>
                                        <th>CGST Amount/pcs</th>
                                        <th>SGST Amount/pcs</th>
                                        <th>Purchase Price</th>
                                        <th>Total GST</th>
                                        <th>Price Without GST</th>
                                        {/* <th>Action Edit</th>
                                        <th>Action View</th> */}
                                    </tr>
                                </thead>

                                <tbody>
                                    {getpurchase?.purchase_Orders?.map((items) => (
                                        <tr>
                                            <td>{items.createdDate}</td>
                                            <td>{items.itemName}</td>
                                            <td>{items.sellingPrice}</td>
                                            <td>{items.totalamount}</td>
                                            <td>{items.stock}</td>
                                            <td>{items.cgst}</td>
                                            <td>{items.sgst}</td>
                                            <td>{items.cgstPerItem}</td>
                                            <td>{items.sgstPerItem}</td>
                                            <td>{items.PurchasingPrice}</td>
                                            <td>{items.totalGST}</td>
                                            <td>{items.pricewithoutgst}</td>
                                            {/* <td>
                                                <Button className='table-btn'
                                                    variant="light" onClick={(e) => { deleteData(items._id) }} value={"Delete"}
                                                >
                                                    <span className='delete-icon'>&#x2717;</span>Delete
                                                </Button>
                                            </td>  */}
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

export default Purchasetransaction;
