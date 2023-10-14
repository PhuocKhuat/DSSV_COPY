//Lưu tên sinh viên dùng array chứa object
//Tạo array bên ngoài => NHỚ
var dSSV = [];
//## ĐỂ Ở ĐÂY, KHI TẢI LẠI TRANG ĐƯA CÁC Ô LÊN GIAO DIỆN
//ĐƯA TỪ LOCAL STORAGE LÊN GIAO DIỆN
var dataJson = localStorage.getItem('DSSV_LOCAL');
// var dataJsonn = localStorage.getItem('DSSV_LOCALL');
if(dataJson != null){
  //CHUYỂN JSON THÀNH ARRAY, UPDATE dSSV ở đây từ 5 thêm 1 tải trang lên 6
  let result = JSON.parse(dataJson);
  //LẤY ARRAY Ở DÒNG 9 ĐI XỬ LÝ TIẾP, PHẢI TRUYỀN VÀO THAM SỐ dSSV NẾU KHÔNG renderDSSV() SẼ HIỂU TỪ BÊN NGOÀI, THÊM Ở FUNCTION CONTRO, NÚT THÊM VÀ XOÁ.
  //FUNCTION ĐI KÈM RETURN
  //BIẾN 1 ARRAY CHỨA OBJECT KHÔNG CÓ METHOD THÀNH ARRAY CHỨA OBJECT CÓ METHOD.
  dSSV = result.map(function(item){
    return new SinhVien(
    item.ma,
    item.ten,
    item.email,
    item.pass,
    item.toan,
    item.van,);
  });
  renderDSSV(dSSV);
}

function themSV(){ //7 BƯỚC
  /**
   * 1. Tạo 1 array rỗng
   * 2. Lấy thông tin từ form => tạo object => push object vào array
   * 3. render array object lên layout (tạo các thẻ tr tương ứng)
   */
  //2
  var _ma = document.getElementById('txtMaSV').value;
  var _ten = document.getElementById('txtTenSV').value;
  var _email = document.getElementById('txtEmail').value;
  var _pass = document.getElementById('txtPass').value;
  var _toan = document.getElementById('txtDiemToan').value*1;
  var _van = document.getElementById('txtDiemVan').value*1;
  // var sinhVien = {
  //   ma : _ma,
  //   ten: _ten,
  //   email: _email,
  //   pass: _pass,
  //   toan: _toan,
  //   van: _van,
  //   tinhDTB: function(){
  //     var dtb = (this.toan + this.van)/2;
  //     return dtb;
  //   },
  // }
  //3
  var sinhVien = new SinhVien(_ma, _ten, _email, _pass, _toan,_van);
  //Khi ấn nút THÊM các ô SV sẽ hiện trên layout, và khi load trang lại thì các ô SV vẫn còn, nên để stringtify ở đây.

  //KIỂM TRA Ở ĐÂY ~ VALIDATE
  //Phép cộng bit &, dù trước là true hay false vẫn đi kiểm tra tiếp nhưng không hiện.
  //Phép so sánh &&, dù trước là true thì kiểm tra phía sau, trước là false thì dừng lại.
  var isValid = kiemTraMaSV(sinhVien.ma ,dSSV) && kiemTraDoDai(sinhVien.ma,'spanMaSV', 4, 6) & kiemTraDoDai( sinhVien.pass,'spanMatKhau', 7, 8) & kiemTraEmail(sinhVien.email);
  if(isValid){
    //4
  dSSV.push(sinhVien); //DÒNG PUSH Ở TRÊN DO THÊM VÀO RỒI MỚI CHUYỂN.
  //5 CHUYỂN ARRAY (DSSV) THÀNH JSON.
  var dataJson = JSON.stringify(dSSV);
  //6 LƯU XUỐNG LOCAL STORAGE.
  localStorage.setItem('DSSV_LOCAL',dataJson);
  //7 LẤY ARRAY ĐI XỬ LÝ
  renderDSSV(dSSV);
  } 
}
//So sánh hàm, trên xoaSV có tham số, dưới có tham số để nhận
function xoaSV(id){ //5 BƯỚC
  //indexOf dùng cho array chứa chuỗi, số, khi đã có hết thông tin
  /**splice( vị trí cần xoá)
   * 1. từ id tìm vị trí => findIndex
   * 2. sử dụng splice để remove
   * 3. update lại layout */
  //1
  var viTri = dSSV.findIndex(function(item){
    return item.ma == id;
    //item: từng phần tử trong array danh sách
    //findIndex(function(item) : tìm những vị trí của item
    //{return item.ma == id}): Kiếm mã của item là id (có ai tên là id)
  });
  //2
  dSSV.splice(viTri, 1); //DÒNG SPLICE Ở TRÊN DO XOÁ VÀO RỒI MỚI CHUYỂN. 
  //3 CHUYỂN ARRAY (DSSV) THÀNH JSON.
  var dataJson = JSON.stringify(dSSV);
  //4 LƯU XUỐNG LOCAL STORAGE.
  localStorage.setItem('DSSV_LOCAL',dataJson);
  //5 LẤY ARRAY ĐI XỬ LÝ.
  renderDSSV(dSSV);
}
function suaSV(id){ //3 BƯỚC
  //1. TÌM VỊ TRÍ XOÁ SẼ DỰA THEO ID, DÙNG FINDINDEX.
  var viTri = dSSV.findIndex(function(item){
    //viTri sẽ tìm vị trí những phần tử trong dSSV và tìm tới những item nào có mã
    return item.ma == id;
    //item: từng phần tử trong array danh sách
    //findIndex(function(item) : tìm thông tin của item
    //{return item.ma == id}): Kiếm mã của item là id (có ai tên là id)
  });
  //2. LẤY VỊ TRÍ TRONG dSSV VÀ SẼ ĐƯỢC GÁN BẰNG sVi
  var sVi = dSSV[viTri];
  //3. ĐƯA THÔNG TIN LÊN FORM - DOM TỚI THẺ INPUT
  document.getElementById('txtMaSV').readOnly = true;
  document.getElementById('txtMaSV').value = sVi.ma;
  document.getElementById('txtTenSV').value = sVi.ten;
  document.getElementById('txtEmail').value = sVi.email;
  document.getElementById('txtPass').value = sVi.pass;
  document.getElementById('txtDiemToan').value = sVi.toan;
  document.getElementById('txtDiemVan').value = sVi.van;
  
}
// NẾU ĐÃ DOM TỚI GIAO DIỆN THÌ KHÔNG NHẬN THAM SỐ ID, BÀI NÀY CẬP NHẬT THEO MÃ, DOM Ở DÒNG _ma 
function capNhatSV(){ //6 BƯỚC
  //1. LẤY THÔNG TIN TỪ FORM - DOM TỚI GIAO DIỆN
  var _ma = document.getElementById('txtMaSV').value;
  var _ten = document.getElementById('txtTenSV').value;
  var _email = document.getElementById('txtEmail').value;
  var _pass = document.getElementById('txtPass').value;
  var _toan = document.getElementById('txtDiemToan').value*1;
  var _van = document.getElementById('txtDiemVan').value*1;
  //2. TÌM VỊ TRÍ XOÁ SẼ DỰA THEO _ma, DÙNG FINDINDEX
  var viTri = dSSV.findIndex(function(item){
    return item.ma == _ma;
  });
  //3. TẠO OBJECT
  var sinhVien = new SinhVien(_ma, _ten, _email, _pass, _toan,_van);
  //4. LẤY VỊ TRÍ TRONG dSSV.
  dSSV[viTri] = sinhVien;
  //5. DÙNG SPLICE ĐỂ CẬP NHẬT TỪ VỊ TRÍ sinhVien, XOÁ ĐI CHÍNH NÓ, THÊM sinhVien VÀO
  dSSV.splice(viTri, 1, sinhVien);
  // dSSV.splice(viTri, 1, sinhVien);
  //6.
  var dataJson = JSON.stringify(dSSV);
  //7.
  localStorage.setItem('DSSV_LOCAL', dataJson);
  //8. LẤY ARRAY ĐI XỬ LÝ TIẾP
  renderDSSV(dSSV);
}
