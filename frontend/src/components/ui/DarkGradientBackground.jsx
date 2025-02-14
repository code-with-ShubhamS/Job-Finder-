const DarkGradientBackground = ({ children }) => {
    return (
      <div className="dark-gradient-background">
        {children}
        <style>{`
          .dark-gradient-background {
            position: relative;
            width: 100%;
            min-height: 100vh;
            background: 
              radial-gradient(circle at 0 0, rgba(0, 0, 0, 0.8) 10%, transparent 100%),
              radial-gradient(circle at 100% 0, rgba(0, 0, 0, 0.8) 10%, transparent 83%),
              radial-gradient(circle at 0 100%, rgb(0 0 0 / 80%) 10%, transparent 60%),
              radial-gradient(circle at 100% 100%, rgba(0, 0, 0, 0.8) 10%, transparent 45%),
              radial-gradient(circle at 50% 50%, rgba(25, 39, 88, 0.8) 10%, rgba(13, 15, 44, 1) 100%),
              repeating-linear-gradient(0deg, transparent, transparent 52px, rgba(255, 255, 255, 0.02) 50px, rgba(255, 255, 255, 0.02) 51px),
              repeating-linear-gradient(90deg, transparent, transparent 50px, rgba(255, 255, 255, 0.02) 50px, rgba(255, 255, 255, 0.02) 51px),
              #000000;
          }
  
          /* Add a grid overlay with thin square box lines */
          .dark-gradient-background::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: 
              repeating-linear-gradient(0deg, transparent, transparent 49px, rgba(255, 255, 255, 0.05) 50px, rgba(255, 255, 255, 0.05) 50px),
              repeating-linear-gradient(90deg, transparent, transparent 49px, rgba(255, 255, 255, 0.05) 50px, rgba(255, 255, 255, 0.05) 50px);
            pointer-events: none;
          }
        `}</style>
      </div>
    );
  };
  
  export default DarkGradientBackground;