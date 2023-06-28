import React from "react";
import { Modal, Form } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const BillModal=({
  showBillModal,
  setShowBillModal,
  data
})=> {
    let navigate=useNavigate();

    const handleClose=()=>{
      axios.delete(`http://localhost:9000/parkingDetails/deleteParkingSlot/${data.parkId}`, {
        "headers": {
            "content-type": "application/json",
  
        }, }).then(function (response)
        {
           if (response.status === 200) {
            setShowBillModal(false);
            navigate('/dashboard');
            alert("parking left successfully");
          }
          else{
            setShowBillModal(false);
            navigate('/payment');
           alert("parking left successfully,try again");
          }
        })
       
    }

    console.log('Modal is getting called', showBillModal)
  return (
<Modal
      show={showBillModal}
      onHide={() => setShowBillModal(false)}
    style={{position:'absolute'}}
      centered
    >
      <Modal.Header className="confirmBoxHeader">
        Bill Generated
        <button
          type="button"
          class="close"
          aria-label="Close"
          onClick={() => setShowBillModal(false)}
        >
          x
        </button>
      </Modal.Header>

      <Modal.Body style={{ paddingTop: "10px", paddingBottom: "0px" }}>
      <div>  
        <li>Park ID : {data?.parkId || ""}</li>

        <li>Vehicle Type: {data?.parkingType || ""}</li>

        <li>Entry Time: {data?.entryTime || ""}</li>

        <li>Hourly Charge:{data?.hourlyCharge || ""}</li>

        <li>Payment Id : {data?.paymentId || ""}</li>

        <li>Payment Type : {data?.paymentType || ""}</li>

        <li>Amount: {data?.amount || ""}</li>

        <li>TotalHour: {data?.totalHour || "0"}</li>

      </div>
        <Form>
          <div class="col-md-12 text-center">
            <button
              type="button"
              style={{ fontFamily: "Calibri" }}
              class="btn btn-primary btn-sm"
              onClick={handleClose}
            >
              Thank you
            </button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>    
  );

}

export default BillModal;