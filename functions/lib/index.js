"use strict";
/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.helloWorldAgainAndAgain = exports.checkIframe = void 0;
const firebase_functions_1 = require("firebase-functions");
const functions = __importStar(require("firebase-functions"));
const node_fetch_1 = __importDefault(require("node-fetch"));
// import * as cors from "cors";
const cors_1 = __importDefault(require("cors"));
const corsHandler = (0, cors_1.default)({ origin: true });
exports.checkIframe = functions.https.onRequest((req, res) => {
    corsHandler(req, res, async () => {
        const url = req.query.url;
        if (!url) {
            res.status(400).json({ error: "Missing URL" });
            return;
        }
        try {
            const response = await (0, node_fetch_1.default)(url, { method: "HEAD" });
            const xfo = response.headers.get("x-frame-options");
            const frameAllowed = !xfo || !xfo.toLowerCase().includes("sameorigin");
            res.json({ frameAllowed, xfo, status: response.status });
        }
        catch (err) {
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
exports.helloWorldAgainAndAgain = functions.https.onRequest((req, res) => {
    res.json({
        message: "Hello from Firebase Functions! again",
    });
});
(0, firebase_functions_1.setGlobalOptions)({ maxInstances: 10 });
