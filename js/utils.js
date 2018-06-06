$(document).ready(function() {
	/*usando biblioteca de jquery, altera-se a visibilidade de inserção de dados no simulador,
	 em função do tipo de consumo seleccionado*/
    $('input[type=radio][name=tip_csmo]').change(function() {
        if (this.value == 's') {
        	$('#result_table').hide();
			document.getElementById("sim_simples").hidden=false;
			document.getElementById("sim_bh").hidden=true;
        }
        else if (this.value == 'bh') {
        	$('#result_table').hide();
			document.getElementById("sim_simples").hidden=true;
			document.getElementById("sim_bh").hidden=false;
        }
    });
});


