export default class Context {

    request: Request;
    url: URL;
    badRequest: Response;
    
    public get isApiRequest() : boolean {
        return this.url.pathname.startsWith("/api");
    }

    constructor(request: Request) {
        this.request = request;
        this.url = new URL(request.url);
        this.badRequest = new Response(JSON.stringify({message: "Request inválido!"}), { status: 400, headers: { "content-type": "application/json; charset=utf-8" } });
    }

}