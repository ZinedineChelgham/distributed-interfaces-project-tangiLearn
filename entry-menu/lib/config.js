export const BASE_URL = "http://localhost:3000";
export const API = `${BASE_URL}/api`;
// Get the IP address and port separately
const ipAddress = BASE_URL.substring(0, BASE_URL.lastIndexOf(":"));

export const GAME_URL_MAPPER = {
  pipe: `${ipAddress}:5174/`,
  tower: `${ipAddress}:5173/`,
};
