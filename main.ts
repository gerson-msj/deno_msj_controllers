import TaskController from "./controllers/TaskController.ts";
import { BaseController, Context, PageController } from "./mod.ts";

const controllers = BaseController.enlistHandlers(
    PageController,
    TaskController
);

const handler = async (request: Request): Promise<Response> => {
    const context = new Context(request);
    const response = await controllers.handle(context);
    return response;
};

Deno.serve(handler);