import {db} from '../firebase/config';
import { async } from "@firebase/util";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut,
  } from "firebase/auth";

  import { useState, useEffect } from "react";


  export const useAuthentication = () => {
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)


    //cleanup 
    //deal with memory leak 
    const [cancelled, setCancelled] = useState(false)

    const auth = getAuth()

    function checkIfisCancelled() {
        if(cancelled) {
            return;
        }
    }

    const createUser = async (data) => {
        checkIfisCancelled()

        setLoading(true);
        setError(null);

        try {
            const {user} = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            )

            await updateProfile(user, {
                displayName: data.displayName
            })
            setLoading(false)

            return user
        } catch (error) {
            console.log(error.message);
            console.log(typeof error.message);

            let systemErrorMessage 
            if(error.message.includes("password")){
                systemErrorMessage = "A senha precisa conter pelo menos 6 caracteres."
            }else if(error.message.includes("email-alredy")){
                systemErrorMessage = "E-mail já cadastrado."
            }else{
                systemErrorMessage = "Ocorreu um erro tente novamente mais tarde."
            }
            
            setLoading(false);
            setError(systemErrorMessage);
        }
    };

    //logout 
  const logout = () => {
    checkIfisCancelled();

    signOut(auth);

  }
  
  //login
  const login = async (data) => {
      
   checkIfisCancelled()

   setLoading(true)
   setError(false)


    try {
        await signInWithEmailAndPassword(auth, data.email, data.password)
        setLoading(false)
        
    } catch (error) {
        let systemErrorMessage 
            if(error.message.includes("user-not-found")){
                systemErrorMessage = "Usuario não encontrado."
            }else if(error.message.includes("wrong-password")){
                systemErrorMessage = "Senha incorreta."
            }else {
              systemErrorMessage = "ocorreu um erro, tente novamente mais tarde."
            }

            setError(systemErrorMessage)
            setLoading(false)
    }
  }


    useEffect(() => {
     return setCancelled(true)
    }, [])

    return{
        auth,
        createUser,
        error,
        loading,
        logout,
        login,
    };
  };