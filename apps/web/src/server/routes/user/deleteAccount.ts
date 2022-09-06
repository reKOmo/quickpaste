export default defineEventHandler(async (e) => {

    const authCookie = useCookies(e)["quickpaste_auth"];

    const config = useRuntimeConfig();

    const authenticationRes = await fetch(config.authServiceAddress + "/keys/auth", {
        method: "GET",
        headers: {
            "Authorization": "ApiKey " + authCookie
        }
    });

    if (authenticationRes.ok) {
        const userId = authenticationRes.headers.get("authorization");

        await fetch(config.internalApiAddress + "/internalapi/user", {
            method: "DELETE",
            headers: {
                "X-User": userId
            }
        });

        await sendRedirect(e, config.public.webAddress + "/user/logout");
    } else {
        e.res.statusCode = authenticationRes.status;

        authenticationRes.headers.forEach((key, value) => {
            e.res.setHeader(value, key);
        });

        return await authenticationRes.text();
    }
});