import React, { useEffect, useState } from 'react'
import Layout from '../../Header/Layout'
import { Button, Col, Container, Row, Table } from 'react-bootstrap'
import { Link, useParams, useLocation } from 'react-router-dom';
import { AiFillDashboard } from 'react-icons/ai'
import { IoIosCreate } from "react-icons/io";
// import "../../Billing/billing.css"
import axios from 'axios';
import Form from 'react-bootstrap/Form';
// import './gstbill.css';
import { useNavigate } from 'react-router-dom'

const GSTUnitBilling = () => {
    const params = useParams();
    const location = useLocation();


    const navigate = useNavigate();
    const [gstunitorder, setGstunitorder] = useState();
    // const [grandTotal, setGrandTotal] = useState(0);



    // const calculateTotalPrice = () => {
    //     if (!gstunitorder) return 0;
    //     return gstunitorder.Items.reduce((total, item) => total + item.totalPrice, 0);
    // };




    useEffect(() => {
        axios.get(`http://localhost:4000/api/v1/gstunitorder/${params.id}`)
            .then((response) => {
                setGstunitorder(response.data.gstunitorder);
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
  

    if (!gstunitorder) return <div>Loading...</div>;

    const { name, phoneNumber, address, email, gstNumber, totalAmount, payableAmount, remainingAmount, createdDate, Items } = gstunitorder;

    const grandTotal = Items.reduce((total, item) => total + item.grandTotal, 0);
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

                                    </div>
                                </th>
                            </tr>
                        </thead>
                    </Table>
                </Row>
            </Container >



            <Row>
                <Col sm={12}>
                    <div id="print-bill">


                        <h5 className='gst' >GSTIN : 09IILPS7478M1ZU </h5>
                        <div className='text-center mb-5'>
                            <h4>TAX INVOICE</h4>
                            <h3>M/S V K ENTERPRISES</h3>
                            <p>149, 0, Hanuman Nagar Near S.s.m School Linepar Majhola <br />
                                Pachimi, Moradabad, Moradabad, Uttar Pradesh, 244001<br />
                                Phone Number :- 8979836747<br />
                               <span> GSTIN : 09IILPS7478M1ZU </span>
                            </p>
                        </div>

                        <Container fluid>
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
                                    <div className='shiped-border'>
                                        <p className='text-bold' >Shipped to :</p>
                                        <p>Customer Name : <span>{name}</span></p>
                                        <p>Mobile Number : <span>{phoneNumber}</span></p>
                                        <p>Address : <span>{address}</span></p>
                                        <p>Email: <span>{email}</span></p>
                                        <p>GST Number: <span>{gstNumber}</span></p>


                                    </div>

                                </Col>
                                <Col sm={12} >
                                    <Table responsive className='bill-table '>
                                        <table class="table table-bordered border-secondary">
                                            <thead>
                                                <tr className='bill-table'>
                                                    {/* <th>S.N.</th> */}
                                                    <th className='pt-5 mt-4'  >Item Name</th>
                                                    <th>Amount without GST</th>
                                                    <th>CGST in ₹</th>
                                                    <th>SGST in ₹</th>
                                                    <th>Price per item</th>
                                                    <th>Unit Name</th>
                                                    <th>Pcs to Sale</th>
                                                    <th>Pcs with Quantity</th>
                                                  
                                                  
                                                    <th>Quantity</th>
                                                    <th>Amount</th>
                                                    <th>Discount in %</th>
                                                    <th>Discount in ₹</th>
                                                    
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

                                                        <td>{item.unit}</td>
                                                        
                                                        <td>{item.pcsToSale}</td>
                                                        <td>{item.pcswithQuantity}</td>
                                                       
                                                       
                                                        <td>{item.quantity}</td>
                                                        <td>{item.price}</td>
                                                        <td>{item.discountInPercentage}</td>
                                                        <td>{item.discountInRupess}</td>
                                                      
                                                        <td>{item.totalPrice}</td>
                                                    </tr>
                                                ))}
                                            </tbody>

                                        </table>
                                    </Table>
                                    <div className='total-bill'>
                                        <p>Total Amount: <span className='float-end total'>{totalAmount}</span></p>
                                        <p>Payable Amount : <span className='float-end total'>{payableAmount}</span></p>
                                        <p>Remaining Amount : <span className='float-end total'>{remainingAmount}</span></p>
                                    </div>
                                </Col>
                                <Col sm={12}>
                                    <div className='bank-details'>
                                        <p className='text-bold'>Bank Details : </p>
                                        <p  > BANK NAME :<span> PUNJAB NATIONAL BANK </span>    <span className='bank-detail'>IFSC : </span><span>PUNB0027872 A/C NO.54789654785158458 </span> </p>

                                    </div>
                                </Col>
                           
                            </Row>
                            {/* <Button variant="primary" onClick={handlePrint}>
                            Print Bill
                        </Button> */}
                        </Container>

                    </div>
                </Col >
            </Row >
            <br /> <br />
        </>
    )
}

export default GSTUnitBilling;
