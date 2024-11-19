import axios from "axios";
import config from "./config.json";

let error = {
  ERROR: "Something went wrong . Please try again",
};
export const getData = async (params) => {
  let apiUrl = params.url;
  // console.log(config.apiRoot + apiUrl);
  try {
    const response = await axios.get(config.apiRoot + apiUrl);
    //alert(JSON.stringify(response["SUCCESS"].data));
    if (response["data"].status == 200) {
      return response["data"];
    } else {
      return error;
    }
  } catch (error) {
    // handle error
    return error.message;
  }
};

export const postData = async (params) => {
  let apiUrl = params.url;
  let body = params.body;
  let fetchResponse = await fetch(config.apiRoot + apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: body,
  });
  try {
    const data = await fetchResponse.json();
    return data;
  } catch (error) {
    return error;
  }
};
