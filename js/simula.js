function calcula_energia_simples(csmo, pr_ene, pr_tf){
	var n_dias = 30;
	var ene_val_inc = 0;
	var tf_val_inc = 0;
	var ene_subt = 0;
	
	ene_val_inc = csmo * pr_ene;
	tf_val_inc = n_dias * pr_tf;
	
	ene_subt = ene_val_inc + tf_val_inc;
	
	return ene_subt;
}

function calcula_energia_bh(csmo_hv, csmo_hfv, cat_pr_ene_hv, cat_pr_ene_hfv, cat_pr_tf){
	var n_dias = 30;
	var ene_val_inc = 0;
	var tf_val_inc = 0;
	var ene_subt = 0;
	
	ene_val_inc = (csmo_hv * cat_pr_ene_hv) + (csmo_hfv * cat_pr_ene_hfv);
	tf_val_inc = n_dias * cat_pr_tf;
	
	ene_subt = ene_val_inc + tf_val_inc;
	
	return ene_subt;
}

function calcula_taxas(csmo){
	var tx_dgeg = 0.07; //valor fixo, mês 
	var tx_iec = 0.001; //valor por kWh
	var iec_val_inc = 0;
	var tx_subt = 0;
	

	iec_val_inc = csmo * tx_iec;
	tx_subt = tx_dgeg + iec_val_inc;
	
	return tx_subt;
}

function calcula_iva(val_inc){
	var iva_tx_val = 23;
	var iva_subt = 0;
	
	iva_subt = val_inc * iva_tx_val / 100;
	return iva_subt;
}

function calcula_cav(){
	var cav_tx_iva = 6; //taxa de iva
	var cav_val_inc = 2.85; //valor mês, sem iva
	var	cav_subt = 0;
	
	cav_subt = cav_val_inc * (100 + cav_tx_iva) / 100; //subtotal para a fatura
	return cav_subt;
}

function simula_fatura_simples(pr_e, pr_tf) {
	var cat_pr_ene = pr_e; //0.15729; //valor do kWh
	var cat_pr_tf = pr_tf; //0.27068; //valor dia
	var total_fatura = 0;
	
	var ene_subt = 0;
	var tx_subt = 0;
	var iva_subt = 0;
	var cav_subt = 0;
	
	var csmo = document.getElementById("cons_mensal").value;
	
	ene_subt = calcula_energia_simples(csmo, cat_pr_ene, cat_pr_tf);
	tx_subt = calcula_taxas(csmo);
	iva_subt = calcula_iva(ene_subt + tx_subt);
	cav_subt = calcula_cav();
	
	total_fatura = ene_subt + tx_subt + iva_subt + cav_subt;
	total_fatura = Math.round(total_fatura * 100) / 100; //arredondar a duas casas decimais			 
 	return total_fatura;
}

function simula_fatura_bh(pr_v, pr_fv, pr_f){
	var cat_pr_ene_hv = pr_v; //0.0959; //valor do kWh
	var cat_pr_ene_hfv = pr_fv; //0.2008; //valor do kWh
	var cat_pr_tf = pr_f; //0.2778; //valor dia
	var total_fatura = 0;
	
	var ene_subt = 0;
	var tx_subt = 0;
	var iva_subt = 0;
	var cav_subt = 0;
	
	var csmo_hv = document.getElementById("cons_hv").value;
	var csmo_hfv = document.getElementById("cons_hfv").value;
	var csmo = 0;
		
	ene_subt = calcula_energia_bh(csmo_hv, csmo_hfv, cat_pr_ene_hv, cat_pr_ene_hfv, cat_pr_tf);
	csmo = parseFloat(csmo_hv) + parseFloat(csmo_hfv); //csmo total, para efeitos de taxa DGEG
	tx_subt = calcula_taxas(csmo);
	iva_subt = calcula_iva(ene_subt + tx_subt);
	cav_subt = calcula_cav();
	
	total_fatura = ene_subt + tx_subt + iva_subt + cav_subt;
	total_fatura = Math.round(total_fatura * 100) / 100; //arredondar a duas casas decimais			 
	return total_fatura;
}

function listar_sim_simples(){
	$('#result_table > tr').remove(); //limpar conteudo da tabela antes de apresentar nova simulação
	//parametros (pr_kwh, pr_tf)
	var total_fatura = simula_fatura_simples(0.15729, 0.27068); //tarifa simples EDP
 	mostra_resultado("EDP Comercial", "Tarifa Simples Eco+", total_fatura);
	var min = total_fatura;
	
	total_fatura = simula_fatura_simples(0.1564, 0.2212); //tarifa simples Endesa
	mostra_resultado("Endesa", "Quero+Luz", total_fatura);
	if(total_fatura < min){
		min = total_fatura;
		$('#logo').attr('src', 'img/endesa_200.jpg');
	}
	//alert(min);
	$('#result_table').show();
	//realca_mais_barato();
}

function listar_sim_bh(){
	$('#result_table > tr').remove(); //limpar conteudo da tabela antes de apresentar nova simulação
	//parametros (hv, hfv, tf)
	var total_fatura = simula_fatura_bh(0.0959, 0.2008, 0.2778);//tarifa bi-horária EDP
	mostra_resultado("EDP Comercial", "Bi-Horária Eco+", total_fatura);
	
	total_fatura = simula_fatura_bh(0.0954, 0.1897, 0.2212);//tarifa bi-horária Endesa
	mostra_resultado("Endesa", "Bi-horária +Luz", total_fatura);
	
	$('#result_table').show();
	//realca_mais_barato();
}

function mostra_resultado(com, nome_tarifa, val_sim) {
        // creating rows
        var tb = document.getElementById("result_table");
        var row = document.createElement("tr");
        var com = com;
		
		/*Insere comercializador*/        
        var cell = document.createElement("td");
        var cellText = document.createTextNode(com);
        cell.appendChild(cellText);
        row.appendChild(cell);

		/*Insere tarifa*/        
        var cell = document.createElement("td");
        var cellText = document.createTextNode(nome_tarifa);
        cell.appendChild(cellText);
        row.appendChild(cell);
     
     	/*Insere valor*/
        var cell = document.createElement("td");
        var cellText = document.createTextNode(val_sim+ " €");
        cell.appendChild(cellText);
        row.appendChild(cell);
                   
		/*Adiciona linha à tabela*/        
		document.getElementById("result_table").appendChild(row); // add the row to the end of the table body
		/*mostra a tabela*/
		//document.getElementById("result_table").hidden=false;
}

/*function cria_theader () {
	    var tb = document.getElementById("result_table");
        var row = document.createElement("thead");
        
        var cell = document.createElement("th");
        var cellText = document.createTextNode('Comercializador');
        cell.appendChild(cellText);
        row.appendChild(cell);
        
        var cell = document.createElement("th");
        var cellText = document.createTextNode('Nome Tarifa');
        cell.appendChild(cellText);
        row.appendChild(cell);
        
        var cell = document.createElement("th");
        var cellText = document.createTextNode('Resultado da simulação');
        cell.appendChild(cellText);
        row.appendChild(cell);
}
*/

