let numCota = 0


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
    
    load()
    
    event.target.reset()

}


function disable_select(){
    $("#grau").prop('disabled',true);
}

function unlock(){
    $("#grau").prop('disabled',false);
}

function abrirForm() {

    let espera = esperaForm()
    document.location.reload(true)
        
}

function esperaForm(){
    window.open("salarioForm/salarioindex.html", "_blank", "toolbar=yes, scrollbars=no, resizable=yes, top=1, left=1");
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
                    <img src="img/folha-de-pagamento.png" title="Folha de pagamento" onclick="Pagamento(event)" alt="">
                    <img src="img/olho.png" title="visualizar" onclick="Visualizar(event); visu(event)" alt="">
                </td>
            </tr>
            `
        })
    }

}

function Editar(event){
    
}

function Reset(){
    document.getElementById('depTbody').innerHTML = ""
    document.getElementById('cotasTbody').innerHTML = ""
}

function Remover(event){
    
    const id = event.target.parentElement.dataset.id
    const data = JSON.parse(localStorage.getItem("funcionarios")) 
    

    if(window.confirm("Tem certeza que deseja excluir "+id+" ?")){
        localStorage.setItem("funcionarios",
            
            JSON.stringify(
                data.filter(i => i.id != id)
    
            )
        )
        
        load()
        
    }


}





function Visualizar(event){
    const id = event.target.parentElement.dataset.id

    localStorage.setItem("id", id)

    window.open("visuFunc.html", "_self", "toolbar=yes, scrollbars=no, resizable=yes, top=1, left=1");
}


function Pagamento(event){
    const id = event.target.parentElement.dataset.id

    localStorage.setItem("id", id)

    console.log(id)

    window.open("contracheque.html", "_self", "toolbar=yes, scrollbars=no, resizable=yes, top=1, left=1");
}

window.onload = load()



