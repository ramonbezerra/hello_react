import React, { Component } from 'react';
import PlainForm from './PlainForm';
import ControlledForm from './ControlledForm';
import FormikForm from './FormikForm';
import FormLevelValidation from './FormLevelValidation';
import FormYupValidation from './FormYupValidation';

export default class App extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <FormYupValidation />
        );
    }
}