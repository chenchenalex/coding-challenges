import React, { useContext } from "react";
import Styled from "styled-components";
import { ProfileContext } from "../../App";

const TopHeader = Styled.header`
  background: black;
  color: white;
  display: flex;
  height: 50px;
  align-items: center;
  padding: 0 20px;
  justify-content: space-between;
`;

function AppHeader() {
  const { firstName, lastName } = useContext(ProfileContext);
  return (
    <TopHeader>
      swipejobs logo here
      <span>
        {firstName} {lastName}
      </span>
    </TopHeader>
  );
}

export default AppHeader;
