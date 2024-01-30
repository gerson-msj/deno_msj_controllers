import IController from "./IController.ts";
import Context from "./Context.ts";

export default abstract class BaseController implements IController {
  
    private next: IController | null = null;

    public setNext(handler: IController): IController {
        this.next = handler;
        return handler;
    }

    public async handle(context: Context): Promise<Response> {
        return await this.next?.handle(context) ?? context.badRequest;
    }

    public static createInstance<T extends IController>(handlerType: new() => T): T {
        return new handlerType;
    }
    
    public static enlistHandlers<T extends IController>(...controllerTypes: (new() => T)[]): IController {
        
        let currentController: IController | null = null;
        let firstController: IController | null = null;
        
        controllerTypes.forEach(controllerType => {
            const controllerInstance = BaseController.createInstance(controllerType);
            if(firstController === null)
                firstController = controllerInstance;
            currentController = currentController === null ? controllerInstance : currentController.setNext(controllerInstance);
        });

        return firstController!;
    }
    
}