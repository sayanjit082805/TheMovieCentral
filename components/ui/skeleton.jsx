import { motion } from "motion/react";

const Skeleton = () => {
  return (
    <div className="border-b pb-8 font-mono animate-pulse border-neutral-200">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-shrink-0">
          <div className="w-[150px] h-[225px] bg-neutral-200 border border-neutral-200"></div>
        </div>
        <div className="flex-1 space-y-3">
          <div className="flex justify-between items-start">
            <div className="h-6 bg-neutral-200 rounded w-3/4"></div>
            <div className="h-4 bg-neutral-200 rounded w-20"></div>
          </div>
          <div className="h-4 bg-neutral-200 rounded w-1/3"></div>
          <div className="space-y-2">
            <div className="h-4 bg-neutral-200 rounded w-full"></div>
            <div className="h-4 bg-neutral-200 rounded w-5/6"></div>
            <div className="h-4 bg-neutral-200 rounded w-4/6"></div>
          </div>
          <div className="h-4 bg-neutral-200 rounded w-24"></div>
        </div>
      </div>
    </div>
  );
};

const Loading = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center relative overflow-hidden">
      <div className="relative">
        <motion.div
          className="w-24 h-24 border-4 border-neutral-200 rounded-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        />
        <motion.div
          className="absolute inset-0 w-24 h-24 border-4 border-[#3f51b5] rounded-full border-t-transparent"
          animate={{ rotate: 360 }}
          transition={{
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <img className="w-8 h-8 text-[#3f51b5]" src="/logo.svg" />
        </motion.div>
      </div>
    </div>
  );
};

const Home_Skeleton = () => {
  return (
    <div className="relative mb-16">
      <div className="overflow-x-auto pb-6">
        <div className="flex space-x-6" style={{ minWidth: "max-content" }}>
          {[...Array(20)].map((_, index) => (
            <div
              key={`skeleton-${index}`}
              className="bg-white rounded-lg overflow-hidden shadow-md flex flex-col w-[180px] animate-pulse"
            >
              <div className="relative">
                <div className="w-full h-[270px] bg-neutral-200"></div>
                <div className="absolute top-2 right-2 bg-neutral-300 rounded px-2 py-1 w-12 h-5"></div>
              </div>

              <div className="p-4 flex-grow">
                <div className="h-4 bg-neutral-200 rounded mb-2"></div>
                <div className="h-3 bg-neutral-200 rounded w-12 mb-3"></div>

                <div className="flex items-center mb-3">
                  <div className="flex space-x-1">
                    {[...Array(4)].map((_, i) => (
                      <div
                        key={i}
                        className="w-4 h-4 bg-neutral-200 rounded"
                      ></div>
                    ))}
                  </div>
                  
                </div>
              </div>

              <div className="h-8 bg-neutral-200 mx-3 mb-3 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export { Skeleton, Loading, Home_Skeleton };
