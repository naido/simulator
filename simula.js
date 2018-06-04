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

function simula_fatura_simples() {
	//alert("Função calcular_fatura() ativa");
	//alert("Consumo inserido: " + document.getElementById("cons_mensal").value);
	var cat_pr_ene = 0.15729; //valor do kWh
	var cat_pr_tf = 0.27068; //valor dia
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
	//alert("Resultado da simulação para um consumo de " + csmo + " kWh: \n" + total_csmo + " €");
	document.getElementById("val_fat").innerHTML = total_fatura;
	document.getElementById("sim_res").hidden = false;
}

function simula_fatura_bh(){
	alert("Operação ainda não disponível")
}