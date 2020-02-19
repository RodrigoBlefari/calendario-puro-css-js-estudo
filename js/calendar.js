//real time clock
var d = new Date();
months = dateArrays(2);
fillTable((d.getMonth()+1), d.getFullYear());
document.getElementById("throat_month_year").value = months[d.getMonth()] + " " +  d.getFullYear();
document.getElementById("throat_month_year_selected").value = d.getMonth()+1 + "--" + d.getFullYear();

function startTime() {
	var today = new Date();
	var h = today.getHours();
	var m = today.getMinutes();
	var s = today.getSeconds();
	m = checkTime(m);
	s = checkTime(s);
	document.getElementById('head_hour').value = h + ":" + m + ":" + s;
	var t = setTimeout(startTime, 500);
	
	if(h > 12) { 
		document.getElementById("head_period").innerHTML = "PM";
	} else {
		document.getElementById("head_period").innerHTML = "AM"
	}

	wDay = dateArrays(1);
	months = dateArrays(2);
	document.getElementById("head_complete_date").value = wDay[today.getDay()] + ", " +  months[today.getMonth()] + " " + today.getDate() + ", " + today.getFullYear();
}

function checkTime(i) {
  if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
  return i;
}

function dateArrays(key){

	if (key  == 1) return wDays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
	if (key  == 2) return months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
}

function fillTable(month, year){
	
	mDays 	  = daysInMonth(month,year);
	lastMonth = daysInMonth(month,year);
	tBody = "";

	
	fstDate = new Date(year, month-1, 1);
	fstDate = fstDate.getDay();	
	lastDay = new Date(year, month-1, mDays);
	lastDay = lastDay.getDay();

	//alert(fstDate + "---" + mDays + "-- lastMonth -> " + lastDay);

	week = 1 + fstDate;
	for (i = 1; i < mDays+1; i++) { 
		if(week == 1)tBody += '<tr>';			
	 	for (k = fstDate; k > 0; k--) {
			tBody += '<td class="focus-out">' + ((lastMonth) - k) + '</td>';
		}
		fstDate = 0;	
	 	tBody += '<td id="'+year+"-"+month+"-"+i+'" onclick="openModal(this)" >' + i + '</td>';
	 	if(i == mDays){
	 		for(j = 1; j < (7-lastDay); j++){

	 			tBody += '<td class="focus-out">' + j + '</td>';
	 		}		
	 	} 	
	 	if(week == 7){ 
	 		tBody += '</tr>';		
	 		week = 1
	 	} else {	
	 		week++;	
	 	}	 	 	
	}

	document.getElementById("footer_table_body").innerHTML = tBody;
}

function daysInMonth (month, year) {
    return new Date(year, month, 0).getDate();
}

function changeDate(key){

	a = document.getElementById("throat_month_year_selected").value;
	a = a.split("--");
	m = parseInt(a[0]) + key;
	y = a[1];
	if(m < 1) {m = 1; return false;}
	if(m > 12){m = 12; return false;}
	months = dateArrays(2);
	document.getElementById("throat_month_year").value = months[m-1] + " " +  y;
	document.getElementById("throat_month_year_selected").value = m + "--" + y;
	fillTable(m,y);
}

function openModal(obj){

	var anotacao = localStorage.getItem(obj.id);
    if (anotacao === null)
    anotacao = "";
	document.getElementById('note-modal').style.width = '15%';
	document.getElementById('note-modal').style.height = '100px';
	document.getElementById('note-modal').innerHTML = '<textarea placeholder="Anotation" class="note-textarea" id='+obj.id+'  onfocusout="closeModal()" onchange="saveNote(this)">'+anotacao+'</textarea>';
	document.getElementsByClassName("note-textarea")[0].style.width = '98%';
	document.getElementsByClassName("note-textarea")[0].style.height = '100px';
	document.getElementsByClassName("note-textarea")[0].style.display = 'block';
	document.getElementsByClassName("note-textarea")[0].focus();
}

function closeModal(){

	document.getElementById('note-modal').style.width = '0%';
	document.getElementById('note-modal').style.height = '0px';
	document.getElementsByClassName("note-textarea")[0].style.width = '0%';
	document.getElementsByClassName("note-textarea")[0].style.height = '0px';
	document.getElementsByClassName("note-textarea")[0].style.display = 'none';
	document.getElementById('note-modal').innerHTML = '';
}

function saveNote(obj){
	localStorage.setItem(obj.id, obj.value);
}



