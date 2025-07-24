"use client";

import { useState } from "react";
import { IoCall } from "react-icons/io5";
import { FaSearch, FaPaperclip, FaPaperPlane, FaEllipsisH, FaCalendar, FaArrowLeft, FaBars, FaFile, FaImage, FaDownload } from "react-icons/fa";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: string;
  isMe: boolean;
  file?: {
    name: string;
    type: string;
    size: string;
    url?: string;
  };
}

interface ChatContact {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: string;
  unread: boolean;
  avatar: string;
}

const ChatPage = () => {
  const [selectedChatId, setSelectedChatId] = useState("1");
  const [newMessage, setNewMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showSidebar, setShowSidebar] = useState(false);
  const [showRightPanel, setShowRightPanel] = useState(false);

  const contacts: ChatContact[] = [
    {
      id: "1",
      name: "Sarah Johnson",
      lastMessage: "I've sent you the design files...",
      timestamp: "12/02/2025",
      unread: true,
      avatar: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=100&h=100&fit=crop&crop=face",
    },
    {
      id: "2", 
      name: "Mike Chen",
      lastMessage: "The meeting has been rescheduled...",
      timestamp: "12/02/2025",
      unread: false,
      avatar: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=100&h=100&fit=crop&crop=face",
    },
    {
      id: "3",
      name: "Emma Wilson", 
      lastMessage: "Thanks for the quick response!",
      timestamp: "12/02/2025",
      unread: true,
      avatar: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=100&h=100&fit=crop&crop=face",
    },
    {
      id: "4",
      name: "David Rodriguez",
      lastMessage: "Can we schedule a call tomorrow?", 
      timestamp: "12/02/2025",
      unread: false,
      avatar: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=100&h=100&fit=crop&crop=face",
    },
  ];

  // Separate messages for each contact
  const messagesData: Record<string, Message[]> = {
    "1": [
      {
        id: "1-1",
        senderId: "1",
        senderName: "Sarah Johnson",
        content: "Hi! I've been working on the new design concepts for the project. I think you'll really like what we've come up with.",
        timestamp: "10:30 AM",
        isMe: false,
      },
      {
        id: "1-2",
        senderId: "me",
        senderName: "You",
        content: "That sounds great! I'm excited to see what you've created. Can you share the designs?",
        timestamp: "10:32 AM",
        isMe: true,
      },
      {
        id: "1-3",
        senderId: "1",
        senderName: "Sarah Johnson",
        content: "Absolutely! Here are the design files with all the mockups and prototypes.",
        timestamp: "10:35 AM",
        isMe: false,
        file: {
          name: "design-mockups-v2.sketch",
          type: "application/sketch",
          size: "2.4 MB"
        }
      },
      {
        id: "1-4",
        senderId: "me",
        senderName: "You",
        content: "Perfect! I'll review these and get back to you with feedback by tomorrow.",
        timestamp: "10:37 AM",
        isMe: true,
      },
    ],
    "2": [
      {
        id: "2-1",
        senderId: "2",
        senderName: "Mike Chen",
        content: "Hey, I wanted to let you know that our meeting scheduled for 3 PM today needs to be moved.",
        timestamp: "1:15 PM",
        isMe: false,
      },
      {
        id: "2-2",
        senderId: "me",
        senderName: "You",
        content: "No problem. What time works better for you?",
        timestamp: "1:18 PM",
        isMe: true,
      },
      {
        id: "2-3",
        senderId: "2",
        senderName: "Mike Chen",
        content: "How about tomorrow at 2 PM? I've attached the updated agenda for our discussion.",
        timestamp: "1:20 PM",
        isMe: false,
        file: {
          name: "meeting-agenda-updated.pdf",
          type: "application/pdf",
          size: "156 KB"
        }
      },
    ],
    "3": [
      {
        id: "3-1",
        senderId: "3",
        senderName: "Emma Wilson",
        content: "Thank you so much for getting back to me so quickly! Your response really helped clarify things.",
        timestamp: "9:45 AM",
        isMe: false,
      },
      {
        id: "3-2",
        senderId: "me",
        senderName: "You",
        content: "You're very welcome! Happy to help anytime. Let me know if you need anything else.",
        timestamp: "9:50 AM",
        isMe: true,
      },
      {
        id: "3-3",
        senderId: "3",
        senderName: "Emma Wilson",
        content: "Actually, I do have one more question about the implementation. I've prepared some screenshots to show you what I mean.",
        timestamp: "2:30 PM",
        isMe: false,
        file: {
          name: "implementation-screenshots.zip",
          type: "application/zip",
          size: "892 KB"
        }
      },
    ],
    "4": [
      {
        id: "4-1",
        senderId: "4",
        senderName: "David Rodriguez",
        content: "Hi there! I hope you're doing well. I was wondering if we could set up a call to discuss the upcoming project milestones.",
        timestamp: "11:20 AM",
        isMe: false,
      },
      {
        id: "4-2",
        senderId: "me",
        senderName: "You",
        content: "Hi David! Yes, absolutely. Tomorrow afternoon would work great for me.",
        timestamp: "11:45 AM",
        isMe: true,
      },
      {
        id: "4-3",
        senderId: "4",
        senderName: "David Rodriguez",
        content: "Perfect! I'll send you a calendar invite. Also, here's the latest project report for your review.",
        timestamp: "12:00 PM",
        isMe: false,
        file: {
          name: "project-report-Q4.xlsx",
          type: "application/excel",
          size: "1.2 MB"
        }
      },
    ],
  };

  const selectedContact = contacts.find(c => c.id === selectedChatId);
  const messages = messagesData[selectedChatId] || [];

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Add message logic here
      setNewMessage("");
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Handle file upload logic here
      console.log("File selected:", file.name);
    }
  };

  const handleSelectChat = (chatId: string) => {
    setSelectedChatId(chatId);
    setShowSidebar(false); // Hide sidebar on mobile after selection
  };

  const getFileIcon = (fileType: string) => {
    if (fileType.includes('image')) return <FaImage className="w-4 h-4" />;
    return <FaFile className="w-4 h-4" />;
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-screen flex bg-[hsl(0_0%_100%)] relative overflow-hidden">
      {/* Mobile Overlay */}
      {(showSidebar || showRightPanel) && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => {
            setShowSidebar(false);
            setShowRightPanel(false);
          }}
        />
      )}

      {/* Left Sidebar - Message List */}
      <div className={`
        fixed lg:relative lg:translate-x-0 z-50 lg:z-0
        w-full sm:w-80 lg:w-80 h-full
        border-r border-[hsl(214.3_31.8%_91.4%)] bg-[hsl(0_0%_100%)] flex flex-col
        transition-transform duration-300 ease-in-out
        ${showSidebar ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Header */}
        <div className="p-4 border-b border-[hsl(214.3_31.8%_91.4%)]">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-semibold text-[hsl(222.2_84%_4.9%)]">Message</h1>
            <button 
              className="lg:hidden p-2 hover:bg-[hsl(210_40%_96.1%)] rounded-lg transition-colors"
              onClick={() => setShowSidebar(false)}
            >
              <FaArrowLeft className="w-4 h-4 text-[hsl(215.4_16.3%_46.9%)]" />
            </button>
          </div>
          
          {/* Search */}
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[hsl(215.4_16.3%_46.9%)]" />
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[hsl(210_40%_96.1%)] border border-[hsl(214.3_31.8%_91.4%)] rounded-lg pl-10 pr-4 py-2 text-sm text-[hsl(222.2_84%_4.9%)] placeholder:text-[hsl(215.4_16.3%_46.9%)] focus:outline-none focus:ring-2 focus:ring-[hsl(160_84%_39%)] focus:border-transparent"
            />
          </div>
        </div>

        {/* Contact List */}
        <div className="flex-1 overflow-y-auto">
          {filteredContacts.map((contact) => (
            <div
              key={contact.id}
              onClick={() => handleSelectChat(contact.id)}
              className={`p-4 border-b border-[hsl(214.3_31.8%_91.4%)] cursor-pointer hover:bg-[hsl(210_40%_96.1%/0.5)] transition-colors ${
                selectedChatId === contact.id ? 'bg-[hsl(160_84%_39%/0.1)]' : ''
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="relative">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={contact.avatar} alt={contact.name} />
                    <AvatarFallback className="bg-[hsl(160_84%_39%/0.2)] text-[hsl(160_84%_39%)] text-sm">
                      {contact.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  {contact.unread && (
                    <div className="absolute top-0 -right-1 w-3 h-3 bg-[hsl(160_84%_39%)] rounded-full"></div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-medium text-[hsl(222.2_84%_4.9%)] truncate">{contact.name}</h3>
                    <span className="text-xs text-[hsl(215.4_16.3%_46.9%)]">{contact.timestamp}</span>
                  </div>
                  <p className="text-sm text-[hsl(215.4_16.3%_46.9%)] truncate">{contact.lastMessage}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {selectedContact ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-[hsl(214.3_31.8%_91.4%)] bg-[hsl(0_0%_100%)]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <button 
                    className="lg:hidden p-2 hover:bg-[hsl(210_40%_96.1%)] rounded-lg transition-colors flex-shrink-0"
                    onClick={() => setShowSidebar(true)}
                  >
                    <FaBars className="w-4 h-4 text-[hsl(215.4_16.3%_46.9%)]" />
                  </button>
                  
                  <Avatar className="w-10 h-10 flex-shrink-0">
                    <AvatarImage src={selectedContact.avatar} alt={selectedContact.name} />
                    <AvatarFallback className="bg-[hsl(160_84%_39%/0.2)] text-[hsl(160_84%_39%)] text-sm">
                      {selectedContact.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="min-w-0 flex-1">
                    <h2 className="font-semibold text-[hsl(222.2_84%_4.9%)] truncate">{selectedContact.name}</h2>
                    <div className="hidden sm:flex items-center gap-1 text-sm text-[hsl(215.4_16.3%_46.9%)]">
                      <span className="truncate">International Date Analytics</span>
                      <span>•</span>
                      <span className="whitespace-nowrap">6:42 Pm CDT (4H ahead)</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                  <button className="p-2 hover:bg-[hsl(210_40%_96.1%)] rounded-lg transition-colors">
                    <IoCall className="w-4 h-4 text-[hsl(215.4_16.3%_46.9%)]" />
                  </button>
                  <button className="p-2 hover:bg-[hsl(210_40%_96.1%)] rounded-lg transition-colors">
                    <FaCalendar className="w-4 h-4 text-[hsl(215.4_16.3%_46.9%)]" />
                  </button>
                  <button 
                    className="p-2 hover:bg-[hsl(210_40%_96.1%)] rounded-lg transition-colors"
                    onClick={() => setShowRightPanel(!showRightPanel)}
                  >
                    <FaEllipsisH className="w-4 h-4 text-[hsl(215.4_16.3%_46.9%)]" />
                  </button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 p-2 sm:p-4 overflow-y-auto space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-2 sm:gap-3 ${message.isMe ? 'flex-row-reverse' : ''}`}
                >
                  {!message.isMe && (
                    <Avatar className="w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0">
                      <AvatarImage src={selectedContact.avatar} alt={message.senderName} />
                      <AvatarFallback className="bg-[hsl(160_84%_39%/0.2)] text-[hsl(160_84%_39%)] text-xs">
                        {message.senderName.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  )}
                  
                  <div className={`max-w-[85%] sm:max-w-[70%] ${message.isMe ? 'text-right' : ''}`}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium text-[hsl(222.2_84%_4.9%)]">
                        {message.senderName}
                      </span>
                      <span className="text-xs text-[hsl(215.4_16.3%_46.9%)]">
                        {message.timestamp}
                      </span>
                    </div>
                    
                    <div
                      className={`p-2 sm:p-3 rounded-lg text-sm text-left ${
                        message.isMe
                          ? 'bg-[hsl(160_84%_39%)] text-[hsl(0_0%_100%)]'
                          : 'bg-[hsl(210_40%_96.1%)] text-[hsl(222.2_84%_4.9%)]'
                      }`}
                    >
                      {message.content}
                      
                      {/* File Attachment */}
                      {message.file && (
                        <div className={`mt-2 p-2 rounded border-2 border-dashed ${
                          message.isMe 
                            ? 'border-[hsl(0_0%_100%/0.3)] bg-[hsl(160_84%_39%/0.1)]' 
                            : 'border-[hsl(214.3_31.8%_91.4%)] bg-[hsl(0_0%_100%)]'
                        }`}>
                          <div className="flex items-center gap-2">
                            <div className={`p-1 rounded ${
                              message.isMe ? 'bg-[hsl(0_0%_100%/0.2)]' : 'bg-[hsl(210_40%_96.1%)]'
                            }`}>
                              {getFileIcon(message.file.type)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-xs font-medium truncate">{message.file.name}</div>
                              <div className="text-xs opacity-75">{message.file.size}</div>
                            </div>
                            <button className={`p-1 rounded hover:bg-opacity-80 ${
                              message.isMe ? 'hover:bg-[hsl(0_0%_100%/0.1)]' : 'hover:bg-[hsl(210_40%_96.1%)]'
                            }`}>
                              <FaDownload className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-2 sm:p-4 border-t border-[hsl(214.3_31.8%_91.4%)] bg-[hsl(0_0%_100%)]">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    placeholder="Type your message"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="w-full bg-[hsl(210_40%_96.1%)] border border-[hsl(214.3_31.8%_91.4%)] rounded-lg pl-4 pr-10 sm:pr-12 py-2 sm:py-3 text-[hsl(222.2_84%_4.9%)] placeholder:text-[hsl(215.4_16.3%_46.9%)] focus:outline-none focus:ring-2 focus:ring-[hsl(160_84%_39%)] focus:border-transparent resize-none"
                  />
                  <label className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-[hsl(160_84%_39%/0.1)] rounded transition-colors cursor-pointer">
                    <FaPaperclip className="w-3 h-3 sm:w-4 sm:h-4 text-[hsl(215.4_16.3%_46.9%)]" />
                    <input
                      type="file"
                      onChange={handleFileUpload}
                      className="hidden"
                      accept="*/*"
                    />
                  </label>
                </div>
                
                <button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  className="bg-[hsl(160_84%_39%)] text-[hsl(0_0%_100%)] p-2 sm:p-3 rounded-lg hover:bg-[hsl(160_84%_39%/0.9)] disabled:opacity-50 disabled:cursor-default transition-colors flex-shrink-0"
                >
                  <FaPaperPlane className="w-3 h-3 sm:w-4 sm:h-4" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-[hsl(215.4_16.3%_46.9%)] p-4">
            <div className="text-center">
              <button 
                className="lg:hidden mb-4 p-2 bg-[hsl(160_84%_39%)] text-[hsl(0_0%_100%)] rounded-lg"
                onClick={() => setShowSidebar(true)}
              >
                <FaBars className="w-4 h-4" />
              </button>
              <p>Select a conversation to start messaging</p>
            </div>
          </div>
        )}
      </div>

      {/* Right Sidebar - Search Messages */}
      <div className={`
        fixed lg:relative lg:translate-x-0 z-50 lg:z-0 right-0
        w-full sm:w-64 lg:w-64 h-full
        border-l border-[hsl(214.3_31.8%_91.4%)] bg-[hsl(0_0%_100%)] p-4
        transition-transform duration-300 ease-in-out
        ${showRightPanel ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
        hidden lg:block
      `}>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 min-w-0 flex-1">
              <h3 className="font-semibold text-[hsl(222.2_84%_4.9%)] truncate">{selectedContact?.name}</h3>
              <Avatar className="w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0">
                <AvatarImage src={selectedContact?.avatar} alt={selectedContact?.name} />
                <AvatarFallback className="bg-[hsl(160_84%_39%/0.2)] text-[hsl(160_84%_39%)] text-xs">
                  {selectedContact?.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>
            <button 
              className="lg:hidden p-1 hover:bg-[hsl(210_40%_96.1%)] rounded transition-colors"
              onClick={() => setShowRightPanel(false)}
            >
              <FaArrowLeft className="w-4 h-4 text-[hsl(215.4_16.3%_46.9%)]" />
            </button>
          </div>
          
          {[...Array(4)].map((_, i) => (
            <div key={i} className="relative">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-[hsl(215.4_16.3%_46.9%)]" />
              <input
                type="text"
                placeholder="Search messages"
                className="w-full bg-[hsl(210_40%_96.1%)] border border-[hsl(214.3_31.8%_91.4%)] rounded-lg pl-8 pr-4 py-2 text-sm text-[hsl(222.2_84%_4.9%)] placeholder:text-[hsl(215.4_16.3%_46.9%)] focus:outline-none focus:ring-2 focus:ring-[hsl(160_84%_39%)] focus:border-transparent"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;