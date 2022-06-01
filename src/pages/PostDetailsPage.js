import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
  limit,
} from "firebase/firestore";
import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { db } from "../firebase/firebaseConfig";
import Heading from "../layout/Heading";
import Layout from "../layout/Layout";
import PostCategory from "../module/post/PostCategory";
import PostImage from "../module/post/PostImage";
import PostItem from "../module/post/PostItem";
import PostMeta from "../module/post/PostMeta";
import parse from "html-react-parser";

const PostDetailsPageStyles = styled.div`
  padding-bottom: 100px;
  .post {
    &-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 40px;
      margin: 40px 0;
    }
    &-feature {
      width: 100%;
      max-width: 640px;
      height: 466px;
      border-radius: 20px;
    }
    &-heading {
      font-weight: bold;
      font-size: 36px;
      margin-bottom: 16px;
    }
    &-info {
      flex: 1;
    }
    &-content {
      max-width: 700px;
      margin: 80px auto;
    }
  }
  .author {
    margin-top: 40px;
    margin-bottom: 80px;
    display: flex;
    border-radius: 20px;
    background-color: ${(props) => props.theme.grayF3};
    &-image {
      width: 200px;
      height: 200px;
      flex-shrink: 0;
      border-radius: inherit;
    }
    &-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: inherit;
    }
    &-content {
      flex: 1;
      padding: 20px;
    }
    &-name {
      font-weight: bold;
      margin-bottom: 10px;
      font-size: 20px;
    }
    &-desc {
      font-size: 14px;
      line-height: 2;
    }
  }
  @media screen and (max-width: 1023.98px) {
    padding-bottom: 40px;
    .post {
      &-header {
        flex-direction: column;
      }
      &-feature {
        height: auto;
      }
      &-heading {
        font-size: 26px;
      }
      &-content {
        margin: 40px 0;
      }
    }
    .author {
      flex-direction: column;
      &-image {
        width: 100%;
        height: auto;
      }
    }
  }
`;

const PostDetailsPage = () => {
  const { slug } = useParams();
  const [categoryDetail, setCategoryDetail] = useState([]);
  const [otherPosts, setOtherPosts] = useState([]);

  useEffect(() => {
    async function getData() {
      const colRef = collection(db, "posts");
      const q = query(colRef, where("slug", "==", slug));

      onSnapshot(q, (snapshot) => {
        snapshot.forEach((doc) => {
          setCategoryDetail(doc.data());
        });
      });
    }
    getData();
  }, [slug]);

  useEffect(() => {
    document.body.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [slug]);

  useEffect(() => {
    async function getCategory() {
      const colRef = collection(db, "posts");
      const q = query(colRef, where("slug", "!=", slug), limit(4));
      const querySnapshot = await getDocs(q);
      const result = [];
      querySnapshot.forEach((doc) => {
        result.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setOtherPosts(result);
    }
    console.log(otherPosts);
    getCategory();
  }, [slug]);

  return (
    <PostDetailsPageStyles>
      <Layout>
        <div className="container">
          <div className="post-header">
            <PostImage
              url={categoryDetail?.image_url}
              className="post-feature"
            ></PostImage>
            <div className="post-info">
              <PostCategory className="mb-6">
                {categoryDetail?.category?.name}
              </PostCategory>
              <h1 className="post-heading">{categoryDetail?.title}</h1>
              <PostMeta></PostMeta>
            </div>
          </div>
          <div className="post-content">
            <div className="entry-content">
              {parse(String(categoryDetail?.content))}
            </div>
            <div className="author">
              <div className="author-image">
                <img src={categoryDetail?.user?.avatar} alt="" />
              </div>
              <div className="author-content">
                <h3 className="author-name">
                  {categoryDetail?.user?.fullname}
                </h3>
                <p className="author-desc">{categoryDetail?.user?.desc}</p>
              </div>
            </div>
          </div>
          <div className="post-related">
            <Heading>Bài viết liên quan</Heading>
            <div className="grid-layout grid-layout--primary">
              {otherPosts &&
                otherPosts.length > 0 &&
                otherPosts.map((post) => PostItem(post))}
            </div>
          </div>
        </div>
      </Layout>
    </PostDetailsPageStyles>
  );
};

export default PostDetailsPage;
