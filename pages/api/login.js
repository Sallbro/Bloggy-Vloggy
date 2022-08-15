import cookie from 'cookie';

export default function handler(req, res) {
    res.setHeader("set-cookie", cookie.serialize("token", req.body.token, {
        httpOnly: true,
        maxAge: 60 * 5,
    }));
    res.json(({ success: true }));
}