import api from "../config/axios"

export const VoucherService = {
   fetchVouchers(){
      return api.get("getVouchers")
   },
   fetchVoucherById(voucherId){
      return api.get(`getVoucherById?voucherId=${voucherId}`)
   },
   postVoucher(voucherRequest){
      return api.post("postVoucher", voucherRequest)
   },
   putVoucher(voucherId, voucherRequest){
      return api.put(`putVoucher?voucherId=${voucherId}`, voucherRequest)
   },
   putExpiryVoucher(voucherId, date){
      return api.put(`putExpiryDate?voucherId=${voucherId}&date=${date}`)
   },
   deleteVoucher(voucherId){
      return api.put(`deleteVoucher?voucherId=${voucherId}`)
   }
}