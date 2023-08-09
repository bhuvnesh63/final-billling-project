import React, { useEffect, useState } from 'react'
import Layout from '../../../Header/Layout'
import { Button, Col, Container, Row, Table } from 'react-bootstrap'
import { Link, useParams, useLocation } from 'react-router-dom';
import { AiFillDashboard } from 'react-icons/ai'
import { IoIosCreate } from "react-icons/io";
import "../../Billing/billing.css"
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import './gstbill.css';
import { useNavigate } from 'react-router-dom'

const GSTBilling = () => {
    const params = useParams();
    const location = useLocation();
   

    const navigate= useNavigate();
    const [order, setOrder] = useState();
    const [discountPercentage, setDiscountPercentage] = useState(0);
    const [grandTotal, setGrandTotal] = useState(0);



    const calculateTotalPrice = () => {
        if (!order) return 0;
        return order.Items.reduce((total, item) => total + item.totalPrice, 0);
    };


    useEffect(() => {
        const totalPrice = calculateTotalPrice();
        const discountAmount = (totalPrice * discountPercentage) / 100;
        const calculatedGrandTotal = totalPrice - discountAmount;
        setGrandTotal(calculatedGrandTotal);

    }, [discountPercentage]);

    const handleDiscountChange = (event) => {
        const selectedDiscount = parseInt(event.target.value);
        setDiscountPercentage(selectedDiscount);
    };

    useEffect(() => {
        axios.get(`http://localhost:4000/api/v1/gstorder/${params.id}`)
            .then((response) => {
                setOrder(response.data.order);
            })
            .catch((error) => {
                console.log('Error fetching data:', error);
            });
    }, [params.id]);

    const handlePrint = () => {
        const printContent = document.getElementById('print-bill');
        const originalContent = document.body.innerHTML;

        document.body.innerHTML = printContent.innerHTML;
        window.print();
        document.body.innerHTML = originalContent;

    };
    // const getCurrentDate = () => {
    //     const currentDate = new Date();
    //     const day = currentDate.getDate();
    //     const month = currentDate.getMonth() + 1;
    //     const year = currentDate.getFullYear();
    //     return `${day}-${month < 10 ? '0' : ''}${month}-${year} `;


    // };

    if (!order) return <div>Loading...</div>;

    const { name, phoneNumber, address, email, gstNumber, createdDate, Items } = order;

    return (
        <>
            <Layout />
            <Container className='mt-4' >
                <Table striped bordered hover >
                    <thead>
                        <tr>
                            <th>

                                <h5>
                                    <AiFillDashboard /> &nbsp; Dashboard/ Single Bill
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
                                        {/* <Button className="table-btn" variant="light">
                                            <IoIosCreate />&nbsp;<Link to="/gstsale">Create</Link>
                                        </Button> */}


                                        <Button className="table-btn" variant="success" onClick={() => navigate("/gstsale")} >
                                            <IoIosCreate />&nbsp;
                                           New Sale
                                        </Button>
                                        <Button variant="success" className='float-end' onClick={handlePrint}>
                                            Print Bill
                                        </Button>

                                        <Col className='dropdown-select'>

                                            <Form.Group controlId="discountSelect " className='dropdown'>
                                                <Form.Label className='label'>Select Discount :</Form.Label>

                                                <Form.Control as="select" value={discountPercentage} onChange={handleDiscountChange}>
                                                    <option value={0}>No Discount</option>
                                                    <option value={5}>5%</option>
                                                    <option value={10}>10%</option>
                                                    <option value={15}>15%</option>
                                                </Form.Control>
                                            </Form.Group>
                                        </Col>
                                    </div>
                                </th>
                            </tr>
                        </thead>
                    </Table>
                </Row>
            </Container >


            <>

                <div className="form-div" id="print-bill">


                    <h5 className='gst' >GSTIN : 09IILPS7478M1ZU </h5>
                    <div className='text-center'>
                        <h4>TAX INVOICE</h4>
                        <h3>M/S V K ENTERPRISES</h3>
                        <p>149, 0, Hanuman Nagar Near S.s.m School Linepar Majhola <br />
                            Pachimi, Moradabad, Moradabad, Uttar Pradesh, 244001<br />
                        </p>
                    </div>

                    <Container>
                        <Row>
                            <Col sm={12}>

                                <div className='billing-border'>
                                    <p>Invoice No : <span>{new URLSearchParams(location.search).get("invoiceNumber")}</span></p>
                                    <p>Dated : <span> {createdDate}</span></p>

                                </div>

                            </Col>

                            {/* <Col sm={6}>

                                <div className='bill-border'>
                                    <p>Place of Supply : <span>  Uttar Pradesh (09)</span></p>
                                    <p>Reverse Charge : <span>  N</span></p>

                                </div>

                            </Col> */}

                            <Col sm={6}>

                                <div className='billing-border'>
                                    <p className='text-bold' >Billed to :</p>
                                    <p>Customer Name : <span>{name}</span></p>
                                    <p>Mobile Number : <span>{phoneNumber}</span></p>
                                    <p>Address : <span>{address}</span></p>
                                    <p>Email: <span>{email}</span></p>
                                    <p>GST Number: <span>{gstNumber}</span></p>



                                </div>

                            </Col>

                            <Col sm={6}>
                                <div className='bill-border'>
                                    <p className='text-bold' >Shipped to :</p>
                                    <p>Customer Name : <span>{name}</span></p>
                                    <p>Mobile Number : <span>{phoneNumber}</span></p>
                                    <p>Address : <span>{address}</span></p>
                                    <p>Email: <span>{email}</span></p>
                                    <p>GST Number: <span>{gstNumber}</span></p>


                                </div>

                            </Col>

                            <Table responsive className='gst-table '>
                                <table class="table table-bordered border-secondary pt-4">
                                    <thead>
                                        <tr >
                                            {/* <th>S.N.</th> */}
                                            <th className='pt-4' >Item Name</th>
                                            <th>Amount without GST</th>
                                            <th>CGST Applied</th>
                                            <th>SGST Applied</th>
                                            <th>Price per item</th>
                                            <th>Quantity</th>
                                            <th>Total price</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {Items?.map((item) => (
                                            <tr key={item._id}>
                                                <td>{item.itemName}</td>
                                                <td>{item.amountWithoutGST}</td>
                                                <td>{item.cgstapplied}</td>
                                                <td>{item.sgstapplied}</td>
                                                <td>{item.pricePerItem}</td>
                                                <td>{item.quantity}</td>
                                                <td>{item.totalPrice}</td>
                                            </tr>
                                        ))}
                                    </tbody>

                                </table>
                                <div className='gst-bill'>
                                    <p>Total : <span className='float-end total'>{calculateTotalPrice()}</span></p>

                                    <p>Discount in %: <span className='float-end'>{discountPercentage}%</span></p>
                                    <p>Discount in Price : <span className='float-end'>{(calculateTotalPrice() * (discountPercentage / 100)).toFixed(2)}</span></p>
                                    <p>Discounted Price : <span className='float-end'>{grandTotal.toFixed(2)}</span></p>
                                </div>
                            </Table>
                            <div className='gst-details'>
                                <p className='text-bold'>Bank Details : </p>
                                <p  > BANK NAME :<span> PUNJAB NATIONAL BANK </span> </p>
                                <p >  IFSC : <span>PUNB0027872 A/C NO.54789654785158458 </span> </p>
                            </div>
                            <div className='gst-details'>
                                <h5>Terms & Conditions</h5>
                                <p>E.& O.E.</p>
                                <p>1. Goods once sold will not be taken back.</p>
                                <p>2.Interest @ 18% p.a will be changed if the payment<br />
                                    is not made with in the Stipulated time. </p>
                                <p>3. Subject to 'Uttar Pradesh' Jurisdiction only.</p>
                            </div>
                        </Row>
                        {/* <Button variant="primary" onClick={handlePrint}>
                            Print Bill
                        </Button> */}
                    </Container>

                </div>
            </>
            <br /> <br />
        </>
    )
}

export default GSTBilling;
