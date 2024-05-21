import { styled, css } from "styled-components";
import { DatePicker } from "antd";

const { RangePicker } = DatePicker;

export const RangePickerWrapper = styled(RangePicker)`
  &.ant-picker-range {
    padding-left: ${({ styleFlag }) => (styleFlag ? "4px" : "")};
  }
  &.ant-picker .ant-picker-input {
    width: ${({ styleFlag }) => (styleFlag ? "0" : "auto")};
    color: ${({ styleFlag }) => (styleFlag ? "#FFFFFF00" : "inherit")};
    padding-left: -16px;
  }
  &.ant-picker .ant-picker-separator {
    display: ${({ styleFlag }) => (styleFlag ? "none" : "inline-block")};
    padding-left: -16px;
  }
  &.ant-picker-range {
    .ant-picker-range-separator {
      padding: ${({ styleFlag }) => (styleFlag ? "0px" : "0px 8px")};
    }
  }

  &.ant-picker-range-separator {
    padding: ${({ styleFlag }) => (styleFlag ? "0px" : "8px")};
  }
  &.ant-picker .ant-picker-suffix {
    margin-inline-start: 7px;
  }
`;
