export default defineEventHandler(async (e) => {

    const authCookie = parseCookies(e)["quickpaste_auth"];

    const res = await fetch(useRuntimeConfig().authServiceAddress + "/keys/generate", {
        method: "GET",
        headers: {
            "Authorization": "ApiKey " + authCookie
        }
    });

    //prepare response
    e.node.res.statusCode = res.status;

    res.headers.forEach((key, value) => {
        e.node.res.setHeader(value, key);
    });

    return await res.text();
});