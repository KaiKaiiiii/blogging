import { async } from "@firebase/util";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import slugify from "slugify";
import Button from "../../components/button/Button";
import Radio from "../../components/checkbox/Radio";
import Field from "../../components/field/Field";
import FieldCheckboxes from "../../components/field/FieldCheckboxes";
import Input from "../../components/input/Input";
import Label from "../../components/label/Label";
import { db } from "../../firebase/firebaseConfig";
import { categoryStatus } from "../../utils/constants";
import DashboardHeading from "../dashboard/DashboardHeading";

const CategoryUpdate = () => {
  const { docId } = useParams();
  const [oldCategoryInfo, setOldCategoryInfo] = useState({});

  const {
    handleSubmit,
    control,
    watch,
    formState: { isSubmitting },
    reset,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      slug: "",
      status: "",
      createdAt: "",
    },
  });

  useEffect(() => {
    async function getData() {
      const colRef = doc(db, "categories", docId);
      const singleDoc = await getDoc(colRef);
      setOldCategoryInfo(singleDoc?.data());
    }
    console.log(oldCategoryInfo);
    getData();
  }, []);

  useEffect(() => {
    reset({
      name: oldCategoryInfo.name,
      slug: oldCategoryInfo.slug,
      status: oldCategoryInfo.status,
      createdAt: oldCategoryInfo.createdAt,
    });
  }, [
    docId,
    oldCategoryInfo.createdAt,
    oldCategoryInfo.name,
    oldCategoryInfo.slug,
    oldCategoryInfo.status,
    reset,
  ]);

  const handleUpdateCategory = async (values) => {
    const cloneValues = { ...values };
    const colRef = doc(db, "categories", docId);
    cloneValues.status = Number(cloneValues.status);
    cloneValues.slug = slugify(cloneValues.name || cloneValues.slug, {
      lower: true,
    });
    try {
      await updateDoc(colRef, {
        ...cloneValues,
        createdAt: serverTimestamp(),
      });
      toast.success("Successfully update category");
    } catch (error) {
      console.log(error);
    }
  };
  const watchStatus = watch("status");
  return (
    <div>
      <DashboardHeading
        title="Update Categories"
        desc={`Update category for id ${docId}`}
      >
        <Button type="button" to="/manage/category">
          Back to category
        </Button>
      </DashboardHeading>
      <form onSubmit={handleSubmit(handleUpdateCategory)}>
        <div className="form-layout">
          <Field>
            <Label htmlFor="name">Name</Label>
            <Input
              control={control}
              name="name"
              placeholder="Enter your category name"
            ></Input>
          </Field>
          <Field>
            <Label htmlFor="slug" l>
              Slug
            </Label>
            <Input
              control={control}
              name="slug"
              placeholder="Enter your slug"
            ></Input>
          </Field>
        </div>
        <div className="form-layout">
          <FieldCheckboxes>
            <Label htmlFor="status">Status</Label>
            <div className="flex flex-wrap gap-x-5">
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === categoryStatus.approved}
                value={categoryStatus.approved}
              >
                Approved
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === categoryStatus.unApproved}
                value={categoryStatus.unApproved}
              >
                Unapproved
              </Radio>
            </div>
          </FieldCheckboxes>
        </div>
        <Button
          kind="primary"
          className="mx-auto max-w-[300px] block"
          type="submit"
          isLoading={isSubmitting}
          disabled={isSubmitting}
        >
          Update category
        </Button>
      </form>
    </div>
  );
};

export default CategoryUpdate;
