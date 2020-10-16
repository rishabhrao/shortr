/*Copyright © 2020 Rishabh Rao.
All Rights Reserved.*/

import React, { useState, useEffect } from "react";
import db from "../firebase";
import { Typography, Card, CardContent } from "@material-ui/core";

const List = () => {
  const [url, setUrl] = useState([{ short: "", url: "" }]);

  //Read Messages from Firestore Database
  useEffect(() => {
    db.collection("shortr")
      .orderBy("short", "asc")
      .onSnapshot((snapshot) => {
        setUrl(
          snapshot.docs.map((doc) => ({
            short: doc.get("short"),
            url: doc.get("url"),
          }))
        );
      });
  }, []);

  return (
    <div>
      {url.map(({ short, url }) => (
        <Card>
          <CardContent>
            <Typography>
              Short Link: <a href="shortr.cf/{short}">shortr.cf/{short}</a>
            </Typography>
            <Typography>
              URL: <a href={url}>{url}</a>
            </Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default List;
