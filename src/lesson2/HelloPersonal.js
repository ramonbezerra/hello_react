import { Component } from 'react';
import WelcomeMessage from './WelcomeMessage';

export default class Hello extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showMessage: false,
            name: "empty user",
            welcomeMessage: "Welcome to Hello React Application"
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                welcomeMessage: "Welcome, " + this.props.name,
                name: this.props.name
            });
        }, 3000);
    }

    componentDidUpdate() {
        document.getElementById("name").innerHTML = `The actual user is ${this.state.name ?? '...'}`;
    }

    toogleWelcomeMessage() {
        this.setState({
            showMessage: !this.state.showMessage
        });
    }

    showWelcomeMessage() {
        return (this.state.showMessage && <WelcomeMessage welcomeMessage={this.state.welcomeMessage}/>);
    }

    render() {
        return (
            <div>
                <p>Hello, {this.props.name}!</p>
                <button onClick={() => this.toogleWelcomeMessage()}>
                    Click to {this.state.showMessage ? "hide" : "show"} a message!
                </button>
                {this.showWelcomeMessage()}
                <p id="oldName"></p>
                <p id="name"></p>
            </div>
        );
    }
}