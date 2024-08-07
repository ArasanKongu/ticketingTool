// import express from "express";

// import routes from "./routes/routes";
// import errorHandler from "./middleware/errorHandle";

// const app = express();
// app.use(express.json());

// app.use("/api", routes);
// app.use(errorHandler);

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
import express, { Request, Application, NextFunction, Response } from "express";
import cors, { CorsOptions } from "cors";
import Routes from "./routes"
import 'dotenv/config'
import { ResponseObject, StatusResponse } from "./types/response.type";
import { User } from "./models/user.model";
import AuthenticationMiddleware from "./middleware/auth.middleware";
import { publicPaths } from "./lib/publicPaths";

// Extend the Request interface to include your custom parameter
declare global {
  namespace Express {
    interface Request {
      context: {
        user: User; // Define your custom parameter type here
      }
    }
  }
}

const middleware = new AuthenticationMiddleware();

class Server {
  constructor(app: Application) {
    this.config(app);
    new Routes(app);
    app.use(this.invalidPathHandler);
    app.use(this.syntaxErrorHandler);
  }

  private authenticate(req: Request, res: any, next: NextFunction) {
    const path = req.path;
    console.log("Path:", path);

    if (publicPaths.includes(path)) {
      return middleware.accessAuthorization(req, res, next);
    }
    middleware.accessAuthorization(req, res, () => {
      middleware.userAuthorization(req, res, next);
    });
  };

  private invalidPathHandler(req: Request, res: Response) {
    let responseObject: ResponseObject = {
      status: StatusResponse.failed,
      message: "Invalid Path",
      error: "Path Not Found"
    }
    return res.status(404).send(responseObject);
  }

  private syntaxErrorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    if (err instanceof SyntaxError && "body" in err) {
      let responseObject: ResponseObject = {
        status: StatusResponse.failed,
        message: err.message,
        error: err.name
      }
      return res.status(400).send(responseObject); // Bad request
    }
    next();
  }

  private config(app: Application): void {
    const corsOptions: CorsOptions = {
      origin: "http://localhost:3000"
    };

    app.use(cors(corsOptions));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use(this.authenticate);
  }
}

const app: Application = express();
const server: Server = new Server(app);

const PORT: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 8081;

app
  .listen(PORT, "localhost", function () {
    console.log(`Server is running on port ${PORT}.`);
  })
  .on("error", (err: any) => {
    if (err.code === "EADDRINUSE") {
      console.log("Error: address already in use");
    } else {
      console.log(err);
    }
  });