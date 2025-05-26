"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  default: () => index_default
});
module.exports = __toCommonJS(index_exports);

// src/FloatingChat.tsx
var import_react = require("react");
var import_jsx_runtime = require("react/jsx-runtime");
var defaultStyles = {
  toggleButton: {
    backgroundColor: "#C4B0A9"
  },
  header: {
    backgroundColor: "#C4B0A9"
  },
  input: {
    borderColor: "#E4F4DD"
  },
  sendButton: {
    backgroundColor: "#FFFF",
    borderColor: "#C4B0A9",
    color: "#C4B0A9"
  },
  userMessage: {
    backgroundColor: "#D1E8E2",
    color: "#000"
  },
  botMessage: {
    backgroundColor: "#FCEFEF",
    color: "#333"
  }
};
var FloatingChat = ({
  onSendMessage,
  messagePlaceholder = "Type a message...",
  chatButtonText = "\u{1F4AC}",
  openButtonText = "\u2716",
  headerText = "Chat",
  sendButtonText = "Send",
  botDefaultReply = "This is a bot response.",
  styles = {},
  customHeader,
  customFooter,
  containerStyle = {},
  messageStyle,
  inputProps = {},
  buttonProps = {}
}) => {
  const mergedStyles = { ...defaultStyles, ...styles };
  const [isOpen, setIsOpen] = (0, import_react.useState)(false);
  const [message, setMessage] = (0, import_react.useState)("");
  const [messages, setMessages] = (0, import_react.useState)([]);
  const messagesEndRef = (0, import_react.useRef)(null);
  const toggleChat = () => setIsOpen((prev) => !prev);
  const handleMessageChange = (e) => setMessage(e.target.value);
  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = { text: message, sender: "user" };
      setMessages((prev) => [...prev, newMessage]);
      setMessage("");
      if (onSendMessage) onSendMessage(message);
      setTimeout(() => {
        const botMessage = { text: botDefaultReply, sender: "bot" };
        setMessages((prev) => [...prev, botMessage]);
      }, 1e3);
    }
  };
  (0, import_react.useEffect)(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    "div",
    {
      style: {
        position: "fixed",
        bottom: 20,
        right: 20,
        zIndex: 9999,
        ...containerStyle
      },
      children: [
        !isOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "button",
          {
            onClick: toggleChat,
            style: {
              width: 60,
              height: 60,
              borderRadius: "50%",
              backgroundColor: "#007bff",
              color: "#fff",
              fontSize: 24,
              border: "none",
              cursor: "pointer",
              boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
              ...mergedStyles.toggleButton
            },
            children: chatButtonText
          }
        ),
        isOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
          "div",
          {
            style: {
              width: 350,
              height: 500,
              borderRadius: 20,
              overflow: "hidden",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
              backgroundColor: "#fff",
              display: "flex",
              flexDirection: "column",
              ...mergedStyles.container
            },
            children: [
              customHeader ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: customHeader }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                "div",
                {
                  style: {
                    backgroundColor: "#007bff",
                    color: "#fff",
                    padding: "12px 16px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    ...mergedStyles.header
                  },
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                      "span",
                      {
                        style: {
                          fontWeight: "bold",
                          fontSize: 16,
                          ...mergedStyles.title
                        },
                        children: headerText
                      }
                    ),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                      "button",
                      {
                        onClick: toggleChat,
                        style: {
                          background: "transparent",
                          border: "none",
                          color: "#fff",
                          fontSize: 18,
                          cursor: "pointer",
                          ...mergedStyles.toggleButton
                        },
                        children: openButtonText
                      }
                    )
                  ]
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                "div",
                {
                  style: {
                    flex: 1,
                    overflowY: "auto",
                    padding: "10px",
                    ...mergedStyles.body
                  },
                  children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                    "div",
                    {
                      style: {
                        display: "flex",
                        flexDirection: "column",
                        gap: 8,
                        ...mergedStyles.messagesWrapper
                      },
                      children: [
                        messages.map((msg, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                          "div",
                          {
                            style: {
                              alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
                              backgroundColor: msg.sender === "user" ? "#007bff" : "#f1f1f1",
                              color: msg.sender === "user" ? "#fff" : "#000",
                              padding: "8px 12px",
                              borderRadius: 12,
                              maxWidth: "80%",
                              fontSize: 14,
                              whiteSpace: "pre-wrap",
                              ...msg.sender === "user" ? mergedStyles.userMessage : mergedStyles.botMessage,
                              ...messageStyle ? messageStyle(msg) : {}
                            },
                            children: msg.text
                          },
                          i
                        )),
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { ref: messagesEndRef })
                      ]
                    }
                  )
                }
              ),
              customFooter ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: customFooter }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                "div",
                {
                  style: {
                    display: "flex",
                    padding: "10px",
                    borderTop: "1px solid #ddd",
                    ...mergedStyles.inputWrapper
                  },
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                      "input",
                      {
                        value: message,
                        onChange: handleMessageChange,
                        placeholder: messagePlaceholder,
                        style: {
                          flex: 1,
                          padding: "8px 12px",
                          borderRadius: 20,
                          border: "1px solid #ccc",
                          outline: "none",
                          fontSize: 14,
                          ...mergedStyles.input
                        },
                        ...inputProps
                      }
                    ),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                      "button",
                      {
                        onClick: handleSendMessage,
                        style: {
                          marginLeft: 8,
                          backgroundColor: "#007bff",
                          color: "#fff",
                          border: "none",
                          borderRadius: 20,
                          padding: "8px 16px",
                          cursor: "pointer",
                          fontSize: 14,
                          ...mergedStyles.sendButton
                        },
                        ...buttonProps,
                        children: sendButtonText
                      }
                    )
                  ]
                }
              )
            ]
          }
        )
      ]
    }
  );
};
var FloatingChat_default = FloatingChat;

// src/index.ts
var index_default = FloatingChat_default;
