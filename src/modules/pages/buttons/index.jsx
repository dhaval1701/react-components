import { Button, ColorPicker, Modal, message } from "antd";
import { CopyOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import chroma from "chroma-js";
import Color from "color";

const ButtonPage = () => {
  const [selectedColor, setSelectedColor] = useState("#1677ff");
  const [colorShades, setColorShades] = useState([]);
  const [colors, setColors] = useState({
    50: "#f3f3ff",
    100: "#e9e9fe",
    200: "#d6d6fe",
    300: "#b8b6fc",
    400: "#958cf9",
    500: "#715df5",
    600: "#5d3ceb",
    700: "#4f2ad7",
    800: "#4122b5",
    900: "#3b209d",
    950: "#1f1164",
  });

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [generatedCSS, setGeneratedCSS] = useState("");

  const showModal = () => {
    setIsModalVisible(true);
    generateCSS();
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const generateCSS = () => {
    let cssVariables = ":root {\n";
    let cssClasses = "";

    colorShades.forEach((color) => {
      const variableName = `--color-${color.name}`;
      cssVariables += `  ${variableName}: ${color.color};\n`;
      cssClasses += `.bg-${color.name} { background-color: var(${variableName}); }\n\n`;
      cssClasses += `.text-${color.name} { color: var(${variableName}); }\n\n`;
    });

    cssVariables += "}\n\n";
    const fullCSS = cssVariables + cssClasses;
    setGeneratedCSS(fullCSS);
  };

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(generatedCSS)
      .then(() => {
        message.success("CSS copied to clipboard");
      })
      .catch(() => {
        message.error("Failed to copy CSS");
      });
  };

  console.log(generatedCSS, "generated css");

  useEffect(() => {
    generateShades(selectedColor);
  }, [selectedColor]);

  //   const generateShades = (color) => {
  //     const baseColor = Color(color);

  //     const shades = [
  //       { name: "50", color: baseColor.lighten(2).hex() },
  //       { name: "100", color: baseColor.lighten(1.8).hex() },
  //       { name: "200", color: baseColor.lighten(1.6).hex() },
  //       { name: "300", color: baseColor.lighten(1.4).hex() },
  //       { name: "400", color: baseColor.lighten(1.2).hex() },
  //       { name: "400", color: baseColor.lighten(1.2).hex() },
  //       { name: "500", color: baseColor.lighten(1).hex() },
  //       { name: "600", color: baseColor.lighten(0.8).hex() },
  //       { name: "700", color: baseColor.hex() }, // Base color
  //       { name: "800", color: baseColor.darken(0.2).hex() },
  //       { name: "900", color: baseColor.darken(0.4).hex() },
  //       { name: "950", color: baseColor.darken(0.6).hex() },
  //     ];

  //     const newColors = {
  //       50: baseColor.lighten(2.5).hex(),
  //       100: baseColor.lighten(2).hex(),
  //       200: baseColor.lighten(1.5).hex(),
  //       300: baseColor.lighten(1).hex(),
  //       400: baseColor.lighten(0.5).hex(),
  //       500: baseColor.hex(),
  //       600: baseColor.darken(0.2).hex(),
  //       700: baseColor.darken(0.4).hex(),
  //       800: baseColor.darken(0.6).hex(),
  //       900: baseColor.darken(0.8).hex(),
  //       950: baseColor.darken(1).hex(),
  //       1000: baseColor.darken(1.2).hex(),
  //     };

  //     setColors(newColors);
  //     setColorShades(shades);
  //   };

  const generateShades = (color) => {
    const baseColor = chroma(color);
    const luminance = baseColor.luminance();

    // Determine if the color is light or dark
    const isLight = luminance > 0.5;

    // Set gap values based on light or dark color
    const brightenAmount = isLight
      ? [3, 2.5, 2, 1.5, 1, 0.5, 0]
      : [4, 3, 2.5, 2, 1.5, 1, 0.5];
    const darkenAmount = isLight ? [0.5, 1, 1.5, 2, 2.5] : [0, 0.5, 1, 1.5, 2];

    const shades = [
      { name: "50", color: baseColor.brighten(brightenAmount[0]).hex() },
      { name: "100", color: baseColor.brighten(brightenAmount[1]).hex() },
      { name: "200", color: baseColor.brighten(brightenAmount[2]).hex() },
      { name: "300", color: baseColor.brighten(brightenAmount[3]).hex() },
      { name: "400", color: baseColor.brighten(brightenAmount[4]).hex() },
      { name: "500", color: baseColor.brighten(brightenAmount[5]).hex() },
      { name: "600", color: baseColor.brighten(brightenAmount[6]).hex() },
      { name: "700", color: baseColor.hex() }, // Base color
      { name: "800", color: baseColor.darken(darkenAmount[0]).hex() },
      { name: "900", color: baseColor.darken(darkenAmount[1]).hex() },
      { name: "950", color: baseColor.darken(darkenAmount[2]).hex() },
    ];

    const newColors = {
      50: baseColor.brighten(brightenAmount[0]).hex(),
      100: baseColor.brighten(brightenAmount[1]).hex(),
      200: baseColor.brighten(brightenAmount[2]).hex(),
      300: baseColor.brighten(brightenAmount[3]).hex(),
      400: baseColor.brighten(brightenAmount[4]).hex(),
      500: baseColor.brighten(brightenAmount[5]).hex(),
      600: baseColor.brighten(brightenAmount[6]).hex(),
      700: baseColor.hex(),
      800: baseColor.darken(darkenAmount[0]).hex(),
      900: baseColor.darken(darkenAmount[1]).hex(),
      950: baseColor.darken(darkenAmount[2]).hex(),
    };

    setColors(newColors);
    setColorShades(shades);
  };

  const colors1 = [
    { shade: 50, hex: "f3f3ff" },
    { shade: 100, hex: "e9e9fe" },
    { shade: 200, hex: "d6d6fe" },
    { shade: 300, hex: "b8b6fc" },
    { shade: 400, hex: "958cf9" },
    { shade: 500, hex: "715df5" },
    { shade: 600, hex: "5d3ceb" },
    { shade: 700, hex: "4f2ad7" },
    { shade: 800, hex: "4122b5" },
    { shade: 900, hex: "3b209d" },
    { shade: 950, hex: "1f1164" },
  ];

  //   const colors = {
  //     50: "#f3f3ff",
  //     100: "#e9e9fe",
  //     200: "#d6d6fe",
  //     300: "#b8b6fc",
  //     400: "#958cf9",
  //     500: "#715df5",
  //     600: "#5d3ceb",
  //     700: "#4f2ad7",
  //     800: "#4122b5",
  //     900: "#3b209d",
  //     950: "#1f1164",
  //   };

  console.log(colorShades, "colorShades");

  const getTextColor = (shade) => {
    return shade <= 300 ? "#3b209d" : "#e9e9fe";
  };

  return (
    <>
      <ColorPicker
        defaultValue={selectedColor}
        showText={(color) => (
          <span>Selected Color ({color.toHexString()})</span>
        )}
        onChange={(color) => setSelectedColor(color.toHexString())}
      />

      <div className="d-md-flex align-items-center mb-4 mt-4">
        <div className="h4 flex-grow-1 text-center text-md-start mb-3 mb-md-0">
          Color Shades
        </div>
        <div className="d-flex gap-2 justify-content-center">
          <button className="bg-500 text-white">Contrast grid</button>
          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={showModal}
          >
            Export
          </button>
          <button className="bg-400 text-50">Edit</button>
          <Button className="bg-600 text-100">Save</Button>
        </div>
      </div>

      <Modal
        title="Generated CSS"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div style={{ position: "relative" }}>
          <Button
            icon={<CopyOutlined />}
            onClick={copyToClipboard}
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              zIndex: 1,
            }}
          >
            Copy
          </Button>
          <div
            style={{
              height: "400px",
              overflowY: "scroll",
              border: "1px solid #ccc",
              borderRadius: "5px",
              padding: "10px",
            }}
          >
            <pre>{generatedCSS}</pre>
          </div>
        </div>
      </Modal>

      <div className="container">
        <div className="row g-1 rounded-3 overflow-hidden">
          {colorShades.map((shade) => (
            <div key={shade.name} className="col-12 col-md">
              <div
                className="p-3 h-100 d-flex flex-column justify-content-center"
                style={{ backgroundColor: shade.color }}
              >
                {shade.name === 950 && (
                  <span className="position-absolute top-0 start-50 translate-middle-x mt-2">
                    <i className="bi bi-lock"></i>
                  </span>
                )}
                <div className="text-center">
                  <div
                    className="fw-medium"
                    style={{
                      color:
                        chroma(shade.color).luminance() > 0.5 ? "#000" : "#fff",
                    }}
                  >
                    {shade.name}
                  </div>
                  <div
                    className="text-uppercase small opacity-75"
                    style={{
                      color:
                        chroma(shade.color).luminance() > 0.5 ? "#000" : "#fff",
                    }}
                  >
                    {shade.color}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="container mt-5">
        <h2 className="mb-4">Examples</h2>
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {/* Customers Card */}
          <div className="col">
            <div
              className="card h-100 shadow-sm"
              style={{ backgroundColor: colors[50], color: colors[900] }}
            >
              <div className="card-body position-relative">
                <h5
                  className="card-title"
                  style={{
                    color:
                      chroma(colors[50]).luminance() > 0.4 ? "#000" : "#fff",
                  }}
                >
                  Customers
                </h5>
                <div
                  className="position-absolute"
                  style={{
                    top: "6rem",
                    left: "-3.5rem",
                    width: "24rem",
                    height: "24rem",
                    borderRadius: "50%",
                    backgroundColor: colors[50],
                    filter: "blur(64px)",
                    opacity: 0.5,
                  }}
                ></div>
                {/* <div
                  className="position-absolute"
                  style={{
                    top: "-12rem",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "24rem",
                    height: "24rem",
                    borderRadius: "50%",
                    backgroundColor: colors[400],
                    filter: "blur(64px)",
                  }}
                ></div> */}
                <div
                  className="position-absolute"
                  style={{ top: "9rem", left: "1.5rem" }}
                >
                  <h1
                    className="display-4 fw-normal"
                    style={{
                      color:
                        chroma(colors[50]).luminance() > 0.4 ? "#000" : "#fff",
                    }}
                  >
                    1,553
                  </h1>
                  <p
                    // className="text-muted"
                    style={{
                      color:
                        chroma(colors[50]).luminance() > 0.4 ? "#000" : "#fff",
                    }}
                  >
                    New customers in past 30 days
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Revenue Card */}
          <div className="col">
            <div
              className="card h-100 shadow-sm"
              //   style={{ backgroundColor: colors[50], color: colors[900] }}
            >
              <div className="card-body">
                <h5 className="card-title">Revenue</h5>
                <p className="h3 fw-light mb-4">$12,543</p>
                <div
                  style={{
                    height: "200px",
                    borderBottom: `1px solid ${colors[300]}`,
                  }}
                >
                  {/* Chart placeholder */}
                  <div className="row h-100 align-items-end">
                    <div
                      className="col"
                      style={{ backgroundColor: colors[500], height: "80%" }}
                    ></div>
                    <div
                      className="col"
                      style={{ backgroundColor: colors[600], height: "100%" }}
                    ></div>
                    {/* Add more columns for other months */}
                  </div>
                </div>
                <div className="row mt-3 text-center">
                  <div className="col">Jan</div>
                  <div className="col">Feb</div>
                  <div className="col">Mar</div>
                  <div className="col">Apr</div>
                  <div className="col">May</div>
                  <div className="col">Jun</div>
                </div>
              </div>
            </div>
          </div>

          {/* Today's Schedule Card */}
          <div className="col">
            <div
              className="card h-100 shadow-sm"
              //   style={{ backgroundColor: colors[50], color: colors[900] }}
            >
              <div className="card-body">
                <h5 className="card-title">Today</h5>
                <div className="overflow-auto" style={{ maxHeight: "300px" }}>
                  <div
                    className="mb-3 p-3 rounded"
                    style={{ backgroundColor: colors[200] }}
                  >
                    <h6
                      className="mb-1"
                      style={{
                        color:
                          chroma(colors[200]).luminance() > 0.4
                            ? "#000"
                            : "#fff",
                      }}
                    >
                      Design system meeting
                    </h6>
                    <small
                      //   className="text-muted"
                      style={{
                        color:
                          chroma(colors[200]).luminance() > 0.4
                            ? "#000"
                            : "#fff",
                      }}
                    >
                      9 - 10 AM
                    </small>
                    <div className="mt-2">{/* Add avatar images here */}</div>
                  </div>
                  {/* Add more schedule items */}
                </div>
              </div>
            </div>
          </div>

          {/* Image Card */}
          <div className="col">
            <div
              className="card h-100 shadow-sm text-white"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1611244419377-b0a760c19719?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGFydGlzdHxlbnwwfHwwfHx8MA%3D%3D')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div
                className="card-body d-flex align-items-end"
                style={{
                  background: `linear-gradient(transparent 0%, ${colors[800]} 100%)`,
                }}
              >
                <h3 className="mb-0">
                  Create
                  <br />
                  <span style={{ color: colors[200] }}>color scales</span>
                  <br />
                  in seconds.
                </h3>
              </div>
            </div>
          </div>

          {/* Buttons Card */}
          <div className="col">
            <div
              className="card h-100 shadow-sm"
              //   style={{ backgroundColor: colors[50], color: colors[900] }}
            >
              <div className="card-body">
                <h5 className="card-title mb-4">Buttons · Flat</h5>
                <div className="d-grid gap-2">
                  <button
                    className="btn"
                    style={{ backgroundColor: colors[500], color: "white" }}
                  >
                    Default
                  </button>
                  <button
                    className="btn"
                    style={{ backgroundColor: colors[600], color: "white" }}
                  >
                    Hover
                  </button>
                  <button
                    className="btn"
                    style={{ backgroundColor: colors[700], color: "white" }}
                  >
                    Active
                  </button>
                  <button
                    className="btn"
                    style={{ backgroundColor: colors[100], color: colors[400] }}
                    disabled
                  >
                    Disabled
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Alert Card */}
          <div className="col">
            <div
              className="alert"
              style={{
                backgroundColor: colors[100],
                color: colors[900],
                borderColor: colors[400],
              }}
            >
              <div className="d-flex align-items-center">
                <div className="flex-shrink-0">
                  <div
                    className="rounded-circle p-2"
                    style={{ backgroundColor: colors[600] }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill={colors[100]}
                      className="bi bi-lightbulb"
                      viewBox="0 0 16 16"
                    >
                      <path d="M2 6a6 6 0 1 1 10.174 4.31c-.203.196-.359.4-.453.619l-.762 1.769A.5.5 0 0 1 10.5 13a.5.5 0 0 1 0 1 .5.5 0 0 1 0 1l-.224.447a1 1 0 0 1-.894.553H6.618a1 1 0 0 1-.894-.553L5.5 15a.5.5 0 0 1 0-1 .5.5 0 0 1 0-1 .5.5 0 0 1-.46-.302l-.761-1.77a1.964 1.964 0 0 0-.453-.618A5.984 5.984 0 0 1 2 6zm6-5a5 5 0 0 0-3.479 8.592c.263.254.514.564.676.941L5.83 12h4.342l.632-1.467c.162-.377.413-.687.676-.941A5 5 0 0 0 8 1z" />
                    </svg>
                  </div>
                </div>
                <div
                  className="ms-3"
                  style={{
                    color:
                      chroma(colors[100]).luminance() > 0.4 ? "#000" : "#fff",
                  }}
                >
                  Make sure you save your custom color scale.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ButtonPage;
