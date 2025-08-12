import Image from 'next/image';

export const metadata = {
  title: 'About Us - AI Tools Directory',
  description: 'Learn more about AI Tools Directory and our mission to connect you with the best AI tools.',
};

export default function AboutUs() {
  return (
    <div className="prose max-w-none">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">About AI Tools Directory</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Connecting you with the most powerful and innovative AI tools to enhance your productivity and creativity.
        </p>
      </div>

      <section className="mb-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Our Story</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Founded in 2023, AI Tools Directory was born out of a simple idea: to create a centralized platform where anyone can discover, 
                compare, and learn about the rapidly evolving world of artificial intelligence tools.
              </p>
              <p>
                As AI technology continues to transform industries and daily life, we recognized the need for a comprehensive, 
                user-friendly directory that helps individuals and businesses navigate this complex landscape.
              </p>
              <p>
                What started as a passion project has grown into a trusted resource for thousands of users worldwide who rely on our platform 
                to stay updated on the latest AI innovations.
              </p>
            </div>
          </div>
          <div className="rounded-lg overflow-hidden shadow-lg">
            <div className="aspect-w-16 aspect-h-9">
              <div className="w-full h-80 bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center">
                <span className="text-white text-xl font-medium">AI Tools in Action</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-10">Our Mission</h2>
        <div className="bg-indigo-50 rounded-xl p-8 text-center">
          <p className="text-xl text-gray-700 italic">
            "To democratize access to AI tools and knowledge, empowering individuals and organizations to harness the power of artificial intelligence to solve real-world problems and unlock new possibilities."
          </p>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-10">Our Values</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Innovation</h3>
            <p className="text-gray-600">We're committed to staying at the forefront of AI technology and bringing you the latest and most effective tools.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Trust</h3>
            <p className="text-gray-600">We maintain the highest standards of integrity and transparency in all our recommendations and operations.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Community</h3>
            <p className="text-gray-600">We believe in the power of collective knowledge and foster a community where users can share insights and experiences.</p>
          </div>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-10">Our Team</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-r from-indigo-400 to-purple-500 flex items-center justify-center text-white text-4xl font-bold">JD</div>
            <h3 className="text-lg font-semibold">John Doe</h3>
            <p className="text-indigo-600 mb-2">Founder & CEO</p>
            <p className="text-gray-600 text-sm">10+ years in AI and machine learning</p>
          </div>
          <div className="text-center">
            <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-r from-pink-400 to-rose-500 flex items-center justify-center text-white text-4xl font-bold">AS</div>
            <h3 className="text-lg font-semibold">Alex Smith</h3>
            <p className="text-indigo-600 mb-2">Head of Product</p>
            <p className="text-gray-600 text-sm">Product development and user experience</p>
          </div>
          <div className="text-center">
            <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 flex items-center justify-center text-white text-4xl font-bold">MJ</div>
            <h3 className="text-lg font-semibold">Maria Garcia</h3>
            <p className="text-indigo-600 mb-2">Community Manager</p>
            <p className="text-gray-600 text-sm">Building and engaging our community</p>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 p-8 rounded-xl">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Join Our Community</h2>
          <p className="text-gray-600 mb-6">
            Be part of our growing community of AI enthusiasts, developers, and innovators. 
            Stay updated with the latest tools, trends, and insights in artificial intelligence.
          </p>
          <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors">
            Get Started
          </button>
        </div>
      </section>
    </div>
  );
}
