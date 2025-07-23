'use client';

import { useState } from "react";
import { FaCheckCircle, FaEye, FaPaperclip } from "react-icons/fa";

const Step5 = () => {
  const [description, setDescription] = useState("");
  const [showExamples, setShowExamples] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);

  const exampleDescriptions = [
    {
      title: "Web Development Project",
      content: "I need a modern, responsive website built with React and Node.js. The site should include user authentication, a content management system, and payment integration. I'm looking for someone who can deliver clean, maintainable code and has experience with modern web technologies."
    },
    {
      title: "Graphic Design Brief",
      content: "Looking for a creative designer to develop a complete brand identity package including logo, business cards, letterhead, and brand guidelines. The style should be modern and professional, targeting young professionals in the tech industry. Please include 3 initial concepts with revisions."
    },
    {
      title: "Marketing Campaign",
      content: "We need an experienced digital marketer to plan and execute a 3-month social media campaign for our product launch. This includes content creation, ad management, and performance tracking. Experience with Facebook, Instagram, and LinkedIn is essential."
    }
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setAttachedFiles((prev) => [...prev, ...Array.from(e.target.files as FileList)]);
    }
  };

  const removeFile = (index: number) => {
    setAttachedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-8 text-black">
      <div className="flex flex-col lg:flex-row gap-12">
        <div className="flex-1 space-y-4">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[hsl(160_84%_39%)] text-white text-sm font-bold">
              5
            </div>
            <span className="text-sm font-medium text-muted-foreground tracking-wider uppercase">
              Event Post
            </span>
          </div>

          <h2 className="text-3xl lg:text-4xl font-bold text-foreground leading-tight">
            Start the
            <span className="text-[hsl(160_84%_39%)] block lg:inline lg:ml-2">conversation</span>
          </h2>

          <div className="space-y-4">
            <p className="text-lg text-muted-foreground leading-relaxed">
              Write a clear, detailed description that will help attract the right talent for your project.
            </p>

            <div className="bg-[hsl(160_60%_95%)] rounded-lg p-6 border border-[hsl(160_84%_39%)/0.1]">
              <h3 className="font-medium text-foreground mb-3 flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-[hsl(160_84%_39%)/0.2] flex items-center justify-center">
                  <FaCheckCircle className="w-3 h-3 text-[hsl(160_84%_39%)]" />
                </div>
                Include these key details:
              </h3>
              <ul className="space-y-2">
                {[
                  "Clear expectations about your task",
                  "The skills required for your work",
                  "Good communication preferences",
                  "Details about how your team likes to work",
                  "Timeline and deliverable expectations",
                  "Any specific tools or technologies to use"
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <div className="w-1.5 h-1.5 rounded-full bg-[hsl(160_84%_39%)] mt-2 flex-shrink-0"></div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="flex-1 space-y-6">
          {/* Description Input */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-foreground block">
              Describe what you need
            </label>
            <div className="relative">
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={8}
                placeholder="Describe your project in detail. What are you looking to accomplish? What skills do you need? What does success look like?"
                className="w-full bg-input border border-input-border rounded-lg px-4 py-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[hsl(160_84%_39%)] focus:border-transparent transition-all duration-200 resize-none"
              />
              <div className="absolute bottom-3 right-3 text-xs text-muted-foreground">
                {description.length} characters
              </div>
            </div>
            {description.length > 0 && description.length < 100 && (
              <p className="text-xs text-yellow-600">
                Consider adding more details to attract better candidates (aim for 200+ characters)
              </p>
            )}
          </div>

          {/* Examples */}
          <div className="space-y-3">
            <button
              onClick={() => setShowExamples(!showExamples)}
              className="text-sm text-[hsl(160_84%_39%)] hover:opacity-80 transition-colors underline underline-offset-2"
            >
              {showExamples ? 'Hide' : 'See'} examples of effective descriptions
            </button>

            {showExamples && (
              <div className="space-y-4 p-4 bg-[hsl(0_0%_96%)] rounded-lg border border-[hsl(0_0%_80%)]">
                {exampleDescriptions.map((example, index) => (
                  <div key={index} className="space-y-2">
                    <h4 className="font-medium text-foreground text-sm">{example.title}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">{example.content}</p>
                    <button
                      onClick={() => setDescription(example.content)}
                      className="text-xs text-[hsl(160_84%_39%)] hover:opacity-80"
                    >
                      Use this example
                    </button>
                    {index < exampleDescriptions.length - 1 && (
                      <hr className="border-t border-[hsl(0_0%_80%)]" />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* File Upload */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <label className="cursor-pointer">
                <input
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  className="sr-only"
                  accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.gif,.zip,.rar"
                />
                <div className="inline-flex items-center gap-2 px-4 py-3 border-2 border-[hsl(160_84%_39%)] text-[hsl(160_84%_39%)] hover:bg-[hsl(160_84%_39%)] hover:text-white rounded-lg transition-all duration-200 font-medium">
                  <FaPaperclip className="w-4 h-4" />
                  Attach Files
                </div>
              </label>
              <div className="text-xs text-muted-foreground">
                <p>Max file size: 100MB</p>
                <p>Supported: PDF, DOC, Images, ZIP</p>
              </div>
            </div>

            {attachedFiles.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-medium text-foreground">Attached files:</p>
                <div className="space-y-2">
                  {attachedFiles.map((file, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-[hsl(0_0%_96%)] rounded-lg border border-[hsl(0_0%_80%)]">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground truncate">{file.name}</p>
                        <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
                      </div>
                      <button
                        onClick={() => removeFile(index)}
                        className="text-red-600 hover:text-red-500 transition-colors p-1"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Preview */}
          {description.length > 50 && (
            <div className="bg-[hsl(0_0%_98%)] border border-[hsl(0_0%_80%)] rounded-lg p-4 space-y-3">
              <h4 className="font-medium text-foreground flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-[hsl(160_84%_39%)/0.2] flex items-center justify-center">
                  <FaEye className="w-3 h-3 text-[hsl(160_84%_39%)]" />
                </div>
                Preview
              </h4>
              <div className="text-sm text-muted-foreground leading-relaxed">
                {description.split('\n').map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Step5;
