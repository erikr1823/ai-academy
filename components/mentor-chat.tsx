"use client";

import Link from "next/link";
import { useState } from "react";
import {
  btnPrimaryClass,
  cardClass,
  ProgressBar,
} from "@/components/academy-shell";
import {
  mentorConversations,
  mockReply,
  recommendedNextSteps,
  starterPrompts,
  studentProfile,
  type MentorMessage,
} from "@/lib/mentor-mock";

function StudentContextPanel() {
  return (
    <aside className="border-t border-zinc-800 bg-zinc-950 xl:w-80 xl:shrink-0 xl:border-l xl:border-t-0">
      <div className="border-b border-zinc-800 px-4 py-4 sm:px-5">
        <p className="text-xs font-medium uppercase tracking-wider text-emerald-400">
          Student Profile
        </p>
      </div>

      <div className="space-y-6 px-4 py-5 sm:px-5">
        <div>
          <p className="text-xs text-zinc-500">Name</p>
          <p className="mt-1 text-base font-semibold text-white">
            {studentProfile.name}
          </p>
        </div>

        <div>
          <p className="text-xs text-zinc-500">Current Track</p>
          <p className="mt-1 text-sm font-medium text-emerald-400">
            {studentProfile.currentTrack}
          </p>
        </div>

        <div>
          <p className="text-xs text-zinc-500">Secondary Track</p>
          <p className="mt-1 text-sm text-zinc-300">
            {studentProfile.secondaryTrack}
          </p>
        </div>

        <div>
          <p className="text-xs text-zinc-500">Goal</p>
          <p className="mt-1 text-sm leading-relaxed text-zinc-400">
            {studentProfile.goal}
          </p>
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="text-zinc-500">Progress</span>
            <span className="font-semibold text-emerald-400">
              {studentProfile.progress}%
            </span>
          </div>
          <ProgressBar value={studentProfile.progress} />
        </div>

        <div className={`${cardClass} p-4`}>
          <p className="text-xs font-medium uppercase tracking-wider text-emerald-400">
            Recommended Next Steps
          </p>
          <ol className="mt-4 space-y-3">
            {recommendedNextSteps.map((step, index) => (
              <li key={step.href}>
                <Link
                  href={step.href}
                  className="group flex gap-3 text-sm text-zinc-400 transition-colors hover:text-emerald-400"
                >
                  <span className="font-semibold text-emerald-500/80 group-hover:text-emerald-400">
                    {index + 1}.
                  </span>
                  <span>{step.label}</span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </aside>
  );
}

function MessageBubble({ message }: { message: MentorMessage }) {
  const isUser = message.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div className="max-w-[85%] sm:max-w-xl">
        {!isUser && (
          <p className="mb-1.5 text-xs font-medium text-emerald-400">
            AI Mentor
          </p>
        )}
        <div
          className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
            isUser
              ? "bg-emerald-500 text-black"
              : "border border-zinc-800 bg-zinc-950 text-zinc-200"
          }`}
        >
          <p className="whitespace-pre-wrap">{message.content}</p>
        </div>
      </div>
    </div>
  );
}

export function MentorChat() {
  const [activeId, setActiveId] = useState("workplace-automation");
  const [input, setInput] = useState("");
  const [extraMessages, setExtraMessages] = useState<
    Record<string, MentorMessage[]>
  >({});

  const conversation =
    mentorConversations.find((c) => c.id === activeId) ?? mentorConversations[2];
  const messages = [
    ...conversation.messages,
    ...(extraMessages[activeId] ?? []),
  ];

  function handleSend() {
    const text = input.trim();
    if (!text) return;

    setExtraMessages((prev) => ({
      ...prev,
      [activeId]: [
        ...(prev[activeId] ?? []),
        { role: "user", content: text },
        { role: "assistant", content: mockReply },
      ],
    }));
    setInput("");
  }

  function handleStarterPrompt(prompt: string) {
    setInput(prompt);
  }

  return (
    <div className="flex min-h-[calc(100dvh-8rem)] flex-1 flex-col xl:min-h-0 xl:flex-row lg:min-h-[calc(100dvh-0px)]">
      {/* Conversation sidebar */}
      <aside className="border-b border-zinc-800 bg-zinc-950 lg:w-72 lg:shrink-0 lg:border-b-0 lg:border-r">
        <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-emerald-400">
              AI Mentor
            </p>
            <h2 className="mt-1 text-sm font-semibold text-white">
              Conversations
            </h2>
          </div>
          <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-400">
            Mock
          </span>
        </div>

        <div className="flex gap-2 overflow-x-auto p-3 [-ms-overflow-style:none] [scrollbar-width:none] lg:max-h-[calc(100dvh-8rem)] lg:flex-col lg:overflow-x-visible lg:overflow-y-auto lg:p-2 [&::-webkit-scrollbar]:hidden">
          {mentorConversations.map((convo) => (
            <button
              key={convo.id}
              type="button"
              onClick={() => setActiveId(convo.id)}
              className={`shrink-0 rounded-xl border px-3 py-3 text-left transition-colors lg:w-full ${
                activeId === convo.id
                  ? "border-emerald-500/40 bg-emerald-500/10"
                  : "border-zinc-800 bg-zinc-900/50 hover:border-zinc-700"
              }`}
            >
              <p className="text-sm font-medium text-white">{convo.title}</p>
              <p className="mt-1 truncate text-xs text-zinc-500">
                {convo.preview}
              </p>
              <p className="mt-2 text-xs text-zinc-600">{convo.updated}</p>
            </button>
          ))}
        </div>
      </aside>

      {/* Main chat */}
      <div className="flex min-h-0 min-w-0 flex-1 flex-col bg-black/40">
        <div className="border-b border-zinc-800 px-4 py-4 sm:px-6">
          <h2 className="text-lg font-semibold text-white">
            {conversation.title}
          </h2>
          <p className="mt-1 text-sm text-zinc-500">
            Mock mentor chat — OpenAI integration coming soon
          </p>
        </div>

        <div className="flex-1 space-y-5 overflow-y-auto px-4 py-6 sm:px-6">
          {messages.map((message, index) => (
            <MessageBubble key={index} message={message} />
          ))}
        </div>

        <div className="border-t border-zinc-800 bg-zinc-950/80 px-4 py-4 sm:px-6">
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-zinc-500">
            Starter prompts
          </p>
          <div className="mb-4 flex flex-wrap gap-2">
            {starterPrompts.map((prompt) => (
              <button
                key={prompt}
                type="button"
                onClick={() => handleStarterPrompt(prompt)}
                className="rounded-full border border-zinc-800 bg-zinc-950 px-3 py-1.5 text-xs text-zinc-300 transition-colors hover:border-emerald-500/40 hover:text-emerald-400"
              >
                {prompt}
              </button>
            ))}
          </div>

          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSend();
              }}
              placeholder="Ask your AI Mentor anything..."
              className="flex-1 rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-zinc-200 placeholder:text-zinc-600 focus:border-emerald-500/50 focus:outline-none"
            />
            <button
              type="button"
              onClick={handleSend}
              className={`shrink-0 ${btnPrimaryClass} px-5 py-3`}
            >
              Send
            </button>
          </div>
        </div>
      </div>

      <StudentContextPanel />
    </div>
  );
}
