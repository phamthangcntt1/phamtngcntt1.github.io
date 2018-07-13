//vừa kết thúc phép tính
var end=false;
//obj kết quả
var ketqua=document.getElementById('ketqua');
//đổi dấu
var doi_dau=false;
//Số phép tính ưu tiên tìm thấy
var uu_tien=0;
//mảng ghi nhớ các số hạng
//ghi nhớ phép tính cũ nếu có thay đổi phép tính
var phep_tinh_cu='';
var mang_so_max_index=0;
var mang_so=new Array();
//Mảng ghi nhớ phép tính
var mang_pt_max_index=0;
//vừa bấm phép tính
var doi_phep_tinh=false;
var mang_pt=new Array();
var phim_moi='';
var str_ketqua='';
function ClickButton(obj){
	
	if(end){
		ketqua.value='';
		end=false;
	}
	//chuỗi hiện tại của kết quả 
	var str_ketqua_old=ketqua.value;
	if(str_ketqua=='' && phim_moi==''){
		str_ketqua=ketqua.value;
	}
	if(str_ketqua=='0'){
		str_ketqua='';
	}
	var type=obj.innerHTML;
	//nhóm số
	if(type=='0'||
	   type=='1'||
	   type=='2'||
	   type=='3'||
	   type=='4'||
	   type=='5'||
	   type=='6'||
	   type=='7'||
	   type=='8'||
	   type=='9'||
	   type=='+/-'||
	   type=='.'
	   ){
	   	var doi_phep_tinh=false;
		//đổi dấu
		if(type=='+/-'){
			if(doi_dau){
				doi_dau=false;
				phim_moi=phim_moi.substring(1);
			}
			else{
				doi_dau=true;
				phim_moi='-'+phim_moi;
			}
		}
		else{
			phim_moi +=type;
		}
		//thay đổi hiển thị
		ketqua.value=str_ketqua+phim_moi;
	}
	else if(
		type=='+'||
		type=='-'||
		type=='x'||
		type=='/' 
		){
		//trước đó có bấm một phép tính
		if(doi_phep_tinh){
			//Nếu phép tính cũ là ưu tiên nhưng phép tính mới không ưu tiên
			if((phep_tinh_cu=='x'||phep_tinh_cu=='/')&&(type=='+'||type=='-')){
				uu_tien--;
			}
			//nếu phép tính cũ không ưu tiên nhưng phép tính mới không ưu tiên
			else if((phep_tinh_cu=='+'||phep_tinh_cu=='-')&&(type=='x'||type=='/')){
				uu_tien++;
			}
			//Lưu vào mảng phép tính
			mang_pt[mang_pt_max_index-1]=type;
			//xử lý hiển thị
			ketqua.value=ketqua.substring(0,ketqua.value.length-1)+type;

			
		}
		else{
			//ghi nhớ phép tính
			phep_tinh_cu=type;
			//lưu vào mảng số
			mang_so[mang_so_max_index]=parseFloat(phim_moi);
			mang_so_max_index++;
			//lưu vào mảng phép tính
			mang_pt[mang_pt_max_index]=type;
			mang_pt_max_index++;
			//xử lý hiển thị 
			ketqua.value=ketqua.value+type;
			//cộng số đếm ưu tiên lên
			if(type=='x'||type=='/'){
				uu_tien++;

			}
		}
		//ghi nhớ đã bấm phím phép tính
		doi_phep_tinh=true;
		//đổi giá trị 2 chuỗi cơ bản về rỗng
		str_ketqua='';
		phim_moi='';
	}
	//nhóm tính kết quả
	else if(type=='='||type=="%"){
		end=true;
		if(phim_moi!=''){
				mang_so[mang_so_max_index]=parseFloat(phim_moi);
			}
		//dấu =
		if(type=='='){
			//gọi hàm tính
			Getvalue();
		}
		else{
			//gọi hàm tính %
			GetPercent();
		}
		//reset
		str_ketqua='';
		phim_moi='';
		mang_so=new Array();
		mang_pt=new Array();
		mang_pt_max_index=0;
		mang_so_max_index=0;
		uu_tien=0;
	}
	else if(type=='CE'){
		phim_moi='';
		ketqua.value=str_ketqua+phim_moi;
	}
	//phím xóa 1 ký tự
	else{
		if(phim_moi.length>1){
			phim_moi=phim_moi.substring(0,phim_moi.length-1)
		}
		else{
			phim_moi='';
		}
		// phim_moi='';
		ketqua.value=str_ketqua+phim_moi;
	}
	
}
function GetPercent(){
	//kiểm tra mảng số chỉ có 2 phần tử và phần tử thứ 2 phải khác 0
	mang_pt_max_index--;
	if(mang_so_max_index!=1||mang_so[1]==0){
		ketqua.value="0";
	}
	//phép tính phải là chia
	else if(mang_pt_max_index!=0){
		ketqua.value="0";
	}
	else if(mang_pt[0]!='/'){
		ketqua.value="0";
	}
	///tất cả điều kiện đều đã thỏa
	else{
		var _kq=mang_so[0]/mang_so[1]*100;
		ketqua.value=_kq;
	}
	str_ketqua='';
	phim_moi='';
	mang_so=new Array();
	mang_pt=new Array();
	mang_pt_max_index=0;
	mang_so_max_index=0;

}
//tính giá trị thường
function Getvalue(){
	//kiểm tra mảng số chỉ có 2 phần tử và phần tử thứ 2 phải khác 0
	mang_pt_max_index--;
	//b1 phép tính ưu tiên
	while(uu_tien>0){
		for(var index=0; index<=mang_pt_max_index;index++){
			if(mang_pt[index]=='x'||mang_pt[index]=='/'){
				//lấy hai số hạng 
				var sh1=mang_so[index];
				var sh2=mang_so[index+1];
				//tính kết quả nhân hoặc chia
				var kqt=0;
				if(mang_pt[index]=='x'){
					 kqt=sh1*sh2;
				}
				else if(sh2==0){
					ketqua.value="0";
				}
				else{
					kqt=sh1/sh2;
				}
				//thay thế số hạng 
				mang_so[index]=kqt;
				//dồn số hạng
					for(var new_index=index+1;new_index<mang_so_max_index;new_index++){
						mang_so[new_index]=mang_so[new_index+1];
					} 
				
				mang_so_max_index--
				//xóa bỏ phép tính
				for(var new_index=index;new_index<mang_pt_max_index;new_index++){
						mang_pt[new_index]=mang_pt[new_index+1];
					} 
				
				mang_pt_max_index--
				//xóa ghi nhớ ưu tiên
				uu_tien--
				//ngặt vòng lặp 
				break;
			}
		}
	}
	//b2 phép tính thường
	while(mang_so_max_index>0){
		//lấy 2 số hạng
		var sh1=mang_so[0];
		var sh2=mang_so[1];
		//Tính kết quả
		var kqt=0;
		if(mang_pt[0]=='+'){
			kqt=sh1+sh2;
		}
		else{
			kqt=sh1-sh2;
		}
		//thay thế số hạng 
		mang_so[0]=kqt;
		//dồn số hạng
			for(var new_index=1;new_index<mang_so_max_index;new_index++){
				mang_so[new_index]=mang_so[new_index+1];
			} 
		
		mang_so_max_index--
		//xóa bỏ phép tính
		for(var new_index=0;new_index<mang_pt_max_index;new_index++){
				mang_pt[new_index]=mang_pt[new_index+1];
			} 
		
		mang_pt_max_index--
		//xóa ghi nhớ ưu tiên
	}
	//in kết quả
	ketqua.value=mang_so[0];
}
