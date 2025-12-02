import React from "react";

export default function Footer() {
  return (
    <div>
      <footer className="  text-white py-6">
        <div className="container mx-auto text-center">
          <p>&copy; {new Date().getFullYear()} CHAKI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
