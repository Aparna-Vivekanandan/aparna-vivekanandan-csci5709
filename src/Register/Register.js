import React, { Component } from 'react';
import { Redirect } from 'react-router';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button} from 'react-bootstrap';
import './Register.css'

class Register extends React.Component
{
    constructor (props)
    {
        super(props);
        this.state =
            {
                firstName: '',
                lastName: '',
                email:'',
                password:'',
                confirmpassword:'',

                firstNameError:'',
                lastNameError:'',
                emailError:'',
                passwordError:'',
                confirmPasswordError:'',

                redirect: false,
            }
        this.handleChange = this.handleChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);

        this.validateFirstName = this.validateFirstName.bind(this);
        this.validateLastName = this.validateLastName.bind(this);
        this.validateEmail = this.validateEmail.bind(this);
        this.validatePassword = this.validatePassword.bind(this);
        this.validateConfirmPassword = this.validateConfirmPassword.bind(this);
        this.validateFields = this.validateFields.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event)
    {
        const { name, value } = event.target;
        this.setState({[name]: value});
        this.validateFields(name);
        return;
    }

    handleBlur(event)
    {
        const { name } = event.target;
        this.validateFields(name);
        return;
    }

    validateFirstName()
    {
        const alphaNumericValidator = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

        let isFirstNameValid = false;
        let updatedFirstName = this.state.firstName;

        let firstNameErrorMessage = '';
        this.state.firstNameError = '';

        if (updatedFirstName.trim() === "")
        {
            firstNameErrorMessage = "Required Firstname"
        }
        else if(alphaNumericValidator.test(updatedFirstName))
        {
            firstNameErrorMessage = "Firstname should be alpha-numeric"
        }
        else
        {
            this.setState({ firstName: updatedFirstName });
            isFirstNameValid = true;
        }
        this.setState({firstNameError:firstNameErrorMessage})
        //console.log("Firstname: " + `${isFirstNameValid}`)
        return isFirstNameValid;
    }

    validateLastName()
    {
        const alphaNumericValidator = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

        let isLastNameValid = false;
        let updatedLastName = this.state.lastName;

        let lastNameErrorMessage = '';
        this.state.lastNameError = '';

        if(updatedLastName.trim() === "")
        {
            lastNameErrorMessage = "Required Lastname";
        }
        else if(alphaNumericValidator.test(updatedLastName))
        {
            lastNameErrorMessage = "Lastname should be alpha-numeric"
        }
        else
        {
            this.setState({lastName: updatedLastName});
            isLastNameValid = true;
        }
        this.setState({lastNameError:lastNameErrorMessage})
        //console.log("LastName: " + `${isLastNameValid}`)
        return isLastNameValid;
    }

    validateEmail()
    {
        const emailValidator = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

        let isValidEmail = false;
        let updatedEmail = this.state.email;

        let emailErrorMessage = ''; // Initialising the previous click email to null
        this.state.emailError = ''; // Initialising the previous set 'State' of email error to null

        if (updatedEmail.trim() === "")
        {
            emailErrorMessage= "Required Email"
        }
        else if(!emailValidator.test(updatedEmail))
        {
            emailErrorMessage= "Email Id is not valid"
        }
        else
        {
            this.setState({email: updatedEmail});
            isValidEmail = true;
        }
        this.setState({emailError: emailErrorMessage})
        //console.log("email: " + `${isValidEmail}`)
        return isValidEmail
    }

    validatePassword(event)
    {
        const passwordValidator = /^[0-9a-zA-Z]/;

        let isValidPassword = false;
        let updatedPassword = this.state.password;
        this.setState({password: updatedPassword});

        let passwordErrorMessage = ''; // Initialising the previous click email to null
        this.state.passwordError = ''; // Initialising the previous set 'State' of email error to null
        var fetchPassword = new String( updatedPassword );
        var updatedPasswordLength = fetchPassword.length
        let lengthReqMet = (updatedPasswordLength >= 8)

        if(updatedPassword.trim() === "")
        {
            passwordErrorMessage = "Required Password"
        }
        else if(!lengthReqMet)
        {
            passwordErrorMessage = "Password must contain minimum 8 characters";
        }
        else
        {
            this.setState({password:updatedPassword})
            isValidPassword = true;
        }
        this.setState({passwordError:passwordErrorMessage})
        //console.log("Pass: " + `${isValidPassword}`)
        return isValidPassword
    }

    validateConfirmPassword(event)
    {
        let confirmPassValid = false;
        let updatedConfirmPassword= this.state.confirmpassword;
        this.setState({confirmpassword: updatedConfirmPassword});

        let conPassErrorMessage = '';
        this.state.confirmPasswordError = '';

        let previousPassword = this.state.password;
        if(updatedConfirmPassword.trim() === "")
        {
            conPassErrorMessage = "Cannot be empty"
        }
        else if(previousPassword === updatedConfirmPassword )
        {
            this.setState({confirmpassword: updatedConfirmPassword});
            confirmPassValid = true;
        }
        else
        {
            conPassErrorMessage = "Password didn't match"
        }
        this.setState({confirmPasswordError: conPassErrorMessage});
        //console.log("conPass: " + `${confirmPassValid}`)
        return confirmPassValid;
    }

    validateFields(name)
    {
        let isValid = false;
        if(name === "firstName")
        {
            isValid = this.validateFirstName(); //Function Call
        }
        else if(name === "lastName")
        {
            isValid = this.validateLastName(); //Function call
        }
        else if(name === "email")
        {
            isValid = this.validateEmail(); //Function Call
        }
        else if(name === "password")
        {
            isValid = this.validatePassword(); //Function call
        }
        else if(name === "confirmpassword")
        {
            isValid = this.validateConfirmPassword(); //Function call
        }
        return isValid;
    }

    // Submit Execution and validation Begins here
    handleSubmit(event)
    {
        event.preventDefault();
        let formFields = ["firstName", "lastName", "email", "password", "confirmpassword"];

        let isValidField = true;
        formFields.forEach(field =>
        {
            isValidField = this.validateFields(field) && isValidField;
        });

        console.log( "Boolean Handle Submit: " + `${isValidField}`);

        if (isValidField)
        {
            this.setState({ redirect: true });
            localStorage.setItem("myData",JSON.stringify(this.state))
        }
    }

    render() {
        let canRedirect = this.state.redirect;
        if (canRedirect)
        {
            return <Redirect to='/user'/>;
        }
        return (
            <div class="myClass">
                <br/><br/>
                <form onSubmit={this.handleSubmit} class="myFormClass">
                    <h3 class="H3Class">Registration Page</h3>
                    <div class="form-group">
                        <br/> <label class="labelname">First Name</label><br/>
                            <input type="text"
                                   onChange={this.handleChange}
                                   onBlur={this.handleBlur}
                                   name="firstName"
                                   placeholder="enter your firstname"
                                   autoComplete="off"
                                   class="form-control"
                            />
                        {(
                            <div className="errorMsg">
                                {this.state.firstName}
                            </div>
                        )}
                    </div>

                    <div class="form-group">
                        <br/><label class="labelname">Last Name</label><br/>
                            <input type="text"
                                   onChange={this.handleChange}
                                   onBlur={this.handleBlur}
                                   name="lastName"
                                   placeholder="enter your lastname"
                                   autoComplete="off"
                                   class="form-control"
                            />
                        {(<div className="errorMsg">{this.state.lastNameError}</div>)}
                    </div>

                    <div class="form-group">
                        <br/><label class="labelname">Email Address</label><br/>
                            <input type="text"
                                   onChange={this.handleChange}
                                   onBlur={this.handleBlur}
                                   name="email"
                                   placeholder="enter your email"
                                   autoComplete="off"
                                   class="form-control"
                            />
                        {(<div className="errorMsg">{this.state.emailError}</div>)}
                    </div>

                    <div class="form-group">
                        <br/><label class="labelname">Password</label><br/>
                            <input type="password"
                                   onChange={this.handleChange}
                                   onBlur={this.handleBlur}
                                   name="password"
                                   placeholder="enter your password"
                                   autoComplete="off"
                                   class="form-control"
                            />
                        {(<div className="errorMsg">{this.state.passwordError}</div>)}
                    </div>

                    <div class="form-group">
                        <br/><label class="labelname">Confirm Password</label><br/>
                            <input type="password"
                                   onChange={this.handleChange}
                                   onBlur={this.handleBlur}
                                   name="confirmpassword"
                                   placeholder="confirm your password"
                                   autoComplete="off"
                                   class="form-control"
                            />
                        {(<div className="errorMsg">{this.state.confirmPasswordError}</div>)}
                    </div>
                    <br/>
                    <Button type="submit" variant="primary">Submit</Button>
                </form>
                </div>
        );
    }
}
export default Register;