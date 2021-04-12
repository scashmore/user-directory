import React from "react";
import API from "../utils/Api.js";
import "./styles.css";

class Users extends React.Component {
    state = {
        users: [],
        search: "",
        sort: "",
        col: ""
    };

    componentDidMount() {
        API.List()
            .then(res => {
                const userArr = res.data.results.map(user => {
                    return {
                        first: user.name.first,
                        last: user.name.last,
                        email: user.email,
                        dob: user.dob.date,
                        image: isSecureContext.picture.medium
                    };
                });
                this.setState({ users: userArr });
            })
            .catch(err => console.log(err));
    }
    handleSearchChange = s => {
        this.setState({ search: s.target.value});
    };

}