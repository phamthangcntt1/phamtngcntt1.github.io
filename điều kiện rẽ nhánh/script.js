function Kiemtrathongtin(event)
{
 
 ///Cách 1: sài event 
 event.preventDefault();
 //var temp=document.getElementById('input').value;
 var temp=document.forms['form']['input'].value;
 var mess=document.getElementById('mess');
 if (temp=='')
 {
 
  mess.innerHTML='Bạn nhập thiếu rồi';
 
 }	
 else 
 {
  mess.innerHTML='Bạn nhập thành công rồi';
   
 }
 
//Nếu truyền tham số dô thì bên html phải có truyền dô cái id của tag input
}
//function Kiemtranhapso(event,so)
function Kiemtranhapso(so)
{
 //event.preventDefault();
 //Cách 2 sài return false
 var letter=/^[0-9]+$/;

 var mess1=document.getElementById('mess1');
 if (!so.value.match(letter))//Bên html đã truy vấn tới thẻ input r bên đây chỉ .value nữa là đủ
 {

   so.style.backgroundColor='red'; 
   mess1.innerHTML='Bạn chỉ được nhập số thui';
   return false; 
 }
 else 
 { 
   
  mess1.innerHTML='Bạn nhập thành công rồi';
  return false;
  
 }
 
}

function Kiemtranhapkitu(event,kt)
{
 event.preventDefault();
 var letter1=/^[A-Z]+$/;
 var letter2=/^[a-z]+$/;
 var mess2=document.getElementById('mess2');
 if (kt.value.match(letter1) || kt.value.match(letter2))
 {
 
  mess2.innerHTML='Bạn nhập thành công rồi';
 
 }
 else 
 {
   mess2.innerHTML='Bạn chỉ được nhập kí tự thui';
   kt.style.backgroundColor='red';
   kt.focus();
   
  
 }
 
}

function Kiemtraemail(event,email)
{
 event.preventDefault();
 var letter3= /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
 
 var mess2=document.getElementById('mess3');
 if (email.value.match(letter3))
 {
 
  mess3.innerHTML='Bạn nhập thành công rồi';
 
 }
 else 
 {
   mess3.innerHTML='Bạn nhập định dạng email sai rồi (abc@gmail.com)';
   email.style.backgroundColor='red';
   email.focus();
   
  
 }
 
}

function Kiemtradodaikitu(event,ktnhap,minkt,maxkt)
{
 event.preventDefault();
 var mess4=document.getElementById('mess4');
 if (ktnhap.value.length<minkt || ktnhap.value.length>maxkt)
 {
  mess4.innerHTML='Bạn đã nhập quá số kí tự cho phép. Kí tự chp phép lớn hơn 3 và nhỏ hơn 7';
  ktnhap.style.backgroundColor='red';
  ktnhap.focus();
  
 
 }
 else 
 {
  mess4.innerHTML='Bạn nhập thành công rồi';
 }
 
}
