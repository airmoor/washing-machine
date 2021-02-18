import React from 'react';
import {Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {NavLink} from 'react-router-dom';
import {withRouter} from "react-router";
import * as actionCreators from "../store/actions";
import {connect} from "react-redux";

class WasherCreate extends React.Component {
	constructor(props) {
		super(props);
		this.onChangeName = this.onChangeName.bind(this);
		this.onChangeHash = this.onChangeHash.bind(this);
		this.onChangeModel = this.onChangeModel.bind(this);
		this.createWasher = this.createWasher.bind(this);

		this.state = {
			id: null,
			name: "",
			hash: "",
			model: "",
			validated:false,
		};
	}

	onChangeName(e) {
		this.setState({
			name: e.target.value
		});
	}

	onChangeHash(e) {
		this.setState({
			hash: e.target.value
		});
	}

	onChangeModel(e) {
		this.setState({
			model: e.target.value
		});
	}

	createWasher() {
		let data = {
			name: this.state.name,
			hash: this.state.hash,
			model: this.state.model,
		};
		this.props.createWasher(data)
			.then(()=> {
				this.props.history.push('/');
			})
	}

	render() {
		return (
			<div>
				<h1 className="mb-5">New washing machine</h1>
				<Form className="mb-5">
					<Form.Label htmlFor="inlineFormInput" srOnly>
						Name
					</Form.Label>
					<Form.Control onChange={this.onChangeName}
					              className="mb-2"
					              value={this.state.name}
					              placeholder="Name"
					/>

					<Form.Label htmlFor="inlineFormInput" srOnly>
						Hash
					</Form.Label>
					<Form.Control onChange={this.onChangeHash}
					              className="mb-2"
					              value={this.state.hash}
					              placeholder="Hash"
					/>

					<Form.Label htmlFor="inlineFormInput" srOnly>
						Model
					</Form.Label>
					<Form.Control onChange={this.onChangeModel}
					              className="mb-2"
					              value={this.state.model}
					              placeholder="Model"
					/>
				</Form>

				<NavLink className="mr-5" to={'/'}>
					<Button variant="light"> Cancel </Button>
				</NavLink>

				<Button onClick={this.createWasher} variant="success">
					Create
				</Button>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	washer: state.washer.washer,
});

const mapDispatchToProps = dispatch => ({
	createWasher: (data) => dispatch(actionCreators.createWasher(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(WasherCreate));