const SALARIOMINIMO = 1212.00
const SALARIOFAMILIA = 1655.98
const PARCELASALARIOFAMILIA = 56.47

const NOVEINSS = 2427.35
const DOZEINSS = 3641.03
const QUATORZEINSS = 7087.22

const COTADEP = 189.59
const IRRFBASE = 1903.98
const IRRF15 = 2826.65
const IRRF225 = 3751.05
const IRRF275 = 4664.68
const DESCIRRFBASE = 142.80
const DESCIRRF15 = 354.80
const DESCIRRF225 = 636.13
const DESCIRRF275 = 869.36

let data = new Date()
let mes = data.getMonth()
let ano = data.getFullYear()

let diasUteis = 0
let diasNãoUteis = 0


function load(event){
    
    const data = JSON.parse(localStorage.getItem("funcionarios"))

    const matricula = JSON.parse(localStorage.getItem("id"))

    document.getElementById('start').innerHTML = ''
    if(data){
        data.forEach(i => {

            if(matricula == i.id){
                let pessoa = []
                pessoa.push(i)
                let contraCheque = Calcular(pessoa)
                console.log(contraCheque)
                document.getElementById('start').innerHTML =`<div class="menu">
                <a href="index.html">
                    <button type="button"  class="mais"><!--onclick="closeWindow()"-->
                        <img src="img/back.png" class="menor" alt="">
                    </button>
                </a>
                <div class="left">
                    <div class="left acoes">
                        <img class="imgclick" title="Adicionar Hora Extra" onclick="pegarExtras()" src="img/adicionar.png" alt="">
                        <img class="imgclick" title="Gerar PDF" src="img/pdf.png" alt="">
                        <img class="imgclick" title="Imprimir" onclick="print()" src="img/imprimir.png" alt="">
                        <img class="imgclick" title="Enviar" src="img/mandar.png" alt="">
                    </div>
                </div>
                <div>
                </div>
                    <div class="right text-right">
                        <h2>Contracheque</h2>
        
                    </div>
                </div>
                    
                <div class="hr">
                </div>
                <div id="hExtra">
                    
                </div>
    
            <div class="content">
                <div class="one">
                    <div class="left top">
                        <p >Empresa Aleatoria</p>
                        <p class="top">
                            Endereço: Rua Lorem ipsum dolor 
                        </p>
                        <p class="top">
                            CNPJ:04.290.167/0001-95
                        </p>
                    </div>
                    <div class="right">
                        <p class="top">
                            <strong>Recibo de Pagamento de Salário</strong>
                        </p>
                        <p>
                            Mês Referência: ${mes + 1}/${ano}
                        </p>
                    </div>
                </div>
                <div class="one">
                    <table id="no-border">
                        <thead>
                            <th>
                                Matrícula
                            </th>
                            <th>
                                Funcionário
                            </th>
                            <th>
                                Admissão
                            </th>
                            <th>
                                Função
                            </th>
                        </thead>
                        <tbody>
                            <td>${i.id}</td>
                            <td>${i.nome}</td>
                            <td>${i.admissao}</td>
                            <td>${i.cargo}</td>
                        </tbody>
    
                    </table>
                </div>
                <div class="one" id="mid">
                    <table id="border" border="1">
                        <thead>
                            <th>
                                Descrição
                            </th>
                            <th>
                                Referência
                            </th>
                            <th>
                                Vencimentos
                            </th>
                            <th>
                                Descontos
                            </th>
                        </thead>
                        <tbody id="desc">
                            
                        </tbody>
    
                    </table>
                </div>
                <div class="one">
                    <div class="left top">
    
                    </div>
                    <div class="right bord flex">
                        <div class="left">
                            <p >
                                Total Vencimentos
                            </p>
                        </div>
                        <div class="bord right">
                            <p >
                                Total Descontos
                            </p>
                        </div>
                    </div>
                </div>
                <div class="one">
                    <div class="left top">
    
                    </div>
                    <div class="right bord flex">
                        <div class="left">
                            <p >
                                ${contraCheque[0].salarioTotal}
                            </p>
                        </div>
                        <div class="bord right">
                            <p >
                                ${contraCheque[0].totalDescontos}
                            </p>
                        </div>
                    </div>
                </div>
                <div class="one">
                    <div class="left top">
    
                    </div>
                    <div class="right bord flex">
                        <div class="left">
                            <p>
                                <strong>
                                    Valor Líquido =>
                                </strong> 
                            </p>
                        </div>
                        <div class="bord right">
                            <p >
                                <strong>
                                    R$${contraCheque[0].salarioLiquido}
                                </strong>
                            </p>
                        </div>
                    </div>
                </div>
                <div class="one">
                    <table id="borderr" >
                        <thead>
                            <th>
                                Salário Base
                            </th>
                            <th>
                                Base FGTS
                            </th>
                            <th>
                                FGTS do mês
                            </th>
                            <th>
                                Base Calc. IRPF
                            </th>
                        </thead>
                        <tbody>
                            <td>R$${i.salarioB}</td>
                            <td>${contraCheque[0].salarioTotal}</td>
                            <td>R$${contraCheque[0].fgts}</td>
                            <td>${contraCheque[0].irrf}</td>
                        </tbody>
    
                    </table>
                </div>
                
               
            </div>`

            addTable(contraCheque,pessoa)
            }

        })
    }

    
}

function addTable(Contracheque,pessoa){
  
    //let salarioTotal = Number(pessoa[0].salarioB)+Number(repouso+adicionalHoraExtra1+grauInsa+Periculosidade+horaExtra+BeneficioValor)

    document.getElementById("desc").innerHTML +=
    `<tr>
        <td>Salário Base</td>
        <td>30d</td>
        <td>R$${pessoa[0].salarioB}</td>
        <td></td>
    </tr>
    `

    if(pessoa[0].vt == "Sim"){
        document.getElementById("desc").innerHTML +=
        `<tr>
            <td>Vale Transporte</td>
            <td>6%</td>
            <td></td>
            <td>R$${Contracheque[0].ValeTransporte}</td>
        </tr>`
    }
    if(Contracheque[0].horaExtra1 != 0){
        document.getElementById("desc").innerHTML +=
        `<tr>
        <td>Horas Extras 50%</td>
        <td>${diasUteis}h</td>
        <td>R$${Contracheque[0].horaExtra1}</td>
        <td></td>
        </tr>`
    }
    if(Contracheque[0].horaExtra2 != 0){
        document.getElementById("desc").innerHTML +=
        `<tr>
        <td>Horas Extras 100%</td>
        <td>${diasNãoUteis}h</td>
        <td>R$${Contracheque[0].horaExtra2}</td>
        <td></td>
        </tr>`
    }
    if(Contracheque[0].Periculosidade != 0){
        document.getElementById("desc").innerHTML +=
        `<tr>
        <td>Periculosidade</td>
        <td></td>
        <td>R$${Contracheque[0].Periculosidade}</td>
        <td></td>
        </tr>`
    }
    if(Contracheque[0].Insalubridade != 0){
        document.getElementById("desc").innerHTML +=
        `<tr>
        <td>Insalubridade</td>
        <td>${Contracheque[0].porcenInsa}</td>
        <td>R$${Contracheque[0].Insalubridade}</td>
        <td></td>
        </tr>`
    }
    if(Contracheque[0].horaExtra2 != 0 && Contracheque[0].horaExtra1 != 0){
        document.getElementById("desc").innerHTML +=
        `<tr>
        <td>Horas Extras Totais</td>
        <td>${diasNãoUteis + diasUteis}h</td>
        <td>R$${Contracheque[0].horaExtra2 + Contracheque[0].horaExtra1} </td>
        <td></td>
        </tr>`
    }
    if(Contracheque[0].repouso != 0){
        document.getElementById("desc").innerHTML +=
        `<tr>
            <td>R.S.R s/H.Extra</td>
            <td></td>
            <td>R$${Contracheque[0].repouso}</td>
            <td></td>
        </tr>`
    }
    if(Contracheque[0].Beneficio != 0 && pessoa[0].Beneficio == "Salario Familia"){
        document.getElementById("desc").innerHTML +=
        `<tr>
            <td>Salário Família</td>
            <td>${Contracheque[0].cotasSalarioFamilia}</td>
            <td>R$${Contracheque[0].salarioFamilia}</td>
            <td></td>
        </tr>`
    }
    if(Contracheque[0].irrf != 0){
        document.getElementById("desc").innerHTML +=
        `<tr>
            <td>IRRF</td>
            <td>${Contracheque[0].descIRRF}</td>
            <td></td>
            <td>R$${Contracheque[0].resultadoIRRF.toFixed(2)}</td>
        </tr>`
    }

    document.getElementById("desc").innerHTML +=`
    <tr>
        <td>Inss</td>
        <td>${Contracheque[0].descInss}</td>
        <td></td>
        <td>R$${Contracheque[0].inss}</td>
    </tr>`

}

function closeWindow(){

    window.open("index.html", "_self", "toolbar=yes, scrollbars=no, resizable=yes, top=1, left=1");
    //window.close("salarioForm/salarioindex.html")
}

function print(){

    console.log("Teste")

}

function pegarExtras(){

    if(document.getElementById('hExtra').innerHTML ==''){
        document.getElementById('hExtra').innerHTML =`<div class="desce lineinput form"> 
        <input type="number" id="diasUteis" name="diasUteis" placeholder="50%">
        <input type="number" id="fdsFeriados" name="fdsFeriados" placeholder="100%">
        <button onclick="SalvarHE()" class="green" type="button">
            Salvar
        </button>
        <button onclick="Cancelar()" class="red" type="button">
            Cancelar
        </button>
    </div>`
    }
    else{
        document.getElementById('hExtra').innerHTML = ''
    }
}

function Cancelar(){
    document.getElementById('hExtra').innerHTML = ''
}

function SalvarHE(){
    diasUteis = Number(document.getElementById('diasUteis').value)
    diasNãoUteis = Number(document.getElementById('fdsFeriados').value)

    console.log("dias uteis e inuteis kkk: " +diasUteis, diasNãoUteis)
    load()
    Cancelar()
}

function Calcular(pessoa){

    console.log(pessoa)

    let horaExtra = 0
    let horaExtra1 = 0
    let horaExtra2 = 0
    let Periculosidade = 0

    let salarioBase = Number(pessoa[0].salarioB)
    
    if(diasUteis && !diasNãoUteis){
        horaExtra = Number((((salarioBase/220)*1.5)*diasUteis).toFixed(2))
        horaExtra1 = Number((((salarioBase/220)*1.5)*diasUteis).toFixed(2))

    }
    else if(!diasUteis && diasNãoUteis){
        horaExtra = Number((((salarioBase/220)*2)*diasNãoUteis).toFixed(2))
        horaExtra2 = Number((((salarioBase/220)*2)*diasNãoUteis).toFixed(2))

    }
    else if(diasUteis && diasNãoUteis){
        horaExtra += Number((((salarioBase/220)*1.5)*diasUteis).toFixed(2))
        horaExtra += Number((((salarioBase/220)*2)*diasNãoUteis).toFixed(2))
        horaExtra1 = Number((((salarioBase/220)*1.5)*diasUteis).toFixed(2))
        horaExtra2 = Number((((salarioBase/220)*2)*diasNãoUteis).toFixed(2))

    }

    console.log("Hora extra: " +horaExtra)
    console.log("salario base: " +salarioBase)

    let adicionalHoraExtra1 = 0
    //let adicionalHoraExtra2 = 0
    let grauInsa = 0
    let porcenInsa 

    if(pessoa[0].adicional == "Insalubridade"){

        if(pessoa[0].grau == "Mínimo"){
            grauInsa = SALARIOMINIMO * 0.1
            porcenInsa = "10%"
        }
        else if(pessoa[0].grau == "Médio"){
            grauInsa = SALARIOMINIMO * 0.2
            porcenInsa = "20%"
        }
        else if(pessoa[0].grau == "Máximo"){
            grauInsa = SALARIOMINIMO * 0.4
            porcenInsa = "40%"
        }

        //ADICIONAL SOBRE HORA EXTRA

        if(diasUteis && !diasNãoUteis){
            adicionalHoraExtra1 = Number((((grauInsa/220)*1.5)*diasUteis).toFixed(2))
        }
        else if(!diasUteis && diasNãoUteis){
            adicionalHoraExtra1 = Number((((grauInsa/220)*2)*diasNãoUteis).toFixed(2))
        }
        else if(diasUteis && diasNãoUteis){
            adicionalHoraExtra1 += Number((((grauInsa/220)*1.5)*diasUteis).toFixed(2))
            adicionalHoraExtra1 += Number((((grauInsa/220)*2)*diasNãoUteis).toFixed(2))
        }

        console.log("adicionalHoraExtra: " +adicionalHoraExtra1)
        console.log("Insalubridade: " +grauInsa)

    }
    else if(pessoa[0].adicional == "Periculosidade"){
        Periculosidade = Number(pessoa[0].salarioB * 0.3).toFixed(2)


        //ADICIONAL SOBRE HORA EXTRA
        if(diasUteis && !diasNãoUteis){
            adicionalHoraExtra1 = Number((((Periculosidade/220)*1.5)*diasUteis).toFixed(2))
        }
        else if(!diasUteis && diasNãoUteis){
            adicionalHoraExtra1 = Number((((Periculosidade/220)*2)*diasNãoUteis).toFixed(2))
        }
        else if(diasUteis && diasNãoUteis){
            adicionalHoraExtra1 += Number((((Periculosidade/220)*1.5)*diasUteis).toFixed(2))
            adicionalHoraExtra1 += Number((((Periculosidade/220)*2)*diasNãoUteis).toFixed(2))
        }
        console.log("adicionalHoraExtra: " +adicionalHoraExtra1)
        console.log("Periculosidade: " +Periculosidade)
    }

    //============================RSR/DSR===============================
    let repouso = Number(((horaExtra+adicionalHoraExtra1)/6).toFixed(2))

    console.log("Repouso: " +repouso)

     //ATUALIZAR ESSA PARTE DEPOIS
    //===========================================DEPENDENTES======================================
        
    let membros = []

    let numM = 0

    let BeneficioValor = 0

    if(pessoa[0].nomeMembro1){
        membros.push(pessoa[0].nomeMembro1)
        numM++
        if(pessoa[0].nomeMembro2){
            membros.push(pessoa[0].nomeMembro2)
            numM++
        }
    }
    else{
        membros = null
    } 
    console.log("Membros:" +membros)

    //=======================================SALARIO FAMILIA=================================
    
    let somaSalarioFamilia = Number(pessoa[0].salarioB)+Number(repouso+Periculosidade+grauInsa)
    let parcelaSalarioFamilia = 0
    
    console.log("Soma para salario familia:" + somaSalarioFamilia)

    if(pessoa[0].Beneficio == "Salario Familia"){
        if(somaSalarioFamilia <=  SALARIOFAMILIA){
            parcelaSalarioFamilia = Number(PARCELASALARIOFAMILIA * numM)
        }
    }

    console.log("Salario familia: "+ BeneficioValor)

    //=======================================================SALARIO TOTAL==============================


    let salarioTotal = Number(pessoa[0].salarioB)+Number(repouso+adicionalHoraExtra1+grauInsa+Periculosidade+horaExtra+BeneficioValor)

    console.log("Salario Total: "+ salarioTotal)

    //====================================INSS=================================

    let inss = 0
    let descInss = "0"

    if(salarioTotal<=SALARIOMINIMO){
        inss = Number((salarioTotal * 0.075).toFixed(2))
        descInss = "7.5%"
        if(pessoa[0].Beneficio == "Salario Familia"){
            inss = Number(((salarioTotal - BeneficioValor)* 0.09).toFixed(2))
            descInss = "9%"
        }
    }
    else if(salarioTotal > SALARIOMINIMO && salarioTotal <= NOVEINSS){
        inss = Number(( salarioTotal * 0.09).toFixed(2))
        descInss = "9%"
        if(pessoa[0].Beneficio == "Salario Familia"){
            inss = Number(((salarioTotal - BeneficioValor)* 0.09).toFixed(2))
            descInss = "9%"
        }
    }
    else if(salarioTotal >NOVEINSS && salarioTotal <= DOZEINSS){
        inss = Number((salarioTotal * 0.12).toFixed(2))
        descInss = "12%"
    }
    else if(salarioTotal > DOZEINSS && salarioTotal <= QUATORZEINSS){
        inss = Number(( salarioTotal * 0.14).toFixed(2))
        descInss = "14%"
    } 
    else{
        inss = 751.97
        descInss = "14%"
    }
    if(inss > 751.97){
        inss = 751.97
        descInss = "14%"
    }

    console.log("INSS: "+ inss)
    console.log("INSS porcentagem: "+ descInss)
    
    //===========================================IRRF===========================
    let aliquota = 0
    let desc = 0
    let resultadoIRRF = 0
    let cotaDep = 0
    let descIRRF = ""
    let irrf = 0
    
    if(pessoa[0].Beneficio == "Dependente IRRF"){
        cotaDep = Number(COTADEP * membros.length)
        
        console.log("Cota Dependentes IRRF: "+ cotaDep)
    
    }
    irrf = Number(salarioTotal - inss - cotaDep).toFixed(2)
    if(irrf < IRRFBASE){
        irrf = 0
    }
    else if(irrf > IRRFBASE && irrf <= IRRF15){
        aliquota = 0.075
        desc = DESCIRRFBASE
        descIRRF = "7.5%"
    }
    else if (irrf > IRRF15 && irrf <= IRRF225){
        aliquota = 0.15
        desc = DESCIRRF15
        descIRRF = "15%"
    }
    else if(irrf > IRRF225 && irrf <= IRRF275){
        aliquota = 0.225
        desc = DESCIRRF225
        descIRRF = "22.5%"
    }
    else{
        aliquota = 0.275
        desc = DESCIRRF275
        descIRRF = "27.5%"
    }

    BeneficioValor = Number(resultadoIRRF = (irrf * aliquota) - desc).toFixed(2)
        
        


    //===========================================VALE TRANSPORTE=========================

    let ValeTransporte = 0

    if(pessoa[0].vt == "Sim"){
        ValeTransporte = Number(salarioBase * 0.06)
    }
    console.log("Vale transporte: "+ValeTransporte)
    
    //============================TOTAL DESCONTO==========================

    let totalDescontos = Number(inss+resultadoIRRF+ValeTransporte).toFixed(2)

    console.log("Total Descontos: "+totalDescontos)

    let salarioLiquido = Number(salarioTotal - totalDescontos).toFixed(2)

    console.log("Salario liquido: "+ salarioLiquido)

    let fgts = Number(salarioTotal * 0.08).toFixed(2)

    console.log("FGTS: "+ fgts)

    //add beneficioValor
    let Contracheque = [{

        aliquota: aliquota,
        descontoIRRF: desc,
        irrf: irrf,
        resultadoIRRF: resultadoIRRF,
        descIRRF: descIRRF,
        cotaDep: cotaDep,
        ValeTransporte: ValeTransporte,
        descInss: descInss,
        inss: inss,
        repouso: repouso,
        salarioTotal: Number(salarioTotal),
        salarioLiquido: Number(salarioLiquido),
        totalDescontos: Number(totalDescontos),
        fgts: Number(fgts),
        Beneficio: BeneficioValor,
        Periculosidade: Periculosidade,
        Insalubridade: grauInsa,
        horaExtra: horaExtra,
        horaExtra1: horaExtra1,
        horaExtra2: horaExtra2,
        porcenInsa: porcenInsa,
        cotasSalarioFamilia: numM,
        salarioFamilia: parcelaSalarioFamilia

    }]

    return Contracheque


}

window.onload = load()