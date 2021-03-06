import React from 'react';
import {NavLink} from 'react-router-dom';
import { Form, Row, Col} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {withRouter} from "react-router";
import * as actionCreators from "../store/actions";
import {connect} from "react-redux";

class WasherEdit extends React.Component {
	constructor(props) {
		super(props);
		this.onChangeName = this.onChangeName.bind(this);
		this.onChangeHash = this.onChangeHash.bind(this);
		this.onChangeModel = this.onChangeModel.bind(this);
		this.updateWasher = this.updateWasher.bind(this);

		this.state = {
			id: null,
			name: "",
			hash: "",
			model: ""
		};
	}

	componentDidMount() {
		const id = this.props.match.params.id;
		this.props.getWashers(id).then(()=> {
			this.setState({
				name: this.props.washer.name,
				hash: this.props.washer.hash,
				model: this.props.washer.model,
			});
		})
	}

	onChangeName(e) {
		this.setState({
			name: e.target.value
		});
	}
	
	onChangeModel(e) {
		this.setState({
			model: e.target.value
		});
	}

	onChangeHash(e) {
		this.setState({
			hash: e.target.value
		});
	}

	updateWasher() {
		const id = this.props.match.params.id;

		let data = {
			name: this.state.name,
			model: this.state.model,
			hash: this.state.hash
		};

		this.props.updateWasher(id, data).then(()=> {
			this.props.getWashers().then(()=> {
				this.props.history.push('/');
			})
		})
	}

	render() {
		return (
			<div>
				<h1 className="mb-5">Edit washing machine</h1>
				<Form className="mb-5">
					<Form.Group as={Row} controlId="formHorizontalName">
						<Form.Label column sm={2}>
							Name
						</Form.Label>
						<Col sm={10}>
							<Form.Control onChange={this.onChangeName}
							              className="mb-2"
							              value={this.state.name}
							              placeholder="Name"/>
						</Col>
					</Form.Group>

					<Form.Group as={Row} controlId="formHorizontalHash">
						<Form.Label column sm={2}>
							Hash
						</Form.Label>
						<Col sm={10}>
							<Form.Control onChange={this.onChangeHash}
							              className="mb-2"
							              value={this.state.hash}
							              placeholder="Hash"/>
						</Col>
					</Form.Group>

					<Form.Group as={Row} controlId="formHorizontalModel">
						<Form.Label column sm={2}>
							Model
						</Form.Label>
						<Col sm={10}>
							<Form.Control onChange={this.onChangeModel}
							              className="mb-2"
							              value={this.state.model}
							              placeholder="Model"/>
						</Col>
					</Form.Group>
				</Form>
				<NavLink className="mr-5" to={'/'}>
					<Button variant="outline-secondary"> Cancel </Button>
				</NavLink>

				<Button onClick={this.updateWasher} variant="outline-success">
					Update
				</Button>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	washer: state.washer.washer,
});

const mapDispatchToProps = dispatch => ({
	updateWasher: (id, data) => dispatch(actionCreators.updateWasher(id, data)),
	getWashers: () => dispatch(actionCreators.getWashers()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(WasherEdit));