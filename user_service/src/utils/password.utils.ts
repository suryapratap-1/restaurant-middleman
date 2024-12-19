import argon2 from 'argon2';

const hashPassword = async (password: string) => {
    try {
        const hashedPassword = await argon2.hash(password);
        return hashedPassword;
    } catch (error) {
        throw new Error('Password hashing failed');
    }
};

const verifyPassword = async (storedPassword: string, password: string): Promise<void> => {
    const isMatch = await argon2.verify(storedPassword, password);
    
    if (!isMatch) throw new Error('Invalid password');
};

export { hashPassword, verifyPassword };