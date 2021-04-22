import { Component } from 'react';

export default class Hello extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showMessage: false
        }
    }

    toogleWelcomeMessage() {
        this.setState({
            showMessage: !this.state.showMessage
        });
    }

    welcomeMessage() {
        return (this.state.showMessage && <p>Welcome to Hello React Application!</p>);
    }

    render() {
        return (
            <div>
                <p>Hello, {this.props.name}!</p>
                <button onClick={() => this.toogleWelcomeMessage()}>
                    Click to {this.state.showMessage ? "hide" : "show"} a message!
                </button>
                {this.welcomeMessage()}
            </div>
        );
    }
}