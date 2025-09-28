import React from 'react'

export default function Footer() {
  return (
    <div>
        <footer className="bg-black text-white py-6 mt-10">
          <div className="container mx-auto text-center">
            <p>&copy; {new Date().getFullYear()} CHAKI. All rights reserved.</p>
          </div>
        </footer>
    </div>
  )
}
