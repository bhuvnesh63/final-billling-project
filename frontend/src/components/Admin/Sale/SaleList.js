
import React, { useEffect, useState } from 'react';
import { Button, Container, Row, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AiFillDashboard } from 'react-icons/ai';
import { IoIosCreate } from 'react-icons/io';
import Layout from '../../Header/Layout';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify';

const SaleUrl = 'http://localhost:4000/api/v1/saleorders';

const SaleList = () => {
  const [getsale, setSale] = useState(null);
  const [searchInput, setSearchInput] = useState('');
  const [filteredSaleOrders, setFilteredSaleOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(SaleUrl).then((response) => {
      setSale(response.data);

      if (searchInput.trim() !== '') {
        const filteredOrders = response.data.saleorders.filter((order) =>
          order.customerName.toLowerCase().includes(searchInput.toLowerCase())
        );
        setFilteredSaleOrders(filteredOrders);
      } else {
        setFilteredSaleOrders(response.data.saleorders);
      }
    });
  }, [searchInput]);

  const deleteData = (id) => {
    axios
      .delete(`http://localhost:4000/api/v1/saleorder/${id}`)
      .then((response) => {
        // alert("Item has been deleted successfully")
        toast.success("Order deleted Succesfully")
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (!getsale) return null;

  return (
    <>
      <Layout />
      <Container className="main-col">
        <Table striped bordered hover className="main-table">
          <thead>
            <tr>
              <th>
                <h5>
                  <AiFillDashboard /> &nbsp; Dashboard/ Sale
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
                    <Button
                      className="table-btn"
                      variant="success"
                      onClick={() => navigate('/sale')}
                    >
                      <IoIosCreate />
                      &nbsp; New Sale
                    </Button>

                    <Button
                      className="table-btn totalsale"
                      variant="success"
                      onClick={() => navigate('/checksalepayment')}
                    >
                      <IoIosCreate />
                      &nbsp; Check Total Sale
                    </Button>

                    <span className='search-bar'> Search
                      <input
                        className='input-search'
                        type="text"
                        placeholder="Search by customer name"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                      />
                    </span>
                    <Button
                      className="table-btn float-end"
                      variant="success"
                      onClick={() => navigate('/salehistory')}
                    >
                      <IoIosCreate />
                      &nbsp; Check Sale History
                    </Button>
                  </div>
                </th>
              </tr>
            </thead>
          </Table>
        </Row>

        <Table responsive>
          <table className="table table-bordered border-secondary">
            <thead>
              <tr>
                <th>Serial Number</th>
                <th>Customer Name</th>
                <th>Mobile No</th>
                <th>Total Amount</th>
                <th>Payable Amount</th>
                <th>Remaining Amount</th>
                <th>Item Name</th>
                <th>Action Edit</th>
                <th>Action View</th>
                <th>Action Delete</th>
              </tr>
            </thead>
            <tbody>
              {filteredSaleOrders.length === 0 ? (
                <tr>
                  <td colSpan="10" className="text-center">
                    No customers found for the given search criteria.
                  </td>
                </tr>
              ) : (
                
                  filteredSaleOrders.map((saleorder, index) => (
                    <tr key={saleorder._id}>
                      <td>{index + 1}</td>
                      <td>{saleorder.customerName}</td>
                      <td>{saleorder.mobileNumber}</td>
                      <td>{saleorder.totalAmount}</td>
                      <td>{saleorder.payableAmount}</td>
                      <td>{saleorder.remainingAmount}</td>
                      <td>
                        {saleorder.Items.map((item, itemIndex) => (
                          <span key={item._id}>
                            {item.itemName}
                            {itemIndex !== saleorder.Items.length - 1 ? ', ' : ''}
                          </span>
                        ))}
                      </td>
                      <td>
                        <Link to={`/editsale/${saleorder._id}`}>
                          <Button className="table-btn" variant="success">
                            &#128065; Edit
                          </Button>
                        </Link>
                      </td>
                      <td>
                        <Link
                          to={`/billing/${saleorder._id}?invoiceNumber=${index + 1}`}
                        >
                          <Button className="table-btn" variant="success">
                            &#128065; View
                          </Button>
                        </Link>
                      </td>
                      <td>
                        <Button
                          className="table-btn"
                          variant="success"
                          onClick={() => deleteData(saleorder._id)}
                        >
                          <span className="delete-icon">&#x2717;</span> Delete
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
            </tbody>
          </table>
        </Table>
      </Container>

    </>
  );
};

export default SaleList;
