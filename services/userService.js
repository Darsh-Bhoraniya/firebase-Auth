import { db } from '../config/db.js';

// Create User
const createUser = async (userData) => {
    try {
        const userRef = db.collection('users').doc(userData.user_id);
        await userRef.set({
            phone_number: userData.phone_number,
            email: userData.email,
            name: userData.name,
        });
        return { message: "User created successfully", userId: userData.user_id };
    } catch (error) {
        console.log(error);
        throw new Error(`Failed to create user: ${error.message}`);
    }
};

// Create User Token
const createUserToken = async (userId, tokenData) => {
    const userTokenRef = db.collection('user_token').doc();
    await userTokenRef.set({
        user_id: userId,
        ...tokenData,
    });
    return { message: "User token created successfully" };
};

// Get User by ID
const getUserById = async (userId) => {
    const userRef = db.collection('users').doc(userId);
    const doc = await userRef.get();
    if (!doc.exists) {
        throw new Error("No user found with this ID");
    }
    return doc.data();
};

// Get Tokens by User ID
const getUserTokensByUserId = async (userId) => {
    const tokensRef = db.collection('user_token').where('user_id', '==', userId);
    const snapshot = await tokensRef.get();
    if (snapshot.empty) {
        return [];
    }
    return snapshot.docs.map(doc => doc.data());
};

// Update User Information
const updateUser = async (userId, updatedData) => {
    const userRef = db.collection('users').doc(userId);
    await userRef.update(updatedData);
    return { message: "User updated successfully" };
};

// Delete User and their Tokens
const deleteUser = async (userId) => {
    const userRef = db.collection('users').doc(userId);
    await userRef.delete();

    // Delete associated user tokens
    const tokensRef = db.collection('user_token').where('user_id', '==', userId);
    const snapshot = await tokensRef.get();
    snapshot.forEach(async (doc) => {
        await doc.ref.delete();
    });

    return { message: "User and associated tokens deleted successfully" };
};

export default {
    createUser,
    createUserToken,
    getUserById,
    getUserTokensByUserId,
    updateUser,
    deleteUser
};
