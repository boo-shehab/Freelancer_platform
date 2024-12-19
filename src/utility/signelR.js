import { useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";

export const useSignalR = (jwtToken) => {
  const [connection, setConnection] = useState(null);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl("http://16.170.247.41/Hubs/Notifications", {
        accessTokenFactory: () => jwtToken,
      })
      .configureLogging(signalR.LogLevel.Information)
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);

    return () => {
      if (newConnection) {
        newConnection.stop();
      }
    };
  }, [jwtToken]);

  useEffect(() => {
    if (connection) {
      const startConnection = async () => {
        if (connection.state === signalR.HubConnectionState.Disconnected) {
          try {
            await connection.start();
            console.log("SignalR Connected.");

            const handleNotification = (type, data) => {
              setNotifications((prev) => [
                ...prev,
                { type, data, timestamp: new Date() },
              ]);
              console.log(`Received ${type} notification:`, data);
            };

            // Attach listeners for all notification types
            connection.on("GetLikeNotification", (data) =>
              handleNotification("like", data)
            );
            connection.on("GetCommentNotification", (data) =>
              handleNotification("comment", data)
            );
            connection.on("GetBidApprovalNotification", (data) =>
              handleNotification("bidApproval", data)
            );
            connection.on("GetBidRejectionNotification", (data) =>
              handleNotification("bidRejection", data)
            );
            connection.on("GetBidSubmissionNotification", (data) =>
              handleNotification("bidSubmission", data)
            );
            connection.on("GetProfileVisitNotification", (data) =>
              handleNotification("profileVisit", data)
            );
            connection.on("GetTaskApprovalNotification", (data) =>
              handleNotification("taskApproval", data)
            );
            connection.on("GetTaskRejectionNotification", (data) =>
              handleNotification("taskRejection", data)
            );
          } catch (err) {
            console.error("Error connecting to SignalR:", err);
            setTimeout(startConnection, 10000); // Retry after 10 seconds
          }
        } else {
          console.warn(
            "Cannot start SignalR connection as it is not in the 'Disconnected' state."
          );
        }
      };

      connection.onclose(async () => {
        console.warn("SignalR connection lost. Reconnecting...");
        await startConnection();
      });

      startConnection();
    }
  }, [connection]);

  return { notifications };
}; 
