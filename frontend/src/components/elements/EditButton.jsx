import React from 'react';
import Card from 'react-bootstrap/Card';
import {withRouter} from "react-router";

class EditButton extends React.Component {

	constructor(props) {
		super(props);
		this.redirectTo = this.redirectTo.bind(this)
	}

	redirectTo() {
		if (this.props.backTo) {
			this.props.history.push(this.props.backTo);
		} else this.props.history.goBack();
	}

	render() {
		return (
			<div className="d-flex justify-content-center btn-edit" onClick={this.redirectTo}>
				<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M23.3327 16.6665L11.666 28.3332" stroke="#455362" stroke-width="2.5" stroke-linecap="round"
					      stroke-linejoin="round"/>
					<path
						d="M19.9993 12.4032L15.1423 17.2602C14.5172 17.8853 14.166 18.7332 14.166 19.6172V25.8335H20.3814C21.2655 25.8335 22.1133 25.4824 22.7384 24.8573L27.5894 20.0063C28.0889 19.5077 28.4853 18.9155 28.7558 18.2636C29.0263 17.6117 29.1657 16.9129 29.166 16.2071C29.1663 15.5013 29.0276 14.8023 28.7576 14.1502C28.4877 13.4981 28.0918 12.9055 27.5928 12.4064V12.4064C26.5858 11.3999 25.2205 10.8341 23.7967 10.8335C22.373 10.8329 21.0072 11.3974 19.9993 12.4032V12.4032Z"
						stroke="#455362" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
					<path
						d="M26.6667 5H13.3333C8.73096 5 5 8.73096 5 13.3333V26.6667C5 31.269 8.73096 35 13.3333 35H26.6667C31.269 35 35 31.269 35 26.6667V13.3333C35 8.73096 31.269 5 26.6667 5Z"
						stroke="#455362" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
				</svg>
			</div>
		)
	}
}

export default withRouter(EditButton);