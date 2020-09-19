/*Copyright © 2020 Rishabh Rao.
All Rights Reserved.*/

import React, { useState } from "react";
import { useParams } from "react-router-dom";
import db from "../firebase";

const Short = () => {
  const { shorturl } = useParams();
  const [url, setUrl] = useState("");

  //Read Urls from Firestore Database
  db.collection("shortr")
    .doc(shorturl)
    .onSnapshot((snapshot) => {
      if (snapshot.get("url")) {
        setUrl(snapshot.get("url"));
        window.location.replace(url);
      } else {
        window.location.replace("/");
      }
    });

  return <div>Redirecting... Please Wait...</div>;
};

export default Short;
