import React, {useState, useEffect} from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "./Base";
import Card from "./Card";
import { loadCart } from "./helper/cartHelper";
import StripCheckout from "./StripCheckout";
import RazorpayCheckout from "./RazorpayCheckout";

export default function Cart() {
  
  const [products, setProducts] = useState([])
  const [reload, setReload] = useState(false)
  
  useEffect(() => {
    console.log(loadCart())
    setProducts(loadCart())
  }, [reload]);
  

  const loadAllProducts = () => {
      return(
          <div>
              <h2>This section is to load products</h2>
              {products.map((product, index) => {
                  return(
                      <Card key={index} product={product} removeFromCart={true} addtoCart={false} setReload={setReload} reload={reload} />
                  )
              })}
          </div>
      )
  }


  return (
    <Base title="Home Page" description="Welcome to the Tshirt Store">
      <div className="row text-center">
        <div className="col-6">{loadAllProducts()}</div>
        <div className="col-6">
          {/* <StripCheckout products={products} setReload = {setReload} reload = {reload} /> */}
          <RazorpayCheckout products={products} setReload = {setReload} reload = {reload}/>
        </div>
      </div>
    </Base>
  );
}
