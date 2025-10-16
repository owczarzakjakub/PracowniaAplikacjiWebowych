const readline = require('readline');
const {stdin: input, stdout: output} = require('node:process');

const rl = readline.createInterface({input, output});


function ask(question){
    return new Promise((resolve) => {
        rl.question(question, (answer) => resolve(answer));
    });
}


async function numberOperations(){
    let result = 0;
    const x = parseInt(await ask("Podaj liczbe calkowita x: "), 10);
    const y = parseInt(await ask("POdaj liczbe calkowita y: "), 10);
    const userChoice = parseInt(await ask(" 1.Dodawanie \n 2. Odejmowanie \n 3. Mnozenie \n 4. Dzielenie \n" +
        "Wybierz operacje od 1 do 4: "), 10);
    switch(userChoice) {
        case 1:
            console.log(x + y);
            break;

        case 2:
            console.log(x - y);
            break;
        case 3:
            console.log(x * y);
            break;
        case 4:
            console.log(x/y);
            break;

        default:
            return 0;
            break;
    }

    rl.close();
}

function bubbleSort(tab){
    for(i = 0; i < tab.length; i++){
        for (let j = 0; j < tab.length; j++){
            if(tab[j] > tab[j+1]){
                let x = tab[j+1]
                tab[j+1] = tab[j];
                tab[j] = x;
            }
        }
    }
    console.log("Posortowana tablica(bubble sort): \n");
    for(elem of tab){
        console.log(elem);
    }
}



numberOperations();
const table = [2000, 4, 5, 66, 2, 88, 189, 1908];
bubbleSort(table);
