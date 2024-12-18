import argon2 from 'argon2';

const hashPassword = async (password: string) => {
    try {
        const hashedPassword = await argon2.hash(password);
        return hashedPassword;
    } catch (error) {
        throw new Error('Password hashing failed');
    }
};

const verifyPassword = async (storedPassword: string, password: string): Promise<boolean> => {
    try {
        const isMatch = await argon2.verify(storedPassword, password);
        return isMatch;
    } catch (error) {
        throw new Error('Password verification failed');
    }
};

export { hashPassword, verifyPassword };