/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import { setGlobalOptions } from "firebase-functions";
import * as functions from 'firebase-functions';
import fetch from 'node-fetch';


// import * as cors from "cors";
import cors from "cors";

const corsHandler = cors({ origin: true });

export const checkIframe = functions.https.onRequest((req, res) => {
    corsHandler(req, res, async () => {
        const url = req.query.url as string;
        if (!url) {
            res.status(400).json({ error: "Missing URL" });
            return;
        }

        try {
            const response = await fetch(url, { method: "HEAD" });
            const xfo = response.headers.get("x-frame-options");
            const frameAllowed = !xfo || !xfo.toLowerCase().includes("sameorigin");
            res.json({ frameAllowed, xfo, status: response.status });
        } catch (err: any) {
            console.error(err);
            res.status(500).json({ error: err.message });
        }
    });
});


// export const checkIframe = functions.https.onRequest(async (req, res) => {
//   const url = req.query.url as string;

//   if (!url) {
//     res.status(400).json({ error: 'Missing url parameter' });
//     return;
//   }

//   try {
//     const response = await fetch(url, { redirect: 'follow', method: 'GET' });
//     const xfo = response.headers.get('x-frame-options');
//     const csp = response.headers.get('content-security-policy');

//     let frameAllowed = true;

//     if (xfo && xfo.toLowerCase() !== 'allowall') frameAllowed = false;
//     if (csp && csp.toLowerCase().includes('frame-ancestors')) {
//       const policy = csp.toLowerCase();
//       if (policy.includes("'none'") || policy.includes("'self'")) frameAllowed = false;
//     }

//     res.json({ url, frameAllowed, xfo, csp, status: response.status });
//   } catch (err: any) {
//     res.json({ url, frameAllowed: false, error: err.message });
//   }
// });


export const helloWorldAgainAndAgain = functions.https.onRequest((req, res) => {
    res.json({
        message: "Hello from Firebase Functions! again",
    });
});


setGlobalOptions({ maxInstances: 10 });


