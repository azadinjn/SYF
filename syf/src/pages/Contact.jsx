
import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

function Contact() {
  const formRef = useRef(null);
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setStatus("error");
      return;
    }

    try {
      setIsSending(true);
      setStatus("");

      formRef.current.elements.time.value =
      new Date().toLocaleString("en-GB", {
        timeZone: "Africa/Casablanca",
      });
      
      await emailjs.sendForm(
        serviceId,
        templateId,
        formRef.current,
        { publicKey }
      );

      setStatus("success");
      formRef.current.reset();
    } catch (error) {
      console.error("Email sending failed:", error);
      setStatus("error");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <main>
      {/* Hero Section */}
      <section>
        <h1>Contact Us</h1>
        <p>
          Have a question, suggestion, or need help?
          We'd love to hear from you.
        </p>
      </section>

      {/* Contact Information */}
      <section>
        <h2>Get in Touch</h2>
        <p>You can contact us using the information below.</p>

        <div>
          <article>
            <h3>Email</h3>
            <p>
              For general questions and support, send us
              a message through the contact form.
            </p>
          </article>

          <article>
            <h3>Support</h3>
            <p>
              Need help using SYF? Send us a message
              through the contact form.
            </p>
          </article>
        </div>
      </section>

      {/* Contact Form */}
      <section>
        <h2>Send Us a Message</h2>
        <p>
          Fill out the form below and we'll get back to you.
        </p>

        <form ref={formRef} onSubmit={handleSubmit}>
            <div><input type="hidden" name="time" value="" /></div>
          <div>
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              required
            />
          </div>

          <div>
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label htmlFor="subject">Subject</label>
            <input
              type="text"
              id="subject"
              name="subject"
              placeholder="Enter message subject"
              required
            />
          </div>

          <div>
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              placeholder="Write your message..."
              rows="5"
              required
            />
          </div>

          {status === "success" && (
            <p role="status">
              Your message has been sent successfully!
            </p>
          )}

          {status === "error" && (
            <p role="alert">
              Something went wrong. Please try again later.
            </p>
          )}

          <button type="submit" disabled={isSending}>
            {isSending ? "Sending..." : "Send Message"}
          </button>
        </form>
      </section>
    </main>
  );
}

export default Contact;
