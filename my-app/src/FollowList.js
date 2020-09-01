import React from "react";

const FollowList = (props) => {
    return (
    <div className= 'follower-list'>
        <img src={props.item.avatar_url}/>
        <p>Name: {props.item.login}</p>
       
        <p>Loacation: <a href={props.item.html_url}>{props.item.html_url}</a></p>
    </div>
    )
  }

  export default FollowList; 