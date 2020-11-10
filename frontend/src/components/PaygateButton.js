import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

function PaygateButton(props) {
    const [SdkReady, setSdkReady] = useState(false);
    const addPaypalSdk = async () => {
        const result = await axios.get("/api/config/paygate");
        const clientID = result.data;
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://www.paypal.com/sdk/js?client-id=' + clientID;
        script.async = true;
        script.onload = () => {
            setSdkReady(true);
        }
        document.body.appendChild(script);
    }

    const createOrder = (data, actions) => actions.order.create({
        purchase_units: [
            {
                amount: {
                    currency_code: 'USD',
                    value: props.amount
                }
            }
        ]
    });

    const onApprove = (data, actions) => actions.order.capture().then(details => props.onSuccess(data, details)).catch(err => console.log(err));

    useEffect(() => {
        if (!window.paypal) {
            addPaypalSdk();
        }
        return () => {
            //
        };
    }, []);
    if (!SdkReady) {
        return <div>Loding...</div>
    }
    const Button = window.paypal.Buttons.driver('react', { React, ReactDOM })
    return <Button {...props} createOrder={(data, actions) => createOrder(data, actions)}
        onApprove={(data, actions) => onApprove(data, actions)} />
}

export default PaygateButton;