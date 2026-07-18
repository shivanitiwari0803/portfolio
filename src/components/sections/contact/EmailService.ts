import emailjs from "@emailjs/browser";
import { FormState } from "./FormValidation";

export interface EmailServiceResult {
  success: boolean;
  message: string;
  error?: string;
}

/**
 * Sends contact request parameters directly via @emailjs/browser SDK.
 */
export const sendContactEmail = async (
  formData: FormState
): Promise<EmailServiceResult> => {
  // Client-side honeypot spam bot check
  if (formData.honeypot) {
    // Mock success to bots to prevent them from retrying
    return { success: true, message: "Transmission processed." };
  }

  // Rate Limiting Check: 60-second cooldown between submissions
  const lastSubmit = localStorage.getItem("portfolio-last-submit");
  const now = Date.now();
  if (lastSubmit) {
    const elapsed = now - parseInt(lastSubmit, 10);
    if (elapsed < 60000) {
      const waitTime = Math.ceil((60000 - elapsed) / 1000);
      return {
        success: false,
        message: "Rate limit active.",
        error: `Rate limit active. Please wait ${waitTime}s before sending another message.`
      };
    }
  }

  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

  // Validate environment variables exist before sending
  const missingVars: string[] = [];
  if (!serviceId) missingVars.push("NEXT_PUBLIC_EMAILJS_SERVICE_ID");
  if (!templateId) missingVars.push("NEXT_PUBLIC_EMAILJS_TEMPLATE_ID");
  if (!publicKey) missingVars.push("NEXT_PUBLIC_EMAILJS_PUBLIC_KEY");

  if (missingVars.length > 0) {
    const errorMsg = `Missing EmailJS Environment Variables: [${missingVars.join(", ")}]. Please define them in your environment.`;
    console.error(errorMsg);
    return {
      success: false,
      message: "Configuration error.",
      error: errorMsg,
    };
  }

  // Console logging configuration status
  console.log("Service ID loaded", serviceId);
  console.log("Template ID loaded", templateId);
  console.log("Public Key loaded", publicKey);

  try {
    const response = await emailjs.send(
      serviceId!,
      templateId!,
      {
        name: formData.name,
        email: formData.email,
        company: formData.company || "N/A",
        subject: formData.subject,
        message: formData.message,
        time: new Date().toLocaleString()
      },
      {
        publicKey: publicKey!,
      }
    );

    console.log("EmailJS response", response);

    // Store last submit timestamp in local storage to activate cooldown
    localStorage.setItem("portfolio-last-submit", now.toString());

    return {
      success: true,
      message: "Message sent successfully."
    };
  } catch (error) {
    console.error("EmailJS error", error);
    let errorMessage = "An unknown error occurred with EmailJS.";
    if (error && typeof error === "object") {
      if ("text" in error && typeof error.text === "string") {
        errorMessage = error.text;
      } else if ("message" in error && typeof error.message === "string") {
        errorMessage = error.message;
      } else {
        try {
          errorMessage = JSON.stringify(error);
        } catch {
          // ignore
        }
      }
    } else if (typeof error === "string") {
      errorMessage = error;
    }
    return {
      success: false,
      message: "Failed to send email.",
      error: errorMessage
    };
  }
};
