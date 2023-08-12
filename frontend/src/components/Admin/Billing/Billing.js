import React, { useEffect, useState } from 'react';
import Layout from '../../Header/Layout';
import { Button, Col, Container, Row, Table } from 'react-bootstrap';
import { Link, useParams, useLocation } from 'react-router-dom';
import { AiFillDashboard } from 'react-icons/ai';
import { IoIosCreate } from 'react-icons/io';
import './billing.css';
import axios from 'axios';
import Form from 'react-bootstrap/Form';

import { useNavigate } from 'react-router-dom'


const Billing = () => {
  const params = useParams();
  const [saleOrder, setSaleOrder] = useState();
  const location = useLocation();
  const navigate = useNavigate();






  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/v1/saleorder/${params.id}`)
      .then((response) => {
        setSaleOrder(response.data.sale);
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



  if (!saleOrder) return <div>Loading...</div>;

  const { customerName, mobileNumber, createdDate, totalAmount, payableAmount, remainingAmount, Items } = saleOrder;


  const grandTotal = Items.reduce((total, item) => total + item.grandTotal, 0);



  return (
    <>
      <Layout />
      <Container className='mt-4'>
        <Table striped bordered hover>
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
                  <div className='table-div'>

                    <Button className="table-btn" variant="success" onClick={() => navigate("/sale")} >
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
      </Container>



      {/* <Container> */}
      <Row>
        <Col sm={12}>
          <div id="print-bill">
            {/* <div className='form-div'> */}
   
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
                    <p>
                      <p>Invoice No : <span>{new URLSearchParams(location.search).get("invoiceNumber")}</span></p>
                    </p>
                    <p>
                      <p>Dated : <span>{createdDate}</span></p>
                    </p>
                  </div>
                </Col>



                <Col sm={6}>
                  <div className='billing-border'>
                    <p className='text-bold'>Billed to :</p>
                    <p>
                      Customer Name : <span>{customerName}</span>
                    </p>
                    <p>
                      Mobile .No : <span>{mobileNumber}</span>
                    </p>
                    {/* <p>Amroha Gate Near Fruit Mandi Moradabad</p>
                      <p className='mb-5'>GSTIN/UIN : 1254789632145</p> */}
                  </div>
                </Col>

                <Col sm={6}>
                  <div className='shiped-border'>
                    <p className='text-bold'>Shipped to :</p>
                    <p>
                      Customer Name : <span>{customerName}</span>
                    </p>
                    <p>
                      Mobile .No : <span>{mobileNumber}</span>
                    </p>
                    {/* <p>Amroha Gate Near Fruit Mandi Moradabad</p>
                      <p className='mb-5'>GSTIN/UIN : 1254789632145</p> */}
                  </div>
                </Col>

                <Col sm={12} >
                  <Table responsive className='bill-table '>
                    <table class="table table-bordered border-secondary">

                      <thead>
                        <tr className='bill-table'>
                          <th className='pt-5 mt-4' >Item Name</th>
                          <th>Price without/GST</th>
                          <th>CGST in ₹</th>
                          <th>SGST in ₹</th>
                          <th>Price per item</th>
                          <th>Discount in %</th>
                          <th>Discount in ₹</th>
                          <th>Quantity</th>
                          <th>Amount</th>
                          <th>Total price</th>
                        </tr>
                      </thead>
                      <tbody>

                        {Items?.map((item) => (
                          <tr key={item._id}>
                            <td >{item.itemName}</td>
                            <td>{item.amountWithoutGST}</td>
                            <td>{item.cgstapplied}</td>
                            <td>{item.sgstapplied}</td>
                            <td>{item.pricePerItem}</td>
                            <td>{item.discountInPercentage}</td>
                            <td>{item.discountInRupess}</td>
                            <td>{item.quantity}</td>
                            <td>{item.totalPrice}</td>
                            <td>{item.grandTotal}</td>
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
            </Container>
          </div>
          {/* </div> */}
        </Col>
      </Row>
      {/* </Container> */}

      <br /> <br />
    </>
  );
};

export default Billing;
