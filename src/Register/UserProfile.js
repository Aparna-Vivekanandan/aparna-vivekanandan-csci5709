import React, { Component } from 'react';
import './Register.css'

class UserProfile extends React.Component
{
    constructor()
    {
        super();
        //console.log(`${FetchUserData.firstName}`);
        let FetchUserData = JSON.parse(localStorage.getItem('myData'));
        this.state = {
            FirstName: FetchUserData.firstName,
            LastName: FetchUserData.lastName,
            Email: FetchUserData.email
        };
    }

    render()
    {
        return (
            <div class="userProfileClass">
                <h3 class="H3Class">USER PROFILE DETAILS</h3><br/>
                <p>FirstName: {this.state.FirstName}</p>
                <p>LastName: {this.state.LastName}</p>
                <p>Email: {this.state.Email}</p>
                <br/>
                <a href ="register">GO BACK TO REGISTRATION</a>
            </div>
        );
    }
}

export default UserProfile;