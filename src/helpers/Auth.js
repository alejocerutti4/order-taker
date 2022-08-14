export const isLoggedIn = () => {
    const token = localStorage.getItem("token") ? true : false;
    const email = localStorage.getItem("email") ? true : false;
    return token && email;
}