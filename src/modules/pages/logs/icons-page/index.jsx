import React, { useEffect, useState } from "react";
import { Card, Input, message, Tooltip, Empty } from "antd";
import { Icon } from "@iconify/react";
import axios from "axios";
import copy from "copy-to-clipboard";
import { Wrapper } from "./style";

const { Search } = Input;

const IconsPage = () => {
  const [iconQuery, setIconQuery] = useState("");
  const [iconTitle, setIconTitle] = useState("");
  const [icons, setIcons] = useState([]);
  const [isSticky, setIsSticky] = useState(false);
  const [copiedIconIndex, setCopiedIconIndex] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.pageYOffset;
      setIsSticky(currentScroll > 150);
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup function to prevent memory leaks
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = async (value) => {
    setIconTitle(value);

    if (!value.trim()) {
      message.warning("Please enter a search term");
      return;
    }

    try {
      const response = await axios.get(
        `https://api.iconify.design/search?query=${value}`
      );
      response.data.icons.length === 0 ? message.info("No icons found") : "";

      setIcons(response.data.icons);
      setIconQuery("");
    } catch (error) {
      message.error("Error fetching icons");
      console.error(error);
    }
  };

  const handleIconClick = (iconName, index) => {
    // Use the Clipboard API to copy text to the clipboard
    navigator.clipboard.writeText(iconName).then(
      () => {
        message.success(`Copied icon: ${iconName}`);
        setCopiedIconIndex(index);
        setTimeout(() => {
          setCopiedIconIndex(null);
        }, 2000);
      },
      (err) => {
        message.error("Failed to copy icon");
        console.error("Failed to copy text: ", err);
      }
    );

    // copy(iconName);
    // message.success(`Copied icon: ${iconName}`);
    // setCopiedIconIndex(index);

    // setTimeout(() => {
    //   setCopiedIconIndex(null);
    // }, 2000);
  };

  return (
    <Wrapper>
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <div className={`search-header ${isSticky ? "is-sticky" : ""}`}>
          <Search
            placeholder="Search icons"
            allowClear
            size="large"
            onSearch={handleSearch}
            style={{
              width: 600,
              boxShadow: "0 8px 24px #1a29470a, 0 2px 8px #1a294714;",
            }}
            value={iconQuery}
            onChange={(e) => setIconQuery(e.target.value)}
          />
        </div>

        <Card title={icons.length > 0 ? <h2>{iconTitle}</h2> : null}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-around",
              alignItems: "center",
              minHeight: "300px",
            }}
          >
            {icons.length === 0 ? (
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            ) : (
              icons.map((icon, index) => (
                <Tooltip key={index} title={icon}>
                  <div
                    className="custom-card"
                    onClick={() => handleIconClick(icon, index)}
                    style={{
                      cursor: "pointer",
                    }}
                  >
                    {copiedIconIndex === index ? (
                      <span className="copied-text">Copied!</span>
                    ) : (
                      <Icon
                        className="icon"
                        icon={icon}
                        width="30"
                        height="30"
                      />
                    )}
                  </div>
                </Tooltip>
              ))
            )}
          </div>
        </Card>
      </div>
    </Wrapper>
  );
};

export default IconsPage;
