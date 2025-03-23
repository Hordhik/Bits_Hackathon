const API_URL = "http://localhost:5001/api/events";

export const fetchEvents = async () => {
  const response = await fetch(`${API_URL}`);
  if (!response.ok) throw new Error("Error fetching events");
  return await response.json();
};
