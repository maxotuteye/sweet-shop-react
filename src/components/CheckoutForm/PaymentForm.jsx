import React, {useState} from 'react';
import {Button, Divider, Typography} from '@material-ui/core';
import Review from './Review';
import {submitOrder} from "../../lib/graphcms";
import {postOrder} from "../../lib/DatabaseConnection";

// const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const PaymentForm = ({checkoutToken, nextStep, backStep, shippingData, onCaptureCheckout}) => {
    // const handleSubmit = async (event, elements, stripe) => {
    //     event.preventDefault();
    //
    //     if (!stripe || !elements) return;
    //
    //     const cardElement = elements.getElement(CardElement);
    //
    //     const {error, paymentMethod} = await stripe.createPaymentMethod({type: 'card', card: cardElement});
    //
    //     if (error) {
    //         console.log('[error]', error);
    //     } else {
    //         const orderData = {
    //             line_items: checkoutToken.live.line_items,
    //             customer: {
    //                 firstname: shippingData.firstName,
    //                 lastname: shippingData.lastName,
    //                 email: shippingData.email
    //             },
    //             shipping: {
    //                 name: 'International',
    //                 street: shippingData.address1,
    //                 town_city: shippingData.city,
    //                 county_state: shippingData.shippingSubdivision,
    //                 postal_zip_code: shippingData.zip,
    //                 country: shippingData.shippingCountry
    //             },
    //             fulfillment: {shipping_method: shippingData.shippingOption},
    //             payment: {
    //                 gateway: 'stripe',
    //                 stripe: {
    //                     payment_method_id: paymentMethod.id,
    //                 },
    //             },
    //         };
    //
    //         onCaptureCheckout(checkoutToken.id, orderData);
    //
    //         nextStep();
    //     }
    // };

    const [submitStatus, setSubmitStatus] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const orderData = {
            line_items: checkoutToken.live.line_items,
            customer: {
                firstname: shippingData.firstName,
                lastname: shippingData.lastName,
                email: shippingData.email
            },
            shipping: {
                name: 'Local',
                street: shippingData.address1,
                town_city: shippingData.city,
                county_state: shippingData.shippingSubdivision,
                postal_zip_code: shippingData.zip,
                country: shippingData.shippingCountry
            },
            fulfillment: {shipping_method: shippingData.shippingOption},
            payment: {
                gateway: 'manual',
                // stripe: {
                //     payment_method_id: paymentMethod.id,
                // },
            },
        };

        //onCaptureCheckout(checkoutToken.id, orderData);
        //nextStep();
        // TODO: push order details to private
        const name = shippingData.firstName + ' ' + shippingData.lastName
        const phoneNumber = shippingData.phoneNumber
        const location = `${shippingData.address1}, ${shippingData.city}`
        const email = `${shippingData.email}`
        console.log(`${name}\n${phoneNumber}\n${location}`)
        // console.log(shippingData.address1 + ' * ' + shippingData.city)
        // submitOrder(checkoutToken.id, name, phoneNumber, location, email)
        //     .then(() => setSubmitStatus(true))

        const postOrderData = {
            name: name,
            email: email,
            location: location,
            phoneNumber: phoneNumber,
            checCheckoutToken: checkoutToken.id,
        }

        await postOrder(postOrderData)
            .then(response => {
                window.location = "/"
            })

    }


    return (
        <>
            <Review checkoutToken={checkoutToken}/>
            <Divider/>
            <Typography variant="h6" gutterBottom style={{margin: '20px 0'}}>Finalize Order</Typography>
            <form onSubmit={(e) => handleSubmit(e)}>
                <br/>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <Button variant="outlined" onClick={backStep}>Back</Button>
                    <Button variant="contained" type="submit" color="primary">Place Order</Button>
                </div>
            </form>
        </>
    );
};

export default PaymentForm;
