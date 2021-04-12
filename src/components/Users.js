import React from "react";
import API from "../utils/API.js";
import "./styles.css";

class UsersRow extends React.Component {
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
                        image: user.picture.medium
                    };
                });
                this.setState({ users: userArr });
            })
            .catch(err => console.log(err));
    }
    handleSearchChange = s => {
        this.setState({ search: s.target.value });
    };

    filter() {
        const search = this.state.search.toLowerCase();
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
                        <td>{new Date(user.dob).toDateString()}</td>
                    </tr>
                );
            });
    };

    getRow = col => {
        return this.state.col === col
            ? `clickable ${this.state.sortDirection}`
            : `clickable`;
    };

    handleDirectionChange = col => {
        this.state.col === col && this.state.sortDirection === "ascending"
            ? this.setState({ sortDirection: "descending", col: col })
            : this.setState({ sortDirection: "ascending", col: col });
    };

    sortUsers = (x, y) => {
        if (x[this.state.col] < y[this.state.col]) {
            return this.state.sortDirection === "ascending" ? -1 : 1;
        } else if (x[this.state.col] > y[this.state.col]) {
            return this.state.sortDirection === "ascending" ? 1 : -1;
        }
        return 0;
    };

    render() {
        return (
          <>
            <div className="">
              <div className=""></div>
              <input
                onChange={this.handleSearchChange}
                type="search"
                className="form"
                placeholder="Search"
              />
              </div>
        <div className="">
          <table className="">
            <thead>
              <tr>
                <th scope="col">Image</th>
                <th scope="col">
                  <span
                    className={this.getRow("first")}
                    onClick={() => {
                      this.handleDirectionChange("first");
                    }}
                  >
                    First
                  </span>
                </th>
                <th scope="col">
                  <span
                    className={this.getRow("last")}
                    onClick={() => this.handleDirectionChange("last")}
                  >
                    Last
                  </span>
                </th>
                <th scope="col">
                  <span
                    className={this.getRow("email")}
                    onClick={() => this.handleDirectionChange("email")}
                  >
                    Email
                  </span>
                </th>
                <th scope="col">
                  <span
                    className={this.getRow("dob")}
                    onClick={() => this.handleDirectionChange("dob")}
                  >
                    DOB
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>{this.renderUsers()}</tbody>
          </table>
        </div>
      </>
    );
  }
};

export default { UsersRow }