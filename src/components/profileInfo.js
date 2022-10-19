import React from "react";
import { useUserContext } from "../context/User_context";
import styled from "styled-components";
import { FaUser } from "react-icons/fa";
const ProfileInfo = () => {
  const { userName, usersPicture, isLoading, isAuthenticated, myUser } =
    useUserContext();
  if (isLoading) {
    return <p>loading...</p>;
  }
  if (myUser) {
    return (
      <Wrapper>
        <div className="grid-container">
          <FaUser className="item3" />
          <div class="item4">{userName}</div>
        </div>
        <hr></hr>
      </Wrapper>
    );
  }
};
const Wrapper = styled.article`
   {
    .item3 {
      grid-area: main;
      height: 30px;
    }
    .profile {
    }
    .item4 {
      grid-area: right;
    }
    .grid-container {
      display: grid;
      grid-template-areas:
        "header header header header header header"
        "menu main main main right right"
        "menu footer footer footer footer footer";
      gap: 10px;
      padding: 10px;
    }

    .grid-container > div {
      text-align: center;
      padding: 3px 0;
      font-size: 15px;
    }
  }
`;
export default ProfileInfo;
