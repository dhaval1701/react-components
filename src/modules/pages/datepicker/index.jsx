import React, { useState } from "react";
import dayjs from "dayjs";
import { Wrapper } from "./style";
import { Badge, Card, Space } from "antd";
import RangePickerComponent from "../../../components/ant-rangepicker";

const DatePicker = () => {
  const [filters, setFilters] = useState({
    start_date: dayjs().add(-30, "d"),
    end_date: dayjs(),
  });
  const [filters2, setFilters2] = useState({
    start_date: dayjs().add(-7, "d"),
    end_date: dayjs(),
  });

  const [filters3, setFilters3] = useState({
    start_date: dayjs().add(-7, "d"),
    end_date: dayjs(),
  });

  const [filters4, setFilters4] = useState({
    start_date: dayjs().add(-7, "d"),
    end_date: dayjs(),
  });

  return (
    <Wrapper>
      <Space
        direction="vertical"
        size="middle"
        style={{
          width: "100%",
        }}
      >
        <Badge.Ribbon text="DatePicker" color="pink">
          <Card title="Without Date Value" size="small">
            <RangePickerComponent
              // id="id------11111"
              value={[filters?.start_date, filters?.end_date]}
              onChange={(e) => {
                const filters_ = filters;
                filters_.start_date = e?.[0];
                filters_.end_date = e?.[1];
                setFilters({ ...filters_ });
              }}
              wantCustomRange={true}
              wantDateRange={false}
            />
          </Card>
        </Badge.Ribbon>

        <Badge.Ribbon text="DatePicker" color="pink">
          <Card title="With Date Value and Custom Range" size="small">
            <RangePickerComponent
              // id="id------2222222"
              value={[filters2?.start_date, filters2?.end_date]}
              onChange={(e) => {
                const filters_ = filters2;
                filters_.start_date = e?.[0];
                filters_.end_date = e?.[1];
                setFilters2({ ...filters_ });
              }}
              wantCustomRange={true}
              wantDateRange={true}
            />
          </Card>
        </Badge.Ribbon>

        <Badge.Ribbon text="DatePicker" color="pink">
          <Card title="With Date Value and Without Custom Range" size="small">
            <RangePickerComponent
              // id="asin_dashboard_filter_range_picker2fdsaaa"
              value={[filters3?.start_date, filters3?.end_date]}
              onChange={(e) => {
                const filters_ = filters3;
                filters_.start_date = e?.[0];
                filters_.end_date = e?.[1];
                setFilters3({ ...filters_ });
              }}
              wantCustomRange={false}
              wantDateRange={true}
            />
          </Card>
        </Badge.Ribbon>

        <Badge.Ribbon text="DatePicker" color="pink">
          <Card
            title="Without Date Value and Without Custom Range"
            size="small"
          >
            <RangePickerComponent
              // id="asin_dashboard_filter_range_pickerfdasfasdsda"
              value={[filters4?.start_date, filters4?.end_date]}
              onChange={(e) => {
                const filters_ = filters4;
                filters_.start_date = e?.[0];
                filters_.end_date = e?.[1];
                setFilters4({ ...filters_ });
              }}
              wantCustomRange={false}
              wantDateRange={false}
            />
          </Card>
        </Badge.Ribbon>
      </Space>
    </Wrapper>
  );
};

export default DatePicker;
