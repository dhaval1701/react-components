export const extractData = (response, dataLocation) => {
  try {
    const dataKeys = dataLocation.split(".");
    let responseData = response;

    // Traverse through each key in the dataLocation path
    for (const key of dataKeys) {
      // Check if the key contains "?", indicating optional chaining
      if (key.includes("?")) {
        const [actualKey, fallbackKey] = key.split("?");
        responseData = responseData?.[actualKey] || responseData?.[fallbackKey];
      } else {
        // No optional chaining, directly access the property
        responseData = responseData?.[key];
      }

      // If the current responseData is undefined, break the loop
      if (responseData === undefined) {
        break;
      }
    }

    return responseData || [];
  } catch (error) {
    console.error("Error occurred while getting data from response:", error);
    return [];
  }
};

export const ConvertParams = (values) => {
  return Object.entries(
    Object.entries(values)
      .filter(([_, value]) => value !== null)
      .reduce((acc, [key, value]) => {
        acc[key] = encodeURIComponent(value);
        return acc;
      }, {})
  )
    ?.map((d, i) => {
      return `${i === 0 ? "?" : "&"}${d[0]}=${d[1] || ""}`;
    })
    ?.join("");
};
