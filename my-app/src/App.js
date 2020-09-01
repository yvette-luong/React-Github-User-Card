import React from "react";
import axios from "axios";
import "./App.css";
import FollowList from "./FollowList";

class App extends React.Component {
  state = {
    github: [],
    text: "",
    error: "",
    followers: [],
  };

  componentDidMount() {
    axios
      .get("https://api.github.com/users/yvette-luong")
      .then((res) => {
        this.setState({
          github: res.data,
        });
        console.log(res);
      })
      .catch((err) => console.log(err));

    axios
      .get("https://api.github.com/users/yvette-luong/followers")
      .then((res) => {
        this.setState({
          followers: res.data,
        });
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }

  handleChange = (e) => {
    this.setState({
      text: e.target.value,
    });
  };

  fetchUser = (e) => {
    e.preventDefault();
    axios
      .get(`https://api.github.com/users/${this.state.text}`)
      .then((res) => {
        this.setState({
          github: res.data,
          error: "",
        });
      })

      .catch((err) => {
        this.setState({
          error: "User could not be found. Please try again",
        });
      });

    axios
      .get(`https://api.github.com/users/${this.state.text}/followers`)
      .then((res) => {
        this.setState({
          followers: res.data,
        });
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <div className="Search-bar">
            {/* search for users */}
            <h3>Search for User</h3>
            <form>
              <input
                type="text"
                value={this.state.text}
                onChange={this.handleChange}
              />
              <button onClick={this.fetchUser}>Search</button>
            </form>
            {this.state.error && (
              <p style={{ color: "red" }}>{this.state.error}</p>
            )}
          </div>

          <div className="Profile-card">
            <h4>{this.state.github.name}</h4>
            <div className="profileInfo">
              <img
                src={this.state.github.avatar_url}
                alt="Profile Picture"
              />
              <p>Username: {this.state.github.login}</p>
              <p>Created account at: {this.state.github.created_at}</p>
              <p>{this.state.github.bio}</p>
              <p>Location: {this.state.github.location}
                <a href={this.state.github.html_url}>
                {this.state.github.html_url}
                </a>
              </p>
              
              <p>Followers: {this.state.github.followers}</p>
            </div>
          </div>

          <div className="followers-card">
            <h3>Followers</h3>
            <div className="cards">
              {this.state.followers.map((item) => (
                <FollowList key={item.id} item={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default App;
