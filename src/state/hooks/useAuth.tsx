import axios, { AxiosError } from "axios";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../constants";



export function useAuth() {
    function login() {
        signInWithEmailAndPassword(auth, "hemzatalha@gmail.com", "123456789")
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                user.getIdToken().then(token => {
                    axios.get(`http://192.168.43.161:8000/auth/users`,{
                        headers: { "Authorization": token }
                    }).then(
                        response => console.log( response.data )
                    ).catch((err:AxiosError) => console.log(err)
                    )
                }
                ).catch((err: Error) => console.log(err.message));


                // ...
            })
            .catch((error: any) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log({ errorCode, errorMessage });

                // ..
            });
    }
    return { login }
}
