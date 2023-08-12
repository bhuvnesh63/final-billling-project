import React, { useEffect, useState } from 'react'
import Layout from '../../Header/Layout'
import { Button, Container, Row, Table } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { AiFillDashboard } from 'react-icons/ai'
import { IoIosCreate } from "react-icons/io";
import axios from 'axios';
import { toast } from 'react-toastify';



const AccountUrl = "http://localhost:4000/api/v1/allgstsales"


const GstTotalSaleList = () => {

    const navigate = useNavigate();
    const [gstSaleList, setGstSaleList] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [grandTotal, setGrandTotal] = useState(0);

    useEffect(() => {
        axios.get(AccountUrl).then((response) => {
            setGstSaleList(response.data)
            const totalAmount = response.data.orders.reduce((total, items) => total + items.totalAmount, 0).toFixed(2);
            setGrandTotal(totalAmount);
            console.log(response)
        })
    }, [])

    const handleSearch = (id) => {
        // console.log(id)
        axios.get(`http://localhost:4000/api/v1/allgstsalebydate/${startDate}/${endDate}`).then(response => {
            setGstSaleList(response.data)


            const totalAmount = response.data.orders.reduce((total, items) => total + items.totalAmount, 0).toFixed(2);
            setGrandTotal(totalAmount);


            // alert("Item has been deleted successfully")
            toast.success("item Fetched Succesfully")
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
                                        <th>Total Amount</th>

                                        <th>View Bill </th>



                                    </tr>
                                </thead>
                                <tbody>
                                    

                                        {gstSaleList?.orders?.map((items, index) => (
                                            <tr key={items._id}>
                                                <td>{index + 1}</td>
                                                <td>{items.name}</td>
                                                <td>{items.phoneNumber}</td>
                                                <td>{items.email}</td>
                                                <td>{items.address}</td>
                                                <td>{items.gstNumber}</td>
                                                <td>{items.totalAmount}</td>
                                                <td>
                                                    <Link to={`/gstbill/${items._id}?invoiceNumber=${index + 1}`}>
                                                        <Button className='table-btn'
                                                            variant="success" >
                                                            &#128065;View</Button>
                                                    </Link>
                                                </td>




                                            </tr>


                                        ))
                                    }
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

export default GstTotalSaleList
