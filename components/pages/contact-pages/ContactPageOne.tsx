import ContactForm from "@/components/forms/ContactForm";
import { Locate, Mail, Phone,} from "lucide-react";
import React from "react";

const ContactPageOne = () => {
  return (
    <section className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-slate-100 dark:bg-slate-900">
      <h2 className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
        Get In Touch
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Form */}
        <div className="lg:col-span-2">
          <ContactForm />
        </div>

        {/* Contact Information */}
        <div className="bg-blue-600 text-white dark:bg-blue-700 rounded-lg shadow-md p-6 md:p-10 h-fit flex flex-col justify-between">
          <h3 className="text-2xl font-semibold text-center mb-6">
            Contact Us
          </h3>
          <div className="space-y-6 text-lg">
            <div className="flex items-start gap-4">
              <Locate size={32} />
              <div>
                <p className="font-medium">Address</p>
                <p className="text-sm">123 Main Street, City, Country</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Phone size={32} />
              <div>
                <p className="font-medium">Phone</p>
                <p className="text-sm">+123 456 7890</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Mail size={32} />
              <div>
                <p className="font-medium">Email</p>
                <p className="text-sm">info@example.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


export default ContactPageOne;
