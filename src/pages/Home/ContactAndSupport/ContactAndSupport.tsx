import React, { useState } from 'react';
import { FiPhone, FiMail, FiMessageCircle, FiChevronDown } from 'react-icons/fi';

const faqs = [
  {
    question: 'How do I book a car wash?',
    answer: 'Simply select your desired service, choose a time slot, and confirm your booking. You will receive a confirmation email afterward.',
  },
  {
    question: 'What is the cancellation policy?',
    answer: 'You can cancel your booking up to 24 hours before the appointment time without any charges.',
  },
  {
    question: 'Do you offer mobile car washing services?',
    answer: 'Yes, we offer mobile services in select locations. Check the service area map for more details.',
  },
];

const ContactAndSupport: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Contact Info */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">Contact & Support</h2>
          <p className="text-lg text-gray-600 mb-4">Need help? Get in touch with us easily!</p>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="flex items-center gap-4">
              <FiPhone className="text-3xl text-blue-500" />
              <a href="tel:+1234567890" className="text-lg text-gray-800">+1 (234) 567-890</a>
            </div>
            <div className="flex items-center gap-4">
              <FiMail className="text-3xl text-green-500" />
              <a href="mailto:support@carwash.com" className="text-lg text-gray-800">support@carwash.com</a>
            </div>
            <div className="flex items-center gap-4">
              <FiMessageCircle className="text-3xl text-purple-500" />
              <button className="text-lg text-gray-800">Live Chat</button>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Frequently Asked Questions</h3>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b pb-4">
                <div
                  onClick={() => toggleFAQ(index)}
                  className="flex justify-between items-center cursor-pointer"
                >
                  <h4 className="text-xl text-gray-800 font-semibold">{faq.question}</h4>
                  <FiChevronDown
                    className={`text-xl transform transition-transform duration-300 ${
                      openIndex === index ? 'rotate-180' : 'rotate-0'
                    }`}
                  />
                </div>
                {openIndex === index && (
                  <p className="mt-4 text-gray-600">{faq.answer}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactAndSupport;
