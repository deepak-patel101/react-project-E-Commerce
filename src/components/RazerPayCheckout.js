import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { Link } from "react-router-dom";
import { useCartContext } from "../context/Cart_context";
import { useUserContext } from "../context/User_context";
import { formatPrice } from "../utils/helpers";
import { useNavigate } from "react-router-dom";

const stripePublicKey =
  "pk_test_51Ls1y5SAvQEBQr8POOUgUHHwWYTsd1t8VDL5kYeabbRiJmIDFF0UAU1FodxO9iTOws8040KfHr2ehDdhaPlCZqBV0097kJqsiG";
// const stripeSecretKey =
//   "sk_test_51Ls1y5SAvQEBQr8P877JHnI62rcsdhGuoPrajhCOjnQNASaj013O0AbT2IJHkqTQLHiTS4ueFOAzk0rqLINIlZJO00B1L9rvDr";

const CheckoutForm = () => {
  const { cart, total_amount, shipping_fee, clearCart } = useCartContext();
  const { myUser, userName, userLastName } = useUserContext();
  const navigate = useNavigate();

  ///
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  /////////////////////
  const [pay, setPay] = useState(false);
  const [details, setDetails] = useState({
    Fname: userName,
    Lname: userLastName,
    Address: "",
    Country: "",
    ZipCode: "",
    City: "",
    State: "",
  });

  /////////////////
  ///////shipping validation form  ////
  const formValidation = (
    Fname,
    Lname,
    Address,
    Country,
    ZipCode,
    City,
    State
  ) => {
    if (Fname === "") {
      alert("please enter your first name");
    }

    if (Lname === "") {
      alert("please enter your last name");
    }
    if (Address === "") {
      alert("please enter your Address first");
    }
    if (Country === "") {
      alert("please enter your Country first");
    }
    if (ZipCode === "") {
      alert("please enter your ZipCode first");
    }
    if (City === "") {
      alert("please enter your City first");
    }
    if (State === "") {
      alert("please enter your State first");
    }
    if (
      State !== "" &&
      City !== "" &&
      ZipCode !== "" &&
      Country !== "" &&
      Address !== "" &&
      Lname !== "" &&
      Fname !== ""
    ) {
      return setPay(true);
    }
  };
  /////////////

  let bill = ((shipping_fee + total_amount) / 100) * 60.5;
  const roundOfBill = bill.toFixed(2);

  const loadScript = (src) => {
    return new Promise((resovle) => {
      const script = document.createElement("script");
      script.src = src;

      script.onload = () => {
        resovle(true);
      };

      script.onerror = () => {
        resovle(false);
      };

      document.body.appendChild(script);
    });
  };

  const displayRazorpay = async (amount) => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("You are offline... Failed to load Razorpay SDK");
      return;
    }

    const options = {
      key: "rzp_test_VdGdvprTKB8u1w",
      currency: "INR",
      amount: amount * 100,
      name: "sooofa",
      description: "Thanks for purchasing",
      image:
        "https://mern-blog-akky.herokuapp.com/static/media/logo.8c649bfa.png",

      handler: function (response) {
        setSucceeded(true);
        setTimeout(() => {
          clearCart();
          navigate("/");
        }, 5000);
      },
      prefill: {
        name: "sooofa",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <div>
      {succeeded ? (
        <article>
          <h4>Thank you..</h4>
          <h4>Your payment was successful!</h4>
          <h4>Redirecting to home page shortly</h4>
        </article>
      ) : (
        <article>
          <h4>Hello, {myUser && myUser.name}</h4>
          <p>Your total is {formatPrice(shipping_fee + total_amount)}</p>

          {pay ? (
            <main>
              <h5>your shipping address:-</h5>
              <p>
                {details.Fname} {details.Lname}{" "}
              </p>

              {details.Address}

              <p>
                {details.City}, {details.ZipCode}, {details.State},{" "}
                {details.Country},{" "}
              </p>
              <button
                type="button"
                className="btn"
                onClick={() => setPay(false)}
              >
                change address
              </button>
            </main>
          ) : null}
        </article>
      )}
      <form id="payment-form" onSubmit={(e) => e.preventDefault()}>
        {succeeded ? (
          <Link to="/products" type="button" className="btn">
            Shop more
          </Link>
        ) : (
          <main>
            {/* /////// */}
            {pay ? (
              <main>
                <button
                  type="button"
                  className="btn"
                  onClick={() => displayRazorpay(roundOfBill)}
                >
                  Pay: {formatPrice(shipping_fee + total_amount)}
                </button>
                <hr />
                <p>Test UPI payment using:- success@razorpay.</p>
                <p>Test Card for Domestic Payments:- 4111 1111 1111 1111</p>
                <p>CVV:- Random CVV Any ,Expiry Date:- future date</p>
              </main>
            ) : (
              <main>
                {/* //////////////////////shipping///////////////////////////// */}
                <h1>Shipping</h1>
                <p>Please enter your shipping details.</p>
                <hr />
                <div className="form">
                  <div className="fields fields--2">
                    <label className="field">
                      <span className="field__label">First name</span>
                      <input
                        className="field__input"
                        type="text"
                        id="firstname"
                        value={details.Fname}
                        onChange={(e) =>
                          setDetails({ ...details, Fname: e.target.value })
                        }
                      />
                    </label>
                    <label className="field">
                      <span className="field__label">Last name</span>
                      <input
                        className="field__input"
                        type="text"
                        id="lastname"
                        value={details.Lname}
                        onChange={(e) =>
                          setDetails({ ...details, Lname: e.target.value })
                        }
                      />
                    </label>
                  </div>
                  <label className="field">
                    <span className="field__label">Address</span>
                    <input
                      className="field__input"
                      type="text"
                      id="address"
                      value={details.Address}
                      onChange={(e) =>
                        setDetails({ ...details, Address: e.target.value })
                      }
                    />
                  </label>
                  <label className="field">
                    <span className="field__label">Country</span>
                    <select
                      class="field__input"
                      id="country"
                      onChange={(e) =>
                        setDetails({ ...details, Country: e.target.value })
                      }
                    >
                      <option value=""></option>
                      <option value="india">India</option>
                    </select>
                  </label>
                  <div className="fields fields--3">
                    <label className="field">
                      <span className="field__label">Zip code</span>
                      <input
                        className="field__input"
                        type="number"
                        id="zipcode"
                        value={details.ZipCode}
                        onChange={(e) =>
                          setDetails({ ...details, ZipCode: e.target.value })
                        }
                      />
                    </label>
                    <label className="field">
                      <span className="field__label">City</span>
                      <input
                        className="field__input"
                        type="text"
                        id="city"
                        value={details.City}
                        onChange={(e) =>
                          setDetails({ ...details, City: e.target.value })
                        }
                      />
                    </label>
                    <label className="field">
                      <span className="field__label" for="state">
                        State
                      </span>
                      <select
                        className="field__input"
                        id="state"
                        onChange={(e) =>
                          setDetails({ ...details, State: e.target.value })
                        }
                      >
                        {/* ///////state/////////// */}
                        <option value=""></option>
                        <option value="Andaman and Nicobar Islands">
                          Andaman and Nicobar Islands
                        </option>
                        <option value="Andhra Pradesh">Andhra Pradesh</option>
                        <option value="Arunachal Pradesh">
                          Arunachal Pradesh
                        </option>
                        <option value="Assam">Assam</option>
                        <option value="Bihar">Bihar</option>
                        <option value="Chandigarh">Chandigarh</option>
                        <option value="Chhattisgarh">Chhattisgarh</option>
                        <option value="Dadra and Nagar Haveli">
                          Dadra and Nagar Haveli
                        </option>
                        <option value="Daman and Diu">Daman and Diu</option>
                        <option value="Delhi">Delhi</option>
                        <option value="Goa">Goa</option>
                        <option value="Gujarat">Gujarat</option>
                        <option value="Haryana">Haryana</option>
                        <option value="Himachal Pradesh">
                          Himachal Pradesh
                        </option>
                        <option value="Jammu and Kashmir">
                          Jammu and Kashmir
                        </option>
                        <option value="Jharkhand">Jharkhand</option>
                        <option value="Karnataka">Karnataka</option>
                        <option value="Kerala">Kerala</option>
                        <option value="Lakshadweep">Lakshadweep</option>
                        <option value="Madhya Pradesh">Madhya Pradesh</option>
                        <option value="Maharashtra">Maharashtra</option>
                        <option value="Manipur">Manipur</option>
                        <option value="Meghalaya">Meghalaya</option>
                        <option value="Mizoram">Mizoram</option>
                        <option value="Nagaland">Nagaland</option>
                        <option value="Orissa">Orissa</option>
                        <option value="Pondicherry">Pondicherry</option>
                        <option value="Punjab">Punjab</option>
                        <option value="Rajasthan">Rajasthan</option>
                        <option value="Sikkim">Sikkim</option>
                        <option value="Tamil Nadu">Tamil Nadu</option>
                        <option value="Tripura">Tripura</option>
                        <option value="Uttaranchal">Uttaranchal</option>
                        <option value="Uttar Pradesh">Uttar Pradesh</option>
                        <option value="West Bengal">West Bengal</option>
                      </select>
                    </label>
                  </div>
                  <hr />
                </div>

                <button
                  type="button"
                  className="btn "
                  onClick={() =>
                    formValidation(
                      details.Fname,
                      details.Lname,
                      details.Address,
                      details.Country,
                      details.ZipCode,
                      details.City,
                      details.State
                    )
                  }
                >
                  submit details
                </button>
              </main>
            )}
          </main>
        )}

        {/* Show any error that happens when processing the payment */}
        {error && (
          <div className="card-error" role="alert">
            {error}
          </div>
        )}
        {/* Show  a success message upon completion */}
        <p className={succeeded ? "result-message" : "result-message hidden"}>
          {succeeded ? (
            <div>Payment succeeded</div>
          ) : (
            " Refresh the page if there is an error or  error while paying "
          )}
        </p>
      </form>
    </div>
  );
};

const RazerPayCheckout = () => {
  return (
    <Wrapper>
      <CheckoutForm />
    </Wrapper>
  );
};
const Wrapper = styled.section`
  form {
    width: 30vw;
    min-width: 500px;
    align-self: center;
    box-shadow: 0px 0px 0px 0.5px rgba(50, 50, 93, 0.1),
      0px 2px 5px 0px rgba(50, 50, 93, 0.1),
      0px 1px 1.5px 0px rgba(0, 0, 0, 0.07);
    border-radius: 7px;
    padding: 40px;
  }

  #payment-message {
    color: rgb(105, 115, 134);
    font-size: 16px;
    line-height: 20px;
    padding-top: 12px;
    text-align: center;
  }

  #payment-element {
    margin-bottom: 24px;
  }

  /* Buttons and links */
  button {
    font-family: Arial, sans-serif;
    color: #ffffff;
    border-radius: 4px;
    border: 0;
    padding: 12px 16px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    display: block;
    transition: all 0.2s ease;
    box-shadow: 0px 4px 5.5px 0px rgba(0, 0, 0, 0.07);
    width: 100%;
  }

  button:hover {
    filter: contrast(115%);
  }

  button:disabled {
    opacity: 0.5;
    cursor: default;
  }

  /* spinner/processing state, errors */
  .spinner,
  .spinner:before,
  .spinner:after {
    border-radius: 50%;
  }

  .spinner {
    color: #ffffff;
    font-size: 22px;
    text-indent: -99999px;
    margin: 0px auto;
    position: relative;
    width: 20px;
    height: 20px;
    box-shadow: inset 0 0 0 2px;
    -webkit-transform: translateZ(0);
    -ms-transform: translateZ(0);
    transform: translateZ(0);
  }

  .spinner:before,
  .spinner:after {
    position: absolute;
    content: "";
  }

  .spinner:before {
    width: 10.4px;
    height: 20.4px;
    background: #5469d4;
    border-radius: 20.4px 0 0 20.4px;
    top: -0.2px;
    left: -0.2px;
    -webkit-transform-origin: 10.4px 10.2px;
    transform-origin: 10.4px 10.2px;
    -webkit-animation: loading 2s infinite ease 1.5s;
    animation: loading 2s infinite ease 1.5s;
  }

  .spinner:after {
    width: 10.4px;
    height: 10.2px;
    background: #5469d4;
    border-radius: 0 10.2px 10.2px 0;
    top: -0.1px;
    left: 10.2px;
    -webkit-transform-origin: 0px 10.2px;
    transform-origin: 0px 10.2px;
    -webkit-animation: loading 2s infinite ease;
    animation: loading 2s infinite ease;
  }

  @keyframes loading {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }

  @media only screen and (max-width: 600px) {
    form {
      width: 80vw;
      min-width: initial;
    }
  }

  h1 {
    margin-bottom: 1rem;
  }

  p {
    color: var(--color-gray);
  }

  hr {
    height: 1px;
    width: 100%;
    background-color: var(--color-light-gray);
    border: 0;
    margin: 2rem 0;
  }

  .form {
    display: grid;
    grid-gap: 1rem;
  }

  .field {
    width: 100%;
    display: flex;
    flex-direction: column;
    border: 1px solid var(--color-lighter-gray);
    padding: 0.5rem;
    border-radius: 0.25rem;
  }

  .field__label {
    color: var(--color-gray);
    font-size: 0.9rem;
    font-weight: 300;
    text-transform: uppercase;
    margin-bottom: 0.25rem;
  }

  .field__input {
    padding: 0;
    margin: 0;
    border: 0;
    outline: 0;
    width: 100%;

    -webkit-appearance: none;
    appearance: none;
    background-color: transparent;
    padding: 0.5rem;
    background: var(--clr-grey-10);
    border-radius: var(--radius);
  }
  .search-input::placeholder {
    text-transform: capitalize;
  }
  .field:focus-within {
    border-color: #000;
  }

  .fields {
    display: grid;
    grid-gap: 1rem;
  }
  .fields--2 {
    grid-template-columns: 1fr 1fr;
  }
  .fields--3 {
    grid-template-columns: 1fr 1fr 1fr;
  }
  .hidden {
    display: none;
  }
`;
export default RazerPayCheckout;
