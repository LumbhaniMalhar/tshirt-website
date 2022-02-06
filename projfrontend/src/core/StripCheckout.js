import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import { cartEmpty, loadCart } from './helper/cartHelper';
import StripCheckoutButton from 'react-stripe-checkout'
import { API } from '../backend';

const StripCheckout = ({products, setReload = f => f, reload = undefined}) => {
    const [data, useData] = useState({
        loading: false,
        success: false,
        error: "",
        address: ""
    })

    const token = isAuthenticated() && isAuthenticated().token
    const userId = isAuthenticated() && isAuthenticated().user._id

    const getFinalAmount = () => {
        let amount = 0;
        products.map(p => {
          amount = amount + p.price;
        });
        return amount;
      };

    const makePayment = (token) => {
        const body = {token, products}
        const headers = {"Content-Type": "application/json"}

        return fetch(`${API}/stripepayment`, {
            method: "POST",
            headers,
            body: JSON.stringify(body)
        }).then(response => {
            console.log(response)
        }).catch(error => console.log(error))
    }
    const showStripeButton = () => {
        return isAuthenticated() ? (
            <StripCheckoutButton 
              stripeKey='pk_test_51KKg5QSFuyA7DgQV1JjrSFcUXeu9LqgeOUIW5kGg3d50s1CJbACT41sasSFTPVzKhVg8ZCtzBhsBzMo0bEBsCDMF00ifOujbfN'
              token={makePayment}
              amount={getFinalAmount() * 100}
              >
                <button className='btn btn-success'>Pay with strip</button>
            </StripCheckoutButton>
        ) : (
            <Link className='btn btn-warning'>Sign-In</Link>
        )
    }
    
    return <div>
        <h3>strip component {getFinalAmount()}</h3>
        {showStripeButton()}
    </div>;
}

export default StripCheckout;