import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Row, Table, Button } from 'react-bootstrap';
import { AiFillDashboard} from 'react-icons/ai';
import { IoIosCreate } from 'react-icons/io';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Layout from '../../Header/Layout';
import './additem.css';
import { toast } from 'react-toastify';

const EditItem = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [specificItem, setSpecificItem] = useState({});
  const [itemName, setitemName] = useState('');
  const [sellingPrice, setSellingPrice] = useState('');
  const [totalamount, setTotalamount] = useState('');
  const [stock, setStock] = useState('');
  const [cgst, setCgst] = useState('');
  const [sgst, setSgst] = useState('');
  const [cgstPerItem, setCgstPerItem] = useState('');
  const [sgstPerItem, setSgstPerItem] = useState('');
  const [PurchasingPrice, setPurchasingPrice] = useState('');
  const [pricewithoutgst, setPricewithoutgst] = useState('');
  const [totalGST, setTotalGST] = useState('');

  const calculateValues = () => {
    setCgstPerItem((parseFloat(cgst) / parseFloat(stock)).toFixed(2));
    setSgstPerItem((parseFloat(sgst) / parseFloat(stock)).toFixed(2));
    setPurchasingPrice((parseFloat(totalamount) / parseFloat(stock)).toFixed(2));
  };

  useEffect(() => {
    axios.get(`http://localhost:4000/api/v1/item/${params.id}`).then((response) => {
      setSpecificItem(response.data.item);
      setitemName(response.data.item.itemName);
      setSellingPrice(response.data.item.sellingPrice);
      setTotalamount(response.data.item.totalamount);
      setStock(response.data.item.stock);
      setCgst(response.data.item.cgst);
      setSgst(response.data.item.sgst);
      setCgstPerItem(response.data.item.cgstPerItem);
      setSgstPerItem(response.data.item.sgstPerItem);
      setPurchasingPrice(response.data.item.PurchasingPrice);
      setPricewithoutgst(response.data.item.pricewithoutgst);
      setTotalGST(response.data.item.totalGST);
      calculateValues();
    });
  }, [params.id]);

  const submitform = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`http://localhost:4000/api/v1/item/${params.id}`, {
        itemName,
        sellingPrice,
        totalamount,
        stock,
        cgst,
        sgst,
        cgstPerItem,
        sgstPerItem,
        PurchasingPrice,
        pricewithoutgst,
        totalGST,
      });
      navigate('/itemlist');
      toast.success("Item Update Successfully");
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <>
      <Layout />
      <Container style={{ width: '90%', marginTop: '20px' }}>
        <Table striped bordered hover className="main-table">
          <thead>
            <tr>
              <th>
                <h5>
                  <AiFillDashboard /> &nbsp;Dashboard / Edit Item
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
          <hr />
        </Row>
      </Container>
      {/* form section start */}
      <div className="form-div">
        <Container>
          <Row>
            <form className="row g-4 p-3 registration-form">
              <div className="col-md-4 position-relative">
                <label className="label">Item Name</label>
                <input type="text" className="form-control" value={itemName} onChange={(e) => setitemName(e.target.value)} required />
              </div>
              <div className="col-md-4 position-relative">
                <label className="label">MRP</label>
                <input type="number" className="form-control" value={sellingPrice} onChange={(e) => setSellingPrice(e.target.value)} required />
              </div>
              <div className="col-md-4 position-relative">
                <label className="label">Total Amount</label>
                <input type="number" className="form-control" value={totalamount} onChange={(e) => setTotalamount(e.target.value)} required />
              </div>
              <div className="col-md-4 position-relative">
                <label className="label">Stock</label>
                <input type="number" className="form-control" value={stock} onChange={(e) => setStock(e.target.value)} required />
              </div>
              <div className="col-md-4 position-relative">
                <label className="label">CGST</label>
                <input type="number" className="form-control" value={cgst} onChange={(e) => setCgst(e.target.value)} required />
              </div>
              <div className="col-md-4 position-relative">
                <label className="label">SGST</label>
                <input type="number" className="form-control" value={sgst} onChange={(e) => setSgst(e.target.value)} required />
              </div>
       
              <div className="col-md-4 position-relative">
                <label className="label">CGST Per Item</label>
                <input type="number" className="form-control" value={cgstPerItem} onChange={(e) => setCgstPerItem(e.target.value)} required />
              </div>
              <div className="col-md-4 position-relative">
                <label className="label">SGST Per item</label>
                <input type="number" className="form-control" value={sgstPerItem} onChange={(e) => setSgstPerItem(e.target.value)} required />
              </div>
              <div className="col-md-4 position-relative">
                <label className="label">Purchase Price</label>
                <input type="number" className="form-control" value={PurchasingPrice} onChange={(e) => setPurchasingPrice(e.target.value)} required />
              </div>
              <div className="col-md-4 position-relative">
                <label className="label">Total GST</label>
                <input type="number" className="form-control" value={totalGST} onChange={(e) => setTotalGST(e.target.value)} required />
              </div>
              <div className="col-md-4 position-relative">
                <label className="label">Amount Without GST</label>
                <input type="number" className="form-control" value={pricewithoutgst} onChange={(e) => setPricewithoutgst(e.target.value)} required />
              </div>
              <center>
                <Button className="stu_btn" variant="success" type="submit" onClick={(event) => submitform(event)}>
                  Update Item
                </Button>
                <Button className="cal-stu_btn" variant="success" onClick={calculateValues}>
                  Calculate
                </Button>
              </center>
            </form>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default EditItem;
