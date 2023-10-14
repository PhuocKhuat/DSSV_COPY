//TẠO LỚP ĐỐI TƯỢNG SINH VIÊN
//LẤY NHỮNG THAM SỐ DẠNG VALUE ĐỂ TẠO RA 1 SINH VIÊN (TÊN, MSSV, EMAIL) HOẶC NHÌN TRÊN LAYOUT
function SinhVien(_ma, _ten, _email, _pass, _toan,_van){
    //THIS.KEY = VALUE TRUYEN VAO
    this.ma = _ma;
    this.ten = _ten;
    this.email = _email;
    this.pass = _pass;
    this.toan = _toan;
    this.van = _van;
    this.tinhDTB = function(){
        return (this.toan + this.van)/2;
    }  
}
