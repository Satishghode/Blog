import { Button } from "flowbite-react";
import { AiFillGoogleCircle } from "react-icons/ai";
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { app } from '../firebase.js';
import {  useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice.js'
import { useNavigate } from 'react-router-dom';

function Oauth() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const auth = getAuth(app);

    const handelGoogleClick = async() =>{
       const provider =  new GoogleAuthProvider();
       provider.setCustomParameters({ prompt : 'select_account' });
       try {
        const resultsFormGooele =  await signInWithPopup(auth, provider);
        const res = await fetch('/api/auth/google',{
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({
                name : resultsFormGooele.user.displayName,
                email : resultsFormGooele.user.email,
                gogolePhotoUrl : resultsFormGooele.user.photoURL
            }),
        })
        const data = await res.json();
        if (res.ok) {
            dispatch(signInSuccess(data));
            navigate('/');
        }
       } catch (error) {
        console.log(error);
       }

    }
  return (
        <Button type="button" gradientDuoTone='pinkToOrange' outline onClick={handelGoogleClick}  >
            <AiFillGoogleCircle className="w-6 h-6 mr-2" />
            Continue With Google
        </Button>
  )
}

export default Oauth