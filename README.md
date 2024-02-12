# deno_msj_controllers

Realiza o tratamento de request em cadeia.

## Configurando o Server

Este é o modelo de configuração do servidor:
```
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
```

Neste modelo as controllers são encadeadas pelo BaseController.enlistHandlers, onde o tipo das controller são informados na ordem desejada de tratamento.

O objeto controllers resultante representa o primeiro nó da cadeia, e deve manupular o objeto context, a partir daí, o context será repassado em cadeia até a controller desejada encerrar as tratativas retornando uma Promise Response.

## PageController

É uma controller responsável por servir arquivos contidos no diretório pages, criando assim um WebServer simples.

Caso um diretório seja solicitado na request o arquivo index.html deste diretório será retornado.

No caso de criação de novos diretórios dentro de pages as páginas deverão conter a tag base href = /[diretorio]/

É possível informar outro diretório como parâmetro, o padrão é pages.

## Criando um novo controller

As demais controllers serão responsáveis pelas requestes realizadas em /api.

Abaixo segue um exemplo de uma controller que atende a resquests em /api/task

```
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
```

O método handle recebe o context, internamente verifica se a url e método serão atendidos por esta controller, se não, passa a request para a próxima controller da cadeira, se sim, realiza os trabalhos da controller e retorna uma response.

Caso nenhuma controller seja responsável pela request, um BadRequest será retornado.