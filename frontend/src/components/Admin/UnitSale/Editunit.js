import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Row, Table, Button } from 'react-bootstrap';
import { AiFillDashboard } from 'react-icons/ai';
import { IoIosCreate } from 'react-icons/io';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Layout from '../../Header/Layout';
import './addunit.css';
import { toast } from 'react-toastify';

const EditUnit = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [specificItem, setSpecificItem] = useState({});

    const [unitName, setUnitName] = useState("");
    const [pieceInUnit, setPieceInUnit] = useState("");



    useEffect(() => {
        axios.get(`http://localhost:4000/api/v1/unit/${params.id}`).then((response) => {
            setSpecificItem(response.data.unit);
      
            setUnitName(response.data.unit.unitName);
            setPieceInUnit(response.data.unit.pieceInUnit);

        });
    }, [params.id]);

    const submitform = async (event) => {
        event.preventDefault();
        try {
            await axios.put(`http://localhost:4000/api/v1/unit/${params.id}`, {
           
                unitName,
                pieceInUnit,
           

            });
            navigate('/unitlist');
            toast.success("Unit Update Successfully");
        } catch (error) {
            console.log(error.response);
        }
    };
// console.log("hero",params.itemName)
    return (
        <>
            <Layout />
            <Container style={{ width: '90%', marginTop: '20px' }}>
                <Table striped bordered hover className="main-table">
                    <thead>
                        <tr>
                            <th>
                                <h5>
                                    <AiFillDashboard /> &nbsp;Dashboard / Edit Unit
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

                                        <Button className="table-btn" variant="success" onClick={() => navigate("/unitlist")} >
                                            <IoIosCreate />&nbsp;
                                            Check Unit List
                                        </Button>

                                        <Button className="table-btn float-end" variant="success" onClick={() => navigate("/unithistory")} >
                                            <IoIosCreate />&nbsp;
                                            Check Unit History
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
                                <label className="label">
                                    Unit Name</label>
                                <input type="text" className="form-control" value={unitName} onChange={(e) => setUnitName(e.target.value)} required />
                            </div>
                            <div className="col-md-4 position-relative">
                                <label className="label">
                                    Piece In Unit</label>
                                <input type="number" className="form-control" value={pieceInUnit} onChange={(e) => setPieceInUnit(e.target.value)} required />
                            </div>
                         

                            <center>
                                <Button className="stu_btn" variant="success" type="submit" onClick={(event) => submitform(event)}>
                                    Update Unit
                                </Button>

                            </center>
                        </form>
                    </Row>
                </Container>
            </div>
        </>
    );
};

export default EditUnit;
