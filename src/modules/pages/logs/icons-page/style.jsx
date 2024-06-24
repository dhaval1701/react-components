import styled from "styled-components";

export const Wrapper = styled.div`
  .custom-card {
    margin: 8px;
    border: 2px dashed rgb(232, 232, 232);
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 160px;
    height: 90px;
  }

  .search-header {
    transform: translateY(40px);
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .custom-card:hover {
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  }

  @keyframes slideDown {
    from {
      transform: translateY(-100%);
    }
    to {
      transform: translateY(0);
    }
  }

  .is-sticky {
    position: sticky;
    top: 62px;
    z-index: 1;
    height: 85px;
    padding: 15px;
    transform: translateY(0px);
    backdrop-filter: blur(10px);
    animation: slideDown 0.35s ease-out;
  }
`;
