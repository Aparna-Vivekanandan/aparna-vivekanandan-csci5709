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
                <p>User Profile</p>
                <p>{this.state.FirstName}</p>
                <p>{this.state.LastName}</p>
                <p>{this.state.Email}</p>
            </div>
        );
    }
}

export default UserProfile;