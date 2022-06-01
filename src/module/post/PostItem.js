import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import PostCategory from "./PostCategory";
import PostImage from "./PostImage";
import PostMeta from "./PostMeta";
import PostTitle from "./PostTitle";
const PostItemStyles = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  .post {
    &-image {
      height: 202px;
      margin-bottom: 20px;
      display: block;
      width: 100%;
      border-radius: 16px;
    }
    &-category {
      margin-bottom: 10px;
    }
    &-title {
      margin-bottom: 20px;
    }
  }
  @media screen and (max-width: 1023.98px) {
    .post {
      &-image {
        aspect-ratio: 16/9;
        height: auto;
      }
    }
  }
`;

const PostItem = (post) => {
  const date = new Date(post?.timeStamp?.seconds * 1000);
  const formatDate = date.toLocaleDateString("vi-VI");
  return (
    <PostItemStyles key={post?.id}>
      <PostImage
        url={
          post?.image_url ||
          "https://images.unsplash.com/photo-1653154509475-02682aa69450?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=60&raw_url=true&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500"
        }
        alt=""
        to={`/${post?.slug}`}
      ></PostImage>
      <PostCategory to={`/${post?.category?.slug}`}>
        {post?.category?.name || "Category"}
      </PostCategory>
      <div className="flex  flex-col  flex-1">
        <PostTitle to={`/${post?.slug}`}>{post?.title || "Title"}</PostTitle>
        <PostMeta
          className="mt-auto"
          authorName={post?.user?.fullname || post?.author}
          date={formatDate}
          to={`/${post?.user?.username}`}
        ></PostMeta>
      </div>
    </PostItemStyles>
  );
};

export default PostItem;
