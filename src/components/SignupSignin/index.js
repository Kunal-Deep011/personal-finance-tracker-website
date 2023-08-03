import React,{useState} from 'react';
import "./styles.css";
import Input from '../Input';
import Button from '../Button';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { toast } from 'react-toastify';
import { auth, db, provider } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc, getDoc } from "firebase/firestore"; 

function SignupSigninComponent() {

    const [name,setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [ loginForm, setLoginForm] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    
    
    function signupWithEmail(){
        setLoading(true);
        console.log("Name", name); 
        console.log("email", email);
        console.log("password", password);
        console.log("confirmpassword",confirmPassword); 
        //Authenticate the user , or basically create a new account using email and password
    if(name !== "" && email !== "" && password !== "" && confirmPassword !== ""){
        
        if(password === confirmPassword){
             createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log("User>>>>",user);
                toast.success("User Created!");
                setLoading(false);
                setName("");
                setEmail("");
                setPassword("");
                setConfirmPassword("");
                createDoc(user);
                navigate("/dashboard");
                 //create a doc with user id as the following id
                })
                .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                toast.error(errorMessage);
                setLoading(false);
              
    });
        }else{
            toast.error("Password and Confirm Password don't match!");
            setLoading(false);
        }

        
    }else{
        toast.warning("All fields are mandatory!");
    }
    
    
      }
  

      function loginUsingEmail(){
        console.log("email",email);
        console.log("password",password);
        setLoading(true);
      
        if(email !== "" && password !== ""){

            signInWithEmailAndPassword(auth, email, password)
               .then((userCredential) => {
               // Signed in 
               const user = userCredential.user;
               toast.success("User Logged In!");
               console.log("User-Logged-in",user);
               navigate("/dashboard");
               setLoading(false);
              
               // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                toast.error( errorMessage);
                setLoading(false);
            });

        }else{
            toast.warning("All fields are mandatory!");
            setLoading(false);
        }

        

      }

      async function createDoc(user){
        //make sure that doc with the user uid doesn't exit
        //create a doc
        if(!user) return;

        setLoading(true);
           
        const useRef = doc(db, "users", user.uid);
        const userData = await getDoc(useRef);
        if(!userData.exists()){
            try{
                await setDoc(doc(db, "users", user.uid), {
                    name: user.displayName ? user.displayName : name,
                    email: user.email,
                    photoURL: user.photoURL ? user.photoURL : "",
                    createdAt: new Date(),
                });
                toast.success("Doc Created!");
                setLoading(false);
            } catch (e) {
                 toast.error(e.message);
                 setLoading(false);
            }
        }else{
           // toast.error("Doc already exists!");
            setLoading(false);
        }
        
      }
   function googleAuth(){
    setLoading(true);
    try{
        signInWithPopup(auth, provider)
              .then((result) => {
               // This gives you a Google Access Token. You can use it to access the Google API.
              const credential = GoogleAuthProvider.credentialFromResult(result);
              const token = credential.accessToken;
               // The signed-in user info.
              const user = result.user;
              console.log("user>>>",user);
              createDoc(user);
              toast.success("User Authenticated");
              navigate("/dashboard");
              setLoading(false);
              // IdP data available using getAdditionalUserInfo(result)
              // ...
        }).catch((error) => {
              // Handle Errors here.
              const errorCode = error.code;
              const errorMessage = error.message;
              toast.error(errorMessage);
              setLoading(false);
        
        });
        
    } catch (e) {
        setLoading(false);
        toast.error(e.message);
    }

   }
    return(
     <>
     {loginForm ? ( 
     
     <div className='signup-wrapper'> 
            <h2 className='title'>
                Login on <span style={{color: 'var(--theme'}}>Financely.</span>
            </h2>
            <form>
                <Input 
                type="email"
                label={"Email"} 
                state={email} 
                setState={setEmail} 
                placeholder={"email@gmail.com"}
                />
                <Input
                type="password" 
                label={"Password"} 
                state={password} 
                setState={setPassword} 
                placeholder={"Password"}
                />
                <Button 
                disabled={loading}
                text={loading ? "Loading..." : "Login Using Email and Password"} 
                onClick={loginUsingEmail} />
                <p className="p-login">or</p>
                <Button 
                onClick={googleAuth} 
                text={loading ? "Loading..." : "Login Using Google"} 
                blue={true}
                />
                <p className="p-login" onClick={()=> setLoginForm(!loginForm)}>Or Don't Have An Account Already? Click Here</p>
            </form>
        </div>

) : (
         <div className='signup-wrapper'> 
            <h2 className='title'>
                Sign Up on <span style={{color: 'var(--theme'}}>Financely.</span>
            </h2>
            <form>
                <Input 
                label={"Full Name"} 
                state={name} 
                setState={setName} 
                placeholder={"Full Name"}
                />
                <Input 
                type="email"
                label={"Email"} 
                state={email} 
                setState={setEmail} 
                placeholder={"email@gmail.com"}
                />
                <Input
                type="password" 
                label={"Password"} 
                state={password} 
                setState={setPassword} 
                placeholder={"Password"}
                />
                <Input
                type="password" 
                label={"Confirm-Password"} 
                state={confirmPassword} 
                setState={setConfirmPassword} 
                placeholder={"Confirm-Password"}
                />
                <Button 
                disabled={loading}
                text={loading ? "Loading..." : "Signup Using Email and Password"} 
                onClick={signupWithEmail} />
                <p className="p-login">or</p>
                <Button 
                onClick={googleAuth} 
                text={loading ? "Loading..." : "Signup Using Google"} 
                blue={true}
                />
                <p className="p-login" onClick={()=> setLoginForm(!loginForm)}>Or Have An Account Already? Click Here</p>
            </form>
        </div>)
      }
        
     </> 
       
    )
}

export default SignupSigninComponent;