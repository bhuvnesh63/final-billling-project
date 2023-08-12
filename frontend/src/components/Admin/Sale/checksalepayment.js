
import React, { useEffect, useState } from 'react';
import { Button, Container, Row, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AiFillDashboard } from 'react-icons/ai';
import { IoIosCreate } from 'react-icons/io';
import Layout from '../../Header/Layout';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const SaleUrl = 'http://localhost:4000/api/v1/salebydate';

const SaleListPayment = () => {
    const [getsale, setSale] = useState(null);
    const [searchInput, setSearchInput] = useState('');
    const [filteredSaleOrders, setFilteredSaleOrders] = useState([]);
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [grandTotal, setGrandTotal] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(SaleUrl).then((response) => {
            setSale(response.data);

            const totalAmount = response.data.sale.reduce((total, saleorder) => total + saleorder.totalAmount, 0);
            setGrandTotal(totalAmount);
        });
    }, []);

    const handleSearch = (id) => {
        // console.log(id)
        axios.get(`http://localhost:4000/api/v1/salesbydate/${startDate}/${endDate}`).then(response => {
            setSale(response.data)


            const totalAmount = response.data.sale.reduce((total, saleorder) => total + saleorder.totalAmount, 0);
            setGrandTotal(totalAmount);


            // alert("Item has been deleted successfully")
            toast.success("item Fetched Succesfully")
        })
            .catch(error => {
                console.log(error)
            })

    }


    //   



    if (!getsale) return null;

    return (
        <>
            <Layout />

            <Container className="main-col">
                <Row>

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
                                        <span className='date-button'>
                                            Start Date :-
                                            <input
                                                type='date'
                                                value={startDate}
                                                className='date-input'
                                                onChange={(event) => { setStartDate(event.target.value) }}

                                            />
                                        </span>


                                        <span className='date-button'>
                                            End Date :-
                                            <input
                                                type='date'
                                                value={endDate}
                                                className='date-input'
                                                onChange={(event) => { setEndDate(event.target.value) }}
                                            />
                                        </span>

                                        <Button className='table-btn' variant="success" onClick={handleSearch} >
                                            Filter
                                        </Button>



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
                <Row>
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
                                 
                                    <th>Action View</th>
                                  
                                </tr>
                            </thead>
                            <tbody>

                                {getsale?.sale?.map((saleorder, index) => (
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
                                            <Link
                                                to={`/billing/${saleorder._id}?invoiceNumber=${index + 1}`}
                                            >
                                                <Button className="table-btn" variant="success">
                                                    &#128065; View
                                                </Button>
                                            </Link>
                                        </td>
                                    
                                    </tr>
                                ))
                                }
                            </tbody>
                        </table>

                    </Table>

                    <div class="col-md-4 position-relative">
                            <label className="label grand-total">Grand Total :-</label>
                            <input
                            type="text"
                            value={grandTotal}
                            readOnly
                            placeholder='total-aomunt'
                            className="grand-total-input"
                        />
                        </div>
                </Row>
            </Container>

        </>
    );
};

export default SaleListPayment;
