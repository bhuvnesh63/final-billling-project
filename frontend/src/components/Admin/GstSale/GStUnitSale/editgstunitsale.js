import Layout from '../../../Header/Layout';
import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row, Table } from 'react-bootstrap';
import { AiFillDashboard } from 'react-icons/ai';
import { IoIosCreate } from 'react-icons/io';
import { useNavigate, useParams } from 'react-router-dom'; 
import axios from 'axios';
import { toast } from 'react-toastify';


const GstUnitEditSale = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { saleOrderId } = useParams(); 
  const [saleOrderData, setSaleOrderData] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);
  const [remainingAmount, setRemainingAmount] = useState(0);
  const [payableAmount, setPayableAmount] = useState(0);

  useEffect(() => {

    axios.get(`http://localhost:4000/api/v1/gstunitorder/${params.id}`)
      .then(response => {
        setSaleOrderData(response.data.gstunitorder);

        setTotalAmount(response.data.gstunitorder.totalAmount);
        setRemainingAmount(response.data.gstunitorder.remainingAmount); 
        setPayableAmount(response.data.gstunitorder.payableAmount);
      })
      .catch(error => {
        console.error('Error fetching sale order details:', error);
      });
  }, [saleOrderId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const updatedSaleOrder = { ...saleOrderData };
    updatedSaleOrder.remainingAmount = remainingAmount;
    updatedSaleOrder.payableAmount = payableAmount;

    try {

      await axios.put(`http://localhost:4000/api/v1/gstunitorder/${params.id}`, updatedSaleOrder);

    } catch (error) {
      console.error('Error updating sale order:', error);
    }
    navigate('/sale');
    toast.success("Payment Update Successfully");
  };

  if (!saleOrderData) {
    return <div>Loading...</div>;
  }


  return (
    <>
      <Layout />
      <Container style={{ width: '90%', marginTop: '20px' }}>
        <Table striped bordered hover className="main-table">
          <thead>
            <tr>
              <th>
                <h5>
                  <AiFillDashboard /> &nbsp;Dashboard / Edit Payment
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

                    <Button className="table-btn" variant="success" onClick={() => navigate("/itemlist")} >
                      <IoIosCreate />&nbsp;
                      Check Item List
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
          <hr />
        </Row>
      </Container>

      <div className="form-div">
        <Container className="mt-4">
  
          <form className="row g-4 p-3 registration-form" onSubmit={handleSubmit} >
            <div className="col-md-4 position-relative">
              <label className="label">Total Amount</label>
              <input
                type="text"
                className="form-control"
                value={totalAmount}
                readOnly
              />
            </div>
            <div className="col-md-4 position-relative">
              <label className="label">Payable Amount</label>
              <input
                type="number"
                className="form-control"
                value={payableAmount}
                onChange={(e) => {
                  const newPayableAmount = parseFloat(e.target.value);
                  const newRemainingAmount = totalAmount - newPayableAmount;
                  setPayableAmount(newPayableAmount);
                  setRemainingAmount(newRemainingAmount);
                }}
                required
              />
            </div>
            <div className="col-md-4 position-relative">
              <label className="label">Remaining Amount</label>
              <input
                type="number"
                className="form-control"
                value={remainingAmount}
                readOnly
              />
            </div>


            <center>
              <Button className="stu_btn" variant="success" type="submit">
                Update
              </Button>
            </center>
          </form>
        </Container>


      </div>
    </>
  );
};

export default GstUnitEditSale;
