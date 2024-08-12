import express, { Request, Application, NextFunction, Response } from "express";
import cors, { CorsOptions } from "cors";
import Routes from "./routes";
import 'dotenv/config';
import { ResponseObject, StatusResponse } from "./types/response.type";
import AuthenticationMiddleware from "./middleware/auth.middleware";

const app: Application = express();
const middleware = new AuthenticationMiddleware();

// CORS configuration
const corsOptions: CorsOptions = {
    origin: "http://localhost:3000"
};

// Middleware configuration
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes that do not require authentication
app.post('/signup', async (req: Request, res: Response) => {
    const UserController = new (await import('./controller/user.controller')).default();
    return UserController.signup(req, res);
});

app.post('/login', async (req: Request, res: Response) => {
    const UserController = new (await import('./controller/user.controller')).default();
    return UserController.login(req, res);
});

app.post('/set-super-admin', async (req: Request, res: Response) => {
    const UserController = new (await import('./controller/user.controller')).default();
    return UserController.setSuperAdmin(req, res);
});

// Authentication middleware for all other routes
app.use((req: Request, res: Response, next: NextFunction) => middleware.accessAuthorization(req, res, next));

// Load other routes
new Routes(app);
console.log("Routes loaded succesfully")

// Error handling middleware
app.use((req: Request, res: Response) => {
    console.log(`Received req for: ${req.path}`)
    let responseObject: ResponseObject = {
        status: StatusResponse.failed,
        message: "Invalid Path",
        error: "Path Not Found"
    };
    return res.status(404).send(responseObject);
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.log(`Received request for: ${req.path}`)
    if (err instanceof SyntaxError && "body" in err) {
        let responseObject: ResponseObject = {
            status: StatusResponse.failed,
            message: err.message,
            error: err.name
        };
        return res.status(400).send(responseObject); // Bad request
    }
    next();
});

// Start the server
const PORT: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 8080;
app.listen(PORT, "localhost", function () {
    console.log(`Server is running on port ${PORT}.`);
}).on("error", (err: any) => {
    if (err.code === "EADDRINUSE") {
        console.log("Error: address already in use");
    } else {
        console.log(err);
    }
});
