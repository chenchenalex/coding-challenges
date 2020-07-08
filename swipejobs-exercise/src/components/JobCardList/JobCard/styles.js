import styled from "styled-components";

export const StyledJobCard = styled.div`
  background-color: white;
  max-width: 370px;
  margin: 0 auto;
`;

export const StyledJobDescription = styled.div`
  padding: 0 15px 0;

  .heading {
    background: var(--green);
    display: flex;
    margin: 0 -15px;
    padding: 10px 15px;
    justify-content: space-between;

    > div {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: space-between;
      font-weight: bold;

      .heading_label {
        color: black;
        margin: 0;
        font-size: 12px;
      }
      .heading_value {
        color: white;
        font-size: 26px;
      }
    }
  }

  section {
    display: flex;
    padding: 10px 0;

    &:not(:last-child) {
      border-bottom: 1px solid var(--lightGrey);
    }

    .icon {
      padding: 15px 15px 15px 0;
    }
    .content {
      text-align: left;
      p {
        margin: 0 0 5px;
      }
      p.title {
        font-weight: bold;
        font-size: 14px;
        margin-bottom: 5px;
      }
    }
  }
`;

export const StyledJobHeading = styled.div`
  text-align: left;
  h1 {
    font-size: 18px;
    margin: 5px 15px;
  }

  h2 {
    font-size: 14px;
    margin: 5px 15px;
  }
`;
