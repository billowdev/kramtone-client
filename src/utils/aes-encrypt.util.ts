import { AES_SECRET_KEY } from '../common/constants/key.constant';
import { encrypt, decrypt } from 'crypto-js/aes';
import { enc } from 'crypto-js';

export const encryptAES = <T>(content: T): string => {
	return encrypt(JSON.stringify({ content }), AES_SECRET_KEY).toString()
}

export const decryptAES = (crypted: string): string => {
	return JSON.parse(decrypt(crypted, AES_SECRET_KEY).toString(enc.Utf8)).content
}