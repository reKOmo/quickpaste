function parseQuery(q: string): unknown {
    if (!q) return {};
    const data = q.split("&");
    const ob: { [key: string]: string } = {};
    data.forEach(s => {
        const param = s.split("=");
        ob[param[0]] = param[1];
    });

    return ob;
}

export default defineEventHandler(async (e) => {
    const query = parseQuery(e.node.req.url!.split('?')[1]) as any;

    const failedLogin = query["fail"];

    if (failedLogin) {
        await sendRedirect(e, "/login?failedLogin=1");
        return;
    } else {
        setCookie(e, "logged_in", "1");

        await sendRedirect(e, "/");
    }

});