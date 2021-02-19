import React from 'react';
import {NavLink} from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import * as actionCreators from "../../store/actions";
import {connect} from "react-redux";
import {withRouter} from "react-router";

class WasherCard extends React.Component {

	constructor(props) {
		super(props);
		// this.deleteWasher = this.deleteWasher.bind(this);
		this.redirectToWasher = this.redirectToWasher.bind(this)
		this.state = {
			washer: this.props.washer
		};
	}

	// deleteWasher() {
	// 	const id = this.state.washer.id;
	// 	this.props.deleteCategory(id).then(()=> {
	// 		this.props.getCategories();
	// 	})
	// }

	redirectToWasher() {
		this.props.history.push('/washer/' + this.state.washer.id);
	}

	render() {
		return (
			<Card onClick={this.redirectToWasher} className="mb-3 ">
				<Card.Body className="d-flex flex-column justify-content-between">

					<h4>{this.state.washer.name}</h4>

					<div>
						<div className="mb-2">
							{this.state.washer.model}
						</div>

						<div>
							{this.state.washer.isWorking ?
								<div> on </div>
								: <div> off </div>
							}
						</div>
					</div>


				</Card.Body>
			</Card>
		)
	}
}

const mapStateToProps = state => ({
	washers: state.washer.washer,
});

const mapDispatchToProps = dispatch => ({
	deleteWasher: (id) => dispatch(actionCreators.deleteWasher(id)),
	getWashers: () => dispatch(actionCreators.getWashers()),
});


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(WasherCard));