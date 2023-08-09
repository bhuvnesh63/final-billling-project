import React from "react";
import { Modal, Container, Row, Table, Button } from "react-bootstrap";

const ModalCamp = ({ open, setOpen }) => {

  return (
    <>
      <Modal
        style={{ width: "100%", height: "100%" }}
        show={open}
        onHide={() => setOpen(false)}
        size="small"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>&#128968; &nbsp;Create GST</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <div className='form-div'>
                <h5 className="text-center">GST</h5>
                <Container>
                  <Row>



                    {/* <form className="row g-4 p-3 registration-form">
              <div class="col-md-6 position-relative"> */}
                    <label className="label">GST NO</label>
                    <input
                      type="text"
                      class="form-control"
                    // value={service_Name}
                    // onChange={(e) => setService_Name(e.target.value)}
                    // required
                    />
                    {/* </div>

              </form> */}

                    <center>
                      <Button
                        className="stu_btn mt-3"
                        variant="success"
                        type="submit"
                      // onClick={(event) => submitform(event)} // Pass the event parameter
                      >
                        Submit
                      </Button>
                    </center>



                  </Row>

                </Container>

              </div>


            </Row>
          </Container>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalCamp;
