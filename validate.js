//KIỂM TRA ID: ID LÀ LINH HOẠT, KHÔNG CÓ SẴN NÊN CẦN TRUYỀN THAM SỐ.
//VÌ MÃ SV KIỂM TRA CÁC VỊ TRÍ XEM TRÙNG HAY CHƯA, KIỂM TRA THÔNG QUA ID:
/**
 * id chưa tìm thấy, hợp lê, return TRUE
 * id đã tìm thấy, không hợp lê, return FALSE
 */

//TẠO HÀM KIỂM TRA CHỨ CHƯA KIỂM TRA
//KIỂM TRA MÃ SV
function kiemTraMaSV(id, dSSV){
  //1. ĐI KIỂM TRA MÃ DỰA VÀO VỊ TRÍ, DÙNG FINDINDEX
  var viTri = dSSV.findIndex(function(item){
    return item.ma == id;
  });
  //2. DÙNG IF KIỂM TRA
  // viTri == -1 (-1 là không tìm thấy)
  // viTri != -1 (khác là ngược lại là tìm thấy)
  if(viTri == -1){
    thongBao = document.getElementById('spanMaSV').innerHTML ="";
    return true; 
  }
    var thongBao = document.getElementById('spanMaSV').innerHTML = "Mã sinh viên đã được sử dụng";
    return false;
}
//KIỂM TRA ĐỘ DÀI TÊN VÀ MẬT KHẨU
//Không cần kiểm tra trùng, nên truyền từng giá trị của chính nó.
function kiemTraDoDai(objectValue, idTB, min, max){
  //1. KIỂM TRA ĐỘ DÀI NÊN LẤY ĐỘ DÀI CHUỖI RA
  var length = objectValue.length;
  if(min <= length && length <= max){
    //hợp lệ
    document.getElementById(idTB).innerHTML = "";
    return true;
  } 
  document.getElementById(idTB).innerHTML = `Độ dài phải từ ${min} đến ${max} kí tự`;
  return false;
}
function kiemTraEmail(objectValue){
  //re LÀ ĐỊNH DẠNG EMAIL
  const re =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  if(re.test(objectValue)){
    //hợp lệ
    document.getElementById('spanEmailSV').innerHTML = "";
    return true;
  }
    document.getElementById('spanEmailSV').innerHTML = "Email hợp lệ phải là name@domainName.com";
    return false;
}
