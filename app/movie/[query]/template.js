"use client";
import React from "react";
import { Nav } from "@/components/navbar";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";

export default function Template({ children }) {
  const router = useRouter();

  return (
    <>
      <Nav />
      <motion.div
        key={router.route}
        initial={{ opacity: 0, y: 10, filter: "blur(10px)" }}
        animate={{
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {children}
      </motion.div>
    </>
  );
}
