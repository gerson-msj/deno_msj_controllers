"use strict";
{
    const doTask = document.querySelector("#doTask");
    const visor = document.querySelector("#visor");
    function main() {
        doTask.onclick = () => callTask();
        visor.innerText = "...";
    }
    async function callTask() {
        try {
            visor.innerText = "Task em andamento...";
            const response = await fetch("/api/task");
            const text = await response.text();
            visor.innerText = text;
        }
        catch (error) {
            console.error("Erro:", error);
            visor.innerText = "Ocorreu um erro";
        }
    }
    main();
}
//# sourceMappingURL=home.js.map