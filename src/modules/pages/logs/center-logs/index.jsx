import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Card,
  Layout,
  Menu,
  Statistic,
  Table,
  Row,
  Col,
  Tooltip,
} from "antd";
import { v4 as uuidv4 } from "uuid";
import { Wrapper } from "../report-logs/style";

const { Header, Sider, Content } = Layout;

const CenterLogs = () => {
  const [cards, setCards] = useState([1]);

  const cardRefs = useRef([]);

  // numbers.splice(2, 0, 3);
  // console.log(numbers); // Output: [1, 2, 3, 4, 5]

  const addCard = (index) => {
    const highestCardNumber = Math.max(...cards, 0);
    const newCardNumber = highestCardNumber + 1;

    if (cards.length > 0) {
      // Insert new card before the card at the specified index
      const newCards = [...cards];
      newCards.splice(index + 1, 0, newCardNumber);
      setCards(newCards);
    } else {
      setCards([...cards, newCardNumber]);
    }
  };

  const removeCard = (index) => {
    setCards(cards.filter((card, i) => card !== index));
  };

  return (
    <Wrapper>
      <Row gutter={16}>
        {cards.map((card, index) => (
          <Col key={index} span={6}>
            <CardComponent
              index={index}
              title={card}
              length={cards.length}
              onAdd={() => addCard(index)}
              onRemove={() => removeCard(card)}
            />
          </Col>
        ))}
      </Row>

      <Card title="Card Overflow" style={{ width: 200 }}>
        <div style={{ margin: "20px" }}>
          <h2>WithOut Row Value and Tooltip</h2>
          <OverflowText row={2} rule={false}>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laboriosam
            impedit quaerat vel illum, magnam quod. Dicta beatae eligendi facere
            magnam?
          </OverflowText>

          <h2>With Row Value and Tooltip</h2>
          <OverflowText row={2} rule={true} placement={"bottom"}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque iure
            vitae id error, amet assumenda nulla! Quam, iure, veritatis commodi
            unde perspiciatis ea tempora ipsum corporis placeat eligendi
            praesentium vitae! Pariatur commodi saepe quaerat rem cum numquam
            mollitia culpa distinctio!
          </OverflowText>

          <h2>With Tooltip</h2>
          <OverflowText rule={true}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </OverflowText>
        </div>
      </Card>
    </Wrapper>
  );
};

export default CenterLogs;

const CardComponent = ({ index, title, length, onAdd, onRemove }) => {
  return (
    <Card title={`Card ${title}`}>
      <p>This is a simple card with add and remove buttons.</p>
      <Button onClick={onAdd}>Add</Button>
      {length > 1 && <Button onClick={onRemove}>Remove</Button>}
    </Card>
  );
};

const OverflowText = ({ row = 1, rule, children, placement }) => {
  const style = {
    // width: "500px", // Default width
    whiteSpace: row ? "normal" : "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    border: "1px solid #ccc",
    maxHeight: row ? `${row * 1.6}em` : "none",
    display: "-webkit-box",
    WebkitLineClamp: row,
    WebkitBoxOrient: "vertical",
  };

  const content = <div style={{ width: "fit-content" }}>{children}</div>;

  return (
    <Tooltip title={rule ? content : ""} placement={placement || "topLeft"}>
      <div style={style}>{children}</div>
    </Tooltip>
  );
};
