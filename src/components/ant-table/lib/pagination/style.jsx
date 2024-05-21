import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  .ant-pagination-item {
    color: #5e6278 !important;
    border: 1px solid transparent !important;
    &:hover {
      color: #009ef7 !important;
    }
  }
  .ant-pagination-item-active {
    font-weight: 500;
    ${
      "" /* background: #7e78ef !important;
    border-color: transparent !important; */
    }
    color: #FFF !important;
    border-radius: 0.65rem !important;
    &:hover {
      color: #fff !important;
    }
  }
  .ant-pagination-item-link {
    color: #5e6278 !important;
    border-color: transparent !important;
    span {
      position: relative;
      top: -2px;
    }
    &:hover {
      color: #4318ff !important;
    }
  }
  .ant-pagination-item-active {
    ${
      "" /* background-color: #7e78ef !important;
    border-color: #7e78ef !important; */
    }
    color: #FFF !important;
  }
  .ant-pagination-item-active {
    background-color: var(--bs-primary) !important;
    border-color: var(--bs-primary)  !important;
  }
  .ant-pagination-item {
    &:hover {
      color: #4318ff !important;
      background-color: rgb(239 127 177 / 6%) !important;
    }
  }

  .ant-select .ant-select-selector {
    background-color:#f1effc !important
    border-radius: 0.65rem;
    // border: 1px solid #f1effc !important;
    color: #000 !important;
  }
  .ant-pagination-item-link span{
    top : 0px !important
  }
`;

export default Wrapper;
