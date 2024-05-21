import styled from "styled-components";

export const NotificationWrapper = styled.div`
  .notification-box {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }

  .notification-box li {
    display: flex;
    align-items: center;
    padding: 10px 0;
    border-bottom: 1px solid #e6e6e6;
  }

  .notification-box li:last-child {
    border-bottom: none;
  }

  .notification-box li img {
    width: 30px;
    height: 30px;
    margin-right: 10px;
  }

  .notification-box li h6 {
    margin: 0;
    font-size: 16px;
    font-weight: 600;
    color: #333;
  }

  .notification-box li p {
    margin: 0;
    font-size: 14px;
    color: #666;
  }

  .notification-box li a {
    color: inherit;
    text-decoration: none;
  }

  .notification-box li a:hover {
    text-decoration: underline;
  }
`;
