let numBeneficio = 0



function Salvar(event) {
    event.preventDefault();
    
    const funcionario = Object.fromEntries(new FormData(event.target))

    const data = JSON.parse(localStorage.getItem("funcionarios")) || []

    localStorage.setItem("funcionarios", [
        
        JSON.stringify([
            ...data,
            {
                ...funcionario,
                id: data.length ? (+data[data.length - 1].id + 1) : 1000
            }
        ])
    ])
    
    //load()
    
    alert("Cadastrado com Sucesso")
    event.target.reset()
    window.location.reload()
    return closeWindow()

}


function disable_select(){
    $("#grau").prop('disabled',true);
}

function unlock(){
    $("#grau").prop('disabled',false);
}

function janCotas() {
    window.open("ListaFuncionarios/salarioForm/listaFunc.html", "_blank", "toolbar=yes, scrollbars=no, resizable=yes, top=1, left=1");     
}

function closeWindow(){
    window.close("salarioForm/salarioindex.html")
}

function addBeneficio(){
    //let nCotas = document.querySelectorAll("table.tcnumber").length + 1

    numBeneficio++
    let tipo = document.querySelector('input[name="Beneficio"]:checked').value;

    document.getElementById('membrosTbody').innerHTML +=`<tr class="tcnumber" data-id="${numBeneficio}">
    <td class="center"><input type="text" name="nomeMembro${numBeneficio}" id="nomeMembro${numBeneficio}" class="tdinput" placeholder="Completo"></td>
    <td class="center"><input type="date" name="nascimentoMembro${numBeneficio}" id="nascimentoMembro${numBeneficio}" class="tdinput"></td>
    <td class="center"><input type="number" name="cpfMembro${numBeneficio}" id="cpfMembro${numBeneficio}" class="tdinput" placeholder="Números"></td>
</tr>`
    
    document.getElementById("nCota").innerText = numBeneficio
    // if(numBeneficio <3){

    // }
}

function delTable(){
    document.getElementById("tabela").innerHTML = ''
    numBeneficio = 0
    document.getElementById("nCota").innerText = numBeneficio
}

function addTable(){
    if(numBeneficio == 0){
        document.getElementById("tabela").innerHTML = `<table id="tmembro" class="tmembro" border="1">
        <thead>
            <th class="center">
                Nome
            </th>
            <th class="center">
                Data de nascimento
            </th>
            <th class="center">
                Cpf
            </th>
        </thead>
        <tbody id="membrosTbody">
            
        </tbody>
        
        </table>
        <div class="inc">
            <img class="image" title="Adicionar linha" onclick="addBeneficio()" src="img/add.png" alt="">
            <span class="">
                <img class="image" title="Excluir linha" onclick="delBeneficio()" src="img/menosl.png" alt="">
            </span>
        </div>
       `

        addBeneficio()
    }
    else{
        document.getElementById('membrosTbody').innerHTML =''
        numBeneficio = 0
        addBeneficio()
    }
}

/*<button class=" mais" onclick="addBeneficio()" type="button">
<img class="image" src="img/plus.png" alt="">
</button>*/


function delBeneficio(e){
    //dataId = e.target.parentElement.getAttribute("data-id")
    if(numBeneficio > 1){
        numBeneficio--
        document.getElementById('membrosTbody').deleteRow(e)
        document.getElementById("nCota").innerText = numBeneficio
    
    }
    //console.log(dataId)
}


function load(){
    document.getElementById('funcTbody').innerHTML = ''

    const data = JSON.parse(localStorage.getItem("funcionarios"))

    if(data){
        data.forEach(i => {
            document.getElementById('funcTbody').innerHTML += `
            <tr>
                <td class="center" >${i.id}</td>
                <td >${i.nome}</td>
                <td >${i.cargo}</td>
                <td class="center" data-id=${i.id}>
                    <img src="img/editar.png" title="Editar" onclick="Editar(event)"  alt="">
                    <img src="img/deletar-lixeira.png" title="Deletar" onclick="Remover(event)" alt="">
                    <img src="img/folha-de-pagamento.png" title="Folha de pagamento" alt="">
                    <img src="img/olho.png" title="visualizar" alt="">
                </td>
            </tr>
            `
        })
    }

}

function Editar(event){
    
}

function Reset(){
    document.getElementById('membrosTbody').innerHTML = ""
    numBeneficio = 0
    document.getElementById("nCota").innerText = numBeneficio
    document.getElementById('tabela').innerHTML = ""
}

function Remover(event){
    const id = event.target.parentElement.dataset.id

    const data = JSON.parse(localStorage.getItem("funcionarios")) 

    localStorage.setItem("funcionarios",
        
        JSON.stringify(
            data.filter(i => i.id != id)

        )
    )
    
    load()
}

function Visualizar(event){
    console.log(event.target.parentElement.dataset.id)
}

function Pagamento(event){
    console.log(event.target.parentElement.dataset.id)
}

//window.onload = load()
function texte(){
    console.log("Teste")
}


