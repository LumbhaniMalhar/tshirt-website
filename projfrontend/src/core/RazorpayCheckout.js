import React, {useState, useEffect} from "react";
import { API } from '../backend';


const RazorpayCheckout = ({products, setReload = f => f, reload = undefined}) => {

    const getFinalAmount = () => {
        let amount = 0;
        products.map(p => {
          amount = amount + p.price;
        });
        return amount*100;
    };
    console.log("AMOUNT IS HERE", getFinalAmount())

    const [name, setName] = useState('Malhar')
    function loadScript(src) {
        return new Promise((resolve) => {
            const script = document.createElement('script')
            script.src = src
            script.onload = () => {
                resolve(true)
            }
            script.onerror = () => {
                resolve(false)
            }
            document.body.appendChild(script)
        })
    }


    const __DEV__ = document.domain === 'localhost'


    async function displayRazorpay() {
        
        const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

        if (!res) {
			alert('Razorpay SDK failed to load. Are you online?')
			return
		}
        const body = {products}
        const data = await fetch(`${API}/razorpay`,{
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(body)}).then((t)=>t.json())
        console.log(data)
        const options = {
			key: __DEV__ ? 'rzp_test_IeBv4hpfwD2886' : 'PRODUCTION_KEY',
			currency: data.currency,
			amount: getFinalAmount().toString(),
			order_id: data.id,
			name: 'tshirt',
			description: 'Thank you for buying tshirts from us',
			image: `${API}/logo.svg`,
			// handler: function (response) {
			// 	alert(response.razorpay_payment_id)
			// 	alert(response.razorpay_order_id)
			// 	alert(response.razorpay_signature)
			// },
			prefill: {
				name,
				"email": 'sdfdsjfh2@ndsfdf.com',
				"contact": '9899999999'
			}
		}
        const paymentObject = new window.Razorpay(options)
		paymentObject.open()
    }

    return (
        <button className='btn btn-success' onClick={displayRazorpay}>Pay here</button>
    )
}

export default RazorpayCheckout;


// import React from 'react';
// import { API } from '../backend';

// const RazorpayCheckout = () => {
//   const razorpayHandler = event => {
//     event.preventDefault();
//     const response = fetch(`${API}/order`, {
//         method:"GET",
//         headers: {
//             Accept: "application/json",
//             "Content-Type": "application/json"
//         }
//     })

//     const {data} = response
//     const options = {
//         key: 'rzp_test_IeBv4hpfwD2886',
//         name: 'mallu',
//         description: 'mallu',
//         handler: (response) => {
//             try{
//                 const paymentId = response.razorpay_payment_id;
//                 const captureResposne = fetch(`${API}/capture/${paymentId}`,{
//                     method: "POST",
//                     headers: {
//                         Accept: "application/json",
//                         "Content-Type": "application/json",
//                     },
//                 })
//                 const succesObj = JSON.parse(captureResposne.data)
//                 if(succesObj.captured){
//                     console.log("PAYMENT SUCCESS")
//                 }
//             }
        
//             catch(err){
//                 console.log(err)
//         }
//     }
//   }
// }
//   return (
//     <button className='btn btn-success' onClick={razorpayHandler}>Pay here</button>
//   )
// }

// export default RazorpayCheckout;