import crypto from 'crypto';
export const generateSignature = (secret: string , paylaod: any) => {
    return crypto.createHmac('sha256', secret).update(paylaod).digest("hex");
};

export const verifySignature = (secret: string, payload: any,  signature: any) => {
    const expected = generateSignature(secret, payload);
    return expected === signature;
}
