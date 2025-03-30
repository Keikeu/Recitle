import axios from "axios";
import { getSession } from "./auth";

const API_URL_BASE = process.env.REACT_APP_API_URL;

export default async function callApi(url, method = "get", data, initHeaders = {}) {
  const urlToUse = `${API_URL_BASE}/${url}`;

  try {
    const session = await getSession();
    const accessToken = session.accessToken.jwtToken;

    const headers = {
      ...initHeaders,
      Authorization: `Bearer ${accessToken}`,
    };

    const config = {
      url: urlToUse,
      method,
      data,
      headers,
    };

    const response = await axios(config);
    return response.data;
  } catch {
    // unauthenticated user
    const config = {
      url: urlToUse,
      method,
      data,
      headers: initHeaders,
    };

    const response = await axios(config);
    return response.data;
  }
}
