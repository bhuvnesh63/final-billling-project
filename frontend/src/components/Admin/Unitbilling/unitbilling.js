import React, { useEffect, useState } from 'react';
import Layout from '../../Header/Layout';
import { Button, Col, Container, Row, Table } from 'react-bootstrap';
import { Link, useParams, useLocation } from 'react-router-dom';
import { AiFillDashboard } from 'react-icons/ai';
import { IoIosCreate } from 'react-icons/io';
// import './billing.css';
import axios from 'axios';
import Form from 'react-bootstrap/Form';

import { useNavigate } from 'react-router-dom'


const UnitBilling = () => {
  const params = useParams();
  const [bagsale, setBagsale] = useState();
  const location = useLocation();
  const navigate = useNavigate();



  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/v1/bagsaleorder/${params.id}`)
      .then((response) => {
        setBagsale(response.data.bagsale);
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
  console.log("deep",bagsale)


  if (!bagsale) return <div>Loading...</div>;

  const { customerName, mobileNumber, createdDate, Items } = bagsale;


  const grandTotal = Items.reduce((total, item) => total + item.totalPrice, 0);



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

      <Container>
        <Row>
          <Col sm={12}>
            <div className='form-div' id="print-bill">
              {/* <div className='form-div'> */}
              <h5 className='gst'>GSTIN : 09IILPS7478M1ZU </h5>
              <div className='text-center'>
                <h4>TAX INVOICE</h4>
                <h3>M/S V K ENTERPRISES</h3>
                <p>
                  149, 0, Hanuman Nagar Near S.s.m School Linepar Majhola
                  <br />
                  Pachimi, Moradabad, Moradabad, Uttar Pradesh, 244001
                  <br />
                </p>
              </div>

              <Container>
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
                    <div className='bill-border'>
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
                            <th className='pt-4' >Item Name</th>
                            <th>Price without/GST</th>
                            <th>CGST in ₹</th>
                            <th>SGST in ₹</th>
                            <th>Price per item</th> 
                            <th>Unit Name</th>
                            <th>Pcs to Sale</th>
                            <th>Pcs with quantity</th>   




                            <th>Quantity of Unit</th>
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

                    <p>Grand Total : <span className='float-end total'>{grandTotal}</span></p>
                    
                    </div>
                  </Col>

                  <Col sm={12}>
                    <div className='bank-details'>
                      <p className='text-bold'>Bank Details : </p>
                      <p>
                        BANK NAME :<span> PUNJAB NATIONAL BANK </span>
                      </p>
                      <p>
                        IFSC : <span>PUNB0027872 A/C NO.54789654785158458 </span>
                      </p>
                    </div>
                  </Col>

                  <Col sm={12}>
                    <div className='bank-details'>
                      <h5>Terms & Conditions</h5>
                      <p>E.& O.E.</p>
                      <p>1. Goods once sold will not be taken back.</p>
                      <p>
                        2. Interest @ 18% p.a will be charged if the payment
                        <br />
                        is not made within the Stipulated time.
                      </p>
                      <p>3. Subject to 'Uttar Pradesh' Jurisdiction only.</p>
                    </div>
                  </Col>
                </Row>
              </Container>
            </div>
            {/* </div> */}
          </Col>
        </Row>
      </Container>

      <br /> <br />
    </>
  );
};

export default UnitBilling;
