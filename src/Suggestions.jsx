import axios from "axios";
import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";

function Suggestions() {
  const [profile, setProfile] = useState(null);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    // Fetch user profile
    fetch("http://localhost:3000/profile")
      .then((data) => data.json())
      .then((ref) => setProfile(ref))
      .catch((err) => console.log(err));

    // Fetch suggestions
    fetch("http://localhost:3000/suggestions")
      .then((data) => data.json())
      .then((suggestionsData) => {
        // ✅ Fetch followers list from the backend
        fetch("http://localhost:3000/followers")
          .then((res) => res.json())
          .then((followers) => {
            const updatedData = suggestionsData.map((user) => ({
              ...user,
              isFollowing: followers.some((f) => f.id === user.id), // ✅ Set `isFollowing` based on real data
            }));

            setSuggestions(updatedData);
            localStorage.setItem("followState", JSON.stringify(updatedData));
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }, []);

  const handleFollow = async (id, username) => {
    try {
      let updatedState = [...suggestions];

      const user = updatedState.find((u) => u.id === id);
      if (user.isFollowing) {
        // ✅ If already followed, send an unfollow request
        await axios.delete(`http://localhost:3000/followers/${id}`);
      } else {
        // ✅ If not followed, send a follow request
        await axios.post("http://localhost:3000/followers", { id, username });
      }

      // ✅ Update UI dynamically
      updatedState = updatedState.map((user) =>
        user.id === id ? { ...user, isFollowing: !user.isFollowing } : user
      );

      setSuggestions(updatedState);
      localStorage.setItem("followState", JSON.stringify(updatedState));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="w-75 m-4 suggestions">
        {profile ? (
          <div className="d-flex mt-4 align-items-center">
            <img
              className="rounded-circle dp"
              src={profile.profileImage}
              alt="profile-pic"
            />
           <div className="d-flex flex-column ">
              <span className="fw-bold" style={{fontSize:"14px"}}>{profile.username}</span>
              <span style={{fontSize:"13px"}} className="secondary" >^.Mohammed ali.^</span>
           </div>
            <small className="ms-auto text-primary " style={{cursor:"pointer"}}><p className="hover-navy" >Switch</p></small>
          </div>
        ) : (
          <p>Loading...</p>
        )}

        <div className="d-flex mt-3">
          <p className="fw-medium secondary " style={{fontSize:"14px"}}>Suggested for you</p>
          <b className="ms-auto fw-medium hover-grey " style={{fontSize:"14px",cursor:"pointer"}}>See All</b>
        </div>

        {suggestions.length > 0 ? (
          <div>
            {suggestions.map((suggestion) => (
              <div className="my-3 mt-2" key={suggestion.id}>
                <div className="d-flex align-items-center">
                  <img
                    className="rounded-circle dp"
                    src={suggestion.profileImage}
                    alt="profile-pic"
                  />
                 <div>
                 <div className="d-flex flex-column">
                 <small className="fw-bold">{suggestion.username}</small>
                 <small className="text-muted">Suggested for you</small>
                 </div>
                 </div>
                  <a  style={{cursor:"pointer"}}
                    onClick={() =>
                      handleFollow(suggestion.id, suggestion.username)
                    }
                    className="text-primary  text-decoration-none ms-auto"
                  >
                   <small> {suggestion.isFollowing ? (<p className="hover-grey text-dark" >Following</p>) : (<p className=" hover-navy" >Follow</p>)}</small>
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
}

export default Suggestions;
