import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { RangePickerWrapper } from "./style";
import { Button } from "antd";

const generateUniqueId = () => {
  const randomString = Math.random().toString(36).substr(2, 9);
  return `rangePicker_${randomString}`;
};

const RangePickerComponent = (props) => {
  const {
    id = generateUniqueId(),
    value: propValue = null,
    wantCustomRange: customRangeValue = false,
    presets: propPresets,
    wantDateRange = true,
    onChange = () => {},
    ...rest
  } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [customRange, setCustomRange] = useState(customRangeValue);
  const [isCustomRangeSelected, setIsCustomRangeSelected] = useState(false);
  const [value, setValue] = useState(propValue);

  useEffect(() => {
    setValue(propValue);
  }, [propValue]);

  const handleClear = () => {
    setValue(null);
    onChange([null, null]);
  };

  const getDefaultPresets = () => {
    const defaultPresets = [
      {
        label: "Today",
        value: [dayjs(), dayjs()],
      },
      {
        label: "Yesterday",
        value: [dayjs().subtract(1, "day"), dayjs().subtract(1, "day")],
      },
      {
        label: "Last 7 Days",
        value: [dayjs().subtract(7, "day"), dayjs()],
      },
      {
        label: "Last 14 Days",
        value: [dayjs().subtract(14, "day"), dayjs()],
      },
      {
        label: "Last 30 Days",
        value: [dayjs().subtract(30, "day"), dayjs()],
      },
      {
        label: "Last 90 Days",
        value: [dayjs().subtract(90, "day"), dayjs()],
      },
    ];

    if (customRange) {
      defaultPresets.push({
        label: "Custom Range",
        value: null,
      });
    }

    return defaultPresets;
  };

  const rangePresets = propPresets || getDefaultPresets();

  const getformat = (date) => {
    return dayjs(date).format("YYYY-MM-DD");
  };

  useEffect(() => {
    if (propPresets) {
      setCustomRange(false);
    }

    const element = document
      .getElementsByClassName(id)?.[0]
      ?.getElementsByClassName("ant-picker-presets");

    if (element) {
      const pickerFooter = document
        .getElementsByClassName(id)?.[0]
        ?.getElementsByClassName("ant-picker-footer")[0];

      pickerFooter.style.display = "none";

      // Logic to find active preset
      let isActive = (rangePresets || []).findIndex((d) => {
        const presetsDates = d?.value;
        return (
          getformat(presetsDates?.[0]?.$d) === getformat(value?.[0]?.$d) &&
          getformat(presetsDates?.[1]?.$d) === getformat(value?.[1]?.$d)
        );
      });

      // If custom range is selected, set isActive to -1
      if (isCustomRangeSelected) {
        isActive = -1;
        const pickerFooter = document
          .getElementsByClassName(id)?.[0]
          ?.getElementsByClassName("ant-picker-footer")[0];

        pickerFooter.style.display = "flex";
        pickerFooter.style.justifyContent = "flex-end";
        pickerFooter.style.padding = "5px";
      }

      // Highlight selected preset
      const nodes = document
        .getElementsByClassName(id)?.[0]
        ?.getElementsByClassName("ant-picker-presets")?.[0]
        ?.childNodes?.[0]?.childNodes;
      const rangeList =
        isActive === -1 ? nodes?.[nodes?.length - 1] : nodes?.[isActive];

      // Check if selected preset is not "Custom Range" and add class
      const selectedPreset = rangePresets[isActive] || {};
      if (selectedPreset.label !== "Custom Range") {
        const pickerDropdown = document
          .getElementsByClassName(id)?.[0]
          ?.getElementsByClassName("ant-picker-dropdown")[0];
        pickerDropdown?.classList.add("preset-selected");
      }

      // Show/hide picker panels based on custom range selection
      const pickerPanels = document
        .getElementsByClassName(id)?.[0]
        ?.getElementsByClassName("ant-picker-panels")[0];

      if (!customRange) {
        pickerPanels.style.display = "none";
      } else {
        pickerPanels.style.display = isCustomRangeSelected ? "block" : "none";
      }

      // Remove highlighting from previously selected preset
      const pastSelected = document
        .getElementsByClassName(id)?.[0]
        ?.querySelectorAll(".antd_selected_presets_date");
      pastSelected?.[0]?.classList.remove("antd_selected_presets_date");

      // Highlight the selected preset
      rangeList?.classList.add("antd_selected_presets_date");

      // Event handler for last li click
      const handleLastLiClick = (event) => {
        if (customRange) {
          const lastLi = document
            .getElementsByClassName(id)?.[0]
            ?.getElementsByClassName("ant-picker-presets")[0]
            .querySelector("ul li:last-child");

          console.log(lastLi, "last li clicked ");

          if (lastLi) {
            // Remove highlighting from previously selected preset
            const highlightedPreset = document
              .getElementsByClassName(id)?.[0]
              ?.querySelector(".antd_selected_presets_date");
            highlightedPreset?.classList.remove("antd_selected_presets_date");

            // Highlight the selected preset
            lastLi.classList.add("antd_selected_presets_date");

            // Show picker panels
            const pickerPanels = document
              .getElementsByClassName(id)?.[0]
              ?.getElementsByClassName("ant-picker-panels")[0];
            pickerPanels.style.display = !customRange ? "none" : "block";

            event.stopPropagation();

            if (!isCustomRangeSelected) {
              // Set custom range to true
              setIsCustomRangeSelected(true);
            }
          }
        }
      };

      // Event handler for preset click
      const handlePresetClick = (event) => {
        const lastLi = document
          .getElementsByClassName(id)?.[0]
          ?.getElementsByClassName("ant-picker-presets")[0]
          .querySelector("ul li:last-child");

        if (lastLi) {
          console.log(lastLi, "lastLi");
          lastLi?.classList.remove("antd_selected_presets_date");
        }

        // Remove highlighting from previously selected preset
        const highlightedPreset = document
          .getElementsByClassName(id)?.[0]
          ?.querySelector(".antd_selected_presets_date");
        highlightedPreset?.classList.remove("antd_selected_presets_date");

        // Highlight the selected preset
        event.target.classList.add("antd_selected_presets_date");

        // Hide picker panels if not custom range
        const pickerPanels = document
          .getElementsByClassName(id)?.[0]
          ?.getElementsByClassName("ant-picker-panels")[0];
        pickerPanels.style.display = "none";

        if (isCustomRangeSelected) {
          // Set custom range to false
          setIsCustomRangeSelected(false);
        }
      };

      const pickerDropdown = document
        .getElementsByClassName(id)?.[0]
        ?.getElementsByClassName("ant-picker-presets");

      if (pickerDropdown.length > 0) {
        // Remove existing event listeners
        const presets = pickerDropdown[0].querySelectorAll(
          "ul li:not(:last-child)"
        );
        presets.forEach((preset) => {
          preset.removeEventListener("click", handlePresetClick);
          preset.addEventListener("click", handlePresetClick);
        });

        // Add event listener for last li
        const lastLi = pickerDropdown[0].querySelector("ul li:last-child");
        lastLi.addEventListener("click", handleLastLiClick);
      }

      // Cleanup event listener
      return () => {
        const pickerDropdown = document
          .getElementsByClassName(id)?.[0]
          ?.getElementsByClassName("ant-picker-presets");

        if (pickerDropdown) {
          const presets = pickerDropdown[0].querySelectorAll("ul li");
          presets.forEach((preset) => {
            preset.removeEventListener("click", handlePresetClick);
          });

          const lastLi = pickerDropdown[0].querySelector("ul li:last-child");
          if (lastLi && lastLi.hasEventListener) {
            lastLi.removeEventListener("click", handleLastLiClick);
            lastLi.hasEventListener = false;
          }
        }
      };
    }
  }, [isOpen, value, isCustomRangeSelected]);

  // }, [isOpen, value,isCustomRangeSelected, id, rangePresets, ]);
  return (
    <RangePickerWrapper
      id={id}
      popupClassName={id}
      value={value}
      presets={[...rangePresets]}
      open={isOpen}
      onOpenChange={() => setIsOpen(!isOpen)}
      allowClear={false}
      onChange={onChange}
      needConfirm={customRange && isCustomRangeSelected}
      format="YYYY-MM-DD"
      styleFlag={!wantDateRange}
      renderExtraFooter={() => (
        <>
          {customRange && isCustomRangeSelected && (
            <>
              {" "}
              <Button
                size="small"
                style={{ marginRight: "-15px", marginTop: "9px" }}
                onClick={handleClear}
              >
                Clear
              </Button>
            </>
          )}
        </>
      )}
      {...rest}
    />
  );
};

export default RangePickerComponent;
