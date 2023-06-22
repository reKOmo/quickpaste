export default defineNuxtRouteMiddleware((to, from) => {
    const loggedIn = useCookie("logged_in").value;
    if (loggedIn != "1") {
        return navigateTo('/login')
    }
})