import React, { useState } from "react";
// הסרתי את use המיותר שהיה שגוי בייבוא

export default function LetsTalk() {
  // 1. הגדרת משתני מצב
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState(null); // 'idle', 'submitting', 'success', 'error'
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // ** החלף בכתובת ה-Webhook שלך מ-N8N **
  // הערה: ודא שכתובת זו משתמשת ב-HTTPS (חובה)
  const WEBHOOK_URL =
    "http://localhost:5678/webhook-test/50050c20-3e24-4b59-8fe2-d298f86dca50";

  // פונקציית עדכון מצב כללית
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // 2. פונקציית שליחת הטופס
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus("Sending ..");

    // יצירת אובייקט הנתונים לשליחה.
    // שמות השדות חייבים להתאים למה שמצופה ב-N8N!
    const payload = {
      name: formData.name,
      phone_number: formData.phone, // התאמה לשם המצופה ב-N8N
      message: formData.message,
    };

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // המרת אובייקט ה-JavaScript למחרוזת JSON
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setStatus("הפנייה נשלחה בהצלחה! תודה.");
        setIsSubmitted(true);
        // איפוס הטופס
        setFormData({ name: "", phone: "", message: "" });
      } else {
        // בדיקה אם N8N החזיר שגיאת שרת
        const errorText = await response.text();
        setStatus(
          `שגיאה בשליחה: ${
            response.status
          }. נסה שוב. (Debug: ${errorText.substring(0, 50)}...)`
        );
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setStatus("שגיאת רשת. אנא בדוק את החיבור.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // 3. מבנה הרינדור (ה-HTML)
  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-12">
      <h2 className="text-3xl text-white drop-shadow-[0_0_8px_black] [text-shadow:0_0_16px_black,0_0_24px_black] mb-8 text-center font-bold">
        Let's Talk!
      </h2>

      <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-8 border border-white/10 shadow-2xl">
        {/* 4. מצב הצלחה */}
        {isSubmitted ? (
          <div className="text-center p-6 bg-green-900/40 rounded-xl">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-green-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="text-xl text-white mb-2">
              Your message was sent successfully!
            </h3>
          </div>
        ) : (
          // 5. טופס רגיל
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name field */}
            <div>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all"
                placeholder="Full Name"
              />
            </div>

            {/* Phone field */}
            <div>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all"
                placeholder="Phone Number"
              />
            </div>

            {/* Message field */}
            <div>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all resize-none"
                placeholder="Message"
              />
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-6 bg-green-500 hover:bg-green-600 rounded-lg text-white font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-gray-500/80"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Sending...
                </div>
              ) : (
                "Send Message"
              )}
            </button>

            {/* Status message */}
            {status && (
              <p
                className={`text-center text-sm ${
                  status.includes("בהצלחה") ||
                  status.toLowerCase().includes("success")
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                {status}
              </p>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
