
import axios from "axios";
const URL = "https://randomuser.me/api/?results=250";


function List() {
    return axios.get(URL);
};

export default { List }