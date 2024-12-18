export const setToken = (token: string | null) => {
  if (token) {
    localStorage.setItem("token", token);
  } else {
    localStorage.removeItem("token");
  }
};

export const setPvtKey = (key: string | null) => {
  if (key) {
    localStorage.setItem("privateKey", key);
  } else {
    localStorage.removeItem("privateKey");
  }
};
