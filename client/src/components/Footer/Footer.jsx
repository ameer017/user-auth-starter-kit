import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer
      style={{ borderTop: "2px solid", padding: "10px", textAlign: "center" }}
    >
      <p>Copyright &copy; {currentYear}, All rights reserved.</p>
    </footer>
  );
};

export default Footer;
