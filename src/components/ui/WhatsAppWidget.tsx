"use client";

/**
 * WhatsApp floating widget — fixed bottom-right, pulsing, with tooltip.
 * Per WCAG 2.1: includes aria-label, role, and keyboard target.
 * Number: +923329073273
 */
export default function WhatsAppWidget() {
  const message = encodeURIComponent("Hi! I need help booking a home service in UAE.");
  const waUrl = `https://wa.me/923329073273?text=${message}`;

  return (
    <a
      href={waUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-btn"
      aria-label="Chat with LocalServices AE on WhatsApp"
      role="link"
    >
      {/* WhatsApp SVG Icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        width="28"
        height="28"
        fill="#ffffff"
        aria-hidden="true"
      >
        <path d="M16 0C7.163 0 0 7.163 0 16c0 2.837.738 5.507 2.031 7.838L0 32l8.396-2.002A15.94 15.94 0 0016 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm7.77 22.584c-.322.904-1.891 1.728-2.604 1.839-.713.112-1.596.16-2.577-.162-.594-.195-1.36-.455-2.33-.893-4.085-1.768-6.752-5.828-6.956-6.098-.203-.27-1.656-2.199-1.656-4.196s1.047-2.976 1.42-3.385c.372-.41.811-.512 1.081-.512.27 0 .54.002.776.014.249.012.582-.095.912.695.338.81 1.149 2.806 1.25 3.01.101.203.168.44.034.71-.135.27-.203.44-.405.676-.203.236-.427.528-.609.71-.203.203-.414.422-.178.828.236.405 1.047 1.725 2.247 2.793 1.543 1.373 2.846 1.797 3.251 1.999.405.203.642.169.88-.101.237-.27 1.014-1.182 1.285-1.588.27-.405.54-.338.912-.203.372.135 2.364 1.116 2.77 1.317.405.203.675.304.776.473.101.169.101.979-.22 1.884z" />
      </svg>
      <span className="whatsapp-tooltip">Need help? Chat now</span>
    </a>
  );
}
