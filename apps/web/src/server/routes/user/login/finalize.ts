export default defineEventHandler(async (e) => {
    setCookie(e, "logged_in", "1");

    await sendRedirect(e, "http://localhost:3000");
});