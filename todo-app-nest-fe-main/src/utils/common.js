export const logoutUser = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  window.location.href = "/login";
};

export const handleRedirection = () => {
  const isLoggedIn = !!localStorage.getItem("access_token");
  if (isLoggedIn) {
    window.location.href = "/";
  }
};
