function parseQuery(q: string): unknown {
    const data = q.split("&");
    console.log(data);
    const ob = {};
    data.forEach(s => {
        const param = s.split("=");
        ob[param[0]] = param[1];
    });

    return ob;
}

const clientSecret = "8cd0cca22136a416ab7dcecec2515c697ea6d0b2";
const clientId = "ed4a6c3a698773e1826d";

export default defineEventHandler(async (e) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const query: any = parseQuery(e.req.url.split('?')[1]);

    if (!query.code) {
        return "Code missing";
    }

    //todo move to services
    const res = await fetch(`https://github.com/login/oauth/access_token?client_secret=${clientSecret}&client_id=${clientId}&code=${query.code}`, {
        method: "POST",
        headers: {
            "Accept": "application/json"
        }
    });

    const data = await res.json();

    const internalRes = await fetch('http://localhost:4001/user/login', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            type: "github",
            token: data.access_token
        })
    });

    setCookie(e, "quickpaste_auth", await internalRes.text(), {
        httpOnly: true
    });

    await sendRedirect(e, "http://localhost:3000/user/login/finalize", 302);

    // return await internalRes.text();
});