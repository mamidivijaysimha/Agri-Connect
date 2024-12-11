import React from "react";

const ChatbotPage = () => {
  const chatbotURL = "http://localhost:8501/"; // Replace with the actual localhost URL if different

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Chatbot</h1>
      <iframe
        src={chatbotURL}
        title="Chatbot"
        style={{
          width: "100%",
          height: "800px",
          border: "2px solid #2980b9",
          borderRadius: "10px",
        }}
      />
    </div>
  );
};

export default ChatbotPage;
