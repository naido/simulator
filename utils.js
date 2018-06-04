function teste(){
	alert("entrou na func teste");
}


function valida_tip_csmo(){
	var tip = document.getElementsByName("tip_csmo");
	
	for (var i = 0, length = tip.length; i < length; i++)
	{
	 if (tip[i].checked)
	 {
		 if(tip[i].value == "s"){
			document.getElementById("sim_simples").hidden=false;
			document.getElementById("sim_bh").hidden=true;
		 }
		 else 
		 {
			document.getElementById("sim_simples").hidden=true;
			document.getElementById("sim_bh").hidden=false;
			break;
		 }
	 }
	}
}


