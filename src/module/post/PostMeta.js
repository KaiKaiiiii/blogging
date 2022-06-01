import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
const PostMetaStyles = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  font-weight: 600;
  color: inherit;
  .post {
    &-dot {
      display: inline-block;
      width: 4px;
      height: 4px;
      background-color: currentColor;
      border-radius: 100rem;
    }
  }
  @media screen and (max-width: 1023.98px) {
    font-size: 10px;
    gap: 6px;
  }
`;

const PostMeta = ({
  date = "Mar 23",
  authorName = "Andiez Le",
  className = "",
  to,
}) => {
  if (to !== "" && typeof to === "string") {
    return (
      <NavLink to={to} className="mt-auto">
        <PostMetaStyles className={`post-meta  mt-auto ${className}`}>
          <span className="post-time">{date}</span>
          <span className="post-dot"></span>
          <span className="post-author">{authorName}</span>
        </PostMetaStyles>
      </NavLink>
    );
  }
  return (
    <PostMetaStyles className={`post-meta mt-auto  ${className}`}>
      <span className="post-time">{date}</span>
      <span className="post-dot"></span>
      <span className="post-author">{authorName}</span>
    </PostMetaStyles>
  );
};

export default PostMeta;
