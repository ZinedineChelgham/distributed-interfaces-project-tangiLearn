export const BACKEND_URL =
  import.meta.env.VITE_BACKEND_URL ?? "http://192.168.1.14:3000";
export const API_URL = `${BACKEND_URL}/api`;
// Get the IP address and port separately
const ipAddress = BACKEND_URL.substring(0, BACKEND_URL.lastIndexOf(":"));

export const GAME_URL_MAPPER = {
  pipe: import.meta.env.PROD
    ? `${BACKEND_URL}/pipe-game/`
    : "http://localhost:5173/",
  tower: import.meta.env.PROD
    ? `${BACKEND_URL}/tower-game/`
    : "http://localhost:5174/",
};
