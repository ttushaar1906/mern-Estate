import React, { FormEvent, useState } from 'react';
import { Footer1Config, SocialMediaConfig } from '../config/FooterConfig';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
    const [email, setEmail] = useState<string>('');

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Logic to handle newsletter subscription
        console.log('Subscribing email:', email);
        // Reset the input after submission
        setEmail('');
        // Here you would typically send this to your backend API
    };

    return (
        <footer className="bg-gray-800 text-white py-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

                    {Footer1Config.map((footer) => (
                        <div>
                            <h3 className="text-xl font-semibold mb-4">{footer.heading}</h3>
                            <p className="mb-2">{footer.desc}</p>
                            <p className="mb-2">{footer.line1}</p>
                            <p className="mb-2">{footer.city}</p>
                            <p className="mb-2">{footer.phoneNo}</p>
                            <p className="mb-2">{footer.email}</p>
                        </div>
                    ))}


                    {/* Quick Links */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
                        <ul>
                            {[
                                { name: 'Home', href: '/' },
                                { name: 'Properties for Rent', href: '/' },
                                { name: 'Properties for Sale', href: '/' },
                                { name: 'Featured Listings', href: '/' },
                                { name: 'About Us', href: '/about' },
                                { name: 'Contact Us', href: '/contactUs' }
                            ].map((link, index) => (
                                <li key={index} className="mb-2">
                                    <a href={link.href} className="hover:text-cyan-600 transition-colors">
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4">Our Services</h3>
                        <ul>
                            {[
                                { name: 'Property Valuation', href: '/notAvailable' },
                                { name: 'Buying Assistance', href: '/notAvailable' },
                                { name: 'Selling Services', href: '/notAvailable' },
                                { name: 'Rental Management', href: '/notAvailable' },
                                { name: 'Investment Consulting', href: '/notAvailable' },
                                { name: 'Property Insurance', href: '/notAvailable' }
                            ].map((service, index) => (
                                <li key={index} className="mb-2">
                                    <a href={service.href} className="hover:text-cyan-600 transition-colors">
                                        {service.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4">Stay Updated</h3>
                        <p className="mb-4">Subscribe to our newsletter for the latest property listings and market updates.</p>
                        <form className="flex flex-col space-y-2" onSubmit={handleSubmit}>
                            <input
                                type="email"
                                placeholder="Your Email Address"
                                className="px-4 py-2 rounded text-white border-white border"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <button
                                type="submit"
                                className="text-cyan-600 bg-white transition-colors py-2 px-4 rounded-xl hover:text-white hover:bg-cyan-600 cursor-pointer mt-2"
                            >
                                Subscribe
                            </button>
                        </form>
                        <div className="mt-6">
                            <h4 className="text-lg mb-3">Follow Us</h4>
                            <div className="flex items-center justify-evenly p-2">
                                {SocialMediaConfig.map((socialMedia) => (
                                    <Link to={socialMedia.link}>
                                        <img src={socialMedia.img} alt="" className='w-6 h-6' />
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;