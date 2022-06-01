import React from "react";
import styled from "styled-components";
import PostCategory from "./PostCategory";
import PostImage from "./PostImage";
import PostMeta from "./PostMeta";
import PostTitle from "./PostTitle";
const PostNewestLargeStyles = styled.div`
  .post {
    &-image {
      display: block;
      margin-bottom: 20px;
      height: 433px;
      border-radius: 16px;
    }
    &-category {
      margin-bottom: 10px;
    }
    &-title {
      margin-bottom: 20px;
    }
    @media screen and (max-width: 1023.98px) {
      &-image {
        height: 250px;
      }
    }
  }
`;

const PostNewestLarge = ({ data }) => {
  const date = new Date(data?.timeStamp?.seconds * 1000);
  const formatDate = date.toLocaleDateString("vi-VI");

  return (
    <PostNewestLargeStyles>
      <PostImage to={`/${data?.slug}`} url={data?.image_url} alt=""></PostImage>

      <PostCategory to={data?.category?.slug}>
        {data?.category?.name}
      </PostCategory>
      <PostTitle size="big" to={`${data?.slug}`}>
        {data?.title}
      </PostTitle>

      <PostMeta
        authorName={data?.user?.fullname}
        date={formatDate}
        to={`/user/${data?.user?.username}`}
      ></PostMeta>
    </PostNewestLargeStyles>
  );
};

export default PostNewestLarge;
