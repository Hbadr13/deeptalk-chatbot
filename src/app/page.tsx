'use client'
import { getServerSession } from "next-auth/next"
import { authOptions } from "./api/auth/[...nextauth]/route"
import { useState } from "react"
import { useChat } from 'ai/react';
import UserMessage from "@/components/userMessage";
import ChaGPTmessage from "@/components/chatGPTMessage";
import Navbar from "@/components/navbar";
export default function Home() {

  // console.log('---', session?.user)
  // const [inputValue, setInputValue] = useState('')
  // console.log('location->', Location)
  const [a, aa] = useState('')
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  // const session = await getServerSession(authOptions)


  return (
    <div className="w-full flex flex-col items-cente">
      <div className="w-full flex  justify-center">
        <div className="max-w-[1000px] w-full py-24  space-y-16 ">
          {messages.map((message, index) => (
            message.role === 'user' ?
              <UserMessage key={index} message={message.content} />
              :
              <ChaGPTmessage key={index} message={message.content} />
          ))}
        </div>
      </div>
      <div className="fixed  bottom-0 w-full bg-white">
        <form onSubmit={handleSubmit} className="flex-none p-6  bg-slate-300">
          <div className="flex rounded-lg border border-gray-700 bg-gray-800">
            <input

              value={input}
              placeholder="Say something..."
              onChange={handleInputChange}
              type="text"
              className="flex-grow px-4 py-2 bg-transparent text-white focus:outline-none"
            />
            <button type="submit" className="bg-purple-500 rounded-lg px-4 py-2 text-white font-semibold focus:outline-none hover:bg-purple-600 transition-colors duration-300">Send</button>
          </div>
        </form>
      </div>
    </div >


  );
}

// export default async function Home() {
//   // const [a, aa] = useState('')
//   const session = await getServerSession(authOptions)
//   console.log('---', session?.user)
//   return (
//     <>
//       {session ? (<div  >
//         <div className="">email:{session.user?.email}</div>
//         <div className=""> firstName:{session.user?.firstName}</div>
//         <div className=""> lastName:{session.user?.lastName}</div>
//         <div className=""> id:{session.user?.id}</div>
//       </div>
//       ) : (
//         <h1 className="text-5xl">You Shall Not Pass00!</h1>
//       )}
//     </>
//   )
// }
// 'use client';

// import { useChat } from 'ai/react';

// export default function Chat() {
//   const { messages, input, handleInputChange, handleSubmit } = useChat();
//   return (
//     <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
//       {messages.map(m => (
//         <div key={m.id} className="whitespace-pre-wrap">
//           {m.role === 'user' ? 'User: ' : 'AI: '}
//           {m.content}
//         </div>
//       ))}

//       <form onSubmit={handleSubmit}>
//         <input
//           className="fixed bottom-0 w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl"
//           value={input}
//           placeholder="Say something..."
//           onChange={handleInputChange}
//         />
//       </form>
//     </div>
//   );
// }