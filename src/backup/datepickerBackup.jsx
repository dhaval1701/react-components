import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { RangePickerWrapper } from "./style";

const RangePickerComponent = (props) => {
  const {
    id = Math.random(),
    value = null,
    wantDefaultPicker = false,
    wantAdvanceCustom = false,
    getDateValue,
    presets: propPresets, // New prop for presets
    wantDateRange = true,
    ...rest
  } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [isCustomRangeSelected, setIsCustomRangeSelected] = useState(false);

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

    if (wantAdvanceCustom) {
      defaultPresets.push({
        label: "Custom Range",
        value: null,
      });
    } else {
      defaultPresets.push({
        label: "Custom Range",
        value: [0, 0],
      });
    }

    return defaultPresets;
  };

  console.log(value, "value");

  console.log(isOpen, "isOpen");

  const rangePresets = propPresets || getDefaultPresets();

  const getformat = (date) => {
    return dayjs(date).format("YYYY-MM-DD");
  };

  useEffect(() => {
    console.log("1 useEffect");

    const element = document
      .getElementsByClassName(id)?.[0]
      ?.getElementsByClassName("ant-picker-presets");

    if (element) {
      // Logic to find active preset
      let isActive = (rangePresets || []).findIndex((d) => {
        const presetsDates = d?.value;
        return (
          getformat(presetsDates?.[0]?.$d) === getformat(value?.[0]?.$d) &&
          getformat(presetsDates?.[1]?.$d) === getformat(value?.[1]?.$d)
        );
      });

      console.log(isActive, "isActive");

      // If custom range is selected, set isActive to -1
      if (isCustomRangeSelected) {
        isActive = -1;
      }

      // Highlight selected preset
      const nodes = element?.[0]?.childNodes?.[0]?.childNodes;
      const rangeList =
        isActive === -1 ? nodes?.[nodes?.length - 1] : nodes?.[isActive];

      // Check if selected preset is not "Custom Range" and add class
      const selectedPreset = rangePresets[isActive] || {};
      if (selectedPreset.label !== "Custom Range") {
        const pickerDropdown = document.getElementsByClassName(
          "ant-picker-dropdown"
        )[0];
        pickerDropdown?.classList.add("preset-selected");
      }

      console.log(isCustomRangeSelected, "isCustomRangeSelected");

      // Show/hide picker panels based on custom range selection or wantDefaultPicker flag
      const pickerPanels =
        document.getElementsByClassName("ant-picker-panels")[0];
      pickerPanels.style.display =
        isCustomRangeSelected || wantDefaultPicker ? "block" : "none";

      // Remove highlighting from previously selected preset
      const pastSelected = document
        .getElementsByClassName(id)?.[0]
        ?.querySelectorAll(".antd_selected_presets_date");
      pastSelected?.[0]?.classList.remove("antd_selected_presets_date");

      // Highlight the selected preset
      rangeList?.classList.add("antd_selected_presets_date");
    }

    // Event handler for last li click
    const handleLastLiClick = (event) => {
      const lastLi = document
        .getElementsByClassName("ant-picker-presets")[0]
        .querySelector("ul li:last-child");

      if (lastLi && !wantDefaultPicker) {
        // Remove highlighting from previously selected preset
        const highlightedPreset = document.querySelector(
          ".antd_selected_presets_date"
        );
        highlightedPreset?.classList.remove("antd_selected_presets_date");

        console.log(highlightedPreset, "highlight preset");
        // Highlight the selected preset
        lastLi.classList.add("antd_selected_presets_date");

        console.log(lastLi, "lastLi");

        // Show picker panels
        const pickerPanels =
          document.getElementsByClassName("ant-picker-panels")[0];
        pickerPanels.style.display = "block";
        console.log("Last li clicked. Default behavior prevented.");

        event.stopPropagation();

        // Set custom range to true
        setIsCustomRangeSelected(true);

        // // Set value to custom range value
        // const customRangeIndex = rangePresets.findIndex(
        //   (preset) => preset.label === "Custom Range"
        // );
        // if (customRangeIndex !== -1) {
        //   console.log(
        //     rangePresets[customRangeIndex].value,
        //     "customrange value"
        //   );
        //   setValue(rangePresets[customRangeIndex].value);
        // }
      }
    };

    // // Event handler for preset click
    const handlePresetClick = (event) => {
      // Remove highlighting from previously selected preset
      const highlightedPreset = document.querySelector(
        ".antd_selected_presets_date"
      );
      highlightedPreset?.classList.remove("antd_selected_presets_date");

      // Highlight the selected preset
      event.target.classList.add("antd_selected_presets_date");

      // Hide picker panels if not custom range
      const pickerPanels =
        document.getElementsByClassName("ant-picker-panels")[0];
      pickerPanels.style.display = "none";

      // Set custom range to false
      setIsCustomRangeSelected(false);

      console.log("Preset clicked.");
    };

    const pickerDropdown =
      document.getElementsByClassName("ant-picker-presets");
    if (pickerDropdown.length > 0) {
      // // Remove existing event listeners
      const presets = pickerDropdown[0].querySelectorAll("ul li");
      presets.forEach((preset) => {
        preset.removeEventListener("click", handlePresetClick);
        preset.addEventListener("click", handlePresetClick);
      });

      // Add event listener for last li
      const lastLi = pickerDropdown[0].querySelector("ul li:last-child");
      if (!lastLi.hasEventListener) {
        lastLi.addEventListener("click", handleLastLiClick);
        lastLi.hasEventListener = true;
      } else if (lastLi.hasEventListener) {
        lastLi.removeEventListener("click", handleLastLiClick);
        lastLi.addEventListener("click", handleLastLiClick);
      }
    }

    // Cleanup event listener
    return () => {
      const pickerDropdown =
        document.getElementsByClassName("ant-picker-presets");
      if (pickerDropdown.length > 0) {
        const lastLi = pickerDropdown[0].querySelector("ul li:last-child");
        if (lastLi.hasEventListener) {
          lastLi.removeEventListener("click", handleLastLiClick);
          lastLi.hasEventListener = false;
        }
      }
    };
  }, [isOpen, value, rangePresets, isCustomRangeSelected, wantDefaultPicker]);

  return (
    <RangePickerWrapper
      id={id}
      popupClassName={id}
      value={value}
      presets={[...rangePresets]}
      open={isOpen}
      onOpenChange={() => setIsOpen(!isOpen)}
      allowClear={true}
      needConfirm={wantDefaultPicker || isCustomRangeSelected}
      format="YYYY-MM-DD"
      styleFlag={!false}
      {...rest}
    />
  );
};

// export default RangePickerComponent;
