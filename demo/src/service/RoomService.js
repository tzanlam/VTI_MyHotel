import api from "../config/axios"

export const RoomService = {
   fetchRooms(){
      return api.get("getRooms")
   },
   fetchRoomById(roomId){
      return api.get(`getRoomById?roomId=${roomId}`)
   },
   fetchRoomsByDate({startDate, endDate}){
      return api.get(`getRoomsByDate?startDate=${startDate}&endDate=${endDate}`)
   },
   postRoom(roomRequest){
      return api.post("postRoom", roomRequest)
   },
   putRoom(roomId, roomRequest){
      return api.put(`putRoom?roomId=${roomId}`, roomRequest)
   },
   putQuantityRoom(roomId, quantity){
      return api.put(`putQuantityRoom?roomId=${roomId}`, quantity)
   },
   putQuantityRoomByDate(roomId, startDate, endDate, quantity){
      return api.put(`putQuantityByDate?roomId=${roomId}&startDate=${startDate}&endDate=${endDate}&quantity=${quantity}`)
   },
   deleteRoom(roomId){
      return api.put(`deleteRoom?roomId=${roomId}`)
   }
}