import { useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";

export const useSignalR = (jwtToken) => {
    const [connection, setConnection] = useState(null);

    // State variables for notifications
    const [likeNotification, setLikeNotification] = useState(null);
    const [commentNotification, setCommentNotification] = useState(null);
    const [bidApprovalNotification, setBidApprovalNotification] = useState(null);
    const [bidRejectionNotification, setBidRejectionNotification] = useState(null);
    const [bidSubmissionNotification, setBidSubmissionNotification] = useState(null);
    const [profileVisitNotification, setProfileVisitNotification] = useState(null);
    const [taskApprovalNotification, setTaskApprovalNotification] = useState(null);
    const [taskRejectionNotification, setTaskRejectionNotification] = useState(null);

    useEffect(() => {
        const newConnection = new signalR.HubConnectionBuilder()
            .withUrl("http://16.170.247.41/Hubs/Notifications", {
                accessTokenFactory: () => jwtToken,
                // withCredentials: true, // Include credentials in the request
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
                try {
                    await connection.start();
                    console.log("SignalR Connected.");

                    // Event listeners for notifications
                    connection.on("GetLikeNotification", (likeNotificationDTO) => {
                        setLikeNotification(likeNotificationDTO);
                        console.log("Received like notification:", likeNotificationDTO);
                    });

                    // connection.on("GetCommentNotification", (commentNotificationDTO) => {
                    //     setCommentNotification(commentNotificationDTO);
                    //     console.log("Received comment notification:", commentNotificationDTO);
                    // });

                    // connection.on("GetBidApprovalNotification", (bidApprovalNotificationDTO) => {
                    //     setBidApprovalNotification(bidApprovalNotificationDTO);
                    //     console.log("Received bid approval notification:", bidApprovalNotificationDTO);
                    // });

                    // connection.on("GetBidRejectionNotification", (bidRejectionNotificationDTO) => {
                    //     setBidRejectionNotification(bidRejectionNotificationDTO);
                    //     console.log("Received bid rejection notification:", bidRejectionNotificationDTO);
                    // });

                    // connection.on("GetBidSubmissionNotification", (bidSubmissionNotificationDTO) => {
                    //     setBidSubmissionNotification(bidSubmissionNotificationDTO);
                    //     console.log("Received bid submission notification:", bidSubmissionNotificationDTO);
                    // });

                    // connection.on("GetProfileVisitNotification", (profileVisitNotificationDTO) => {
                    //     setProfileVisitNotification(profileVisitNotificationDTO);
                    //     console.log("Received profile visit notification:", profileVisitNotificationDTO);
                    // });

                    // connection.on("GetTaskApprovalNotification", (taskApprovalNotificationDTO) => {
                    //     setTaskApprovalNotification(taskApprovalNotificationDTO);
                    //     console.log("Received task approval notification:", taskApprovalNotificationDTO);
                    // });

                    // connection.on("GetTaskRejectionNotification", (taskRejectionNotificationDTO) => {
                    //     setTaskRejectionNotification(taskRejectionNotificationDTO);
                    //     console.log("Received task rejection notification:", taskRejectionNotificationDTO);
                    // });
                } catch (err) {
                    console.error("Error connecting to SignalR:", err);
                    // setTimeout(startConnection, 5000); // Retry connection
                }
            };

            connection.onclose(async () => {
                console.warn("SignalR connection lost. Reconnecting...");
                await startConnection();
            });

            startConnection();
        }
    }, [connection]);

    return {
        likeNotification,
        // commentNotification,
        // bidApprovalNotification,
        // bidRejectionNotification,
        // bidSubmissionNotification,
        // profileVisitNotification,
        // taskApprovalNotification,
        // taskRejectionNotification,
    };
};
