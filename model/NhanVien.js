/**
    "maNhanVien": 0,
    "tenNhanVien": "string",
    "chucVu": "string",
    "heSoChucVu": 0,
    "luongCoBan": 0,
    "soGioLamTrongThang": 0 */
    
var NhanVien = function () {
    this.maNhanVien = '';
    this.tenNhanVien = '';
    this.chucVu = '';
    this.luongCoBan = '';
    this.soGioLamTrongThang = '';
    this.heSoChucVu = '';
    this.tinhTongLuongNhanVien = function () {
        var tongLuong = this.luongCoBan * this.heSoChucVu;
        return tongLuong;
    };
    this.xepLoai = function () {
        if (this.soGioLamTrongThang > 120) {
            return 'Nhân viên xuất sắc';
        } else if (this.soGioLamTrongThang > 100 && this.soGioLamTrongThang <= 120) {
            return 'Nhân viên giỏi';
        } else if (this.soGioLamTrongThang > 80 && this.soGioLamTrongThang <= 100) {
            return 'Nhân viên khá';
        } else if (this.soGioLamTrongThang >= 50 && this.soGioLamTrongThang <= 80) {
            return 'Nhân viên trung bình';
        } else if (this.soGioLamTrongThang > 0 && this.soGioLamTrongThang < 50) {
            return 'Cảnh báo';
        }
    }
}

