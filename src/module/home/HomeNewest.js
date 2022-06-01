import { collection, getDocs, limit, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { db } from "../../firebase/firebaseConfig";
import Heading from "../../layout/Heading";
import { postStatus } from "../../utils/constants";
import PostNewestItem from "../post/PostNewestItem";
import PostNewestLarge from "../post/PostNewestLarge";

const HomeNewestStyles = styled.div`
  .layout {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-gap: 40px;
    margin-bottom: 40px;
    align-items: start;
  }
  .sidebar {
    padding: 28px 20px;
    background-color: #f3edff;
    border-radius: 16px;
  }
  @media screen and (max-width: 1023.98px) {
    .layout {
      grid-template-columns: 100%;
    }
    .sidebar {
      padding: 14px 10px;
    }
  }
`;

const HomeNewest = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    async function getData() {
      const colRef = collection(db, "posts");
      const q = query(
        colRef,

        where("status", "==", postStatus.APPROVED),
        where("hot", "==", false),
        limit(4)
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

    getData();
  }, []);
  const [first, ...others] = posts;

  return (
    <HomeNewestStyles className="home-block">
      <div className="container">
        <Heading>Mới nhất</Heading>
        <div className="layout">
          {first && <PostNewestLarge data={first}></PostNewestLarge>}
          <div className="sidebar">
            {others &&
              others.length > 0 &&
              others.map((other) => (
                <PostNewestItem data={other} key={other.id}></PostNewestItem>
              ))}
          </div>
        </div>
      </div>
    </HomeNewestStyles>
  );
};

export default HomeNewest;
