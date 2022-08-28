export default defineEventHandler(async (e) => {
    deleteCookie(e, "quickpaste_auth");
    deleteCookie(e, "logged_in");

    await sendRedirect(e, useRuntimeConfig().public.webAddress);
});