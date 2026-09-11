import {
    doc,
    getDoc,
    setDoc,
} from 'firebase/firestore'

import { db } from './firestore'
import type { UserProfile } from '../types/user'

export async function getUserProfile(
    uid: string,
): Promise<UserProfile | null> {
    const userRef = doc(db, 'users', uid)

    const snapshot = await getDoc(userRef)

    if (!snapshot.exists()) {
        return null
    }

    return snapshot.data() as UserProfile
}

export async function saveUserProfile(
    uid: string,
    profile: UserProfile,
): Promise<void> {
    const userRef = doc(db, 'users', uid)

    await setDoc(userRef, profile)
}