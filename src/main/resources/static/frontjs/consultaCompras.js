var table;
var modalController;
var codigoConsultado;
window.onload = function () {

    renderCompras();

    $('#tabelaCompras').DataTable({
        'paging': true,
        'lengthChange': true,
        'searching': true,
        'ordering': true,
        'info': true,
        'autoWidth': false,
        'dom': 'B<"top"l>frti<"top"p><"clear">',
        'buttons': [{'extend': 'print', 'text': 'Imprimir Dados', 'className': 'btn btn-default'}],
        'iDisplayLength': 25,
        "language": {
            "sEmptyTable": "Nenhum registro encontrado",
            "sInfo": "Mostrando de _START_ até _END_ de _TOTAL_ registros",
            "sInfoEmpty": "Mostrando 0 até 0 de 0 registros",
            "sInfoFiltered": "(Filtrados de _MAX_ registros)",
            "sInfoPostFix": "",
            "sInfoThousands": ".",
            "sLengthMenu": "_MENU_ resultados por página",
            "sLoadingRecords": "Carregando...",
            "sProcessing": "Processando...",
            "sZeroRecords": "Nenhum registro encontrado",
            "sSearch": "Pesquisar: ",
            "oPaginate": {
                "sNext": "Próximo",
                "sPrevious": "Anterior",
                "sFirst": "Primeiro",
                "sLast": "Último"
            },
            "oAria": {
                "sSortAscending": ": Ordenar colunas de forma ascendente",
                "sSortDescending": ": Ordenar colunas de forma descendente"
            }
        }
    });

    var table = $('tabelaCompras').Database;


};

function renderCompras() {
    var retorno;
    $.ajax({
        url: "/compras/consulta/lista",
        type: "GET",
        async: false,
        dataType: "json",
        success: function (data) {
            retorno = data;
        }
    });

    console.log(retorno);
    for (var i = 0; i < retorno.length; i++) {
        var tr = document.createElement("tr");

        tr.innerHTML = "<td>" + retorno[i].nf + "</td>" +
            "<td>" + retorno[i].cliente + "</td>" +
            "<td>" + formatarData(retorno[i].datacompra) + "</td>" +
            "<td>R$ " + retorno[i].total + "</td>" +
            "<td><button id='btnEd+" + retorno[i].idcompra + "' onclick='editar(\"" + retorno[i].idcompra + "\",\"" + retorno[i].codigo + "\",\"" + retorno[i].nf + "\",\"" + retorno[i].parcelas + "\")'><i class='fa fa-pencil'></i></button></td>" +
            "<td><button id='btnRe+" + retorno[i].idcompra + "' onclick='remover(\"" + retorno[i].idcompra + "\")'><i class='fa fa-trash-o'></i></button></td>";
        document.getElementById("tbodyCompras").appendChild(tr);
    }

}

function remover(id) {
    removeParent(modalController);
    var dynamicModal = document.createElement("div");
    dynamicModal.setAttribute("class", "modal fade");
    dynamicModal.id = "modal-excluir";
    modalController = "modal-excluir";

    dynamicModal.innerHTML = "<div class='modal-dialog' style='width:30%'>" +
        "<div class='modal-content'>" +
        "<div class='modal-header'>" +
        "<button type='button' class='close' data-dismiss='modal' aria-label='Fechar'>" +
        "<span aria-hidden='true'>&times;</span>" +
        "</button>" +
        "<h4 class='modal-title'>Tem certeza que deseja excluir este cadastro? </h4>" +
        "</div>" +
        "<div class='modal-footer'>" +
        "<button type='button' class='btn btn-default pull-left' data-dismiss='modal'>Cancelar</button>" +
        "<button type='button' class='btn btn-primary' onclick='confirmaExcluir(\"" + id + "\")'>Confirmar</button>" +
        "</div>" +
        "</div>" +
        "</div>";
    document.getElementById("modalArea").appendChild(dynamicModal);
    $('#modal-excluir').modal('toggle');
}

function confirmaExcluir(id) {
    var retorno;
    $.ajax({
        url: "/compras/excluir",
        type: "POST",
        async: false,
        dataType: "json",
        data: {
            "id": id
        },
        success: function (data) {
            retorno = data;
        }
    });

    window.location.reload();

}

function editar(id, codigo, nf, parcelas) {
    removeParent(modalController);
    var dynamicModal = document.createElement("div");
    dynamicModal.setAttribute("class", "modal fade");
    dynamicModal.id = "modal-editar";
    modalController = "modal-editar";

    dynamicModal.innerHTML = "<div class='modal-dialog' style='width:90%'>" +
        "<div class='modal-content'>" +
        "<div class='modal-header'>" +
        "<button type='button' class='close' data-dismiss='modal' aria-label='Fechar'>" +
        "<span aria-hidden='true'>&times;</span>" +
        "</button>" +
        "<h4 class='modal-title'> Altere abaixo as informações que deseja editar para este cadastro</h4>" +
        "</div>" +
        "<div class='modal-body table-responsive' id='modalBody'>" +
        "<div class='block-content'>" +
        "<div class='form-group'>" +
        "<div class='col-md-12'>" +
        "<label for='codigo'>Digite o CNPJ do Fornecedor:</label>" +
        "<input type='text' class='form-control' id='codigo'/>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "<div class='block-footer'>" +
        "<div class='row-form'>" +
        "<div class='form-group'>" +
        "<div class='col-md-12'>" +
        "<button type='button' class='btn btn-primary' onclick='consultar()'>" +
        "Consultar e Alterar" +
        "</button>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "<div class='block-content'>" +
        "<div class='row-form'>" +
        "<div class='form-group'>" +
        "<div class='col-md-6'>" +
        "<label for='nomeFor'>Nome do Fornecedor</label>" +
        "<input type='text' class='form-control' id='nomeFor' disabled/>" +
        "</div>" +
        "<div class='col-md-6'>" +
        "<label for='email'>Email do Fornecedor</label>" +
        "<input type='text' class='form-control' id='email' disabled/>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "<div class='row-form'>" +
        "<div class='form-group'>" +
        "<div class='col-md-6'>" +
        "<label for='tel'>Telefone do Fornecedor</label>" +
        "<input type='text' class='form-control' id='tel' disabled/>" +
        "</div>" +
        "<div class='col-md-6'>" +
        "<label for='end'>Endereço do Fornecedor</label>" +
        "<input type='text' class='form-control' id='end' disabled/>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "<div class='block-content'>" +
        "<div class='form-group'>" +
        "<div class='col-md-6'>" +
        "<label for='nf'>Digite o Número da NF</label>" +
        "<input type='text' class='form-control' id='nf'/>" +
        "</div>" +
        "<div class='col-md-6'>" +
        "<label for='numParc'>Digite o Número de Parcelas</label>" +
        "<input type='number' min='0' class='form-control' id='numParc'/>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "<div class='modal-footer'>" +
        "<button type='button' class='btn btn-default pull-left' data-dismiss='modal'>Cancelar</button>" +
        "<button type='button' class='btn btn-primary' onclick='confirmaEditar(\"" + id + "\")'>Confirmar</button>" +
        "</div>" +
        "</div>" +
        "</div>";
    document.getElementById("modalArea").appendChild(dynamicModal);
    $('#modal-editar').modal('toggle');


    document.getElementById('codigo').setAttribute("value", codigo);
    consultar();
    document.getElementById('nf').setAttribute("value", nf);
    document.getElementById('numParc').setAttribute("value", parcelas);

}

function removeParent(id) {
    var removeModal = document.getElementById(id);
    if (removeModal != null) {
        removeModal.parentNode.removeChild(removeModal);
    }
}
function formatarData(data) {

    var final = new Date(data.time);

    var dia = final.getDate();
    if (dia.toString().length == 1)
        dia = "0" + dia;
    var mes = final.getMonth() + 1;
    if (mes.toString().length == 1)
        mes = "0" + mes;
    var ano = final.getFullYear();
    return dia + "/" + mes + "/" + ano;

}
function consultar() {
    var retorno;
    $.ajax({
        url: "/compras/consultar",
        type: "GET",
        async: false,
        dataType: "json",
        data: {
            "CNPJ": document.getElementById('codigo').value
        },
        success: function (data) {
            retorno = data;
        }
    });

    if (!jQuery.isEmptyObject(retorno)) {
        codigoConsultado = document.getElementById('codigo').value;
        document.getElementById("nomeFor").setAttribute("value", retorno.nomefant);
        document.getElementById("email").setAttribute("value", retorno.email);
        document.getElementById("tel").setAttribute("value", retorno.telefone);
        document.getElementById("end").setAttribute("value", retorno.endereco);
        $('#btnForAvanc').prop('disabled', false);
    } else {
        noty({text: 'Cadastro Não Encontrado', type: 'error'});
        $('#btnForAvanc').prop('disabled', true);
    }
}

function confirmaEditar(id) {
    $.ajax({
        url: "/compras/editar",
        type: "POST",
        async: false,
        dataType: "json",
        data: {
            "id": id,
            "codigo": codigoConsultado,
            "nf": document.getElementById('nf').value,
            "parcelas": document.getElementById('numParc').value
        }
    });

    noty({text: 'Alteração efetuada com sucesso, Redirecionando....', type: 'Success'});
    setTimeout(function () {
        window.location.reload();
    }, 1400);

}