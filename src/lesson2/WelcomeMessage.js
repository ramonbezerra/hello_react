import { Component } from "react";

export default class WelcomeMessage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            welcomeMessage: props.welcomeMessage
        }
    }

    componentWillUnmount() {
        alert("The welcome message was been removed!");
    }

    render() {
        return (
            <p>{this.props.welcomeMessage}</p>
        );
    }
}