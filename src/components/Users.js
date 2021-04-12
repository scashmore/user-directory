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

    filter() {
        const search =this.state.search.toLowerCase();
        return this.state.user.filter(user => {
            return (
                user.first.toLowerCase().includes(search) ||
                user.last.toLowerCase().includes(search)
            );
        });
    }

    renderUsers = () => {
        return this.filter()
        .sort(this.sortUsers)
        .map((user, index) => {
            return (
                <tr key={index}>
                    <td>
                        <img src={user.image} alt="img"></img>
                    </td>
                    <td> 
                        {user.first}
                    </td>
                    <td> 
                        {user.last}
                    </td>
                    <td> 
                        {user.email}
                    </td>
                </tr>
            );
        });
    };
}