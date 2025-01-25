// const AuthImagePattern = ({ title, subtitle }) => {
//     return (
//       <div className="hidden lg:flex items-center justify-center bg-base-200 p-12">
//         <div className="max-w-md text-center">
//           <div className="grid grid-cols-3 gap-3 mb-8">
//             {[...Array(9)].map((_, i) => (
//               <div
//                 key={i}
//                 className={`aspect-square rounded-2xl bg-primary/10 ${
//                   i % 2 === 0 ? "animate-pulse" : ""
//                 }`}
//               />
//             ))}
//           </div>
//           <h2 className="text-2xl font-bold mb-4">{title}</h2>
//           <p className="text-base-content/60">{subtitle}</p>
//         </div>
//       </div>
//     );
//   };
  
//   export default AuthImagePattern;

// import React from 'react';
// import { MessageCircle, Users, Bot, Sparkles } from 'lucide-react';

// const AuthImagePattern = ({ title = "Connect & Chat", subtitle = "Join our community to start conversations that matter" }) => {
//   // Animation delay utility
//   const getAnimationDelay = (index) => `${index * 0.1}s`;

//   return (
//     <div className="hidden lg:flex flex-col items-center justify-center bg-gradient-to-br from-primary/5 to-primary/20 p-12 min-h-screen">
//       <div className="max-w-md text-center space-y-12">
//         {/* Floating Icons Grid */}
//         <div className="grid grid-cols-3 gap-6 mb-12">
//           {[
//             { icon: MessageCircle, color: 'text-primary' },
//             { icon: Users, color: 'text-secondary' },
//             { icon: Bot, color: 'text-primary' },
//             { icon: Sparkles, color: 'text-secondary' },
//             { icon: MessageCircle, color: 'text-primary' },
//             { icon: Users, color: 'text-secondary' },
//             { icon: Bot, color: 'text-primary' },
//             { icon: Sparkles, color: 'text-secondary' },
//             { icon: MessageCircle, color: 'text-primary' },
//           ].map(({ icon: Icon, color }, i) => (
//             <div
//               key={i}
//               className={`relative p-4 rounded-2xl bg-white/5 backdrop-blur-sm 
//                          hover:bg-white/10 transition-all duration-300
//                          animate-float`}
//               style={{
//                 animationDelay: getAnimationDelay(i),
//                 animation: `float 3s ease-in-out infinite`,
//                 animationDelay: `${i * 0.2}s`
//               }}
//             >
//               <Icon 
//                 className={`w-8 h-8 ${color} opacity-80`}
//               />
//               <div 
//                 className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent rounded-2xl 
//                            opacity-0 hover:opacity-100 transition-opacity duration-300"
//               />
//             </div>
//           ))}
//         </div>

//         {/* Text Content */}
//         <div className="space-y-6">
//           <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
//             {title}
//           </h2>
//           <p className="text-base-content/70 text-lg">
//             {subtitle}
//           </p>
//         </div>

//         {/* Animated Dots */}
//         <div className="flex justify-center space-x-2">
//           {[...Array(3)].map((_, i) => (
//             <div
//               key={i}
//               className="w-2 h-2 rounded-full bg-primary/60 animate-bounce"
//               style={{ animationDelay: `${i * 0.2}s` }}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AuthImagePattern;

import React from 'react';

const MinimalAuthSidebar = ({ 
  title = "Welcome", 
  subtitle = "Join us for meaningful conversations" 
}) => {
  return (
    <div className="hidden lg:flex items-center justify-center bg-gradient-to-b from-background to-background/95 p-12 min-h-screen relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute h-[1px] w-full bg-primary transform rotate-45 opacity-20"
            style={{
              top: `${i * 12}%`,
              left: `-${i * 5}%`,
              animation: 'slideRight 8s linear infinite',
              animationDelay: `${i * 0.5}s`
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative max-w-md text-center space-y-16">
        {/* Minimal Geometric Pattern */}
        <div className="grid grid-cols-3 gap-8 mb-12">
          {[...Array(3)].map((_, rowIndex) => (
            <React.Fragment key={rowIndex}>
              {[...Array(3)].map((_, colIndex) => {
                const isCenter = rowIndex === 1 && colIndex === 1;
                return (
                  <div
                    key={`${rowIndex}-${colIndex}`}
                    className={`
                      aspect-square rounded-full relative
                      ${isCenter ? 'bg-primary/20' : 'border border-primary/10'}
                      transition-all duration-700 ease-in-out
                      hover:border-primary/30
                    `}
                    style={{
                      animation: isCenter ? 'pulse 4s ease-in-out infinite' : undefined,
                      transform: `scale(${isCenter ? 1.2 : 1})`
                    }}
                  >
                    {!isCenter && (
                      <div 
                        className="absolute inset-0 bg-primary/5 rounded-full transform scale-0 opacity-0 
                                 hover:scale-100 hover:opacity-100 transition-all duration-500"
                      />
                    )}
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>

        {/* Text Content */}
        <div className="space-y-6 relative">
          <h2 className="text-4xl font-light tracking-wide">
            {title}
          </h2>
          <div className="w-12 h-[1px] bg-primary/20 mx-auto" />
          <p className="text-base-content/60 font-light tracking-wide">
            {subtitle}
          </p>
        </div>

        {/* Minimal Loading Indicator */}
        <div className="flex justify-center space-x-4">
          <div className="w-1 h-8">
            <div 
              className="w-full h-full bg-primary/20 transform origin-bottom animate-grow"
              style={{ animationDelay: '0s' }}
            />
          </div>
          <div className="w-1 h-8">
            <div 
              className="w-full h-full bg-primary/20 transform origin-bottom animate-grow"
              style={{ animationDelay: '0.2s' }}
            />
          </div>
          <div className="w-1 h-8">
            <div 
              className="w-full h-full bg-primary/20 transform origin-bottom animate-grow"
              style={{ animationDelay: '0.4s' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MinimalAuthSidebar;

 