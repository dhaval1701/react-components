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

const Cards = () => {
  const { token } = theme.useToken();
  const [selectedFormat, setSelectedFormat] = useState("png");

  const divRef = useRef(null);

  const [selectedContent, setSelectedContent] = useState("");

  const handleSelection = () => {
    // Logic to handle selection
    const selection = window.getSelection();
    console.log(selection, "selection");
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
      console.log(dataURL);

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

                    <div className="custom-card-back">
                      <p>This is example of percentage</p>
                    </div>
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
                  // style={{ backgroundColor: token.colorBgContainer }}
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
