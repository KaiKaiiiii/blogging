import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import React, { useEffect, useMemo } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../../components/button/Button";
import Radio from "../../components/checkbox/Radio";
import Dropdown from "../../components/dropdown/Dropdown";
import Option from "../../components/dropdown/Option";
import Field from "../../components/field/Field";
import Input from "../../components/input/Input";
import Label from "../../components/label/Label";
import Toggle from "../../components/toggle/Toggle";
import ImageUpload from "../../components/uploadimage/ImageUpload";
import { db } from "../../firebase/firebaseConfig";
import { postStatus } from "../../utils/constants";
import DashboardHeading from "../dashboard/DashboardHeading";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import ImageUploader from "quill-image-uploader";
import axios from "axios";
import slugify from "slugify";
Quill.register("modules/imageUploader", ImageUploader);

const PostUpdate = () => {
  const { postId } = useParams();

  const [placeholder, setPlaceholder] = useState("");
  const [content, setContent] = useState("");
  const [progress, setProgress] = useState(0);
  const [url, setUrl] = useState("");
  const [categories, setCategories] = useState([]);
  const [on, setOn] = useState(false);
  const modules = useMemo(
    () => ({
      toolbar: [
        ["bold", "italic", "underline", "strike"],
        ["blockquote"],
        [{ header: 1 }, { header: 2 }], // custom button values
        [{ list: "ordered" }, { list: "bullet" }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["link", "image"],
      ],
      imageUploader: {
        upload: async (file) => {
          const bodyFormData = new FormData();
          bodyFormData.append("image", file);
          const response = await axios({
            method: "POST",
            url: endpoint,
            data: bodyFormData,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          return response.data.data.url;
        },
      },
    }),
    []
  );

  const endpoint =
    "https://api.imgbb.com/1/upload?key=7d3a06b4057a1b5b5383f5a2a71e28f7";

  const storage = getStorage();
  const handleUploadImage = (file) => {
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
          setValue("image_url", downloadURL);
        });
      }
    );
  };

  const handleGetImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

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

  const {
    handleSubmit,
    control,
    watch,
    setValue,
    getValues,
    reset,
    formState: { isSubmitting, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      title: "",
      slug: "",
      author: "",
      status: 1,
      category: {},
      user: {},
      image_name: "",
      image_url: "",
      hot: false,
      content: "",
    },
  });

  useEffect(() => {
    async function getData() {
      const docRef = doc(db, "posts", postId);
      const singleDoc = await getDoc(docRef);
      //       setCategory(singleDoc.data());
      console.log(singleDoc.data());
      reset({
        ...singleDoc.data(),
      });
      setOn(singleDoc.data().hot);
      setPlaceholder(singleDoc.data().category.name);
      setUrl(singleDoc.data().image_url);
      setContent(singleDoc.data().content);
    }
    getData();
  }, [postId]);

  useEffect(() => {
    async function getCategories() {
      const result = [];
      const colRef = collection(db, "categories");
      const q = query(colRef, where("status", "==", 1));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        result.push({ id: doc.id, ...doc.data() });
      });
      setCategories(result);
    }
    getCategories();
  }, []);

  const watchStatus = watch("status");
  const handleSelectCategory = (item) => {
    setPlaceholder(item.name);
    const categoryId = item.id;

    async function getCategoryDetail() {
      const colRef = doc(db, "categories", categoryId);
      const singleDoc = await getDoc(colRef);

      setValue("category", {
        id: singleDoc.id,
        ...singleDoc.data(),
      });
    }
    getCategoryDetail();
  };

  const handleUpdatePost = async (values) => {
    const cloneValues = { ...values };
    cloneValues.content = content;
     cloneValues.slug = slugify(cloneValues.title || cloneValues.slug, {
      lower: true,
    });
    try {
      await updateDoc(doc(db, "posts", postId), {
        ...cloneValues,
      });
      console.log(cloneValues);
      toast.success("Successfully update post", { pauseOnHover: true });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <DashboardHeading
        title="Update post"
        desc={`Update for post Id : ${postId}`}
      ></DashboardHeading>
      <form onSubmit={handleSubmit(handleUpdatePost)}>
        <div className="grid grid-cols-2 gap-x-10 mb-10">
          <Field>
            <Label htmlFor="title">Title</Label>
            <Input
              type="text"
              control={control}
              placeholder="Enter your title"
              name="title"
            ></Input>
          </Field>
          <Field>
            <Label htmlFor="slug">Slug</Label>
            <Input
              type="text"
              control={control}
              placeholder="Enter your slug"
              name="slug"
            ></Input>
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-x-10 mb-10">
          <Field>
            <Label htmlFor="author">Author</Label>
            <Input
              control={control}
              placeholder="Find the author"
              type="text"
              name="author"
            ></Input>
          </Field>
          <Field>
            <Label htmlFor="category">Category</Label>
            <Dropdown placeholder={placeholder}>
              {categories &&
                categories.length > 0 &&
                categories.map((item) => {
                  return (
                    <Option
                      key={item.id}
                      onClick={() => handleSelectCategory(item)}
                    >
                      {item.name}
                    </Option>
                  );
                })}
            </Dropdown>
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-x-10 mb-10">
          <Field>
            <Label htmlFor="image">Image</Label>
            <ImageUpload
              handleDelete={handleDelete}
              image={url}
              progress={progress}
              className="h-[200px]"
              onChange={handleGetImage}
            ></ImageUpload>
          </Field>

          <div className="flex flex-col gap-5">
            <Field>
              <Label htmlFor="status">Status</Label>
              <div className="flex items-center gap-x-5">
                <Radio
                  name="status"
                  control={control}
                  checked={watchStatus === postStatus.APPROVED}
                  value={postStatus.APPROVED}
                >
                  Approved
                </Radio>
                <Radio
                  name="status"
                  control={control}
                  checked={watchStatus === postStatus.PENDING}
                  value={postStatus.PENDING}
                >
                  Pending
                </Radio>
                <Radio
                  name="status"
                  control={control}
                  checked={watchStatus === postStatus.REJECTED}
                  value={postStatus.REJECTED}
                >
                  Reject
                </Radio>
              </div>
            </Field>
            <Field>
              <Label htmlFor="hot">Hot</Label>
              <Toggle on={on} onClick={() => setOn(!on)}></Toggle>
            </Field>
          </div>
        </div>
        <Field>
          <ReactQuill
            control={control}
            theme="snow"
            value={content}
            onChange={setContent}
            className="entry-content"
            modules={modules}
          />
        </Field>
        <Button
          type="submit"
          isLoading={isSubmitting}
          disable={isSubmitting}
          className="min-w-[300px] mx-auto"
        >
          Update new post
        </Button>
      </form>
    </div>
  );
};

export default PostUpdate;
