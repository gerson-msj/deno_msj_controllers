import { BaseController, Context } from "../mod.ts";

export default class TaskController extends BaseController {

    public async handle(context: Context): Promise<Response> {
        
        if(context.url.pathname !== "/api/task" || context.request.method !== "GET")
            return super.handle(context);

        await this.sleep(5000);
        
        const response = new Response("Task Concluída!", {status: 200, headers: { "content-type": "text/plain; charset=utf-8" }});
        return response;
    }

    private sleep(ms: number): Promise<void> {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve()
            }, ms);
        });
    }

}