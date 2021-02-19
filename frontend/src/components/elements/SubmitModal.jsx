import {Modal, Button, Card} from "react-bootstrap";
import React from "react";
import {timeFormat} from "../../services/utils";

function SubmitModal(props) {
	return (
		<Modal className={'modal-custom'}
			{...props}
			size="md"
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>
			<Modal.Body  style={{ borderRadius: '16px' }}>
				<Modal.Header closeButton >
					<Modal.Title>
						{props.modalData.modalText}
					</Modal.Title>
				</Modal.Header>

				{
					props.modalData.mode &&
					<Modal.Body>
						<h4>{props.modalData.mode.name}</h4>
						<div>
							{props.modalData.mode.temperature}°
						</div>
						<div>
							{props.modalData.mode.spinSpeed} spin speed
						</div>
						<div className="mb-4">
							{timeFormat(props.modalData.mode.duration)}
						</div>
					</Modal.Body>
				}

				<Modal.Footer>
					<Button variant="outline-secondary" onClick={props.onHide}>Close</Button>
					{
						props.modalData.withSubmit &&
						<Button variant="outline-success" onClick={props.onSubmit}>Submit</Button>
					}

				</Modal.Footer>
			</Modal.Body>

		</Modal>
	);
}

export default SubmitModal;