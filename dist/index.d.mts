import React, { CSSProperties, ReactNode } from 'react';

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
    styles?: StyleProps;
    customHeader?: ReactNode;
    customFooter?: ReactNode;
    containerStyle?: CSSProperties;
    messageStyle?: (message: Message) => CSSProperties;
    inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
    buttonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
}
declare const FloatingChat: React.FC<FloatingChatProps>;

export { FloatingChat as default };
