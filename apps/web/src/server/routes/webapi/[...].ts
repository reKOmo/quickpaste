/* eslint-disable @typescript-eslint/ban-ts-comment */
export default defineEventHandler(async (e) => {

    const destRoute = e.req.url.replace("webapi", "api");

    const headers = e.req.headers;

    const runtimeConfig = useRuntimeConfig();

    // @ts-ignore
    const authCookie = useCookies(e)["quickpaste_auth"];
    headers["authorization"] = "ApiKey " + authCookie;

    try {
        const res = await fetch(runtimeConfig.internalGatewayAddress + destRoute, {
            method: e.req.method,
            // @ts-ignore
            headers,
            body: ["GET", "DELETE", "TRACE", "OPTIONS", "HEAD"].includes(e.req.method) ? undefined : await useRawBody(e)
        });
        //prepare response
        e.res.statusCode = res.status;

        res.headers.forEach((key, value) => {
            e.res.setHeader(value, key);
        });

        return await res.text();
    } catch (err) {
        console.log(err);
        console.log(runtimeConfig.internalGatewayAddress);
        console.log(destRoute);
    }

});