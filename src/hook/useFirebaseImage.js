import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useState } from "react";

export default function useFirebaseImage(getValues, setValue) {
  const storage = getStorage();
  const [progress, setProgress] = useState(0);
  const [url, setUrl] = useState("");

  const handleUploadImage = (file) => {
    const storage = getStorage();
    const storageRef = ref(storage, "images/" + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progressBar =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progressBar);

        switch (snapshot.state) {
          case "paused":
            break;
          case "running":
            break;
          default:
        }
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setUrl(downloadURL);
        });
      }
    );
  };
  const handleGetImage = (e) => {
    const file = e.target.files[0];

    if (!file) return null;
    console.log(file.name);
    setValue("image_name", file.name);

    handleUploadImage(file);
  };

  const handleDelete = () => {
    const desertRef = ref(storage, "images/" + getValues("image_name"));

    deleteObject(desertRef)
      .then(() => {
        setUrl("");
        setProgress(0);
        console.log("succes");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return {
    handleDelete,
    handleGetImage,
    handleUploadImage,

    url,
    progress,
  };
}
