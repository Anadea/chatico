# 🗨️ Floating Chat UI

A customizable, lightweight, and modern React floating chat component.  
Perfect for support widgets, AI bots, or in-app messaging.

---

## 🚀 Features

- 💬 Floating toggle button  
- 🧱 Fully customizable via `styles` prop  
- 🧠 Simulated bot response  
- 🔧 Custom header and footer support  
- 🎯 Per-message styling support  
- 📱 Responsive design  
- 🔋 Zero dependencies

---

## 📦 Installation

```bash
npm install floating-chat-ui
```

---

## 🧪 Usage with Props

Here’s how you can use all key props in one example:

```tsx
import FloatingChat from 'floating-chat-ui';

function App() {
  return (
    <FloatingChat
      onSendMessage={(msg) => console.log('User message:', msg)}
      messagePlaceholder="Type your message..."
      chatButtonText="💬"
      openButtonText="✖"
      headerText="Support Chat"
      sendButtonText="Send"
      botDefaultReply="Thank you! We’ll respond shortly."
      styles={{
        toggleButton: { backgroundColor: '#C4B0A9', color: '#fff' },
        header: { backgroundColor: '#E4F4DD', color: '#333' },
        sendButton: {
          backgroundColor: '#fff',
          color: '#C4B0A9',
          border: '1px solid #C4B0A9',
        },
        input: { borderColor: '#E4F4DD' },
        userMessage: { backgroundColor: '#C4B0A9', color: '#fff' },
        botMessage: { backgroundColor: '#f0f0f0', color: '#333' },
      }}
      customHeader={<div style={{ padding: 12, backgroundColor: '#DCECDC' }}>Custom Header</div>}
      customFooter={<div style={{ padding: 12, backgroundColor: '#F8F8F8' }}>Custom Footer</div>}
      messageStyle={(msg) => ({
        fontStyle: msg.sender === 'bot' ? 'italic' : 'normal',
      })}
      inputProps={{ maxLength: 200 }}
      buttonProps={{ disabled: false }}
    />
  );
}
```

---

## 🧩 Props

| Prop               | Type                                | Default                     | Description                                                              |
|--------------------|-------------------------------------|-----------------------------|--------------------------------------------------------------------------|
| `onSendMessage`    | `(message: string) => void`         | `undefined`                 | Callback triggered when the user sends a message.                        |
| `messagePlaceholder` | `string`                          | `"Type a message..."`       | Placeholder text for the input field.                                    |
| `chatButtonText`   | `string`                            | `"💬"`                      | Text or emoji displayed on the floating toggle button.                   |
| `openButtonText`   | `string`                            | `"✖"`                       | Text shown to close the chat window.                                     |
| `headerText`       | `string`                            | `"Chat"`                    | Text displayed in the chat header.                                       |
| `sendButtonText`   | `string`                            | `"Send"`                    | Text inside the send message button.                                     |
| `botDefaultReply`  | `string`                            | `"This is a bot response."` | The default reply shown by the bot after the user sends a message.       |
| `styles`           | `StyleProps`                        | `{}`                        | Object for styling all internal parts of the component.                  |
| `customHeader`     | `React.ReactNode`                   | `undefined`                 | Optional custom header JSX/HTML to replace the default chat header.      |
| `customFooter`     | `React.ReactNode`                   | `undefined`                 | Optional custom footer JSX/HTML to replace the default input/footer.     |
| `messageStyle`     | `(msg: Message) => CSSProperties`   | `undefined`                 | Function to dynamically style each message.                              |
| `inputProps`       | `React.InputHTMLAttributes<HTMLInputElement>` | `{}`              | Extra props for the `<input>` field.                                     |
| `buttonProps`      | `React.ButtonHTMLAttributes<HTMLButtonElement>` | `{}`           | Extra props for the send `<button>`.                                     |
| `containerStyle`   | `CSSProperties`                     | `{}`                        | Style for the outermost container.                                       |

---

## 🎨 StyleProps Structure

```ts
interface StyleProps {
  container?: React.CSSProperties;
  header?: React.CSSProperties;
  body?: React.CSSProperties;
  messagesWrapper?: React.CSSProperties;
  inputWrapper?: React.CSSProperties;
  input?: React.CSSProperties;
  sendButton?: React.CSSProperties;
  userMessage?: React.CSSProperties;
  botMessage?: React.CSSProperties;
  toggleButton?: React.CSSProperties;
  title?: React.CSSProperties;
}
```

---

## 📄 License

MIT © 2025 Stepan Dutchak
