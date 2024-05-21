import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { Button, Card, Input, Select } from "antd";
import { Wrapper } from "./style";

const { Option } = Select;

const ReportLogs = () => {
  const [cards, setCards] = useState([<CardComponent key={0} />]);

  const addCard = () => {
    const newKey = cards.length;
    setCards([...cards, <CardComponent key={newKey} />]);
  };

  const removeCard = (index) => {
    const newCards = cards.filter((_, i) => i !== index);
    setCards(newCards);
  };

  useEffect(() => {
    const cardElements = document.querySelectorAll(".card-wrapper");
    cardElements.forEach((cardElement, index) => {
      if (cardElement) {
        const height = cardElement.getBoundingClientRect().height;
        console.log(height, "height");
        const lineElement = document.querySelector(".line");
        if (lineElement && index > 0) {
          lineElement.style.height = height + "px";
          lineElement.style.top = -90 + "px";
        }
      }
    });
  }, [cards]);

  return (
    <Wrapper>
      <div className="card-container">
        {cards.map((card, index) => (
          <div key={index} className="card-wrapper">
            {card}
            {index > 0 && <div className="line" />}
            <Button onClick={() => removeCard(index)}>-</Button>
          </div>
        ))}
        <Button onClick={addCard}>+</Button>
      </div>
    </Wrapper>
  );
};
export default ReportLogs;

const CardComponent = () => {
  const [cardBody, setCardBody] = useState([<CardBody key={0} />]);

  const addCard = () => {
    const newKey = cardBody.length;
    setCardBody([...cardBody, <CardBody key={newKey} />]);
  };

  const removeCard = (index) => {
    const newCards = cardBody.filter((_, i) => i !== index);
    setCardBody(newCards);
  };
  return (
    <Card title="My Card">
      {cardBody.map((card, index) => (
        <div key={index}>
          {card}
          <Button onClick={() => removeCard(index)}>-</Button>
        </div>
      ))}
      <Button onClick={addCard}>+</Button>
    </Card>
  );
};

const CardBody = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        gap: "30px",
      }}
    >
      <Input placeholder="Input 1" style={{ marginBottom: 8 }} />
      <Select defaultValue="Option 1">
        <Option value="Option 1">Option 1</Option>
        <Option value="Option 2">Option 2</Option>
        <Option value="Option 3">Option 3</Option>
      </Select>
      <Input placeholder="Input 2" />
    </div>
  );
};
