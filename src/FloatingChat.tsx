import React, {
  useState,
  ChangeEvent,
  useRef,
  useEffect,
  CSSProperties,
  ReactNode,
} from 'react';

interface Message {
  text: string;
  sender: 'user' | 'bot';
}

interface StyleProps {
  container?: CSSProperties;
  header?: CSSProperties;
  body?: CSSProperties;
  messagesWrapper?: CSSProperties;
  inputWrapper?: CSSProperties;
  input?: CSSProperties;
  sendButton?: CSSProperties;
  userMessage?: CSSProperties;
  botMessage?: CSSProperties;
  toggleButton?: CSSProperties;
  title?: CSSProperties;
}

interface FloatingChatProps {
  onSendMessage?: (message: string) => void;
  messagePlaceholder?: string;
  chatButtonText?: string;
  openButtonText?: string;
  headerText?: string;
  sendButtonText?: string;
  botDefaultReply?: string;
  messagesProp?: Message[];
  styles?: StyleProps;
  customHeader?: ReactNode;
  customFooter?: ReactNode;
  containerStyle?: CSSProperties;
  messageStyle?: (message: Message) => CSSProperties;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  buttonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
  userName?: string;
  botName?: string;
  askedQuestions?: string[];
}

const defaultStyles: StyleProps = {
  toggleButton: {
    backgroundColor: '#C4B0A9',
  },
  header: {
    backgroundColor: '#C4B0A9',
  },
  input: {
    borderColor: '#E4F4DD',
  },
  sendButton: {
    backgroundColor: '#FFFF',
    borderColor: '#C4B0A9',
    color: '#C4B0A9',
  },
  userMessage: {
    backgroundColor: '#D1E8E2',
    color: '#000',
  },
  botMessage: {
    backgroundColor: '#FCEFEF',
    color: '#333',
  },
};

const FloatingChat: React.FC<FloatingChatProps> = ({
  onSendMessage,
  messagePlaceholder = 'Type a message...',
  chatButtonText = '💬',
  openButtonText = '✖',
  headerText = 'Chat',
  sendButtonText = 'Send',
  messagesProp = [],
  styles = {},
  customHeader,
  customFooter,
  containerStyle = {},
  messageStyle,
  inputProps = {},
  buttonProps = {},
  userName = 'You',
  botName = 'Bot',
  askedQuestions = [],
}) => {
  const mergedStyles = { ...defaultStyles, ...styles };

  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const toggleChat = () => setIsOpen((prev) => !prev);

  const handleMessageChange = (e: ChangeEvent<HTMLInputElement>) =>
    setMessage(e.target.value);

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage: Message = { text: message.trim(), sender: 'user' };
      setMessages((prev) => [...prev, newMessage]);
      onSendMessage?.(message.trim());
      setMessage('');
    }
  };

  const handleQuestionClick = (q: string) => {
    const newMessage: Message = { text: q, sender: 'user' };
    setMessages((prev) => [...prev, newMessage]);
    onSendMessage?.(q);
  };

  useEffect(() => {
    if (Array.isArray(messagesProp)) {
      setMessages(messagesProp);
    }
  }, [messagesProp]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 20,
        right: 20,
        zIndex: 9999,
        ...containerStyle,
      }}
    >
      {!isOpen && (
        <button
          onClick={toggleChat}
          style={{
            width: 60,
            height: 60,
            borderRadius: '50%',
            backgroundColor: '#007bff',
            color: '#fff',
            fontSize: 24,
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
            ...mergedStyles.toggleButton,
          }}
        >
          {chatButtonText}
        </button>
      )}

      {isOpen && (
        <div
          style={{
            width: 350,
            height: 500,
            borderRadius: 20,
            overflow: 'hidden',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
            backgroundColor: '#fff',
            display: 'flex',
            flexDirection: 'column',
            ...mergedStyles.container,
          }}
        >
          {/* Header */}
          {customHeader ? (
            <div>{customHeader}</div>
          ) : (
            <div
              style={{
                backgroundColor: '#007bff',
                color: '#fff',
                padding: '12px 16px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                ...mergedStyles.header,
              }}
            >
              <span
                style={{
                  fontWeight: 'bold',
                  fontSize: 16,
                  ...mergedStyles.title,
                }}
              >
                {headerText}
              </span>
              <button
                onClick={toggleChat}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#fff',
                  fontSize: 18,
                  cursor: 'pointer',
                  ...mergedStyles.toggleButton,
                }}
              >
                {openButtonText}
              </button>
            </div>
          )}

          {/* Body */}
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '10px',
              ...mergedStyles.body,
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
                ...mergedStyles.messagesWrapper,
              }}
            >
              {messages.map((msg, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems:
                      msg.sender === 'user' ? 'flex-end' : 'flex-start',
                  }}
                >
                  <span
                    style={{ fontSize: 12, color: '#888', marginBottom: 2 }}
                  >
                    {msg.sender === 'user' ? userName : botName}
                  </span>
                  <div
                    style={{
                      alignSelf:
                        msg.sender === 'user' ? 'flex-end' : 'flex-start',
                      backgroundColor:
                        msg.sender === 'user' ? '#007bff' : '#f1f1f1',
                      color: msg.sender === 'user' ? '#fff' : '#000',
                      padding: '8px 12px',
                      borderRadius: 12,
                      maxWidth: '80%',
                      fontSize: 14,
                      whiteSpace: 'pre-wrap',
                      ...(msg.sender === 'user'
                        ? mergedStyles.userMessage
                        : mergedStyles.botMessage),
                      ...(messageStyle ? messageStyle(msg) : {}),
                    }}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Footer */}
          {customFooter ? (
            <div>{customFooter}</div>
          ) : (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                borderTop: '1px solid #ddd',
                ...mergedStyles.inputWrapper,
              }}
            >
              {askedQuestions.length > 0 && (
                <div
                  style={{
                    display: 'flex',
                    overflowX: 'auto',
                    padding: '8px 4px',
                    gap: 8,
                    marginBottom: 8,
                  }}
                >
                  {askedQuestions.map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleQuestionClick(q)}
                      style={{
                        whiteSpace: 'nowrap',
                        padding: '6px 12px',
                        borderRadius: 20,
                        border: '1px solid #ccc',
                        backgroundColor: '#f9f9f9',
                        cursor: 'pointer',
                        fontSize: 14,
                        flexShrink: 0,
                      }}
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}
              <div style={{ display: 'flex' }}>
                <input
                  value={message}
                  onChange={handleMessageChange}
                  placeholder={messagePlaceholder}
                  style={{
                    flex: 1,
                    padding: '8px 12px',
                    borderRadius: 20,
                    border: '1px solid #ccc',
                    outline: 'none',
                    fontSize: 14,
                    ...mergedStyles.input,
                  }}
                  {...inputProps}
                />
                <button
                  onClick={handleSendMessage}
                  style={{
                    marginLeft: 8,
                    backgroundColor: '#007bff',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 20,
                    padding: '8px 16px',
                    cursor: 'pointer',
                    fontSize: 14,
                    ...mergedStyles.sendButton,
                  }}
                  {...buttonProps}
                >
                  {sendButtonText}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FloatingChat;
