import React, { useEffect } from "react";
import "./layout.scss";
import Navbar from "../../components/navbar/Navbar";
import { Outlet } from "react-router-dom";


const Layout = () => {
  useEffect(() => {
    const loadVoiceflowWidget = () => {
      const script = document.createElement('script');
      script.src = 'https://cdn.voiceflow.com/widget/bundle.mjs';
      script.type = 'text/javascript';
      script.onload = () => {
        try {
          window.voiceflow.chat.load({
            verify: { projectID: '677a7ec08850d4850403ea74' },
            url: 'https://general-runtime.voiceflow.com',
            versionID: 'production'
          });
          console.log('Voiceflow widget loaded successfully');
        } catch (error) {
          console.error('Error loading Voiceflow widget:', error);
        }
      };
      script.onerror = (error) => {
        console.error('Error loading the script:', error);
      };
      document.getElementsByTagName('head')[0].appendChild(script);
    };

    loadVoiceflowWidget();

  }, []);

  return (
    <div className="layout">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
