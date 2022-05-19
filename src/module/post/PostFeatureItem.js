import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import { db } from "../../firebase/firebaseConfig";
import PostCategory from "./PostCategory";
import PostImage from "./PostImage";
import PostMeta from "./PostMeta";
import PostTitle from "./PostTitle";
const PostFeatureItemStyles = styled.div`
  width: 100%;
  border-radius: 16px;
  position: relative;
  height: 169px;
  .post {
    &-image {
      width: 100%;
      height: 100%;
      border-radius: 16px;
    }
    &-overlay {
      position: absolute;
      inset: 0;
      border-radius: 16px;
      background-color: rgba(0, 0, 0, 0.75);
      mix-blend-mode: multiply;
      opacity: 0.6;
    }
    &-content {
      position: absolute;
      inset: 0;
      z-index: 10;
      padding: 20px;
      color: white;
    }
    &-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }
  }

  @media screen and (min-width: 1024px) {
    height: 272px;
  }
  @media screen and (max-width: 1023.98px) {
    .post {
      &-content {
        padding: 15px;
      }
    }
  }
`;
const PostFeatureItem = ({ data }) => {
  const { image_url, author, title, slug, categoryId, userId, image_name } =
    data;

  const [category, setCategory] = useState("");

  useEffect(() => {
    async function getData() {
      const colRef = collection(db, "categories");
      const q = query(colRef, where("id", "==", categoryId));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setCategory(doc.data().category);
      });
    }
    getData();
  }, []);

  // useEffect(() => {
  //   async function getData() {
  //     const colRef = collection(db, "categories");
  //     const q = query(colRef, where("hot", "==", true));
  //     const querySnapshot = await getDocs(q);
  //     querySnapshot.forEach((doc) => {
  //       setCategory(doc.data().category);
  //     });
  //   }
  // })

  return (
    <PostFeatureItemStyles>
      <PostImage url={image_url} alt={image_name}></PostImage>
      <div className="post-overlay"></div>
      <div className="post-content">
        <div className="post-top">
          <PostCategory>{category}</PostCategory>
          <PostMeta authorName={author}></PostMeta>
        </div>
        <PostTitle size="big">{title}</PostTitle>
      </div>
    </PostFeatureItemStyles>
  );
};

export default PostFeatureItem;
