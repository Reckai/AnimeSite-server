import {OAuth2Client} from "google-auth-library";
const client = new OAuth2Client(process.env.GOOGLE_OAUTH_CLIENT_ID);

export async function verifyGoogleToken(token:string) {
    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_OAUTH_CLIENT_ID,
        });
        const payload = ticket.getPayload();
        return payload;
    } catch (error) {
        console.error('Error verifying Google token:', error);
        return null;
    }
}
