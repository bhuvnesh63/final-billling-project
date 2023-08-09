import React, { useEffect, useState } from 'react';
import Layout from '../../Header/Layout';
import { Button, Col, Container, Row, Table } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import { AiFillDashboard, AiFillQqCircle } from 'react-icons/ai';
import { IoIosCreate } from 'react-icons/io';
import './sale.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const ItemsUrl = 'http://localhost:4000/api/v1/items';
const UnitsURL = 'http://localhost:4000/api/v1/units';
const SaleOrderUrl = 'http://localhost:4000/api/v1/bagsaleorder/new';

const Sale = () => {
  const [getitems, setGetItems] = useState(null);
  const [getunits, setGetUnits] = useState(null);
  const [customerName, setCustomerName] = useState('');
  const [unitName, setUnitName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [pieceInUnit, setPieceInUnit] = useState('');
  // const [ratePerUnit, setRatePerUnit] = useState('');
  // const [pcstoSale, setPcsToSale] = useState('')
  const [pcswithQuantity, setPcsWithQuantity] = useState('')
  const [price, setPrice] = useState('');
  const [discountInPercentage, setDiscountInPercentage] = useState("");
  const [discountInRupess, setDiscountInRupess] = useState("");
  const [items, setItems] = useState([
    {
      productId: '',
      itemName: '',
      stock: '',
      discountInPercentage: '',
      discountInRupess: '',
      pricewithoutgst: '',
      cgstPerItem: '',
      sgstPerItem: '',
      pricePerItem: '',
      quantity: 0,
      totalPrice: '',
      grandTotal: '',
    },
  ]);

  // const [selectedPrice, setSelectedPrice] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(ItemsUrl).then((response) => {
      setGetItems(response.data);
      console.log(response, 'list');
    });
  }, []);

  useEffect(() => {
    axios.get(UnitsURL).then((response) => {
      setGetUnits(response.data);
      console.log(response);
    });
  }, []);


  const increment = (index) => {
    const newQuantity = items[index].quantity + 1;

    const pcsToSale = parseFloat(items[index].pcstoSale);
    const newPcsWithQuantity = pcsToSale * newQuantity;

    setItems((prevItems) =>
      prevItems.map((item, i) =>
        i === index
          ? {
            ...item,
            quantity: newQuantity,
            pcswithQuantity: newPcsWithQuantity,
          }
          : item
      )
    );
  };

  const decrement = (index) => {
    const newQuantity = items[index].quantity - 1;
    if (newQuantity >= 0) {
      const pcsToSale = parseFloat(items[index].pcstoSale);
      const newPcsWithQuantity = pcsToSale * newQuantity;

      setItems((prevItems) =>
        prevItems.map((item, i) =>
          i === index
            ? {
              ...item,
              quantity: newQuantity,
              pcswithQuantity: newPcsWithQuantity,
            }
            : item
        )
      );
    }
  };


  const updatePriceWithQuantity = () => {
    setItems((prevItems) =>
      prevItems.map((item) => ({
        ...item,
        price: (item.pcswithQuantity * item.pricePerItem).toFixed(2),
        discountInRupess: (item.price * item.discountInPercentage / 100),
        grandTotal: (item.price - item.discountInRupess).toFixed(2),
      }))
    );
  };

  useEffect(() => {
    updatePriceWithQuantity();
  }, [items]);

  // console.log("deep",price)

  const getItemPrice = (selectedItemName, index) => {
    if (!selectedItemName) {

      setItems((prevItems) =>
        prevItems.map((item, i) =>
          i === index
            ? {
              ...item,
              productId: '',
              pricePerItem: '',
              stock: '',
              // discountInPercentage:'',
              // discountInRupess:'',
              initialCgstPerItem: '',
              cgstPerItem: '',
              initialSgstPerItem: '',
              sgstPerItem: '',
              pricewithoutgst: '',
              initialamountwithoutgst: '',
            }
            : item
        )
      );
      return;
    }

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
              pricePerItem: selectedItemObj.sellingPrice,
              stock: selectedItemObj.stock,
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
        stock: '',
        discountInPercentage: '',
        discountInRupess: '',
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
    // console.log("deepanshu",items)rs
    const finalItems = items.filter((item) => item.productId)
    try {
      const saleOrderData = {
        customerName: customerName,
        mobileNumber: mobileNumber,
        Items: finalItems.map((item) => ({
          productId: item.productId,
          itemName: item.itemName,
          pricePerItem: item.pricePerItem,
          pcsToSale: item.pcstoSale, // Passing pcsToSale value here
          pcswithQuantity: item.pcswithQuantity,
          unit: unitName,
          discountInPercentage: item.discountInPercentage,
          discountInRupess: item.discountInRupess,
          price: item.price,
          quantity: item.quantity.toString(),
          totalPrice: parseFloat(item.grandTotal),
          amountWithoutGST: parseFloat(item.pricewithoutgst),
          cgstapplied: parseFloat(item.cgstPerItem),
          sgstapplied: parseFloat(item.sgstPerItem),

        })),
      };

      await axios.post(SaleOrderUrl, saleOrderData);
      navigate('/billlist');
      toast.success("Order Placed Successfully");
    } catch (error) {
      console.log('Error saving sale order data:', error.response);
    }
  };

  return (
    <>
      <Layout />
      <Container className="mt-4">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>
                <h5>
                  <AiFillDashboard /> &nbsp;Dashboard / Add Sale
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
                  <div>
                    {/* <Button className="table-btn" variant="light">
                    <IoIosCreate />
                    &nbsp;
                    <Link to="/salelist">Go Back</Link>
                  </Button> */}

                    <Button className="table-btn" variant="success" onClick={() => navigate("/salelist")} >
                      <IoIosCreate />&nbsp;
                      Check Sale List
                    </Button>

                    <Button className="table-btn" variant="success" onClick={() => navigate("/unitalelist")} >
                      <IoIosCreate />&nbsp;
                      Unit Sale List
                    </Button>

                    <Button className="table-btn" variant="success" onClick={() => navigate("/addunit")} >
                      <IoIosCreate />&nbsp;
                      Add New
                    </Button>

                    <Button className="table-btn float-end" variant="success" onClick={() => navigate("/salehistory")} >
                      <IoIosCreate />&nbsp;
                      Check Sale History
                    </Button>
                  </div>
                </th>
              </tr>
            </thead>
          </Table>
        </Row>
      </Container>

      <div className="form-div">
        <h5 className="w3-center w3-flat-midnight-blue w3-padding-48 w3-border-blue-grey w3-grey text text-center mb-5 mt-3">New Sale</h5>

        <Container >
          <Row>
            <form className="row g-4 p-3 registration-form">
              <div className="col-md-4 position-relative">
                <label className="label">Customer Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  required
                />
              </div>

              <div className="col-md-4 mb-5 position-relative">
                <label className="label">Mobile No</label>
                <input
                  type="text"
                  className="form-control"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  required
                />
              </div>

              <hr></hr>

              <h5>Product Details</h5>

              {items.map((item, index) => (
                <React.Fragment key={index}>
                  <Col sm={2}>
                    <label className="label">Item Name</label>
                    <Form.Select
                      onChange={(e) => {
                        setItems((prevItems) =>
                          prevItems.map((it, i) =>
                            i === index ? { ...it, itemName: e.target.value } : it
                          )
                        );
                        getItemPrice(e.target.value, index);
                      }}
                    >
                      <option>Choose</option>
                      {getitems?.items?.map((items) => (
                        <option key={items._id} value={items.itemName}>
                          {items.itemName}
                        </option>
                      ))}
                    </Form.Select>
                  </Col>
                  <div className="col-md-2 position-relative">
                    <label className="label">Total Stock</label>
                    <input
                      type="text"
                      className="form-control"
                      value={item.stock}
                      readOnly
                    />
                  </div>

                  <div className="col-md-2 position-relative">
                    <label className="label">Price Without GST/item</label>
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
                    <label className="label">Pcs/Unit</label>
                    <input
                      type="text"
                      className="form-control"
                      value={pieceInUnit}
                      readOnly
                    />
                  </div>




                  {/* <div className="col-md-2 position-relative">
                    <label className="label">Pcs to Sale</label>
                    <input
                      type="number"
                      className="form-control"
                      value={pcstoSale}
                      onChange={(e) => setPcsToSale(e.target.value)}

                    />
                  </div>
                  <div className="col-md-2 position-relative">
                    <label className="label">Pcs with quantity</label>
                    <input
                      type="number"
                      className="form-control"
                      // value={pcswithQuantity}
                      // onChange={(e) => setPcsWithQuantity(e.target.value)}

                    />
                  </div> */}
                  <div className="col-md-2 position-relative">
                    <label className="label">Pcs to Sale</label>
                    <input
                      type="number"
                      className="form-control"
                      value={item.pcstoSale}
                      onChange={(e) => {

                        const newItems = [...items];
                        newItems[index].pcstoSale = e.target.value;
                        setItems(newItems);


                        const pcsToSale = parseFloat(e.target.value);
                        const newPcsWithQuantity = pcsToSale * item.quantity;
                        setPcsWithQuantity(newPcsWithQuantity);
                      }}
                    />
                  </div>
                  <div className="col-md-2 position-relative">
                    <label className="label">Pcs with quantity</label>
                    <input
                      type="number"
                      className="form-control"
                      value={item.pcswithQuantity}
                      readOnly
                    />
                  </div>



                  <div className="col-md-2 position-relative">
                    <label className="label">Unit</label>
                    <Form.Select
                      onChange={(e) => {
                        setUnitName(e.target.value);
                        const selectedUnit = getunits?.units?.find(
                          (unit) => unit.unitName === e.target.value
                        );
                        if (selectedUnit) {
                          setPieceInUnit(selectedUnit.pieceInUnit);
                          // setRatePerUnit(selectedUnit.ratePerUnit);
                          // setAddress(selectedUnit.address);
                          // setGstNumber(selectedUnit.gstNumber);
                        }
                      }}
                    >
                      <option>Choose</option>
                      {getunits?.units?.map((unit) => (
                        <option key={unit._id}>{unit.unitName}</option>
                      ))}
                    </Form.Select>
                  </div>




                  <div className="col-md-2 position-relative">
                    <label className="label">Discount in %</label>
                    <input
                      type="number"
                      className="form-control"
                      value={item.discountInPercentage}
                      onChange={(e) => {
                        const newItems = [...items];
                        newItems[index].discountInPercentage = e.target.value;
                        setItems(newItems);
                      }}
                    />
                  </div>

                  <div className="col-md-2 position-relative">
                    <label className="label">Discount in ₹</label>
                    <input
                      type="number"
                      className="form-control"
                      value={item.discountInRupess}

                    />
                  </div>


                  <div className="col-md-2 4position-relative">
                    <label className="label">Quantity of Bag</label>
                    <div className="cart-buttons">
                      <div className="quantity-buttons">
                        <span
                          className="increment-buttons"
                          onClick={() => decrement(index)}
                        >
                          -
                        </span>
                        <span className="increment-buttons">
                          {item.quantity}
                        </span>
                        <span
                          className="increment-buttons"
                          onClick={() => {
                            increment(index);

                            // Calculate "Pcs with quantity" and update the state
                            // const pcsToSale = parseFloat(item.pcstoSale);
                            // const newPcsWithQuantity = pcsToSale * (item.quantity + 1);
                            // const newItems = [...items];
                            // newItems[index].quantity += 1;
                            // newItems[index].pcswithQuantity = newPcsWithQuantity;
                            // setItems(newItems);
                          }}
                        >
                          +
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-2 position-relative">
                    <label className="label">Price</label>
                    <input
                      type="number"
                      className="form-control"
                      value={item.price}

                    />
                  </div>
                  <Col sm={2}>
                    <label className="label">Grand total</label>
                    <input
                      type="text"
                      className="form-control"
                      value={item.grandTotal}
                      onChange={(e) => {
                        setItems((prevItems) =>
                          prevItems.map((it, i) =>
                            i === index ? { ...it, grandTotal: e.target.value } : it
                          )
                        );
                      }}
                      required
                    />
                  </Col>
                </React.Fragment>
              ))}


              <center>
                <Button className="float-end" variant="success" type="button" onClick={addMoreItems}>
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

export default Sale;
