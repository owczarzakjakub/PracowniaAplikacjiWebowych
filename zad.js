const readline = require('readline');
const {stdin: input, stdout: output} = require('node:process');

const rl = readline.createInterface({input, output});

function ask(question){
    return new Promise((resolve) => {
        rl.question(question, (answer) => resolve(answer));
    });
}


async function numberOperations(){
    const x = parseInt(await ask("Podaj liczeb calkowita x: "), 10);
    const y = parseInt(await ask("POdaj liczbe calkowita y: "), 10);

    const userChoice = await ask("Wybierz operacje od 1 do 4: ");

    switch(userChoice) {
        case 1:
            console.log("Wynik dodawania: " + (x + y));
            break;

        case 2:
            return x - y;
            break;
        case 3:
            return x * y;
        case 4:
            return x / y;
            break;

        default:
            return 0;
            break;
    }
}

numberOperations();
