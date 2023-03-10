import React, { useState } from "react";
import { useFlutterwave, FlutterWaveButton } from 'react-flutterwave';

import Logo from "./user.svg";

const DonationsPage = () => {

    const [userData, setUserData] = useState({
        firstName: '', lastName: '', emailAddress: '', phoneNumber: ''
    });
    const [userError, setUserError] = useState('');


    const config = {
        public_key: process.env.REACT_APP_FLUTTERWAVE_KEY,
        tx_ref: Date.now(),
        amount: 100000,
        currency: 'NGN',
        payment_options: 'card,mobilemoney,ussd',
        customer: {
            email: userData.emailAddress,
            phonenumber: userData.phoneNumber,
            name: userData.fullName,
        },
        customizations: {
            title: 'Little Fingers',
            description: 'Donate to save a child from the streets',
            logo: '',
        },
    };

    const handleFlutterPayment = useFlutterwave(config);

    const updateFormValue = e => {
        setUserData({ ...userData, [e.target.name]: e.target.value })
    }

    const submitDonationForm = e => {
        setUserError('');
        e.preventDefault();
        let { firstName, lastName, emailAddress, phoneNumber } = userData;
        if (!firstName.length || !lastName.length || !emailAddress.length || !phoneNumber.length) {
            setUserError('Please fill in every detail')
        } else {
            handleFlutterPayment({
                callback: (response) => {
                    console.log(response);
                    alert('Payment successful. Thanks for your donation!')
                },
                onClose: () => {alert('Payment cancelled')},
            })
        }
    }

    return (
        <div>
            <div className="website-content">
                <div className="side-display">

                </div>
                <div className="main-content">
                    <div className="form-content">
                        <div>
                            <h3 style={{ display: 'flex', alignItems: 'center' }}><img src={Logo} alt="logo" /> Little Fingers</h3>
                        </div>
                        <h2>Donate to save a cause</h2>
                        <p>This is just a test app to show how payment integration
                            works on a website. You should still donate to a cause though. Find someone that needs
                            something near you and go give to them.
                        </p>
                        {
                            userError.length ?
                                <p className="errorMessage">{userError}</p> : ''
                        }
                        <form onSubmit={submitDonationForm}>
                            <div className="form-group">
                                <div className="form-flex-2">
                                    <div>
                                        <label htmlFor="firstName">First name</label>
                                        <input name="firstName"
                                            value={userData.firstName} onChange={updateFormValue} />
                                    </div>
                                    <div>
                                        <label htmlFor="lastName">Last name</label>
                                        <input name="lastName"
                                            value={userData.lastName} onChange={updateFormValue} />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div>
                                    <label htmlFor="emailAddress">Email address</label>
                                    <input name="emailAddress" type="email"
                                        value={userData.emailAddress} onChange={updateFormValue} />
                                </div>
                            </div>
                            <div className="form-group">
                                <div>
                                    <label htmlFor="phoneNumber">Phone number</label>
                                    <input name="phoneNumber" type="tel"
                                        value={userData.phoneNumber} onChange={updateFormValue} />
                                </div>
                            </div>
                            <button>Donate to save a cause</button>
                        </form>
                    </div>
                    <div className="color-bar">

                    </div>
                </div>
            </div>
        </div>
    )
}

export default DonationsPage;