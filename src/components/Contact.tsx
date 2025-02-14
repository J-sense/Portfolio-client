"use client";
import React from "react";
import { CONTACT } from "@/lib/data";
import { motion } from "framer-motion";
import Head from "next/head";

const Contact = () => {
  return (
    <>
      <Head>
        <title>Contact Us</title>
        <meta
          name="description"
          content="Get in touch for collaboration or inquiries"
        />
      </Head>

      <section id="contact" className="py-16">
        <div className="mx-auto max-w-6xl px-4">
          <motion.p
            className="my-10 text-center text-3xl lg:text-8xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            Interested in Working Together?
          </motion.p>

          <motion.p
            className="p-4 text-center text-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
          >
            {CONTACT.text}
          </motion.p>

          <motion.p
            className="my-4 text-center text-2xl font-medium text-lime-300 lg:pt-6 lg:text-5xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.4 }}
          >
            {CONTACT.email}
          </motion.p>

          <motion.p
            className="my-4 text-center text-2xl font-medium text-lime-300 lg:pb-6 lg:text-5xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.6 }}
          >
            {CONTACT.phone}
          </motion.p>
        </div>

        {/* <motion.div
          className="mt-20 flex items-center justify-center gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.8 }}
        >
          {SOCIAL_MEDIA_LINKS.map(
            (
              link: {
                href: string | undefined;
                icon:
                  | string
                  | number
                  | bigint
                  | boolean
                  | React.ReactElement<
                      unknown,
                      string | React.JSXElementConstructor<any>
                    >
                  | Iterable<React.ReactNode>
                  | React.ReactPortal
                  | Promise<
                      | string
                      | number
                      | bigint
                      | boolean
                      | React.ReactPortal
                      | React.ReactElement<
                          unknown,
                          string | React.JSXElementConstructor<any>
                        >
                      | Iterable<React.ReactNode>
                      | null
                      | undefined
                    >
                  | MotionValue<number>
                  | MotionValue<string>
                  | null
                  | undefined;
              },
              index: React.Key | null | undefined
            ) => (
              <a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-4xl text-gray-800 hover:text-lime-300 transition duration-300"
                >
                  {link.icon}
                </motion.div>
              </a>
            )
          )}
        </motion.div> */}

        <motion.p
          className="my-8 text-center text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          &copy; compileTab. All rights reserved.
        </motion.p>
      </section>
    </>
  );
};

export default Contact;
