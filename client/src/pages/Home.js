
import SkyBackground from "../components/SkyBackground";

const testimonials = [
  {
    name: "Aarav Mehta",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    text: "Booking was a breeze! The interface is stunning and the process was seamless. Highly recommended!",
    city: "Mumbai"
  },
  {
    name: "Priya Sharma",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    text: "I loved the modern design and the quick payment flow. This is the best airline booking system I've used!",
    city: "Delhi"
  },
  {
    name: "Aaron Fernandes",
    avatar: "https://randomuser.me/api/portraits/men/65.jpg",
    text: "Superb experience from start to finish. The animations and colors make it feel premium.",
    city: "Goa"
  },
];

const features = [
  {
    icon: "✈️",
    title: "Real-Time Flight Search",
    desc: "Find and book flights instantly with live availability and pricing."
  },
  {
    icon: "💳",
    title: "Secure Payments",
  desc: "Experience a secure, real-time payment process with instant confirmation."
  },
  {
    icon: "🛡️",
    title: "Smart Booking Management",
    desc: "View, manage, and cancel your bookings with ease and confidence."
  },
  {
    icon: "👨‍💼",
    title: "Admin Dashboard",
    desc: "Admins can manage flights and bookings with powerful tools."
  },
];

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <SkyBackground>
  <div className="relative z-20 flex flex-col items-center justify-center min-h-[70vh] text-center py-12 px-2 md:py-16 md:px-4">
          <img src="/arslogo.png" alt="Airline Logo" className="w-32 h-32 md:w-44 md:h-44 mb-8 drop-shadow-xl animate-float" />
          <h1 className="text-3xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-lg animate-fade-in">
            Fly <span className="text-teal-300">Smart</span>, Fly <span className="text-cyan-200">Modern</span>
          </h1>
          <p className="text-base md:text-2xl text-white/90 max-w-2xl mb-8 animate-fade-in delay-200">
            Book, manage, and explore flights with ease. Enjoy a seamless, creative, and secure experience for all your travel needs.
          </p>
          <a href="/flights" className="inline-block bg-teal-400 text-blue-900 font-bold px-6 py-3 md:px-8 rounded-full shadow-lg hover:bg-teal-500 hover:scale-105 transition-all duration-200 animate-fade-in delay-300">
            Book Your Flight
          </a>
        </div>

      </SkyBackground>

      {/* Features Section */}
  <section className="py-10 md:py-16 bg-gradient-to-br from-blue-100 to-blue-50">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-extrabold text-blue-900 mb-8 md:mb-10 text-center animate-fade-in">Why Choose Us?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {features.map((f, i) => (
              <div key={f.title} className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center hover:scale-105 transition-all border-t-4 border-teal-400 animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
                <div className="text-4xl mb-4">{f.icon}</div>
                <div className="font-bold text-lg mb-2 text-blue-800">{f.title}</div>
                <div className="text-gray-600 text-center">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
  <section className="py-10 md:py-20 bg-gradient-to-br from-blue-100 to-blue-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-extrabold text-blue-900 mb-8 md:mb-10 text-center animate-fade-in">What Our Customers Say</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            {testimonials.map((t, i) => (
              <div key={t.name} className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center border-t-4 border-teal-400 animate-fade-in" style={{ animationDelay: `${i * 150}ms` }}>
                <img src={t.avatar} alt={t.name} className="w-20 h-20 rounded-full mb-4 border-4 border-teal-200 shadow" />
                <div className="text-lg text-gray-700 mb-2 italic">"{t.text}"</div>
                <div className="font-bold text-blue-800">{t.name}</div>
                <div className="text-sm text-teal-500">{t.city}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
  <section className="py-10 md:py-16 bg-gradient-to-r from-blue-900 via-blue-700 to-cyan-400 text-center">
  <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-6 animate-fade-in">Ready to experience the future of airline booking?</h2>
        <a href="/register" className="inline-block bg-teal-400 text-blue-900 font-bold px-6 py-3 md:px-10 md:py-4 rounded-full shadow-lg hover:bg-teal-500 hover:scale-105 transition-all duration-200 animate-fade-in delay-300">
          Get Started Now
        </a>
      </section>
    </>
  );
}
