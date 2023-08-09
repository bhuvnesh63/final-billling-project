import React, { useEffect, useState } from 'react';
import Layout from '../../Header/Layout';
import { Button, Col, Container, Row, Table } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import { AiFillDashboard } from 'react-icons/ai';
import { IoIosCreate } from 'react-icons/io';
import './gstsale.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const ItemsUrl = 'http://localhost:4000/api/v1/items';
const AccountUrl = 'http://localhost:4000/api/v1/accounts';
const GstOrderUrl = 'http://localhost:4000/api/v1/gstorder/new';

const GstSale = () => {
  const [getitems, setGetItems] = useState(null);
  const [getaccounts, setGetAccounts] = useState(null);
  const [customerName, setCustomerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [gstNumber, setGstNumber] = useState('');
  const [items, setItems] = useState([
    {
      _id: '',
      productId: '',
      itemName: '',
      pricewithoutgst: '',
      cgstPerItem: '',
      sgstPerItem: '',
      pricePerItem: '',
      quantity: 1,
      totalPrice: '',
    },
  ]);
  const [selectedPrice, setSelectedPrice] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(ItemsUrl).then((response) => {
      setGetItems(response.data);
      console.log(response, 'list');
    });
  }, []);

  useEffect(() => {
    axios.get(AccountUrl).then((response) => {
      setGetAccounts(response.data);
      console.log(response);
    });
  }, []);

  const increment = (index) => {
    setItems((prevItems) =>
      prevItems.map((item, i) =>
        i === index ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrement = (index) => {
    setItems((prevItems) =>
      prevItems.map((item, i) =>
        i === index ? { ...item, quantity: Math.max(item.quantity - 1, 1) } : item
      )
    );
  };

  const updatePriceWithQuantity = () => {
    setItems((prevItems) =>
      prevItems.map((item) => ({
        ...item,
        totalPrice: (item.pricePerItem * item.quantity).toFixed(2),
        cgstPerItem: (item.initialCgstPerItem * item.quantity).toFixed(2),
        sgstPerItem: (item.initialSgstPerItem * item.quantity).toFixed(2),
        pricewithoutgst: (item.initialamountwithoutgst * item.quantity).toFixed(2),
      }))
    );
  };

  useEffect(() => {
    updatePriceWithQuantity();
  }, [items]);


  const getItemPrice = (selectedItemName, index) => {
    const selectedItemObj = getitems?.items?.find(
      (item) => item.itemName === selectedItemName
    );

    if (selectedItemObj) {
      setItems((prevItems) =>
        prevItems.map((item, i) =>
          i === index
            ? {
              ...item,
              productId: selectedItemObj._id,
              itemName: selectedItemObj.itemName,
              pricePerItem: selectedItemObj.sellingPrice,
              initialCgstPerItem: selectedItemObj.cgstPerItem,
              cgstPerItem: selectedItemObj.cgstPerItem,
              initialSgstPerItem: selectedItemObj.sgstPerItem,
              sgstPerItem: selectedItemObj.sgstPerItem,
              pricewithoutgst: selectedItemObj.pricewithoutgst,
              initialamountwithoutgst: selectedItemObj.pricewithoutgst,
            }
            : item
        )
      );
    }
  };


  const addMoreItems = () => {
    setItems((prevItems) => [
      ...prevItems,
      {
        productId: '',
        itemName: '',
        pricewithoutgst: '',
        cgstPerItem: '',
        sgstPerItem: '',
        pricePerItem: '',
        quantity: 1,
        totalPrice: '',
      },
    ]);
  };

  const submitform = async (event) => {
    event.preventDefault();
    const finalItems = items.filter((item) => item.productId)
    try {
      const saleOrderData = {
        name: customerName,
        phoneNumber: phoneNumber,
        email: email,
        address: address,
        gstNumber: gstNumber,
        Items: finalItems.map((item) => ({
          productId: item.productId,
          itemName: item.itemName,
          pricePerItem: item.pricePerItem,
          quantity: item.quantity.toString(),
          totalPrice: parseFloat(item.totalPrice),
          amountWithoutGST: parseFloat(item.pricewithoutgst),
          cgstapplied: parseFloat(item.cgstPerItem),
          sgstapplied: parseFloat(item.sgstPerItem),
        })),
      };

      await axios.post(GstOrderUrl, saleOrderData);
      toast.success("Order Placed Successfully");
      navigate('/gstsale-list');
    } catch (error) {
      console.log('Error saving sale order data:', error.response);
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
                  <AiFillDashboard /> &nbsp;Dasboard / GST Sale
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
                    <Button className="table-btn" variant="success" onClick={() => navigate("/gstsale-list")} >
                      <IoIosCreate />&nbsp;
                      GST Order List
                    </Button>

                    <Button className="table-btn float-end" variant="success" onClick={()=> navigate("/gstsalehistory")} >
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


      <div className="form-div">
        <Container>
          <Row>
            <form className="row g-4 p-3 registration-form">
              <div className="col-md-4 position-relative">
                <label className="label">Customer name</label>

                <Form.Select
                  onChange={(e) => {
                    setCustomerName(e.target.value);
                    const selectedAccount = getaccounts?.accounts?.find(
                      (account) => account.name === e.target.value
                    );
                    if (selectedAccount) {
                      setPhoneNumber(selectedAccount.phoneNumber);
                      setEmail(selectedAccount.email);
                      setAddress(selectedAccount.address);
                      setGstNumber(selectedAccount.gstNumber);
                    }
                  }}
                >
                  <option>Choose</option>
                  {getaccounts?.accounts?.map((account) => (
                    <option key={account._id}>{account.name}</option>
                  ))}
                </Form.Select>

              </div>

              <div className="col-md-4 position-relative">
                <label className="label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={customerName}
                  readOnly
                />
              </div>

              <div className="col-md-4 position-relative">
                <label className="label">Phone No</label>
                <input
                  type="text"
                  className="form-control"
                  value={phoneNumber}
                  readOnly
                />
              </div>

              <div className="col-md-4 position-relative">
                <label className="label">Email ID</label>
                <input
                  type="text"
                  className="form-control"
                  value={email}
                  readOnly
                />
              </div>

              <div className="col-md-4 position-relative">
                <label className="label">Address</label>
                <input
                  type="text"
                  className="form-control"
                  value={address}
                  readOnly
                />
              </div>

              <div className="col-md-4 mb-5 position-relative">
                <label className="label">GST No</label>
                <input
                  type="text"
                  className="form-control"
                  value={gstNumber}
                  readOnly
                />
              </div>
              <hr></hr>
              <h5>Product Details</h5>

              {items.map((item, index) => (
                <React.Fragment key={index}>
                  <Col sm={2}>
                    <label className="label">Item Name </label>
                    <Form.Select
                      onChange={(e) => {
                        getItemPrice(e.target.value, index);
                      }}
                    >
                      <option>Choose</option>
                      {getitems?.items?.map((item) => (
                        <option key={item._id} value={item.itemName}>
                          {item.itemName}
                        </option>
                      ))}
                    </Form.Select>
                  </Col>

                  <div className="col-md-2 position-relative">
                    <label className="label">Amount without GST</label>
                    <input
                      type="text"
                      className="form-control"
                      value={item.pricewithoutgst}
                      readOnly
                    />
                  </div>

                  <div className="col-md-1 position-relative">
                    <label className="label">CGST</label>
                    <input
                      type="text"
                      className="form-control"
                      value={item.cgstPerItem}
                      readOnly
                    />
                  </div>

                  <div className="col-md-1 position-relative">
                    <label className="label">SGST</label>
                    <input
                      type="text"
                      className="form-control"
                      value={item.sgstPerItem}
                      readOnly
                    />
                  </div>

                  <div className="col-md-2 position-relative">
                    <label className="label">Price per item</label>
                    <input
                      type="text"
                      className="form-control"
                      value={item.pricePerItem}
                      readOnly
                    />
                  </div>

                  <div className="col-md-2 position-relative">
                    <label className="label">Quantity</label>
                    <div className="cart-buttons">
                      <div className="quantity-buttons">
                        <span
                          className="increment-buttons"
                          onClick={() => decrement(index)}
                        >
                          -
                        </span>
                        <span className="increment-buttons">{item.quantity}</span>
                        <span
                          className="increment-buttons"
                          onClick={() => increment(index)}
                        >
                          +
                        </span>
                      </div>
                    </div>
                  </div>

                  <Col sm={2}>
                    <label className="label">Total Price </label>
                    <input
                      type="text"
                      className="form-control"
                      value={item.totalPrice}
                      onChange={(e) => {
                        setItems((prevItems) =>
                          prevItems.map((it, i) =>
                            i === index ? { ...it, totalPrice: e.target.value } : it
                          )
                        );
                      }}
                      required
                    />
                  </Col>
                </React.Fragment>
              ))}

              <center>
                <Button
                  className="float-end"
                  variant="success"
                  type="button"
                  onClick={addMoreItems}
                >
                  Add more
                </Button>
              </center>



              <center>
                <Button
                  className="stu_btn"
                  variant="success"
                  type="submit"
                  onClick={submitform}
                >
                  Submit
                </Button>
              </center>



            </form>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default GstSale;
