import React from 'react';
import { InstagramIcon, TwitterIcon, FacebookIcon } from './IconComponents';

const Contact: React.FC = () => {
  return (
    <section className="py-24 bg-slate-800">
      <div className="container mx-auto px-6">
        <div className="text-center">
          <h2 className="text-sm font-bold uppercase text-cyan-400 tracking-widest mb-2">Get In Touch</h2>
          <h3 className="text-4xl font-bold text-white mb-12">Let's Create Together</h3>
        </div>
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="lg:w-1/2 bg-slate-900 p-8 rounded-lg shadow-lg">
            <h4 className="text-2xl font-semibold text-white mb-6">Send Us a Message</h4>
            <form>
              <div className="mb-4">
                <label htmlFor="name" className="block text-slate-400 mb-2">Full Name</label>
                <input type="text" id="name" name="name" className="w-full bg-slate-800 border border-slate-700 rounded-md py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500" />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-slate-400 mb-2">Email Address</label>
                <input type="email" id="email" name="email" className="w-full bg-slate-800 border border-slate-700 rounded-md py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500" />
              </div>
              <div className="mb-6">
                <label htmlFor="message" className="block text-slate-400 mb-2">Message</label>
                <textarea id="message" name="message" rows={5} className="w-full bg-slate-800 border border-slate-700 rounded-md py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"></textarea>
              </div>
              <button type="submit" className="w-full bg-cyan-500 text-slate-900 font-bold py-3 px-8 rounded-full text-lg hover:bg-cyan-400 transition-colors duration-300">
                Submit Inquiry
              </button>
            </form>
          </div>
          <div className="lg:w-1/2 text-slate-300">
             <h4 className="text-2xl font-semibold text-white mb-6">Contact Information</h4>
             <p className="mb-4 leading-relaxed">
              Have a project in mind or just want to say hello? We'd love to hear from you. Reach out via email, phone, or connect with us on social media.
             </p>
             <div className="space-y-4 text-lg">
                <p><strong>Email:</strong> <a href="mailto:contact@trokestudios.com" className="text-cyan-400 hover:underline">contact@trokestudios.com</a></p>
                <p><strong>Phone:</strong> <a href="tel:+1234567890" className="text-cyan-400 hover:underline">+1 (234) 567-890</a></p>
                <p><strong>Location:</strong> Los Angeles, California</p>
             </div>
             <div className="mt-8">
                <h5 className="text-xl font-semibold text-white mb-4">Follow Us</h5>
                <div className="flex space-x-6">
                    <a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors duration-300"><InstagramIcon className="w-8 h-8"/></a>
                    <a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors duration-300"><TwitterIcon className="w-8 h-8"/></a>
                    <a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors duration-300"><FacebookIcon className="w-8 h-8"/></a>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;