export const BACKEND_URL =
  import.meta.env.BACKEND_URL ?? "http://localhost:3000";
export const API = `${BACKEND_URL}/api`;
// Get the IP address and port separately
const ipAddress = BACKEND_URL.substring(0, BACKEND_URL.lastIndexOf(":"));

export const GAME_URL_MAPPER = {
  pipe: `${ipAddress}:5173/`,
  tower: `${ipAddress}:5172/`,
};
