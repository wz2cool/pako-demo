import * as bodyParser from "body-parser";
import * as express from "express";
import * as path from "path";
import {
  SwaggerInfoProperty,
  swaggerJSDoc,
  // tslint:disable-next-line:trailing-comma
  SwaggerOptions
} from "swagger-ts-doc";
import * as swaggerUi from "swagger-ui-express";
import { PakojsApi } from "./api/pakojsApi";
import { StudentApi } from "./api/studentApi";

export class Server {
  public static bootstrap(): Server {
    return new Server();
  }

  public readonly app: express.Application;
  constructor() {
    this.app = express();
    this.config();
  }

  private config(): void {
    this.app.set("view engine", "ejs");
    this.app.set("views", __dirname + "/views");
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.routes();
    this.initSwagger();
  }

  private routes(): void {
    const studentApi = new StudentApi();
    const pakojsApi = new PakojsApi();
    this.app.get("/", (req, res) => {
      // 指定 /views/idex.ejs
      res.render("index.ejs");
    });
    this.app.use("/students", studentApi.getRoute());
    this.app.use("/pakojs", pakojsApi.getRoute());
  }

  private initSwagger(): void {
    // registerApiModel(Student);
    const options = new SwaggerOptions();
    options.info = new SwaggerInfoProperty();
    options.info.version = "1.0.0";
    options.info.title = "swagger-ts-demo";

    const jsDoc = swaggerJSDoc(options);
    this.app.get("/api-docs.json", (req, res) => {
      res.setHeader("Content-Type", "application/json");
      res.send(jsDoc);
    });

    const swaggerUiOptions = {
      // tslint:disable-next-line:trailing-comma
      swaggerUrl: "/api-docs.json"
    };

    this.app.use(
      "/api-docs",
      swaggerUi.serve,
      // tslint:disable-next-line:trailing-comma
      swaggerUi.setup(null, swaggerUiOptions)
    );
  }
}
