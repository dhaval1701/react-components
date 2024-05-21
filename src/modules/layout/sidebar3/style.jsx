import { styled, css, keyframes } from "styled-components";

const bounceAnimation = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
`;

const rotateAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const opacityAnimation = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
`;

const bounceAnimation1 = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0);
  }
`;

const shakeAnimation = keyframes`
  0% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-5px);
  }
  50% {
    transform: translateX(5px);
  }
  75% {
    transform: translateX(-5px);
  }
  100% {
    transform: translateX(0);
  }
`;

const swingAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(15deg);
  }
  50% {
    transform: rotate(-10deg);
  }
  75% {
    transform: rotate(5deg);
  }
  100% {
    transform: rotate(0deg);
  }
`;

const trailAnimation = keyframes`
  0% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateX(-20px);
  }
`;

const exampleAnimation = keyframes`
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
      transform: scale(1.2);
    }
`;

const jellyAnimation = keyframes`
  0% {
    transform: scale(1);
  }
  30% {
    transform: scale(1.25) rotate(-5deg);
  }
  60% {
    transform: scale(0.8) rotate(5deg);
  }
  100% {
    transform: scale(1) rotate(0deg);
  }
`;

const tadaAnimation = keyframes`
  0% {
    transform: scale(1);
  }
  10%, 20% {
    transform: scale(0.9) rotate(-3deg);
  }
  30%, 50%, 70%, 90% {
    transform: scale(1.1) rotate(3deg);
  }
  40%, 60%, 80% {
    transform: scale(1.1) rotate(-3deg);
  }
  100% {
    transform: scale(1) rotate(0deg);
  }
`;

export const Wrapper = styled.div`
  a {
    text-decoration: none;
    font-weight: 550;
    font-size: 0.995rem;
  }

  ${({ flag }) =>
    !flag &&
    css`
      .ant-layout-sider {
        background-size: cover;
        background-repeat: no-repeat;
        // margin: 15px;
        // background: #2a3650 !important;
        // .ant-menu-inline,
        // .ant-menu-sub {
        //   background: transparent !important;
        // }
        // .ant-menu-title-content {
        //   color: #ffff;
        // }
      }

      .ant-menu-item {
        color: #0d0c225c;
      }

      .ant-menu-submenu-title {
        font-weight: 550;
        font-size: 0.995rem;
        color: #0d0c225c;
      }

      .ant-menu-item-selected {
        color: #c41d7f;
      }

      .ant-menu-submenu .ant-menu-item {
        position: relative;
        overflow: visible;
        &::before {
          content: "";
          background: #9e9e9e;
          width: 1px;
          height: 50px;
          border-radius: 0px;
          position: absolute;
        }
      }

      .ant-menu .ant-menu-submenu-title:hover {
        color: #c41d7f;
      }

      .ant-menu .ant-menu-submenu-selected {
        .ant-menu-item-icon {
          animation: ${jellyAnimation} 0.5s ease;
        }
      }

      .ant-menu-item-selected {
        .ant-menu-item-icon {
          animation: ${jellyAnimation} 0.5s ease;
        }
      }
    `}
`;
