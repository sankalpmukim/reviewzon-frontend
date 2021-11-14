export const handlePageChange = (
  classData,
  trainingLinks,
  testingLinks,
  navigate
) => {
  let sendData = {};
  // {"train": {"mode":1, "urls":[]}, "test": {"mode":2, "urls": ["","",""]}}
  // for training:
  if (classData.training === "" && classData.test === "") {
    alert("Please choose options from below!");
    return;
  }
  if (classData.training === "") {
    alert("Please choose options for training dataset from below!");
    return;
  }
  if (classData.test === "") {
    alert("Please choose options for testing dataset from below!");
    return;
  }
  if (classData.training === "automatic") {
    sendData = {
      ...sendData,
      train: {
        mode: 1,
        urls: [],
      },
    };
  } else {
    if (trainingLinks.length === 0) {
      alert("Please provide multiple links of products to test against.");
      return;
    }
    sendData = {
      ...sendData,
      train: {
        mode: 2,
        urls: trainingLinks,
      },
    };
  }
  if (classData.test === "automatic") {
    sendData = {
      ...sendData,
      test: {
        mode: 1,
        urls: [],
      },
    };
  } else {
    if (testingLinks.length === 0) {
      alert("Please provide multiple links of products to test against.");
      return;
    }
    sendData = {
      ...sendData,
      test: {
        mode: 2,
        urls: testingLinks,
      },
    };
  }
  const url = new URL(`http://127.0.0.1/progressdisplay`);
  url.searchParams.append(`data`, JSON.stringify(sendData));
  navigate(url.pathname + url.search);
};

export const validURL = (url) => {
  const parts = url.split("/");
  if (
    parts[0] === "https:" &&
    parts[2] === "www.amazon.in" &&
    parts.length > 5
  ) {
    return true;
  }
  return false;
};
