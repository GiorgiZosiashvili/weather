import axios from "axios";

const options = {
  method: "GET",
  url: "https://weatherapi-com.p.rapidapi.com/current.json",
  params: { q: "Tbilisi" },
  headers: {
    "X-RapidAPI-Key": "2e088ce01fmsh934fd4f9f5080b5p11a1a9jsne4a3e13c0943",
    "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
  },
};

try {
  const response = await axios.request(options);
  console.log(response.data);
} catch (error) {
  console.error(error);
}
