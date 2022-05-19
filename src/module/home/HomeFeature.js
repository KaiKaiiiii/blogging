import React from "react";
import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { useEffect } from "react";
import styled from "styled-components";
import { db } from "../../firebase/firebaseConfig";
import Heading from "../../layout/Heading";
import PostFeatureItem from "../post/PostFeatureItem";
import { useState } from "react";
const HomeFeatureStyles = styled.div``;

const HomeFeature = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    async function getData() {
      const colRef = collection(db, "posts");
      const q = query(
        colRef,
        where("status", "==", "approved"),
        where("hot", "==", true),
        limit(3)
      );
      const querySnapshot = await getDocs(q);
      const result = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        result.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setPosts(result);
    }
    console.log(posts);
    getData();
  }, []);
  return (
    <HomeFeatureStyles className="home-block">
      <div className="container">
        <Heading>Bài viết nổi bật</Heading>
        <div className="grid-layout">
          {posts &&
            posts.length > 0 &&
            posts.map((post) => {
              return (
                <PostFeatureItem key={post.id} data={post}></PostFeatureItem>
              );
            })}
        </div>
      </div>
    </HomeFeatureStyles>
  );
};

export default HomeFeature;
