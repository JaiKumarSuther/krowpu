"use client";

import { useState } from "react";
import { IoCall } from "react-icons/io5";
import { TbCalendarPlus } from "react-icons/tb";
import { FaSearch, FaPaperclip, FaPaperPlane, FaPhone, FaVideo, FaEllipsisH, FaCalendar } from "react-icons/fa";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: string;
  isMe: boolean;
}

interface ChatContact {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: string;
  unread: boolean;
  avatar?: string;
}

const ChatPage = () => {
  const [selectedChatId, setSelectedChatId] = useState("1");
  const [newMessage, setNewMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const contacts: ChatContact[] = [
    {
      id: "1",
      name: "Client name",
      lastMessage: "You'll receive proposals a...",
      timestamp: "12/02/2025",
      unread: true,
    },
    {
      id: "2", 
      name: "Name",
      lastMessage: "You'll receive proposals a...",
      timestamp: "12/02/2025",
      unread: false,
    },
    {
      id: "3",
      name: "Name", 
      lastMessage: "You'll receive proposals a...",
      timestamp: "12/02/2025",
      unread: true,
    },
    {
      id: "4",
      name: "Name",
      lastMessage: "You'll receive proposals a...", 
      timestamp: "12/02/2025",
      unread: false,
    },
  ];

  const messages: Message[] = [
    {
      id: "1",
      senderId: "client1",
      senderName: "Client name",
      content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      timestamp: "12/02/2025",
      isMe: false,
    },
    {
      id: "2", 
      senderId: "me",
      senderName: "Your name",
      content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      timestamp: "12/02/2025",
      isMe: true,
    },
    {
      id: "3",
      senderId: "client1", 
      senderName: "Client name",
      content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      timestamp: "12/02/2025", 
      isMe: false,
    },
    {
      id: "4",
      senderId: "client1",
      senderName: "Client name", 
      content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      timestamp: "12/02/2025",
      isMe: false,
    },
  ];

  const selectedContact = contacts.find(c => c.id === selectedChatId);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Add message logic here
      setNewMessage("");
    }
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-screen flex bg-[hsl(0_0%_100%)] ">
      {/* Sidebar - Message List */}
      <div className="w-80 border-r border-[hsl(214.3_31.8%_91.4%)]  bg-card flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-[hsl(214.3_31.8%_91.4%)] ">
          <h1 className="text-xl font-semibold text-[hsl(222.2_84%_4.9%)]  mb-4">Message</h1>
          
          {/* Search */}
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[hsl(215.4_16.3%_46.9%)] " />
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[hsl(210_40%_96.1%)]  border border-[hsl(214.3_31.8%_91.4%)]  rounded-lg pl-10 pr-4 py-2 text-sm text-[hsl(222.2_84%_4.9%)]  placeholder:text-[hsl(215.4_16.3%_46.9%)]  focus:outline-none focus:ring-2 focus:ring-[hsl(160_84%_39%)]  focus:border-transparent"
            />
          </div>
        </div>

        {/* Contact List */}
        <div className="flex-1 overflow-y-auto">
          {filteredContacts.map((contact) => (
            <div
              key={contact.id}
              onClick={() => setSelectedChatId(contact.id)}
              className={`p-4 border-b border-[hsl(214.3_31.8%_91.4%)]  cursor-pointer hover:bg-[hsl(210_40%_96.1%)] /50 transition-colors ${
                selectedChatId === contact.id ? 'bg-[hsl(160_84%_39%/0.1)] ' : ''
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="relative">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={contact.avatar} />
                    <AvatarFallback className="bg-[hsl(160_84%_39%/0.2)]  text-[hsl(160_84%_39%)]  text-sm">
                      {contact.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  {contact.unread && (
                    <div className="absolute top-0 -right-1 w-3 h-3 bg-[hsl(160_84%_39%)]  rounded-full"></div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-medium text-[hsl(222.2_84%_4.9%)]  truncate">{contact.name}</h3>
                    <span className="text-xs text-[hsl(215.4_16.3%_46.9%)] ">{contact.timestamp}</span>
                  </div>
                  <p className="text-sm text-[hsl(215.4_16.3%_46.9%)]  truncate">{contact.lastMessage}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedContact ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-[hsl(214.3_31.8%_91.4%)]  bg-card">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={selectedContact.avatar} />
                    <AvatarFallback className="bg-[hsl(160_84%_39%/0.2)]  text-[hsl(160_84%_39%)]  text-sm">
                      {selectedContact.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="font-semibold text-[hsl(222.2_84%_4.9%)] ">{selectedContact.name}</h2>
                    <div className="flex items-center gap-1 text-sm text-[hsl(215.4_16.3%_46.9%)] ">
                      <span>International Date Analytics</span>
                      <span>•</span>
                      <span>6:42 Pm CDT (4H ahead)</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <button className="p-2 hover:bg-[hsl(210_40%_96.1%)]  rounded-lg transition-colors">
                    <IoCall className="w-4 h-4 text-[hsl(215.4_16.3%_46.9%)] " />
                  </button>
                  <button className="p-2 hover:bg-[hsl(210_40%_96.1%)]  rounded-lg transition-colors">
                    <FaCalendar className="w-4 h-4 text-[hsl(215.4_16.3%_46.9%)] " />
                  </button>
                  <button className="p-2 hover:bg-[hsl(210_40%_96.1%)]  rounded-lg transition-colors">
                    <FaEllipsisH className="w-4 h-4 text-[hsl(215.4_16.3%_46.9%)] " />
                  </button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.isMe ? 'flex-row-reverse' : ''}`}
                >
                  {!message.isMe && (
                    <Avatar className="w-8 h-8 flex-shrink-0">
                      <AvatarFallback className="bg-[hsl(160_84%_39%/0.2)]  text-[hsl(160_84%_39%)]  text-xs">
                        {message.senderName.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  )}
                  
                  <div className={`max-w-[70%] ${message.isMe ? 'text-right' : ''}`}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium text-[hsl(222.2_84%_4.9%)] ">
                        {message.senderName}
                      </span>
                      <span className="text-xs text-[hsl(215.4_16.3%_46.9%)] ">
                        {message.timestamp}
                      </span>
                    </div>
                    
                    <div
                      className={`p-3 rounded-lg text-sm text-left ${
                        message.isMe
                          ? 'bg-[hsl(160_84%_39%)] text-[hsl(0_0%_100%)] '
                          : 'bg-[hsl(210_40%_96.1%)]  text-[hsl(222.2_84%_4.9%)] '
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-[hsl(214.3_31.8%_91.4%)]  bg-card">
              <div className="flex items-end gap-3">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    placeholder="Type your message"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="w-full bg-[hsl(210_40%_96.1%)]  border border-[hsl(214.3_31.8%_91.4%)]  rounded-lg pl-4 pr-12 py-3 text-[hsl(222.2_84%_4.9%)]  placeholder:text-[hsl(215.4_16.3%_46.9%)]  focus:outline-none focus:ring-2 focus:ring-[hsl(160_84%_39%)]  focus:border-transparent resize-none"
                  />
                  <button className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-[hsl(160_84%_39%/0.1)]  rounded transition-colors">
                    <FaPaperclip className="w-4 h-4 text-[hsl(215.4_16.3%_46.9%)] " />
                  </button>
                </div>
                
                <button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  className="bg-[hsl(160_84%_39%)] text-[hsl(160_84%_39%)]  p-3 rounded-lg hover:bg-[hsl(160_84%_39%/0.9)]  disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <FaPaperPlane className="w-4 h-4" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-[hsl(215.4_16.3%_46.9%)] ">
            Select a conversation to start messaging
          </div>
        )}
      </div>

      {/* Right Sidebar - Search Messages */}
      <div className="w-64 border-l border-[hsl(214.3_31.8%_91.4%)]  bg-card p-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-[hsl(222.2_84%_4.9%)] ">{selectedContact?.name}</h3>
            <Avatar className="w-8 h-8">
              <AvatarFallback className="bg-[hsl(160_84%_39%/0.2)]  text-[hsl(160_84%_39%)]  text-xs">
                {selectedContact?.name.split(' ').map(n => n[0]).join('').toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>
          
          {[...Array(4)] .map((_, i) => (
            <div key={i} className="relative">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-[hsl(215.4_16.3%_46.9%)] " />
              <input
                type="text"
                placeholder="Search messages"
                className="w-full bg-[hsl(210_40%_96.1%)]  border border-[hsl(214.3_31.8%_91.4%)]  rounded-lg pl-8 pr-4 py-2 text-sm text-[hsl(222.2_84%_4.9%)]  placeholder:text-[hsl(215.4_16.3%_46.9%)]  focus:outline-none focus:ring-2 focus:ring-[hsl(160_84%_39%)]  focus:border-transparent"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;