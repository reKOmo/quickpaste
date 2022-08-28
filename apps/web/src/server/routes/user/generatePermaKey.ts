export default defineEventHandler(async (e) => {

    const authCookie = useCookies(e)["quickpaste_auth"];

    const res = await fetch(useRuntimeConfig().authServiceAddress + "/keys/generate", {
        method: "GET",
        headers: {
            "Authorization": "ApiKey " + authCookie
        }
    });

    //prepare response
    e.res.statusCode = res.status;

    res.headers.forEach((key, value) => {
        e.res.setHeader(value, key);
    });

    return await res.text();
});