import { TMessage } from "@/types/types";

export const dynamic = "force-dynamic";

const Message = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/messages`, { cache: 'no-store' });
  const messages = await res.json().catch(() => ({}));
  const data = messages?.data || [];

  return (
    <div className="p-8 md:p-16">
      <div className="grid lg:grid-cols-3 grid-cols-1 gap-4">
        {data.length > 0 ? (
          data.map((message: TMessage, index: string) => (
            <div
              key={index}
              className="kail-glass rounded-2xl p-5 space-y-3"
            >
              <h1 className="font-syne text-xl font-bold uppercase text-[#F4F4FE]">{message.name}</h1>
              <h3 className="font-space text-xs uppercase tracking-wider text-[#9996FE]">{message.email}</h3>
              <h3 className="font-outfit text-sm text-[#CDCDE7] p-3 bg-white/[0.04] border border-white/10 rounded-xl">
                {message.message}
              </h3>
            </div>
          ))
        ) : (
          <p className="font-outfit text-[#8E92BC]">No messages found</p>
        )}
      </div>
    </div>
  );
};

export default Message;
