import axios from "axios";

export async function getUser(token: string) {
  try {
    const response = await axios.get("/api/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return null;
  }
}
