import api from "../config/axios"

const AccountService = {
   fetchAccounts(){
      return api.get('getAccounts')
   },
   fetchAccountById(accountId){
      return api.get(`getAccountById?accountId=${accountId}`)
   },
   postAdmin(adminRequest){
      return api.post("postAcdmin", adminRequest)
   },
   postUser(userRequest){
      return api.post("postUser", userRequest)
   },
   putAccount(accountId, request){
      return api.put(`putAccount?accountId=${accountId}`, request)
   },
   putEmail(accountId, request){
      return api.put(`putEmail?accountId=${accountId}`, request)
   },
   putPassword(accountId, request){
      return api.put(`putPassword?accountId=${accountId}`, request)
   },
   deleteAccount(accountId){
      return api.put(`deleteAccount?accountId=${accountId}`)
   }
}

export default AccountService