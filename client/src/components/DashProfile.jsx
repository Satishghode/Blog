import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Alert, Button, TextInput } from "flowbite-react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  updateStart,
  updateSuccess,
  updateFailuer,
} from "../redux/user/userSlice";
import { useDispatch } from "react-redux";

function DashProfile() {
  const { currentUser } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadProgress, setImageFileUPloadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState();
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [imageFileUploading, setimageFileUploading] = useState(false);
  const [ updateUserError , setUpdateUserError ] = useState(null);
  const filePickerRef = useRef();
  const [formData, setFormData] = useState({});
  const dispatch = useState();

  const handelImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };
  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const uploadImage = async () => {
    setimageFileUploading(true);
    setImageFileUploadError(null);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageFileUPloadProgress(progress.toFixed(0));
        // console.log(progress);
      },
      (error) => {
        setImageFileUploadError(
          " Could not upload image (File must be less than 2MB) "
        );
        setImageFileUPloadProgress(null);
        setImageFile(null);
        setImageFileUrl(null);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          setFormData({ ...formData, profilePicture: downloadURL });
          setimageFileUploading(false);
        });
      }
    );
  };
  // when the user fill the input field, inside the Dashboard profile.
  const handelChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  // this is function to handle the change on the form submission button.
  const handleSubmit = async (e) => {
    e.defaultValue();
    setUpdateUserError(null);
    setUpdateUserSuccess(null);
    // when the data form is empty then return.
    if (Object.keys(formData).length === 0) {
      setUpdateUserError(" No changes made  " );
      return;
    }
    if (imageFileUploading) {
      setUpdateUserError(" plase wait for image file upload. ");
      return;
    }
    try {
      dispatch(updateStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(updateFailuer(data.message));
        setUpdateUserError(data.message);
      } else {
        dispatch(updateSuccess(data.message));
        setUpdateUserSuccess("User Profile Updated successfully ");
      }
    } catch (error) {
      dispatch(updateFailuer(error.message));
    }
  };

  return (
    <div className=" max-w-lg mx-auto p-3 w-full ">
      <h1 className="my-7 text-center font-semibold text-3xl   ">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 ">
        <input
          type="file"
          accept="image/*"
          onChange={handelImageChange}
          ref={filePickerRef}
          hidden
        />
        <div
          className=" relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full "
          onClick={() => filePickerRef.current.click()}
        >
          {imageFileUploadProgress && (
            <CircularProgressbar
              value={imageFileUploadProgress || 0}
              text={`${imageFileUploadProgress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  height: "100%",
                  width: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rgba(62, 152 ,199 ${
                    imageFileUploadProgress / 100
                  } )`,
                },
              }}
            />
          )}
          <img
            src={imageFileUrl || currentUser.profilePhoto}
            alt="user"
            className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] ${
              imageFileUploadProgress &&
              imageFileUploadProgress < 100 &&
              "opacity-60"
            } `}
          />
        </div>
        {imageFileUploadError && (
          <Alert color="failure">{imageFileUploadError}</Alert>
        )}
        <TextInput
          type="text"
          id="username"
          placeholder="username"
          defaultValue={currentUser.username}
          onChange={handelChange}
        />
        <TextInput
          type="mail"
          id="email"
          placeholder="email"
          defaultValue={currentUser.email}
          onChange={handelChange}
        />
        <TextInput
          type="password"
          id="password"
          placeholder="Update Your Password"
          onChange={handelChange}
        />
        <Button type="submit" gradientDuoTone="purpleToBlue" outline>
          Update
        </Button>
      </form>
      <div className="text-red-500 justify-between flex mt-3">
        <span className="cursor-pointer ">Delete account</span>
        <span className="cursor-pointer ">Sign-out</span>
      </div>
      {updateUserSuccess && <Alert color="success" className="mt-5" >{updateUserSuccess}</Alert>}
      { updateUserError && <Alert color="danger" className="mt-5 "> {updateUserError}</Alert>}
    </div>
  );
}

export default DashProfile;
