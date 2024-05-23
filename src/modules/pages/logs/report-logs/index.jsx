import React, { useEffect, useRef, useState } from "react";

import { Button, Card, Input, Select } from "antd";
import { Wrapper } from "./style";
import { v4 as uuidv4 } from "uuid";

const { Option } = Select;

const ReportLogs = () => {
  const [cards, setCards] = useState([{ key: uuidv4() }]);
  const [selectedValue, setSelectedValue] = useState("Circle");
  const [numCards, setNumCards] = useState(cards.length);
  const [cardRemove, setCardRemove] = useState(false);

  const handleChange = (value) => {
    setSelectedValue(value);
  };

  // console.log(selectedValue, "selectedvalue");

  const cardRefs = useRef([]);
  const lineRefs = useRef([]);

  const addCard = () => {
    setCards([...cards, { key: uuidv4() }]);
    setNumCards(numCards + 1);
  };

  console.log(cards, "cards");

  const removeCard = (cartToRemove, index) => {
    console.log(cartToRemove, "card to remove");
    setNumCards(numCards - 1);
    const newCards = cards.filter((card, i) => card?.key !== cartToRemove?.key);
    setCards(newCards);
  };

  console.log(cardRefs, "cardRefs");

  console.log(cardRemove, "cardRemove");

  const updateCardHeight = () => {
    console.log("update called");
    cardRefs.current.forEach((ref, index) => {
      if (ref) {
        const currentCardHeight = ref.offsetHeight;
        const prevCardHeight = cardRefs.current[index - 1]?.offsetHeight || 0;
        const nextCardHeight = cardRefs.current[index + 1]?.offsetHeight || 0;
        const maxCardHeight = Math.max(
          currentCardHeight,
          prevCardHeight,
          nextCardHeight
        );

        console.log(index, "index");

        console.log(numCards, "numCards");

        // console.log(`Updated height of card-wrapper ${index}:`, maxCardHeight);

        console.log(currentCardHeight, "current card height");

        console.log(maxCardHeight, "max card height");
        if (lineRefs.current[index]) {
          // console.log(
          //   `Updated height of line ${index}:`,
          //   lineRefs.current[index]
          // );

          lineRefs.current[index].style.height = `${maxCardHeight}px`;
          console.log(lineRefs.current[index].style.height, "line height");
          lineRefs.current[index].style.top = `-${ref.offsetHeight / 2}px`;
          lineRefs.current[index].style.borderBottom = "none"; // Adjust color and thickness as needed

          const content = document.createElement("div");

          // Remove all possible classes first
          content.classList.remove(
            "circle",
            "rectangle",
            "none",
            "triangle",
            "diamond"
          );

          // Add the appropriate class based on the selected value
          if (selectedValue === "Circle") {
            content.classList.add("circle");
          } else if (selectedValue === "Rectangle") {
            content.classList.add("rectangle");
          } else if (selectedValue === "None") {
            content.classList.add("none");
          } else if (selectedValue === "Triangle") {
            content.classList.add("triangle");
          } else if (selectedValue === "Diamond") {
            content.classList.add("diamond");
          }

          // Clear any existing content and append the new one
          lineRefs.current[index].innerHTML = "";
          lineRefs.current[index].appendChild(content);
        }

        // if (index === 0) {
        //   if (lineRefs.current[index]) {
        //     lineRefs.current[index].style.borderTop = "1px solid black"; // Adjust color and thickness as needed
        //   }
        // }

        // Check if the current index is the last index
        if (index < numCards && ref) {
          // Your existing logic for updating card heights goes here

          // Check if the current card is the last one
          if (index === numCards - 1) {
            // Apply style to the line before the last card
            if (lineRefs.current[index - 1]) {
              lineRefs.current[index - 1].style.height = `${
                (currentCardHeight + prevCardHeight) / 2
              }px`;
              lineRefs.current[index - 1].style.borderBottom =
                "1px solid black"; // Adjust color and thickness as needed
            }
          }
        }
      }
    });
  };

  useEffect(() => {
    updateCardHeight();
  }, [cards, selectedValue]);

  return (
    <Wrapper>
      <Select
        defaultValue={selectedValue}
        onChange={handleChange}
        style={{ minWidth: 300, marginBottom: 20 }}
        dropdownStyle={{ minWidth: 300 }}
      >
        <Option value="Circle">Circle</Option>
        <Option value="Rectangle">Rectangle 2</Option>
        <Option value="None">None</Option>
        <Option value="Triangle">Triangle </Option>
        <Option value="Diamond">Diamond </Option>
      </Select>
      <div className="card-container">
        {cards.map((card, index) => (
          <div
            ref={(el) => (cardRefs.current[index] = el)}
            key={card.key}
            className="card-wrapper"
          >
            <CardComponent
              title={`Card -${index}`}
              key={card.key}
              onBodyChange={updateCardHeight}
              handleChange={handleChange}
              selectedValue={selectedValue}
            />
            {index > 0 && (
              <div
                ref={(el) => (lineRefs.current[index - 1] = el)}
                key={card.key}
                className="line"
              />
            )}
            <Button onClick={() => removeCard(card, index)}>-</Button>
          </div>
        ))}

        <Button onClick={addCard}>+</Button>
      </div>
    </Wrapper>
  );
};

export default ReportLogs;

const CardComponent = ({
  onBodyChange,
  handleChange,
  selectedValue,
  title,
}) => {
  const [cardBody, setCardBody] = useState([{ key: uuidv4() }]);

  const cardRef = useRef();

  const addCard = () => {
    setCardBody([...cardBody, { key: uuidv4() }]);
  };

  const removeCard = (cartToRemove, index) => {
    const newCards = cardBody.filter(
      (card, i) => card?.key !== cartToRemove?.key
    );
    setCardBody(newCards);
  };

  useEffect(() => {
    if (cardRef.current) {
      console.log("card body ref");
      onBodyChange();
    }
  }, [cardBody]);

  return (
    <Card title={title} ref={cardRef}>
      {cardBody.map((card, index) => (
        <div key={card.key}>
          <CardBody selectedValue={selectedValue} handleChange={handleChange} />
          <Button onClick={() => removeCard(card, index)}>-</Button>
        </div>
      ))}
      <Button onClick={addCard}>+</Button>
    </Card>
  );
};

const CardBody = ({ handleChange, selectedValue }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        gap: "30px",
      }}
    >
      <Input placeholder="Circle" style={{ marginBottom: 8 }} />
      <Select
        defaultValue={"Rectangle"}
        //  defaultValue={selectedValue}
        //   onChange={handleChange}
      >
        <Option value="Circle">Circle</Option>
        <Option value="Rectangle">Rectangle 2</Option>
        <Option value="None">None</Option>
      </Select>
      <Input placeholder="Input 2" />
    </div>
  );
};
