// This file is for all external API methods
import { USER_ID, WORKER_API } from "../constants";

export async function getUserProfile() {
  try {
    const response = await fetch(`${WORKER_API}/${USER_ID}/profile`);
    return await response.json();
  } catch (e) {
    return {};
  }
}
