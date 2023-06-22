export default defineNuxtRouteMiddleware((to, from) => {
    console.log("hit middleware");
    const loggedIn = useCookie("logged_in").value;
    if (loggedIn != "1") {
        return navigateTo('/login')
    }
})