import { Server, Socket } from "socket.io";
import prisma from "./../libs/prisma";
import { Chats } from "@prisma/client";
import { Console } from "console";

const idAdmins: string[] = ["1", "2", "3", "4", "5", "6"];
let socketAdmin: Socket;
const chatUsers: Chats[] = [];

interface ChatDTO {
  roomId: string;
  senderId: number;
  receiverId: number;
  message?: string;
}

export const socketHandler = async (socket: Socket, io: Server) => {
  socket.on("send to server", async (data: ChatDTO) => {
    const { receiverId, senderId, roomId } = data;

    const historyChat: Chats[] = await prisma.chats.findMany({
      where: { roomId: `${roomId}` },
    });
    socket.join(`${roomId}`);
    socket.emit("send history to client", { chats: historyChat });
  });

  socket.on("get room admin", async (data: ChatDTO) => {
    const { receiverId, senderId } = data;
    const RoomChatAdmin = await prisma.user.findMany({
      where: {
        sendChat: {
          some: {
            receiverId: senderId,
          },
        },
      },
      include: {
        profile: true,
      },
    });

    socket.emit("send room admin", RoomChatAdmin);
  });

  socket.on("message", async (data: { message: string; roomId: string; senderId: number; receiverId: number }) => {
    const { roomId, senderId, receiverId, message } = data;
    const saveMessage = await prisma.chats.create({
      data: {
        roomId,
        senderId,
        receiverId,
        message,
      },
    });
    io.to(data.roomId).emit("data message", { message, roomId, senderId, receiverId });
  });

  socket.on("disconnect", () => {
    // console.log(socket.id + " disconnected");
  });
};

// export const socketHandler = async (socket: Socket, io: Server) => {
//   const userId = socket.handshake.query.userId;
//   const adminId = socket.handshake.query.adminId;

//   if (!idAdmins.includes(userId as string)) {
//     if (!chatUsers.includes(userId as string)) chatUsers.push(userId as string);
//     socket.join(`${userId}-${adminId}`);
//     socket.emit("connected", { rooms: [`${userId}${adminId}`] });
//     if (socketAdmin) {
//       socketAdmin.join(`${userId}-${adminId}`);
//     }
//   } else {
//     socketAdmin = socket;
//     const listRooms = chatUsers.map((user) => `${user}-${adminId}`);
//     socketAdmin.join(listRooms);
//     socketAdmin.emit("connected", { rooms: listRooms });
//   }

//   socket.on("message", (data: { messages: string; roomId: string }) => {
//     io.to(data.roomId).emit("data message", { messages: data.messages, userId });
//   });

//   socket.on("disconnect", () => {
//     console.log(socket.id + " disconnected");
//   });
// };
