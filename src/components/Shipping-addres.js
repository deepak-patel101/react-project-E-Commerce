import React from "react";
import { useState } from "react";
import { UserProvider, useUserContext } from "../context/User_context";
import styled from "styled-components";

const ShippingAddress = () => {
  //   const { myUser } = useUserContext();
  const { userName, userLastName } = useUserContext();
  const [details, setDetails] = useState({
    Fname: "",
    Lname: "",
    Address: "",
    Country: "",
    ZipCode: "",
    City: "",
    State: "",
  });

  return (
    <Wrapper>
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
              placeholder={userName}
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
              placeholder={userLastName}
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
              onChange={(e) => setDetails({ ...details, City: e.target.value })}
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
              <option value="Arunachal Pradesh">Arunachal Pradesh</option>
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
              <option value="Himachal Pradesh">Himachal Pradesh</option>
              <option value="Jammu and Kashmir">Jammu and Kashmir</option>
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
              {/* /////////////// */}
            </select>
          </label>
        </div>
        <hr />
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.section`
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

  .button {
    background-color: #000;
    text-transform: uppercase;
    font-size: 0.8rem;
    font-weight: 600;
    display: block;
    color: #fff;
    width: 100%;
    padding: 1rem;
    border-radius: 0.25rem;
    border: 0;
    cursor: pointer;
    outline: 0;
  }
  .button:focus-visible {
    background-color: #333;
  }
`;

export default ShippingAddress;
