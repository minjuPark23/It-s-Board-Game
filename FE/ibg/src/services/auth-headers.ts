// Access protected resources -> HTTP needs authorization header

export default function authHeader() {
  const user = JSON.parse(localStorage.getItem("user") || "Default Value");
  if (user && user.accessToken) {
    return { Authorization: "Bearer " + user.accessToken };
  } else {
    return {};
  }
}
