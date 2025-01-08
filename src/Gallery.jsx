import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { useGlobalContext } from "./context";

const Gallery = () => {
  const { searchTerm } = useGlobalContext();
  const url = `https://api.unsplash.com/search/photos?page=1&query=${searchTerm}`;

  // get access key from env
  const accessKey = import.meta.env.VITE_ACCESS_KEY;

  const res = useQuery({
    queryKey: ["images", searchTerm],
    queryFn: async () => {
      const data = await axios.get(url, {
        headers: {
          Authorization: "Client-ID " + accessKey,
        },
      });
      return data.data;
    },
  });

  console.log(res.data);

  // Loading
  if (res.isLoading) {
    return (
      <>
        <section className="image-container">
          <h4>Loading...</h4>
        </section>
      </>
    );
  }

  // there is an error
  if (res.isError) {
    return (
      <>
        <section className="image-container">
          <h4>Error</h4>
        </section>
      </>
    );
  }

  const data = res.data.results;

  // empty data
  if (data.length == 0) {
    return (
      <>
        <section className="image-container">
          <h4>There is no result</h4>
        </section>
      </>
    );
  }

  // return list imgs
  return (
    <>
      <section className="image-container">
        {data.map((item) => {
          const url = item?.urls?.regular;
          return (
            <>
              <img src={url} key={item.id} className="img" />
            </>
          );
        })}
      </section>
    </>
  );
};

export default Gallery;
