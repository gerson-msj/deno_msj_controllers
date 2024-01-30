{
    const doTask = document.querySelector("#doTask") as HTMLButtonElement;
    const visor = document.querySelector("#visor") as HTMLParagraphElement;

    function main() {
        doTask.onclick = () => callTask();
        visor.innerText = "...";
    }

    async function callTask() : Promise<void> {

        try {
            visor.innerText = "Task em andamento...";
            const response = await fetch("/api/task");
            const text = await response.text();
            visor.innerText = text;

        } catch (error) {
            console.error("Erro:", error);
            visor.innerText = "Ocorreu um erro";
        }

    }

    main();
}