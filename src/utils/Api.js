import axios from "axios";

function List() {
  return axios.get("https://randomuser.me/api/?results=250");
};

export default { List };