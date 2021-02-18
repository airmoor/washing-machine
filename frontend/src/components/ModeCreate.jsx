import React from 'react';
import {Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {NavLink} from 'react-router-dom';
import {withRouter} from "react-router";
import * as actionCreators from "../store/actions";
import {connect} from "react-redux";

class ModeCreate extends React.Component {
	constructor(props) {
		super(props);
		this.onChangeName = this.onChangeName.bind(this);
		this.onChangeDuration = this.onChangeDuration.bind(this);
		this.onChangeTemperature = this.onChangeTemperature.bind(this);
		this.onChangeSpinSpeed = this.onChangeSpinSpeed.bind(this);
		this.saveMode = this.saveMode.bind(this);

		this.state = {
			id: null,
			name: "",
			temperature: "",
			duration: "",
			spinSpeed: '',
			validated: false
		};
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
			typeof (this.state.duration === 'Number') ) return true;
		else return false;
	}

	saveMode() {
		this.setState({
			validated: true
		});

		if (!this.validate()) return;

		let data = {
			name: this.state.name,
			temperature:this.state.temperature,
			duration: this.state.duration,
			spinSpeed: this.state.spinSpeed,
		};

		this.props.createMode(data)
			.then(()=> {
				this.props.history.goBack();
			})
	}

	render() {
		return (
			<div>
				<h1> New washing mode </h1>
				<Form noValidate validated={this.state.validated}>
					<Form.Group>
						<Form.Label htmlFor="inlineFormInput" srOnly>
							Mode name
						</Form.Label>
						<Form.Control
							required
							className="mb-2"
							value={this.state.name}
							onChange={this.onChangeName}
							placeholder="Mode name"
						/>
					</Form.Group>

					<Form.Group>
						<Form.Label htmlFor="inlineFormInput" srOnly>
							Mode duration
						</Form.Label>
						<Form.Control
							required
							className="mb-2"
							type="number"
							onChange={this.onChangeDuration}
							value={this.state.duration}
							placeholder="Mode duration"
						/>
					</Form.Group>
					<Form.Group>
						<Form.Label htmlFor="inlineFormInput" srOnly>
							Mode SpinSpeed
						</Form.Label>

						<Form.Control
							required
							onChange={this.onChangeSpinSpeed}
							className="mb-2"
							type="number"
							value={this.state.spinSpeed}
							placeholder="SpinSpeed"
						/>
					</Form.Group>

					<Form.Group>
						<Form.Label htmlFor="inlineFormInput" srOnly>
							Temperature
						</Form.Label>
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
					</Form.Group>

					<NavLink className="mr-5" to={'/washer/' + this.props.match.params.id}>
						<Button variant="light"> Cancel </Button>
					</NavLink>

					<Button onClick={this.saveMode} variant="success">
						Create
					</Button>
				</Form>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	mode: state.mode.mode,
});

const mapDispatchToProps = dispatch => ({
	createMode: (data) => dispatch(actionCreators.createMode(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ModeCreate));