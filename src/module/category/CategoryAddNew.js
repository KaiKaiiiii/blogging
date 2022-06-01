import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import React from "react";
import { useForm } from "react-hook-form";
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

const CategoryAddNew = () => {
  const {
    control,
    watch,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      slug: "",
      status: 1,
      createdAt: new Date(),
    },
  });
  const handleAddNewCategory = async (values) => {
    if (!isValid) return;
    const cloneValues = { ...values };
    cloneValues.slug = slugify(cloneValues.name || cloneValues.slug, {
      lower: true,
    });
    cloneValues.status = Number(cloneValues.status);

    const colRef = collection(db, "categories");
    try {
      await addDoc(colRef, {
        ...cloneValues,
        createdAt: serverTimestamp(),
      });
      console.log(cloneValues);
      toast.success("Success add category", {
        pauseOnHover: false,
        autoClose: 500,
      });
    } catch (error) {
      console.log(error);
    } finally {
      reset({
        name: "",
        slug: "",
        status: 1,
        createdAt: new Date(),
      });
    }
  };

  const watchStatus = watch("status");
  return (
    <div>
      <DashboardHeading title="New category" desc="Add new category">
        <Button type="button" to="/manage/category">
          Back to category
        </Button>
      </DashboardHeading>
      <form onSubmit={handleSubmit(handleAddNewCategory)}>
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
                checked={Number(watchStatus) === categoryStatus.APPROVED}
                value={categoryStatus.APPROVED}
              >
                Approved
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === categoryStatus.UNAPPROVED}
                value={categoryStatus.UNAPPROVED}
              >
                Unapproved
              </Radio>
            </div>
          </FieldCheckboxes>
        </div>
        <Button
          kind="primary"
          className="mx-auto max-w-[300px]"
          type="submit"
          isLoading={isSubmitting}
          disabled={isSubmitting}
        >
          Add new category
        </Button>
      </form>
    </div>
  );
};

export default CategoryAddNew;
