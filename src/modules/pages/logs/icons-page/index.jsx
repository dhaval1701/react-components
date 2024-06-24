import React, { useEffect, useState } from "react";
import { Card, Input, message, Tooltip, Empty } from "antd";
import { Icon } from "@iconify/react";
import axios from "axios";
import { Wrapper } from "./style";

const { Search } = Input;

const IconsPage = () => {
  const [iconQuery, setIconQuery] = useState("");
  const [iconTitle, setIconTitle] = useState("");
  const [icons, setIcons] = useState([]);

  const [isSticky, setIsSticky] = useState(false);

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

  console.log(icons, "icons");

  return (
    <Wrapper>
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <div className={`search-header ${isSticky ? "is-sticky" : ""}`}>
          <Search
            placeholder="Search icons"
            //   enterButton="Search"
            allowClear
            size="large"
            onSearch={handleSearch}
            style={{ width: 600 }}
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
                  <div className="custom-card">
                    <Icon icon={icon} width="30" height="30" />
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
