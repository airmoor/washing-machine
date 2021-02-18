import './App.scss';
import './styles/index.scss';
import React from "react";
import {BrowserRouter as Router,Route} from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Home from "./components/Home";
import history from './history'
import WasherPage from "./components/WasherPage";
import WasherEdit from "./components/WasherEdit";
import WasherCreate from "./components/WasherCreate";
import ModeCreate from "./components/ModeCreate";
import ModeEdit from "./components/ModeEdit";

export default function App() {
	return (
		<Container className="App my-5">
			<Router history={history}>
					<Route path="/" exact render={() => <Home />} />
					<Route path="/washer/:id" exact render={() => <WasherPage />} />
					<Route path="/washer/:id/edit" render={() => <WasherEdit />} />
					<Route path="/washer-new"  render={() => <WasherCreate />} />
					<Route path="/mode/:id/edit" render={() => <ModeEdit />} />
					<Route path="/mode-new" render={() => <ModeCreate />} />
			</Router>
		</Container>
	);
}

