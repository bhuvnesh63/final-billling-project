import React, { useEffect, useState } from 'react'
import Layout from '../../Header/Layout'
import { Button, Container, Row, Table } from 'react-bootstrap'
import { Form, Link, useNavigate } from 'react-router-dom'
import { AiFillDashboard, AiFillDelete, AiFillEdit, AiFillSetting } from 'react-icons/ai';
import { IoIosCreate } from 'react-icons/io';
import axios from 'axios';
import './additem.css';
import { toast } from 'react-toastify';

const Additem = () => {


  const [itemName, setitemName] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [totalamount, setTotalamount] = useState("");
  const [stock, setStock] = useState("");
  const [cgst, setCgst] = useState("");
  const [sgst, setSgst] = useState("");
  const [PurchasingPrice, setPurchasingPrice] = useState("");
  const [cgstPerItem, setCgstPerItem] = useState("");
  const [sgstPerItem, setSgstPerItem] = useState("");
  const [totalGST, setTotalGST] = useState("");
  const [pricewithoutgst, setPricewithoutgst] = useState("");
  const [createdDate, setCreatedDate]=useState("");


  const navigate = useNavigate();

  const calculateValues = () => {
    
    setCgstPerItem((cgst / stock).toFixed(2));
    setSgstPerItem((sgst / stock).toFixed(2));
    setPurchasingPrice((totalamount / stock).toFixed(2));

    const totalGSTAmount = (parseFloat(cgstPerItem) + parseFloat(sgstPerItem)).toFixed(2);
    setTotalGST(totalGSTAmount);

    const pricewithoutgst = (parseFloat(sellingPrice) - parseFloat(totalGST)).toFixed(2);
    setPricewithoutgst(pricewithoutgst);

  };

  useEffect(() => {
    calculateValues();
  }, [cgstPerItem, sellingPrice, sgstPerItem, totalGST]);


  const handleCalculate = () => {
    calculateValues();
  };


  const submitform = async (event) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:4000/api/v1/item/new", {
        "createdDate":createdDate,
        "itemName": itemName,
        "sellingPrice": sellingPrice,
        "totalamount": totalamount,
        "stock": stock,
        "cgst": cgst,
        "sgst": sgst,
        "cgstPerItem": cgstPerItem,
        "sgstPerItem": sgstPerItem,
        "PurchasingPrice": PurchasingPrice,
        "totalGST": totalGST,
        "pricewithoutgst": pricewithoutgst,



      })
      toast.success("Item Add Successfully");
      navigate("/itemlist");

    } catch (error) {
      console.log(error.response);

    }
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
                  <AiFillDashboard /> &nbsp;Dasboard / Add Item
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
                  
                    <Button className="table-btn" variant="success" onClick={()=> navigate("/itemlist")} >
                      <IoIosCreate />&nbsp;
                       Check Item List
                    </Button>

                    <Button className="table-btn float-end" variant="success" onClick={()=> navigate("/purchasehistory")} >
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


      <div className="form-div">
        <h5 className="w3-center w3-flat-midnight-blue w3-padding-48 w3-border-blue-grey w3-grey text text-center mb-5 mt-3">Add Item </h5>
        <Container>
          <Row>
            <form className="row g-4 p-3 registration-form">
              <div class="col-md-4 position-relative">
                <label className="label">Item Name</label>
                <input
                  type="text"
                  class="form-control"
                  value={itemName}
                  onChange={(e) => setitemName(e.target.value)}
                  required
                />
              </div>

              <div class="col-md-4 position-relative">
                <label className="label">MRP </label>
                <input
                  type="number"
                  class="form-control"
                  value={sellingPrice}
                  onChange={(e) => setSellingPrice(e.target.value)}
                  required
                />
              </div>
              <div class="col-md-4 position-relative">
                <label className="label">Stock</label>
                <input
                  type="number"
                  class="form-control"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  required
                />
              </div>
              <div class="col-md-4 position-relative">
                <label className="label">CGST in ₹</label>
                <input
                  type="number"
                  class="form-control"
                  value={cgst}
                  onChange={(e) => setCgst(e.target.value)}
                  required
                />
              </div>
              <div class="col-md-4 position-relative">
                <label className="label">SGST in ₹</label>
                <input
                  type="number"
                  class="form-control"
                  value={sgst}
                  onChange={(e) => setSgst(e.target.value)}
                  required
                />
              </div>

              <div class="col-md-4 position-relative">
                <label className="label">Total Amount</label>
                <input
                  type="number"
                  class="form-control"
                  value={totalamount}
                  onChange={(e) => setTotalamount(e.target.value)}
                  required
                />
              </div>



              <div class="col-md-4 position-relative">
                <label className="label">CGST Per Item</label>
                <input
                  type="number"
                  class="form-control"
                  value={cgstPerItem}
                  required
                />
              </div>
              <div class="col-md-4 position-relative">
                <label className="label">SGST Per item</label>
                <input
                  type="number"
                  class="form-control"
                  value={sgstPerItem}
                  required
                />
              </div>
              <div class="col-md-4 position-relative">
                <label className="label">Total GST</label>
                <input
                  type="number"
                  class="form-control"
                  value={totalGST}
                  required
                />
              </div>

              <div class="col-md-4 position-relative">
                <label className="label">Purchase Price</label>
                <input
                  type="number"
                  class="form-control"
                  value={PurchasingPrice}
                  required
                />
              </div>

              <div class="col-md-4 position-relative">
                <label className="label">Price without GST</label>
                <input
                  type="number"
                  class="form-control"
                  value={pricewithoutgst}
                  required
                />
              </div>
              <span className='note'>Note:<h6 className='note-text'> Please Calculate the remaning value by clicking on the calculate button</h6></span >
              <center>
                <Button
                  className="stu_btn"
                  variant="success"
                  type="submit"
                  onClick={(event) => submitform(event)}
                >
                  Submit
                </Button>
                <Button
                  className="cal-stu_btn"
                  variant="success"
                  onClick={handleCalculate}
                >
                  Calculate
                </Button>
              </center>
            </form>
          </Row>
        </Container>
      </div>


    </>

  )
}

export default Additem
