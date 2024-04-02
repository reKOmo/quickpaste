import { parseQuery } from "./finalize";


export default defineEventHandler(async (e) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const query: any = parseQuery(e.node.req.url!.split('?')[1]);
    console.log(query);
    if (!query.code) {
        await sendRedirect(e, "/user/login/finalize?fail=1", 302);
        return;
    }

    try {
        const res = await fetch(`https://github.com/login/oauth/access_token?client_secret=${useRuntimeConfig().githubClientSecret}&client_id=${useRuntimeConfig().githubClientId}&code=${query.code}`, {
            method: "POST",
            headers: {
                "Accept": "application/json"
            }
        });
        console.log(res)

        if (res.ok) {
            const data = await res.json();

            const internalRes = await fetch(useRuntimeConfig().authServiceAddress + '/user/login', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    type: "github",
                    token: data.access_token
                })
            });

            if (internalRes.ok) {
                const key = await internalRes.text();

                setCookie(e, "quickpaste_auth", key, {
                    httpOnly: true,
                });

                await sendRedirect(e, "/user/login/finalize", 302);
                return;
            } else {
                await sendRedirect(e, "/user/login/finalize?fail=1", 302);
                return;
            }
        } else {
            console.log(res)
            await sendRedirect(e, "/user/login/finalize?fail=1", 302);
        }
    } catch {
        await sendRedirect(e, "/user/login/finalize?fail=1", 302);
    }
});