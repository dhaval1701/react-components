import React, { useEffect, useRef, useState } from "react";

import { Button, Card, Input, Select } from "antd";
import { Wrapper } from "./style";

const { Option } = Select;

const ReportLogs = () => {
  const [cards, setCards] = useState([{ key: 0 }]);
  const [selectedValue, setSelectedValue] = useState("Circle");

  const handleChange = (value) => {
    setSelectedValue(value);
  };

  console.log(selectedValue, "selectedvalue");

  const cardRefs = useRef([]);
  const lineRefs = useRef([]);

  const addCard = () => {
    const newKey = cards.length;
    setCards([...cards, { key: newKey }]);
  };

  const removeCard = (index) => {
    const newCards = cards.filter((_, i) => i !== index);
    setCards(newCards);
  };

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

        const minCardHeight = Math.min(
          currentCardHeight,
          prevCardHeight,
          nextCardHeight
        );

        console.log(prevCardHeight, "prev card height");
        console.log(currentCardHeight, "current card height");

        // console.log(`Updated height of card-wrapper ${index}:`, maxCardHeight);

        if (lineRefs.current[index]) {
          console.log(
            `Updated height of line ${index}:`,
            lineRefs.current[index]
          );

          lineRefs.current[index].style.height = `${maxCardHeight}px`;
          lineRefs.current[index].style.top = `-${ref.offsetHeight / 2}px`;
          lineRefs.current[index].style.borderBottom = "none"; // Adjust color and thickness as needed

          // Apply ::before style
          // lineRefs.current[index].style.position = "relative"; // Ensure the parent is positioned
          // lineRefs.current[index].innerHTML = ""; // Clear existing content

          const beforeElement = document.createElement("div");

          if (selectedValue === "Circle") {
            beforeElement.style.content = '""';
            beforeElement.style.position = "absolute";
            beforeElement.style.top = "0";
            beforeElement.style.left = "-8px";
            beforeElement.style.width = "16px";
            beforeElement.style.height = "16px";
            beforeElement.style.backgroundColor = "black";
            beforeElement.style.borderRadius = "50%";
            beforeElement.style.transform = "translateY(-50%)";
          } else if (selectedValue === "Rectangle") {
            beforeElement.style.content = '""';
            beforeElement.style.position = "absolute";
            beforeElement.style.top = "0";
            beforeElement.style.left = "-8px";
            beforeElement.style.width = "16px";
            beforeElement.style.height = "8px"; // Adjust height for rectangle
            beforeElement.style.backgroundColor = "black";
            // No need for border-radius for rectangle
            beforeElement.style.transform = "translateY(-50%)";
          } else if (selectedValue === "None") {
            beforeElement.style.content = '""';
            beforeElement.style.position = "absolute";
            beforeElement.style.top = "0";
            beforeElement.style.left = "0";
            beforeElement.style.width = "100%";
            beforeElement.style.height = "1px"; // Adjust height for dash
            beforeElement.style.backgroundColor = "black";
            // No need for border-radius for dash
            beforeElement.style.transform = "translateY(-50%)";
          }

          // beforeElement.style.content = '""';
          // beforeElement.style.position = "absolute";
          // beforeElement.style.top = "0";
          // beforeElement.style.left = "-8px";
          // beforeElement.style.width = "16px";
          // beforeElement.style.height = "16px";
          // beforeElement.style.backgroundColor = "black";
          // beforeElement.style.borderRadius = "50%";
          // beforeElement.style.transform = "translateY(-50%)";

          lineRefs.current[index].appendChild(beforeElement);
        }

        // if (index === 0) {
        //   if (lineRefs.current[index]) {
        //     lineRefs.current[index].style.borderTop = "1px solid black"; // Adjust color and thickness as needed
        //   }
        // }

        // Check if the current index is the last index
        if (index === cardRefs.current.length - 1) {
          // Perform the operation for the last index
          console.log("This is the last index:", index);

          // Add border-bottom style to the last lineRef
          if (lineRefs.current[index - 1]) {
            lineRefs.current[index - 1].style.height = `${
              (currentCardHeight + prevCardHeight) / 2
            }px`;
            lineRefs.current[index - 1].style.borderBottom = "1px solid black"; // Adjust color and thickness as needed
          }
        }
      }
    });
  };

  // useEffect(() => {
  //   updateCardHeight();
  // }, [cards]);

  return (
    <Wrapper>
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
            <Button onClick={() => removeCard(index)}>-</Button>
          </div>
        ))}
        <Button onClick={addCard}>+</Button>
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
          <Button onClick={() => removeCard(index)}>-</Button>
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
      <Select defaultValue={selectedValue} onChange={handleChange}>
        <Option value="Circle">Circle</Option>
        <Option value="Rectangle">Rectangle 2</Option>
        <Option value="None">None</Option>
      </Select>
      <Input placeholder="Input 2" />
    </div>
  );
};
