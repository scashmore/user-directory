import React from "react";
import API from "../utils/Api.js";
import "./styles.css";

class User extends React.Component {
    state = {
        users: [],
        search: "",
        sort: "",
        col: ""
    };
};