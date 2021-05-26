import React, { Component } from 'react';

export default class ControlledForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '', password: ''
        };
    }

    handleOnEmailChange = (e) => {
        this.setState({ email: e.target.value });
    }

    handleOnPasswordChange = (e) => {
        this.setState({ password: e.target.value });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        alert('Email: ' + this.state.email);
    }
    
    render() {
        const { email, password } = this.state;
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Email:
                    <input type="text" name="email" value={email} onChange={this.handleOnEmailChange}/>
                </label>
                <label>
                    Senha:
                    <input type="password" value={password} onChange={this.handleOnPasswordChange}/>
                </label>
                <input type="submit" value="Login"/>
            </form>
        );
    }
}