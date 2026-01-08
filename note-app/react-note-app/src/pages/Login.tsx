import { Button, Typography } from "@mui/material";
// import firebase from "firebase/compat/app";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { authentication } from "../firebase/config";
import { graphQLRequest } from "../utils/request";
import { Navigate } from "react-router-dom";
import { REGISTER_USER } from "../utils/constants";

const Login: React.FC = () => {

  const auth = authentication;

  const handleLoginWithGoogle = async () => {
      const provider = new GoogleAuthProvider();

      // const res = await signInWithPopup(auth, provider);
      // console.log(res);

      const { user: { uid, displayName, email }} = await signInWithPopup(auth, provider);
      console.log(uid, email, displayName);

      const { data } = await graphQLRequest({
        query: REGISTER_USER,
        variables: {
          uid,
          email,
          displayName
        },
      });

      console.log('register', { data });

      if (localStorage.getItem('accessToken')) {
        alert('You are already logged in');
        return <Navigate to="/" />
      }
  };

  return (
    <>
        <Typography variant='h5' sx={{ marginBottom: '10px', flexDirection: 'column' , textAlign: 'center'}}>
            <p style={{padding: '15px'}}> Welcome to the Login Note App</p>
            <Button variant='outlined' onClick={handleLoginWithGoogle}>
                Login with Google
            </Button>
        </Typography>
    </>
  );
};

export default Login;