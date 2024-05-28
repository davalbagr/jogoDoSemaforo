import {LoginInfo} from './LoginInfo.js';

export var infoUser = new LoginInfo();

/**
 * Login user
 * @param {string} username Name to try to login with
 * @param {string} password Password to try to login with
 * @param {Phaser.Scene} scene scope in with the login is being made
 */


export function login(username, password, scene) {

    $.ajax
    ({
        type: "POST",
        url: "https://www.hypatiamat.com/loginActionVH.php",
        data: "action=dologin&u=" + username + "&p=" + password,
        crossDomain: true,
        cache: false,

        success: function (response) {
            if (response !== "false") {
                infoUser.user = response.split(",")[0];    						     // username
                if (infoUser.user !== "prof") {                                       // username

                    infoUser.firstName = response.split(",")[1];                          // primeiro nome do aluno
                    infoUser.escola = response.split(",")[2];                             // codigo da escola
                    infoUser.turma = response.split(",")[3];

                    infoUser.setLocalData();
                    // scene.ola.visible = true;
                } else {
                    alert("Registado como professor");
                    // scene.loginErrorMsg2.visible = true;
                    // scene.loginErrorMsg.visible = false;
                    return -1;
                }
            } else {
                alert("Utilizador ou Password Errados");
                // scene.loginErrorMsg.visible = true;
                // scene.loginErrorMsg2.visible = false;
                return -1;
            }

        },
        error: function (response) {
            infoUser.user = "";
            alert("Falha de ligação, por favor verifique a sua conexão")
        }
    })
};


/**
 * Check if there is an active session
 */
export function sessionVerify() {
    $.ajax
    ({
        type: "POST",
        url: "https://www.hypatiamat.com/loginActionVH.php",
        data: "action=verify",
        cache: false,
        success: function (response) {
            if (response != "not") {
                infoUser.user = response.split(",")[0];                               // username
                infoUser.firstName = response.split(",")[1];                          // primeiro nome do aluno
                infoUser.escola = response.split(",")[2];                             // codigo da escola
                infoUser.turma = response.split(",")[3];                              // turma do aluno
                infoUser.setLocalData();
            } else {
                infoUser.user = "";
                return;

            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            infoUser.user = "";
            alert("Falha de ligação, por favor verifique a sua conexão")
        }
    })
}

export function destroySession() {
    $.ajax
    ({
        type: "POST",
        url: "https://www.hypatiamat.com/loginActionVH.php",
        data: "action=des",
        cache: false,
        success: function (response) {
            infoUser.logout();
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            infoUser.user = "";
            alert("Falha de ligação, por favor verifique a sua conexão")
        }
    })
}

/**
 * Get the top scores
 * @param {string} username Name to try to login with
 * @param {string} password Password to try to login with
 * @param {Phaser.Scene} scene scope in with the login is being made
 */
export function getTOP(di, df, globalCodTurma, globalCodEscola, tip, scene) {
    var data = [];
    $.ajax
    ({
        type: "POST",
        url: "https://www.hypatiamat.com/newHRecords.php",
        data: "action=mostraNewA&anoLi=" + di + "&anoLf=" + df + "&mturma=" + globalCodTurma + "&mescola=" + globalCodEscola + "&flag=2" + "&tip=" + tip + "&tC=semaforoTOP",
        crossDomain: true,
        async: false,
        cache: false,
        success: function (response) {
            let j = 0;
            response = response.split('&');
            for (let i = 0; i < response.length; i++) {
                response[i] = response[i].split('=')[1];
                if (i % 5 == 0) {
                    j++;
                    response[i] = response[i].split(" ");

                    if (response[i].length == 1) {

                        response[i] = response[i][0];
                    } else {
                        response[i] = response[i][0] + " " + response[i][response[i].length - 1];
                    }
                    data.push(j);
                }
                if (i % 5 == 2) {
                    response[i] = response[i].replace("Agrupamento de Escolas", "A.E.");
                }
                data.push(response[i]);
            }
            scene.scene.transition({
                target: 'Leaderboard',
                data: data,
                duration: 100,
            });
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("Falha de ligação, por favor verifique a sua conexão")
        }
    })
}


export function updateTOP(di, df, globalCodTurma, globalCodEscola, flag, tip, scene) {
    var data;
    $.ajax
    ({
        type: "POST",
        url: "https://www.hypatiamat.com/newHRecords.php",
        data: "action=mostraNewA&anoLi=" + di + "&anoLf=" + df + "&mturma=" + globalCodTurma + "&mescola=" + globalCodEscola + "&flag=" + flag + "&tip=" + tip + "&tC=semaforoTOP",
        crossDomain: true,
        cache: false,
        success: function (response) {
            data = [];
            let j = 0;
            response = response.split('&');
            for (let i = 0; i < response.length; i++) {
                response[i] = response[i].split('=')[1];
                if (i % 5 == 0) {
                    j++;
                    response[i] = response[i].split(" ");
                    if (response[i].length == 1) {

                        response[i] = response[i][0];
                    } else {
                        response[i] = response[i][0] + " " + response[i][response[i].length - 1];
                    }
                    data.push({
                        name: j
                    });
                }
                if (i % 5 == 2) {
                    response[i] = response[i].replace("Agrupamento de Escolas", "A.E.");
                }
                data.push({
                    name: response[i]
                });

            }
            if (data.length < 4) {
                scene.table.setItems([]);
            } else {
                scene.table.setItems(data);
            }
            scene.table.refresh();
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            data = [];
            alert("Falha de ligação, por favor verifique a sua conexão");
        }
    })
}


export function verificaRecords(username, globalCodTurma, globalCodEscola, tip, pontuacao, scene) {
    $.ajax
    ({
        type: "POST",
        url: "https://www.hypatiamat.com/newHRecords.php",
        async: false,
        data: "action=minimoGlobal&codAl=" + username + "&codTurma=" + globalCodTurma + "&codEscola=" + globalCodEscola + "&pont=" + pontuacao + "&tip=" + tip + "&t=semaforoHypatia&tC=semaforoTOP",
        crossDomain: true,
        cache: false,
        success: function (response) {
            var data = []
            data.push(parseFloat(response.split("vlMin4=")[1]));               //melhor resultado pessoal
            data.push(parseFloat(response.split("vlMin3=")[1].split("&")[0])); //minimo da turma
            data.push(parseFloat(response.split("vlMin2=")[1].split("&")[0])); //minimo da escola
            data.push(parseFloat(response.split("vlMin1=")[1].split("&")[0])); //minimo global - TOP 100
            pontuacao = parseFloat(pontuacao);
            if (pontuacao > 0) {
                let please;
                if (infoUser.user !== '') {
                    if (data[0] > pontuacao) {
                        if (data[3] > pontuacao) {//top global
                            please = "  Conseguiste um novo recorde absoluto!";
                        } else if (data[2] > pontuacao) {//top escola
                            please = "Conseguiste um novo recorde na tua escola!";
                        } else if (data[1] > pontuacao) { // top turma
                            please = "Conseguiste um novo recorde na tua turma!";
                        } else if (data[0] > pontuacao) { // top pessoal
                            please = "     Conseguiste melhorar o teu recorde!";
                        }
                    } else {
                        please = "  Não conseguiste melhorar o teu recorde \no teu melhor resultado é " + pontuacao + " pontos";
                    }
                    gravaRecords(infoUser.user, globalCodTurma, globalCodEscola, tip, pontuacao);
                } else {
                    if (data[3] > pontuacao) {
                        please = "Se estivesses registado o teu nome figuraria \nno TOP 100 absoluto";
                    } else {
                        please = "  Para que o teu nome figure nos TOPs \n  tens de estar registado";
                    }
                }
                scene.please = please;
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("Falha de ligação, por favor verifique a sua conexão");
        }
    })
}


export function gravaRecords(username, globalCodTurma, globalCodEscola, tip, pontuacao) {
    $.ajax
    ({
        type: "POST",
        url: "https://www.hypatiamat.com/newHRecords.php",
        data: "action=insereA&musername=" + username + "&mturma=" + globalCodTurma + "&mescola=" + globalCodEscola + "&mpontuacao=" + pontuacao + "&mtipo=" + tip + "&t=semaforoHypatia&tC=semaforoTOP",
        crossDomain: true,
        cache: false,
        success: function (response) {
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("Falha de ligação, por favor verifique a sua conexão");
        }
    });
}

function getRecords(username, globalCodTurma, globalCodEscola, tip, scene) {

    $.ajax
    ({
        type: "POST",
        url: "https://www.hypatiamat.com/newHRecords.php",
        data: "action=minimoGlobal&codAl=" + username + "&codTurma=" + globalCodTurma + "&codEscola=" + globalCodEscola + "&pont=" + 0 + "&tip=" + tip + "&t=semaforoHypatia&tC=semaforoTOP",
        crossDomain: true,
        cache: false,
        success: function (response) {

            let pontuacao = parseFloat(response.split("vlMin4=")[1]);               //melhor resultado pessoal

            let pontuacaoGlobal = parseFloat(response.split("vlMin1=")[1].split("&")[0]); //minimo global - TOP 100


            if (response.split("vlMin4=")[1] <= (response.split("vlMin1=")[1].split("&")[0]) && pontuacao > 0) {
                scene.recordTOP.visible = true;
                scene.record.visible = false;

            }
            scene.recorde = scene.recorde.setText(response.split("vlMin4=")[1].slice(0, 4));

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            if (scene.ended == 1) {
                alert("Falha de ligação, por favor verifique a sua conexão");
            }
        }
    })

}

