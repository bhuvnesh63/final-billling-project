import React, { useEffect, useState } from 'react'
import Layout from '../../Header/Layout'
import { Button, Container, Row, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { AiFillDashboard } from 'react-icons/ai'
import { IoIosCreate } from "react-icons/io";
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'

const ItemsUrl = "http://localhost:4000/api/v1/itemsbydate"

const CheckTotal = ({ items }) => {
    const [getitems, setGetItems] = useState(null);
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [grandTotal, setGrandTotal] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(ItemsUrl).then((response) => {
            setGetItems(response.data)

            const totalAmount = response.data.itemsbyDate.reduce((total, item) => total + item.totalamount, 0);
            setGrandTotal(totalAmount);
            console.log(response)
        })
    }, [])


    const handleSearch = (id) => {
        // console.log(id)
        axios.get(`http://localhost:4000/api/v1/itembydate/${startDate}/${endDate}`).then(response => {
            setGetItems(response.data)


            const totalAmount = response.data.itemsbyDate.reduce((total, item) => total + item.totalamount, 0);
            setGrandTotal(totalAmount);


            // alert("Item has been deleted successfully")
            toast.success("Item Fetched Succesfully")
        })
            .catch(error => {
                console.log(error)
            })

    }

 

    if (!getitems) return null;
    return (
        <>
            <Layout />
            <Container className='main-col' >
                <Table striped bordered hover className='main-table'>
                    <thead>
                        <tr>
                            <th><h5><AiFillDashboard /> &nbsp; Dashboard/ Check Purchase</h5></th>
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

                                        <Button className="table-btn float-end" variant="success" onClick={() => navigate("/purchasehistory")} >
                                            <IoIosCreate />&nbsp;
                                            Check Purchase History
                                        </Button>

                                    </div>
                                </th>
                            </tr>
                        </thead>
                    </Table>

                </Row>
            </Container>


            <div className='form-div' >
                <h5 className="w3-center w3-flat-midnight-blue w3-padding-48 w3-border-blue-grey w3-grey text text-center mb-5 mt-3">Check Purchase</h5>
                <Container>
                    <Row>




                        <Table responsive>
                            <table class="table table-bordered border-secondary">
                                <thead>
                                    <tr>

                                        <th>Item Name</th>
                                        <th>MRP</th>
                                        <th>Total Amount</th>
                                        <th>Stock</th>
                                        <th>CGST in ₹</th>
                                        <th>SGST in ₹</th>
                                        <th>CGST Amount/pcs</th>
                                        <th>SGST Amount/pcs</th>
                                        <th>Purchase Price</th>
                                        <th>Total GST</th>
                                        <th>Price Without GST</th>
                                     
                                    </tr>
                                </thead>

                                <tbody>
                                    {getitems?.itemsbyDate?.map((items) => (
                                        <tr>

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




                        <div class="col-md-4 position-relative">
                            <label className="label grand-total">Grand Total :-</label>
                            <input
                            type="text"
                            value={grandTotal}
                            readOnly
                            placeholder='total-aomunt'
                            className="grand-total-input"
                        />
                        </div>
                      
                    </Row>
                </Container>

            </div>

        </>
    )
}

export default CheckTotal;
