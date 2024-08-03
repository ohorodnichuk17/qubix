export interface Message {
    text: string;
    time: string;
}

export interface ChatItemData {
    avatar: string;
    name: string;
    messages: Message[];
    profile: string;
}

export interface ChatItemProps {
    item: ChatItemData;
    handleChatClick: (item: ChatItemData) => void;
    handleAvatarClick: (profile: string) => void;
}

export interface ChatListProps {
    messages: ChatItemData[];
    handleChatClick: (item: ChatItemData) => void;
    handleAvatarClick: (profile: string) => void;
    showModal: () => void;
}

export interface ChatWindowProps {
    selectedChat: Chat;
    newMessage: string;
    setNewMessage: (message: string) => void;
    handleSendMessage: () => void;
}

export interface MessageItemProps {
    msg: Message;
    avatar: string;
}

export interface Chat {
    avatar: string;
    name: string;
    messages: Message[];
}

export interface ProfileInfoProps {
    selectedChat?: Chat;
    selectedProfile?: string;
}

export interface ChatItemData {
    avatar: string;
    name: string;
    messages: Message[];
    profile: string;
}