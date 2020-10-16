/*Copyright © 2020 Rishabh Rao.
All Rights Reserved.*/

import React, { useState } from "react";
import "./styles.css";
import db from "../firebase";
import firebase from "firebase";
import TextField from "@material-ui/core/TextField";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import isUrlValid from "is-url-superb";

const App = () => {
  const [inputUrl, setInputUrl] = useState("");
  const [inputShort, setInputShort] = useState("");
  const [output, setOutput] = useState("");

  const sendUrl = (event) => {
    event.preventDefault();
    setOutput("");
    var validated = Validate(inputUrl, inputShort);
    if (validated) {
      setOutput("Processing...");
      window.setTimeout(() => {
        Upload(inputUrl, inputShort);
      }, 0);
      window.setTimeout(() => {
        setOutput("DONE!");
        setInputUrl("");
        setInputShort("");
      }, 0);
    }
  };

  function Validate(inputUrl, inputShort) {
    if (
      inputUrl.includes("localhost") ||
      inputUrl.includes("shortr") ||
      inputShort.includes("localhost") ||
      inputShort.includes("shortr")
    ) {
      setOutput("Stop Creating Loops!");
      return false;
    } else if (isUrlValid(inputUrl)) {
      setOutput("");
      return true;
    } else {
      setOutput("Invalid URL!");
      return false;
    }
  }

  function Upload(inputUrl, inputShort) {
    //Write URLs to Firestore Database
    db.collection("shortr")
      .doc(inputShort)
      .set({
        url: inputUrl,
        short: inputShort,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .catch((error) => {
        if (
          (error.getMessage =
            "FirebaseError: Missing or insufficient permissions.")
        ) {
          setOutput("Something's Wrong...");
        } else {
          setOutput(error.toString);
        }
      });
    // .then(setOutput("DONE!"), setInputUrl(""), setInputShort(""));
  }

  return (
    <div className="App">
      <div>
        <AppBar className="Header" position="fixed">
          <Toolbar variant="dense">
            <IconButton>
              <img href="logo192.png"></img>
            </IconButton>
            <Typography variant="h5">
              Shortr By <a href="https://rishabhrao.tk">Rishabh Rao</a>
            </Typography>
          </Toolbar>
        </AppBar>
      </div>

      <div className="App__body">
        <div>
          <form autoComplete="off" className="form">
            <TextField
              label="Enter URL"
              variant="outlined"
              autoFocus
              placeholder="https://example.com"
              value={inputUrl}
              onChange={(event) => setInputUrl(event.target.value)}
            />
            <TextField
              label="Enter Short Name"
              variant="outlined"
              placeholder="example"
              value={inputShort}
              onChange={(event) => setInputShort(event.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              disabled={
                !inputUrl.replace(/\s/g, "").length ||
                !inputShort.replace(/\s/g, "").length
              }
              type="submit"
              onClick={sendUrl}
            >
              Submit
            </Button>
          </form>
        </div>

        <div>
          {output && (
            <TextField
              value={output}
              InputProps={{
                readOnly: true,
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
