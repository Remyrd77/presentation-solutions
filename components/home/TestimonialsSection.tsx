'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/Card';

const testimonials = [
  {
    name: 'Dr. Rajesh Kumar',
    role: 'Principal, Modern Public School',
    content: 'Presentation Solutions transformed our 15 classrooms into smart learning spaces. Their refurbished projectors work flawlessly and saved us lakhs compared to new ones. Highly recommended!',
    rating: 5,
    location: 'Yamunanagar',
  },
  {
    name: 'Priya Sharma',
    role: 'IT Manager, Tech Solutions Ltd',
    content: 'We rented projectors for our 3-day conference. Setup was seamless, equipment was top-notch, and the team was very professional. Will definitely use their services again.',
    rating: 5,
    location: 'Jagadhri',
  },
  {
    name: 'Amit Singh',
    role: 'Business Owner',
    content: 'Bought a refurbished Epson projector for my office. Quality is excellent and the 6-month warranty gave me confidence. The team also helped with installation. Great service!',
    rating: 5,
    location: 'Yamunanagar',
  },
  {
    name: 'Neha Gupta',
    role: 'Training Coordinator',
    content: 'Their repair service is outstanding. My old projector was not working for months. They fixed it in 2 days and now it works like new. Very reasonable pricing too.',
    rating: 5,
    location: 'Sadhaura',
  },
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our Clients Say
          </h2>
          <p className="text-lg text-gray-600">
            Trusted by schools, businesses, and organizations across Haryana
          </p>
        </div>

        {/* Testimonial Carousel */}
        <div className="max-w-4xl mx-auto relative">
          <Card className="bg-white">
            <CardContent className="p-8 md:p-12">
              {/* Quote Icon */}
              <div className="text-primary-600 mb-6">
                <svg className="w-12 h-12 opacity-50" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                </svg>
              </div>

              {/* Content */}
              <p className="text-lg md:text-xl text-gray-700 mb-6 leading-relaxed">
                "{testimonials[currentIndex].content}"
              </p>

              {/* Rating */}
              <div className="flex items-center mb-4">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                ))}
              </div>

              {/* Author */}
              <div>
                <div className="font-semibold text-gray-900">{testimonials[currentIndex].name}</div>
                <div className="text-sm text-gray-600">{testimonials[currentIndex].role}</div>
                <div className="text-sm text-primary-600 flex items-center mt-1">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                  </svg>
                  {testimonials[currentIndex].location}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={prev}
              className="p-2 rounded-full bg-white border border-gray-300 hover:bg-gray-50 transition-colors"
              aria-label="Previous testimonial"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/>
              </svg>
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex ? 'bg-primary-600 w-8' : 'bg-gray-300'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="p-2 rounded-full bg-white border border-gray-300 hover:bg-gray-50 transition-colors"
              aria-label="Next testimonial"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
