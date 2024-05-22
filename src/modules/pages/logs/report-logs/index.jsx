import React, { useEffect, useRef, useState } from "react";

import { Button, Card, Input, Select } from "antd";
import { Wrapper } from "./style";

const { Option } = Select;

const ReportLogs = () => {
  const [cards, setCards] = useState([{ key: 0 }]);
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
    const newKey = cards.length;
    setCards([...cards, { key: newKey }]);
    setNumCards(numCards + 1);
  };

  const removeCard = (index) => {
    setCardRemove(true);
    setNumCards(numCards - 1);
    const newCards = cards.filter((_, i) => i !== index);
    setCards(newCards);

    updateCardHeight();
  };

  console.log(cardRemove, "card Remove");

  const updateCardHeight = () => {
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

          lineRefs.current[index].style.height = cardRemove
            ? `${currentCardHeight}px`
            : `${maxCardHeight}px`;
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

        setCardRemove(false);
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

  // useEffect(() => {
  //   updateCardHeight();
  //   setCardRemove(false);
  // }, [cards, numCards]);

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
            {/* <Button onClick={() => removeCard(index)}>-</Button> */}
            {index === cards.length - 1 && (
              <div className="button-wrapper">
                <Button onClick={() => removeCard(index)}>-</Button>
                <Button onClick={addCard}>+</Button>
              </div>
            )}
          </div>
        ))}

        {/* <Button onClick={addCard}>+</Button> */}
      </div>
    </Wrapper>
  );
};

export default ReportLogs;

const CardComponent = ({ onBodyChange, handleChange, selectedValue }) => {
  const [cardBody, setCardBody] = useState([{ key: 0 }]);

  const cardRef = useRef();

  const addCard = () => {
    const newKey = cardBody.length;
    setCardBody([...cardBody, { key: newKey }]);
  };

  const removeCard = (index) => {
    const newCards = cardBody.filter((_, i) => i !== index);
    setCardBody(newCards);
  };

  useEffect(() => {
    if (cardRef.current) {
      console.log("card body ref");
      onBodyChange();
    }
  }, [cardBody, onBodyChange]);

  return (
    <Card title="My Card" ref={cardRef}>
      {cardBody.map((card, index) => (
        <div key={card.key}>
          <CardBody selectedValue={selectedValue} handleChange={handleChange} />
          {/* <Button onClick={() => removeCard(index)}>-</Button> */}
          {index === cardBody.length - 1 && (
            <div className="button-wrapper">
              <Button onClick={() => removeCard(index)}>-</Button>
              <Button onClick={addCard}>+</Button>
            </div>
          )}
        </div>
      ))}
      {/* <Button onClick={addCard}>+</Button> */}
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
