import { TMessage } from "@/types/types";

const Message = async () => {
  const res = await fetch(`${process.env.DATABASE_URL}/messages`);
  const messages = await res.json();
  const data = messages.date;

  return (
    <div className="p-20">
      <div className="grid lg:grid-cols-3 grid-cols-1 gap-3">
        {data.length > 0 ? (
          data.map((message: TMessage, index: string) => (
            <div
              key={index}
              className="bg-zinc-900 border rounded-md p-4 space-y-3"
            >
              <h1 className="text-xl uppercase text-white">{message.name}</h1>
              <h3 className="text-sm uppercase text-white">{message.email}</h3>
              <h3 className="text-sm uppercase text-white p-3 border">
                {message.message}
              </h3>
            </div>
          ))
        ) : (
          <p className="text-white">No messages found</p>
        )}
      </div>
    </div>
  );
};

export default Message;
