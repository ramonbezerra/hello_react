import React, { Component } from 'react';

export default class PlainForm extends Component {
    constructor(props) {
        super(props);

        this.email = null;
        this.password = null;

        this.setEmailRef = element => { this.email = element; };
        this.setPasswordRef = element => { this.password = element; };
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.info('email: ', this.email.value);
        console.info('password: ', this.password.value);
    }
    
    render() {
        return (
            <form noValidate={true} onSubmit={(e) => this.handleSubmit(e)}>
                <label>
                    Email:
                    <input type="text" name="email" ref={this.setEmailRef}/>
                </label>
                <label>
                    Senha:
                    <input type="password" ref={this.setPasswordRef}/>
                </label>
                <input type="submit" value="Login"/>
            </form>
        );
    }
}