import React, {Component} from "react";
import Dashboard from "../components/Dashboard";
import Example from "../components/Example";
import "../styles/table.css"

class Home extends Component{
    constructor(props) {
        super(props);
    }

    render() {
        return <Dashboard/>
    }

}
export default Home;