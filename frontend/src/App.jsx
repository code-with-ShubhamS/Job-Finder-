import "./App.css";
import "./index.css";
import DarkGradientBackground from "./components/ui/DarkGradientBackground";
import Header from "./components/myComponent/Header";
import Footer from "./components/myComponent/Footer";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <DarkGradientBackground>
        <div className="flex flex-col min-h-[100vh]">
          <Header></Header>
         <Outlet></Outlet>
          <Footer></Footer>
        </div>
      </DarkGradientBackground>
    </>
  );
}

export default App;
