import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors'

const app = express();

// app.use(cors());
app.use(cors({
    origin: 'https://jazzfry-c0727.web.app', // 🔒 only allow your frontend
}));


app.get('/api/check-iframe', async (req, res) => {
    const {
        url
    } = req.query;
    if (!url) return res.status(400).json({
        error: 'Missing url parameter'
    });

    try {
        const response = await fetch(url, {
            redirect: 'follow',
            method: 'GET'
        });
        const xfo = response.headers.get('x-frame-options');
        const csp = response.headers.get('content-security-policy');

        let frameAllowed = true;
        if (xfo && xfo.toLowerCase() !== 'allowall') frameAllowed = false;
        if (csp && csp.toLowerCase().includes('frame-ancestors')) {
            const policy = csp.toLowerCase();
            if (policy.includes("'none'") || policy.includes("'self'")) frameAllowed = false;
        }

        res.json({
            url,
            frameAllowed,
            xfo,
            csp,
            status: response.status
        });
    } catch (err) {
        res.json({
            url,
            frameAllowed: false,
            error: err.message
        });
    }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`✅ Backend running on port ${PORT}`));
