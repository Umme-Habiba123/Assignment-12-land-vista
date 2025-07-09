import React, { useEffect, useState } from 'react';
import { AuthContext } from '../AuthContext';
import {auth} from '../../firebase/firebase.init'
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';

const AuthProvider = ({children}) => {
    const [user, setUser]=useState(null)
    const [loading,setLoading]=useState(true)

    const createUser=(email,password)=>{
        return createUserWithEmailAndPassword(auth, email,password)
    }

    const signIn=(email,password)=>{
        return signInWithEmailAndPassword(auth, email,password)
    }

    const logOutUser=()=>{
        setLoading(true)
        return signOut()
    }

    useEffect(()=>{
        const unSubscribe=onAuthStateChanged(auth, currentUser=>{
            setUser(currentUser)
            setLoading(false)
        })          
        return ()=>{
            unSubscribe()
        }
    },[])

    const authInfo={
        createUser, 
        signIn,
        logOutUser,
        user, 
        setUser,
        loading, 
        setLoading, 
    }

    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;