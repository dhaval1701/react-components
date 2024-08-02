import React, { useState, useRef } from "react";
import dayjs from "dayjs";
import { Wrapper } from "./style";
import { Badge, Card, Space, theme } from "antd";
import AntDropdown from "../../../components/ant-dropdown";
import processValue from "../../../components/marketplace-value";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import * as htmlToImage from "html-to-image";
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from "html-to-image";
import { useSelector } from "react-redux";
import { useOutletContext } from "react-router-dom";

const Cards = () => {
  const { token } = theme.useToken();
  const [selectedFormat, setSelectedFormat] = useState("png");
  // const { auth } = useSelector((state) => state);

  const { auth } = useOutletContext();

  console.log(auth, "auth");

  const divRef = useRef(null);

  const [selectedContent, setSelectedContent] = useState("");

  const handleSelection = () => {
    // Logic to handle selection
    const selection = window.getSelection();

    if (selection) {
      const selectedText = selection.toString();
      setSelectedContent(selectedText);
    }
  };

  // Functionality to perform on selected content
  const performFunctionality = () => {
    // Example: Alert the selected content
    alert(selectedContent);
  };

  const handleExport = () => {
    var element = document.getElementById("capture-div");
    var canvas = document.createElement("canvas");
    canvas.width = element.offsetWidth;
    canvas.height = element.offsetHeight;
    html2canvas(element, {}).then(function (canvas) {
      var ctx = canvas.getContext("2d");
      ctx.drawImage(canvas, 0, 0);
      var dataURL = canvas.toDataURL();

      const img = document.createElement("img");
      img.src = dataURL;

      const link = document.createElement("a");
      link.download = `screenshot.${selectedFormat}`;
      link.href = dataURL;
      link.click();
      // document.body.appendChild(img);
    });

    // html2canvas(divRef.current, { backgroundColor: "#f5f5f5" }).then(
    //   (canvas) => {
    //     if (selectedFormat === "pdf") {
    //       // Export as PDF
    //       const pdf = new jsPDF();
    //       const imgData = canvas.toDataURL("image/png");
    //       const pdfWidth = pdf.internal.pageSize.getWidth();
    //       const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    //       console.log(pdfWidth, "pdfWidth");
    //       console.log(pdfHeight, "pdfHeight");
    //       pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    //       pdf.save("screenshot.pdf");
    //     } else {
    //       // Convert canvas to image data
    //       const imgData = canvas.toDataURL(`image/${selectedFormat}`);

    //       // Export as the selected format
    //       const link = document.createElement("a");
    //       link.download = `screenshot.${selectedFormat}`;
    //       link.href = imgData;
    //       link.click();
    //     }
    //   }
    // );
  };

  const handleFormatChange = (event) => {
    setSelectedFormat(event.target.value);
  };

  const handleExport2 = () => {
    htmlToImage
      .toPng(divRef.current)
      .then(function (dataUrl) {
        // Create an anchor element
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = "screenshot.png";

        // Trigger the download
        link.click();
      })
      .catch(function (error) {
        console.error("Error:", error);
      });
  };

  return (
    <Wrapper onMouseUp={handleSelection}>
      <select value={selectedFormat} onChange={handleFormatChange}>
        <option value="png">PNG</option>
        <option value="jpg">JPG</option>
        <option value="pdf">PDF</option>
      </select>
      <button onClick={handleExport}>Export</button>
      {/* <button onClick={handleExport2}>Export</button> */}
      <div id="capture-div" ref={divRef}>
        <Space
          direction="vertical"
          size="middle"
          style={{
            width: "100%",
          }}
        >
          <div className="col-12 mt-5">
            <div className="row">
              <div className="col-sm-6 col-lg-6 col-xl-2">
                <Card className="custom-card">
                  <div className="custom-card-inner">
                    <div className="custom-card-front">
                      <div className="d-flex justify-content-start align-items-start h6">
                        Number 1
                      </div>

                      <div className="d-flex justify-content-end align-items-end">
                        {processValue(
                          "23.322",
                          "TR",
                          "%",
                          true,
                          {
                            width: 16,
                            height: 16,
                            color: "red",
                            borderRadius: "2px",
                          },
                          { fontSize: "25px" },
                          "left"
                        )}
                      </div>
                    </div>

                    {/* <div className="custom-card-back">
                      <p>This is example of percentage</p>
                    </div> */}
                  </div>
                </Card>
              </div>

              <div className="col-sm-6 col-lg-6 col-xl-2">
                <Card>
                  <div className="d-flex justify-content-center align-items-center h6">
                    Number 2
                  </div>

                  <div className="d-flex justify-content-center align-items-center ">
                    {processValue(
                      3023.33,
                      "FR",
                      "£",
                      true,
                      {
                        color: "green",
                        borderRadius: "2px",
                      },
                      { color: "", fontWeight: "bold", fontSize: "25px" }
                    )}
                  </div>
                </Card>
              </div>

              <div className="col-sm-6 col-lg-6 col-xl-2">
                <Card className="custom-card">
                  <div className="d-flex justify-content-end align-items-center h6">
                    Number 3
                  </div>

                  <div className="d-flex justify-content-start align-items-center ">
                    {processValue(
                      1234.56,
                      "IT",
                      "£",
                      true,
                      {
                        width: 16,
                        height: 16,
                        color: "red",
                        borderRadius: "2px",
                      },
                      { fontSize: "25px" },
                      false
                    )}
                  </div>
                </Card>
              </div>

              <div className="col-sm-6 col-lg-6 col-xl-2">
                <Card className="text-center">
                  <div className="d-flex justify-content-end align-items-center h6">
                    Number Custom
                  </div>

                  <div className="d-flex justify-content-start align-items-center ">
                    {processValue(
                      -43437.912,
                      "USA",
                      "$",
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                      >
                        <path d="M0 0h24v24H0z" fill="none" />
                        <path d="M11 15h2v2h-2zm0-8h2v6h-2zm1-5.5C7.86.5 5.5 2.86 5.5 6c0 1.57.62 3.07 1.74 4.19L12 21.19l4.76-4.76L17.5 10c1.12-1.12 1.74-2.62 1.74-4.19 0-3.14-2.36-5.5-5.5-5.5zm3.5 8.09L12 18.59l-3.5-3.5A3.978 3.978 0 0 1 5.5 6c0-.56.11-1.09.31-1.59L12 13.42l4.19-4.19c.2.5.31 1.03.31 1.59 0 1.71-.79 3.27-2.09 4.5z" />
                      </svg>,
                      {},
                      { fontSize: "25px" }
                    )}
                  </div>
                </Card>
              </div>

              {/* <div className="col-sm-6 col-lg-6 col-xl-4">
              <Card>
                <AntDropdown
                  width={320}
                  apiProps={{
                    endpoint: "endpoint.com",
                    keyName: ["documents", "images"],
                  }}
                  showList={true}
                  closeDropdown={false}
                ></AntDropdown>
              </Card>
            </div> */}
            </div>
          </div>

          <div className="col-12 mt-5">
            <div className="row">
              <div className="col-sm-6 col-lg-6 col-xl-2">
                <div
                  className="card1"
                  style={{ backgroundColor: token.colorBgContainer }}
                >
                  <div className="d-flex flex-column justify-content-center align-items-end p-3">
                    <div>
                      {processValue(
                        "23.322",
                        "TR",
                        "%",
                        true,
                        {
                          width: 16,
                          height: 16,
                          color: "red",
                          borderRadius: "2px",
                        },
                        { fontSize: "25px" },
                        "left"
                      )}
                    </div>

                    <div
                      className=""
                      style={{
                        color: "#6c757d",
                        fontSize: "13px",
                        fontWeight: 700,
                        letterSpacing: "0.7px",
                      }}
                    >
                      PERCENTAGE
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-sm-6 col-lg-6 col-xl-4">
                <div
                  className="card1"
                  style={{ backgroundColor: token.colorBgContainer }}
                >
                  <div className="position-relative overflow-hidden">
                    <div
                      className="d-flex  justify-content-end align-items-start p-3"
                      style={{
                        color: "#6c757d",
                        fontSize: "13px",
                        fontWeight: 700,
                        letterSpacing: "0.7px",
                      }}
                    >
                      CURRENCY
                    </div>

                    <div className="text-center pb-5 pt-3">
                      <div>
                        {processValue(
                          3023.33,
                          "FR",
                          "£",
                          true,
                          {
                            color: "green",
                            borderRadius: "2px",
                          },
                          { fontWeight: "bold", fontSize: "25px" }
                        )}
                      </div>
                    </div>

                    <div className="position-absolute badge" style={{}}>
                      This is badge
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-sm-6 col-lg-6 col-xl-2">
                <div
                  className="card1"
                  style={{ backgroundColor: token.colorBgContainer }}
                >
                  <div className="py-5 text-center">
                    <div className="">
                      {processValue(
                        1234.56,
                        "IT",
                        "£",
                        true,
                        {
                          width: 16,
                          height: 16,
                          color: "red",
                          borderRadius: "2px",
                        },
                        { fontSize: "25px" },
                        false
                      )}
                    </div>

                    <div
                      style={{
                        color: "#6c757d",
                        fontSize: "13px",
                        fontWeight: 700,
                        letterSpacing: "0.7px",
                      }}
                    >
                      CURRENCY
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-sm-6 col-lg-6 col-xl-2">
                <div
                  className="card1"
                  style={{ backgroundColor: token.colorBgContainer }}
                >
                  <div
                    className="text-center"
                    style={{
                      backgroundColor: token.colorFillSecondary,
                      padding: "5px",
                    }}
                  >
                    <p>Number Custom</p>
                  </div>

                  <div className="d-flex justify-content-center align-items-center p-3">
                    {processValue(
                      -43437.912,
                      "USA",
                      "$",
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                      >
                        <path d="M0 0h24v24H0z" fill="none" />
                        <path d="M11 15h2v2h-2zm0-8h2v6h-2zm1-5.5C7.86.5 5.5 2.86 5.5 6c0 1.57.62 3.07 1.74 4.19L12 21.19l4.76-4.76L17.5 10c1.12-1.12 1.74-2.62 1.74-4.19 0-3.14-2.36-5.5-5.5-5.5zm3.5 8.09L12 18.59l-3.5-3.5A3.978 3.978 0 0 1 5.5 6c0-.56.11-1.09.31-1.59L12 13.42l4.19-4.19c.2.5.31 1.03.31 1.59 0 1.71-.79 3.27-2.09 4.5z" />
                      </svg>,
                      {},
                      { fontSize: "25px" }
                    )}
                  </div>
                </div>
              </div>

              <div className="col-sm-6 col-lg- col-xl-2 m-5">
                <div
                  className="card position-relative"
                  style={{
                    backgroundColor: "#e7fef2",
                    minHeight: "240px",
                  }}
                >
                  <div
                    className="position-absolute"
                    style={{
                      bottom: -76,
                      // left: 10,
                      right: -10,
                      opacity: 0.3,
                      // transform: "rotate(180deg)",
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 36 36"
                      fill="#0bdb6f"
                      width={180}
                    >
                      <path d="M12 19H14V6.00003L20.3939 8.74028C20.7616 8.89786 21 9.2594 21 9.65943V19H23V21H1V19H3V5.6499C3 5.25472 3.23273 4.89659 3.59386 4.73609L11.2969 1.31251C11.5493 1.20035 11.8448 1.314 11.9569 1.56634C11.9853 1.63027 12 1.69945 12 1.76941V19Z"></path>
                    </svg>
                  </div>

                  <div
                    className="position-absolute"
                    style={{
                      bottom: -76,
                      // left: 10,
                      right: -60,
                      opacity: 0.3,
                      // transform: "rotateY(145deg)",
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 36 36"
                      fill="#08aa56"
                      width={180}
                    >
                      <path d="M12 19H14V6.00003L20.3939 8.74028C20.7616 8.89786 21 9.2594 21 9.65943V19H23V21H1V19H3V5.6499C3 5.25472 3.23273 4.89659 3.59386 4.73609L11.2969 1.31251C11.5493 1.20035 11.8448 1.314 11.9569 1.56634C11.9853 1.63027 12 1.69945 12 1.76941V19Z"></path>
                    </svg>
                  </div>

                  <div
                    className="position-absolute"
                    style={{
                      bottom: -42,
                      // left: 10,
                      right: 10,
                      opacity: 0.7,
                      // transform: "rotateY(145deg)",
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 36 36"
                      fill="#044925"
                      width={100}
                    >
                      <path d="M21 19H23V21H1V19H3V4C3 3.44772 3.44772 3 4 3H14C14.5523 3 15 3.44772 15 4V19H17V9H20C20.5523 9 21 9.44772 21 10V19ZM7 11V13H11V11H7ZM7 7V9H11V7H7Z"></path>
                    </svg>
                  </div>

                  <div
                    className="position-absolute"
                    style={{
                      bottom: -62,
                      // left: 10,
                      right: 62,
                      opacity: 0.5,
                      // transform: "rotateY(145deg)",
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 56 56"
                      fill="#044925"
                      width={100}
                    >
                      <path d="M20 20C20 20.5523 19.5523 21 19 21H5C4.44772 21 4 20.5523 4 20V11H1L11.3273 1.6115C11.7087 1.26475 12.2913 1.26475 12.6727 1.6115L23 11H20V20ZM12 17L15.3588 13.6412C16.2374 12.7625 16.2374 11.3379 15.3588 10.4592C14.4801 9.58056 13.0555 9.58056 12.1768 10.4592L12 10.636L11.8232 10.4592C10.9445 9.58056 9.51992 9.58056 8.64124 10.4592C7.76256 11.3379 7.76256 12.7625 8.64124 13.6412L12 17Z"></path>
                    </svg>
                  </div>
                  <div className="d-flex flex-column justify-content-start align-items-center fs-2 py-3 fw-semibold">
                    Mumbai
                  </div>
                </div>
              </div>

              <div className="col-sm-6 col-lg-6 col-xl-2">
                <Card>
                  <AntDropdown
                    width={320}
                    apiProps={{
                      endpoint: "endpoint.com",
                      keyName: ["documents", "images"],
                    }}
                    showList={true}
                    closeDropdown={false}
                  ></AntDropdown>
                </Card>
              </div>
            </div>
          </div>
        </Space>
      </div>
    </Wrapper>
  );
};

export default Cards;
