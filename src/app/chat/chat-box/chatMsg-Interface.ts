export interface ChatMessage {
  chatId?: String;
  senderName: String;
  senderId: String;
  receiverName: String;
  receiverId: String;
  message: String;
  createdOn: Date;
}
