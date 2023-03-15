let numCota = 0


function load(event){
    
    const data = JSON.parse(localStorage.getItem("funcionarios"))

    const matricula = JSON.parse(localStorage.getItem("id"))
    
    
    console.log(data)
    
    document.getElementById('conteudo').innerHTML = ''
    if(data){
        data.forEach(i => {

            if(matricula == i.id){

                grau = i.grau

                if(!grau){
                    grau = "-"
                }

                demissao = i.demissao

                if(!demissao){
                    demissao = "-"
                }

                let membros = [{}]

                let numM = 0

                if(i.nomeMembro1){
                    membros[0] = {
                        nome: i.nomeMembro1,
                        cpf: i.cpfMembro1,
                        nasc: i.nascimentoMembro1
                    }
                    
                    numM++
                    if(i.nomeMembro2){
                        membros[1] = {
                            nome: i.nomeMembro2,
                            cpf: i.cpfMembro2,
                            nasc: i.nascimentoMembro2
                        }
                        numM++
                    }
                }
                else{
                    membros = null
                }

                console.log(membros)
                
                document.getElementById('conteudo').innerHTML += `
                <div class="top menu">
                <a href="index.html">
                    <button type="button"  class="mais"><!--onclick="closeWindow()"-->
                    <img src="img/back.png" class="menor" alt="">
                    </button>
                </a>
                <div class="info ">
                    <div class="left">
                        <img src="img/em-formacao.png" alt=""> - ${i.nome}
                    </div>
                    <div class="right rightAlign">
                        <img class="imgclick" src="img/pdf.png" alt="">
                        <img class="imgclick" onclick="teste()" src="img/imprimir.png" alt="">
                        <img class="imgclick" src="img/mandar.png" alt="">
                    </div>
    
                </div>
    
                <div class="even title">
                    <div class="left">
                        Salaário Base
                    </div>
                    <div class="right">
                        Email:
                    </div>
                </div>
                <div class="odd">
                    <div class="left">
                        R$${i.salarioB}
                    </div>
                    <div class="right">
                        ${i.email}
                    </div>
                </div>
                <div class="even title">
                    <div class="left">
                        Matrícula:
                    </div>
                    <div class="right">
                        Número:
                    </div>
                </div>
                <div class="odd">
                    <div class="left">
                        ${i.id}
                    </div>
                    <div class="right">
                        ${i.number}
                    </div>
                </div>
                <div class="even title">
                    <div class="left">
                        Data de Nascimento:
                    </div>
                    <div class="right">
                        CPF
                    </div>
                </div>
                <div class="odd">
                    <div class="left">
                        ${i.nasc}
                    </div>
                    <div class="right">
                        ${i.cpf}
                    </div>
                </div>
                <div class="even title">
                    <div class="left">
                        Cargo:
                    </div>
                    <div class="right">
                        Vale Transporte:
                    </div>
                </div>
                <div class="odd">
                    <div class="left">
                    ${i.cargo}
                    </div>
                    <div class="right">
                        ${i.vt}
                    </div>
                </div>
                <div class="even title">
                    <div class="left">
                        Adicional:
                    </div>
                    <div class="right">
                        Grau:
                    </div>
                </div>
                <div class="odd">
                    <div class="left">
                        ${i.adicional}
                    </div>
                    <div class="right">
                        ${grau}
                    </div>
                </div>
                <div class="even title">
                    <div class="left">
                        Admissão:
                    </div>
                    <div class="right">
                        Demissão:
                    </div>
                </div>
                <div class="odd">
                    <div class="left">
                        ${i.admissao}
                    </div>
                    <div class="right">
                        ${demissao}
                    </div>
                </div>
    
                
            </div>
    
            <div class="membros">
                <div class="content lineinput top">
                    <div class="title info">Membros</div>
                    <table border="1">
                        <thead>
                            <th class="mat">
                                Nome
                            </th>
                            <th class="center">
                                CPF
                            </th>
                            <th class="center">
                                Nascimento
                            </th>
                            <th class="center">
                                Tipo
                            </th>
                        </thead>
                        <tbody id="funcTbody">
                            <tr>
                                <td >-</td>
                                <td >-</td>
                                <td >-</td>
                                <td >-</td>
    
                            </tr>
                        </tbody>
                        
                    </table>
                </div>
            </div>
            `
            // <div class="btn top menu center">
            // <button type="button" onclick="closeWindow()">Voltar</button>
            // </div>
            if(membros){
                addMembro(membros, i.Beneficio)
            }

            }

        })
    }

}

function addMembro(membros, Beneficio){
    document.getElementById('funcTbody').innerHTML = ''

    for(let i = 0; i < membros.length; i++){
        document.getElementById('funcTbody').innerHTML +=`<tr class="tcnumber">
            <td class="center">${membros[i].nome}</td>
            <td class="center">${membros[i].cpf}</td>
            <td class="center">${membros[i].nasc}</td>
            <td class="center">${Beneficio}</td>
        </tr>`

    }
}


function Pagamento(event){
    console.log(event.target.parentElement.dataset.id)
}

function teste(){
    console.log("Teste")
}

function closeWindow(){

    window.open("index.html", "_self", "toolbar=yes, scrollbars=no, resizable=yes, top=1, left=1");
    //window.close("salarioForm/salarioindex.html")
}

window.onload = load()



