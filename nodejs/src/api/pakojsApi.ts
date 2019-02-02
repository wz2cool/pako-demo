import * as express from "express";
import * as fs from "fs";
import * as zlib from "zlib";

export class PakojsApi {
  public getRoute(): express.Router {
    const route = express.Router();
    route.get("/", (req, res, next) => {
      res.json("hello world");
    });

    route.post("/compress", (req, res, next) => {
      const encoding: string = req.headers["content-encoding"];
      let zlibStream: any;

      switch (encoding) {
        case "gzip":
          zlibStream = zlib.createGunzip();
          break;
        case "deflate":
          zlibStream = zlib.createInflate();
          break;
        case "deflate-raw":
          zlibStream = zlib.createInflateRaw();
          break;
      }

      res.writeHead(200, { "Content-Type": "text/plain" });
      // request to zlibStream.
      const zlibStreamResult = req.pipe(zlibStream);
      streamToString(zlibStreamResult, (data: any) => {
        console.log(data);
      });

      zlibStreamResult.pipe(res);
    });

    return route;

    function streamToString(stream, cb) {
      const chunks = [];
      stream.on("data", (chunk: any) => {
        chunks.push(chunk.toString());
      });
      stream.on("end", () => {
        cb(chunks.join(""));
      });
    }
  }
}
