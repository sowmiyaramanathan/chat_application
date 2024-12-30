import axios from "axios";

export function acceptRequest(id: any) {
  return axios.get(
    `http://localhost:8000/friends/acceptFriendRequest?from_user_id=${id}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
}

export function rejectRequest(id: any) {
  return axios.get(
    `http://localhost:8000/friends/rejectFriendRequest?from_user_id=${id}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
}

export const fetchRequests = () => {
  return axios.get("http://localhost:8000/friends/getFriendRequests", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};
