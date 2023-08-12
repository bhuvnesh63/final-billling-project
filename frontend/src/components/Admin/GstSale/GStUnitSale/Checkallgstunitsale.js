import React, { useEffect, useState } from 'react'
import { Button, Container, Row, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { AiFillDashboard } from 'react-icons/ai'
import { IoIosCreate } from "react-icons/io";
import Layout from '../../../Header/Layout';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const SaleUrl = "http://localhost:4000/api/v1/allgstunitssales"


const CheckTotalGstBagSaleList = () => {
    const [getsale, setSale] = useState(null);
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [grandTotal, setGrandTotal] = useState(0);

    const navigate = useNavigate();
    useEffect(() => {
        axios.get(SaleUrl).then((response) => {
            setSale(response.data)
            const totalAmount = response.data.GStUnitorders.reduce((total, items) => total + items.totalAmount, 0).toFixed(2);
            setGrandTotal(totalAmount);

            console.log(response, "sale-list")
        })
    }, [])


    const handleSearch = (id) => {
        // console.log(id)
        axios.get(`http://localhost:4000/api/v1/allunitgstsalebydate/${startDate}/${endDate}`).then(response => {
            setSale(response.data)


            const totalAmount = response.data.GStUnitorders.reduce((total, items) => total + items.totalAmount, 0).toFixed(2);
            setGrandTotal(totalAmount);


            // alert("Item has been deleted successfully")
            toast.success("Sale Fetched Succesfully")
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
                            <th><h5><AiFillDashboard /> &nbsp; Dashboard/ ALl GST Sale</h5></th>
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

                                        <Button className="table-btn float-end" variant="success" onClick={() => navigate("/unitsalehistory")} >
                                            <IoIosCreate />&nbsp;
                                            Check Unit Sale History
                                        </Button>

                                    </div>
                                </th>
                            </tr>
                        </thead>
                    </Table>

                </Row>
            </Container>


            <div className='form-div' >
                <h5 className="w3-center w3-flat-midnight-blue w3-padding-48 w3-border-blue-grey w3-grey text text-center mb-5 mt-3">GST Sale</h5>
                <Container>
                    <Row>
                        <Table responsive>
                            <table class="table table-bordered border-secondary">
                                <thead>
                                    <tr>
                                        <th>Serial Number</th>
                                        <th>Create Date</th>
                                        <th>Customer Name</th>
                                        <th>Mobile No</th>
                                        <th>Item Name</th>
                                        <th>Total Amount</th>
                                        <th>Payable Amount</th>
                                        <th>Remaining Amount</th>

                        
                                        <th>Action View</th>
                              


                                    </tr>
                                </thead>
                                <tbody>


                                    {getsale.GStUnitorders.map((saleOrder, index) => (
                                        <tr key={saleOrder._id}>
                                            <td>{index + 1}</td>
                                            <td>{saleOrder.createdDate}</td>
                                            <td>{saleOrder.name}</td>
                                            <td>{saleOrder.phoneNumber}</td>
                                            <td>
                                                {saleOrder.Items.map((item, itemIndex) => (
                                                    <span key={item._id}>
                                                        {item.itemName}
                                                        {itemIndex !== saleOrder.Items.length - 1 ? ', ' : ''}
                                                    </span>
                                                ))}
                                            </td>

                                            <td>{saleOrder.totalAmount}</td>
                                            <td>{saleOrder.payableAmount}</td>
                                            <td>{saleOrder.remainingAmount}</td>


                                            <td>
                                                <Link to={`/gstunitbilling/${saleOrder._id}?invoiceNumber=${index + 1}`}>
                                                    <Button className='table-btn' variant="success">&#128065; View</Button>
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

export default CheckTotalGstBagSaleList;
