import TaskController from "./controllers/TaskController.ts";
import { Context, PageController } from "./mod.ts";

const pageController = new PageController();
const handler = async (request: Request): Promise<Response> => {

    const taskController = new TaskController();
    pageController.setNext(taskController);


    const context = new Context(request);
    const response = await pageController.handle(context);
    return response;
};

Deno.serve(handler);