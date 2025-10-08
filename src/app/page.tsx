"use client";

import { useChat } from "@ai-sdk/react";
import { Loader2 } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const { messages, sendMessage, status } = useChat();

  return (
    <div className="flex flex-col w-full max-w-2xl py-24 mx-auto stretch">
      {messages.map((message) => (
        <div key={message.id} className={`whitespace-pre-wrap rounded-xl border border-gray-100 mb-4 px-4 py-2 w-full max-w-fit ${message.role === "user" ? 'bg-blue-100 self-end' : 'bg-gray-100'}`}>
          {message.parts.map((part, i) => {
            switch (part.type) {
              case "text":
                return <div key={`${message.id}-${i}`}>{part.text}</div>
              case 'tool-weather':
              case 'tool-convertFahrenheitToCelsius':
                return (
                  <pre key={`${message.id}-${i}`}>
                    {JSON.stringify(part, null, 2)}
                  </pre>
                )  
            }
          })}
        </div>
      ))}
    {status === 'submitted' && <div className="flex gap-2"><Loader2 className="animate-spin"/>Generating ...</div> }

      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage({ text: input });
          setInput("");
        }}
      >
        <input
          className="fixed dark:bg-zinc-900 bottom-0 w-full max-w-2xl p-2 mb-8 border border-zinc-300 dark:border-zinc-800 rounded-xl shadow-xl"
          value={input}
          placeholder="Say something..."
          onChange={(e) => setInput(e.currentTarget.value)}
        />
      </form>
    </div>
  );
}
