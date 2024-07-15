import { format } from "date-fns";
import express from "express";
import fs from "fs";
import cors from "cors";

const app = express();
app.use(cors());
const port = 4000;

app.get("/", (req, res) => {
  res
    .status(200)
    .send(`<h1 style ="color:green; text-align:center"> Welcome to Time Stamp Task </h1>`);
});

// Endpoint for writing timestamp data
app.get("/write", (req, res) => {
  let today = format(new Date(), "dd-MM-yyyy-HH-mm-ss");
  const filePath = `./Timestamps/${today}.txt`;
  fs.writeFileSync(filePath, `${today}`, "utf8");
  res.status(200)
    .send(`<h1 style = "color: red; text-align:center">Current TimeStamp:${today}</h1>
        <h3 style="text-align: center; color: blue">Timestamp data 
        has been successfully saved to a folder named (TimeStamp) 
        Change the endpoint to /read to retrieve all Timestamp data.</h3>`);
});

// Endpoint for reading all timestamp data
app.get("/read", (req, res) => {
  let timeStamps = [];
  fs.readdirSync("./Timestamps").forEach((filedir) => {
    timeStamps.push(filedir);
  });
  res.status(200).json({ timeStamps });
});

app.listen(port, () => {
  console.log("App Port is listening:", port);
});
