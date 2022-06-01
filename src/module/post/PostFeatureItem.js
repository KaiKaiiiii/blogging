import React from "react";

import styled from "styled-components";

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
  const {
    image_url,

    title,
    slug,
    category,
    user,
    image_name,
    timeStamp,
  } = data;

  const date = new Date(timeStamp?.seconds * 1000);
  const formatDate = date.toLocaleDateString("vi-VI");

  return (
    <PostFeatureItemStyles>
      <PostImage url={image_url} alt={image_name}></PostImage>
      <div className="post-overlay"></div>
      <div className="post-content">
        <div className="post-top">
          <PostCategory to={category?.slug}>{category.name}</PostCategory>
          <PostMeta
            authorName={user?.fullname}
            date={formatDate}
            to={`/user/${user?.username}`}
          ></PostMeta>
        </div>
        <PostTitle size="big" to={slug}>
          {title}
        </PostTitle>
      </div>
    </PostFeatureItemStyles>
  );
};

export default PostFeatureItem;
