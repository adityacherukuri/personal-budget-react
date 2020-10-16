import axios from "axios";

// Get Chart Data
export const budgetData = () => {
  return axios({
    method: "get",
    url: "/budget",
  });
};
