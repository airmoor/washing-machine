import React from 'react';
import Button from 'react-bootstrap/Button';
import {Col, Form, Row} from "react-bootstrap";
import {withRouter} from "react-router";
import {NavLink} from "react-router-dom";
import * as actionCreators from "../store/actions";
import {connect} from "react-redux";

class ModeEdit extends React.Component {

	constructor(props) {
		super(props);
		this.onChangeName = this.onChangeName.bind(this);
		this.onChangeDuration = this.onChangeDuration.bind(this);
		this.onChangeTemperature = this.onChangeTemperature.bind(this);
		this.onChangeSpinSpeed = this.onChangeSpinSpeed.bind(this);
		this.updateMode = this.updateMode.bind(this);
		this.getMode = this.getMode.bind(this);
		this.deleteMode = this.deleteMode.bind(this)

		this.state = {
			id: null,
			name: "",
			temperature: "",
			duration: "",
			spinSpeed: '',
			validated: false
		};
	}

	componentDidMount() {
		this.getMode();
	}

	getMode() {
		const id = this.props.match.params.id;

		this.props.getMode(id).then(() => {
			this.setState({
				id: this.props.mode.id,
				name: this.props.mode.name,
				duration: this.props.mode.duration,
				temperature: this.props.mode.temperature,
				spinSpeed: this.props.mode.spinSpeed,
			});
		})
	}

	onChangeName(e) {
		this.setState({
			name: e.target.value
		});
	}

	onChangeDuration(e) {
		this.setState({
			duration: e.target.value
		});
	}

	onChangeTemperature(e) {
		this.setState({
			temperature: e.target.value
		});
	}

	onChangeSpinSpeed(e) {
		this.setState({
			spinSpeed: e.target.value
		});
	}

	validate() {
		if (this.state.name &&
			this.state.duration &&
			this.state.spinSpeed &&
			this.state.temperature &&
			typeof (this.state.duration === 'Number') &&
			typeof (this.state.spinSpeed === 'Number') &&
			typeof (this.state.temperature === 'Number') ) return true;
		else return false;
	}

	deleteMode() {
		const id = this.state.id;
		this.props.deleteMode(id)
			.then(() => {
				this.props.getModes().then(() => {
					this.props.history.goBack();
				})
			})
	}

	updateMode() {
		const id = this.props.match.params.id;
		let data = {
			name: this.state.name,
			duration: this.state.duration,
			spinSpeed: this.state.spinSpeed,
			model: this.state.model,
			temperature: this.state.temperature,
		};

		this.props.updateMode(id, data)
			.then(() => {
				this.props.getMode().then(() => {
					this.props.history.goBack();
				})
			})
	}

	render() {
		return (
			<div className="pa-5">
				<h1 className="mb-5"> Edit mode </h1>
				<Form className="mb-5" noValidate validated={this.state.validated}>
					<Form.Group as={Row} >
						<Form.Label column sm={2} >
							Mode name
						</Form.Label>
						<Col sm={10}>
						<Form.Control
							required
							className="mb-2"
							value={this.state.name}
							onChange={this.onChangeName}
							placeholder="Mode name"
						/>
						</Col>
					</Form.Group>

					<Form.Group as={Row} >
						<Form.Label column sm={2} >
							Duration, min
						</Form.Label>
						<Col sm={10}>
						<Form.Control
							required
							className="mb-2"
							type="number"
							onChange={this.onChangeDuration}
							value={this.state.duration}
							placeholder="Mode duration"
						/>
						</Col>
					</Form.Group>
					<Form.Group as={Row} >
						<Form.Label column sm={2}>
							Spin Speed
						</Form.Label>
						<Col sm={10}>
						<Form.Control
							required
							onChange={this.onChangeSpinSpeed}
							className="mb-2"
							type="number"
							value={this.state.spinSpeed}
							placeholder="SpinSpeed"
						/>
						</Col>
					</Form.Group>

					<Form.Group  as={Row}>
						<Form.Label column sm={2}>
							Temperature
						</Form.Label>
						<Col sm={10}>
						<Form.Control
							required
							onChange={this.onChangeTemperature}
							className="mb-2"
							value={this.state.temperature}
							type="number"
							placeholder="temperature"
						/>
						<Form.Control.Feedback type="invalid">
							Temperature should be a Number
						</Form.Control.Feedback>
						</Col>
					</Form.Group>
				</Form>

				<NavLink className="mr-3" to={'/washer/' + this.props.match.params.id}>
					<Button variant="outline-secondary"> Cancel </Button>
				</NavLink>

				<Button className="mr-3" onClick={this.updateMode} variant="outline-success">
					Update mode
				</Button>

				<Button onClick={this.deleteMode} variant="outline-danger">
					Delete mode
				</Button>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	mode: state.mode.mode,
});

const mapDispatchToProps = dispatch => ({
	deleteMode: (id) => dispatch(actionCreators.deleteMode(id)),
	updateMode: (id, data) => dispatch(actionCreators.updateMode(id, data)),
	getMode: (id) => dispatch(actionCreators.getMode(id)),
	getModes: () => dispatch(actionCreators.getModes()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ModeEdit));