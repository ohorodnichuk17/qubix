import { jwtDecode } from "jwt-decode";

interface DecodedToken {
    exp?: number;
}

export const isTokenActive = (token: string | null): boolean => {
    if (!token) {
        return false;
    }

    try {
        const decodedToken = jwtDecode<DecodedToken>(token);

        if (decodedToken.exp) {
            const expirationTime = decodedToken.exp * 1000;
            return expirationTime > Date.now();
        }

        return true;
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error decoding token: ', error.message);
        } else {
            console.error('Unknown error occurred');
        }
        return false;
    }
};
