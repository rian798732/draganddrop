const imgItem = document.querySelectorAll(".imageItem");
const dropLoc = document.getElementById("dropLoc");
const total = document.querySelectorAll(".total");
// const cPlus = $(".currentPlus")
var fieldHTML = '';
var ver = parseInt($("#total").val());
	var tot = ver;
	var to = 0;
function totale(){
	alert(total.length)
	
	for(var t = 1;t < (total.length +1);t++){
	to = parseInt(total[t-1].value);

	// alert(to)
	tot += to;
	$("#total").val(tot)
	}
	// tot = 0 
}
//console.log(fieldHTML)
// $('body').find('.listCart:last').after(fieldHTML);
var imageList = [];
a = 0
var v = 0;
function cekImage (tst){
	v = 0;
	for (a = 0; a < imageList.length; a++){
		if(tst == imageList[a]){
			v = 1
		}
	}
	return v;
}
 
$(document).on("click",".currentPlus",function(){
	hrgEl = 0;
 	hrgV = 0;
	
	var el = $(this).attr('el');
	var hrg = 0;
	//alert('oke')
	hrgEl = $(this).attr('hrga');
	//alert(hrgEl)

	el = el.replace(' ','')
	hrgEl = hrgEl.replace(".","")
	//alert(el)
	var hrgV = $("#"+el).val()
	//	alert(hrgV)
	hrgV = hrgV.replace(".","")


	hrg = parseInt(hrgEl)+parseInt(hrgV);
	//hrg += hrg;
	//alert(el)
	
	$("#"+el).val(hrg);

	var to = parseInt( $("#total").val());
	var h = parseInt(hrgEl)
	//alert(to +" - "+ hrgEl)
	var tota = to + h;
	//alert(tota)
	$("#total").val(tota)

	hrgEl = 0;
	hrgV = 0;
	
	//alert(hrgEl)
})
$(document).on("click",".currentMinus",function(){
	hrgEl = 0;
 	hrgV = 0;
 	
 	var el = $(this).attr('al');
	var hrg = 0;
	//alert('oke')
	hrgEl = $(this).attr('hrga');
	//alert(hrgEl)

	el = el.replace(' ','')
	hrgEl = hrgEl.replace(".","")

	hrgV = $("#"+el).val().replace(".","")

	hrg = parseInt(hrgV)-parseInt(hrgEl);
	//hrg += hrg;
	//alert(el)
	//alert(hrgEl)
	
	$("#"+el).val(hrg);
	
	var to = parseInt( $("#total").val());
	var h = parseInt(hrgEl)
	//alert(to +" - "+ hrgEl)
	var tota = to - h;
	//alert(tota)
	// var y = ['Red', 'Green', 'White', 'black', 'Yellow'];
	// var remove_Item = 'White';

	// console.log('Array before removing the element = '+y);
	// y = $.grep(y, function(value) {
	//   return value != remove_Item;
	// });
	// console.log('Array after removing the element = '+y);
	//console.log(imageList)
	//console.log(el)
	if(hrg == 0){
		$(this).parent().remove();

		var removeItem = el.toLowerCase();   
 		removeItem = removeItem.replace(" ","")
		imageList = $.grep(imageList, function(value) {
		  return value.toLowerCase() != removeItem;
		});
	//	console.log(imageList)
	}
	$("#total").val(tota)
	//alert(to)
	//alert(total.length)

	// for(var t = 0;t < (total.length +1);t++){
	// to = parseInt(total[t].value);

	// // alert(to)
	// tot += to;
	// $("#total").val(tot)
	// }
//alert('kurang')
hrgEl = 0;
	hrgV = 0;
})

function ganti(src, hrg){
	//alert("img/"+src+".jpg")
	
	//alert(src +""+ hrg)
	$("[btn='plus']:last").attr('hrga',hrg)
	$("[btn='plus']:last").attr('el',src)
	$("[btn='minus']:last").attr('hrga',hrg)
	$("[btn='minus']:last").attr('al',src)
	$("[imgBaru='imgBaru']:last").attr("src","../img/"+src+".jpg")
	hrg = hrg.replace(".","")
	$("[hrgBaru='hrgBaru']:last").attr('value',hrg);
	$("input:last").attr('id',src.replace(' ',''))
	

	fieldHTML = $("#contoh").html();
}
for(a = 0; a < imgItem.length; a++){
	imgItem[a].ondragstart = function(e){
		//console.log(e)
		var tst = e.target.id;
		var target = document.getElementById(e.target.id)
		// target.style.cursor ='grabbing';
		//var arr = test.find( cek )
		if(cekImage(tst) == 0){
			
		
		//	alert(e.target.currentSrc)
		//alert()
		var c = e.target.alt;
		c = c.toLowerCase();
		// alert(c)
		var g = e.target.attributes.hrg.value

		e.dataTransfer.setData('hrg',g);
		//alert(g)
			ganti(c,g)
			imageList.push(tst)
			
		}else{
			alert('data sudah ada')
		}
	//	console.log(e)
	}
};

dropLoc.ondragover = function(e){
	e.preventDefault();
}

dropLoc.ondrop = function(e){
	e.preventDefault();
	var hrgEl = e.dataTransfer.getData('hrg');
	hrgEl = parseInt(hrgEl.replace(".",""))
	//alert(hrgEl)
	$('body').find('.listCart:last').after(fieldHTML);
	var to = parseInt($("#total").val());
	var h = parseInt(hrgEl)
	//alert(to +" - "+ hrgEl)
	var tota = to + h;
	//alert(tota)
	$("#total").val(tota)
}
