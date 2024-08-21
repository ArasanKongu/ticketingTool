import crypto from "crypto";

class Authentication {
    static checkPassword(password: string, hash: string): boolean {
        var shasum = crypto.createHash('sha1');
        shasum.update(password);
        if (shasum.digest('hex') == hash) {
            return true;
        }
        return false;
    }

    static createRandomBytes(length: number): string {
        return crypto.randomBytes(length).toString("base64").replace(/\+/g, "*");
    }

    static encryptPassword(password: string): string {
        return crypto.createHash('sha1').update(password).digest('hex');
    }

    static createRandomText(length: number): string {
        var result = "";
        var characters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz0123456789";
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
}

export default Authentication;