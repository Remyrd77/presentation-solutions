const stats = [
  {
    value: '15+',
    label: 'Years Experience',
    description: 'Serving Yamunanagar since 2009',
  },
  {
    value: '500+',
    label: 'Happy Clients',
    description: 'Schools, offices & businesses',
  },
  {
    value: '1000+',
    label: 'Projects Completed',
    description: 'Installations & setups',
  },
  {
    value: '98%',
    label: 'Customer Satisfaction',
    description: 'Based on customer reviews',
  },
];

export default function StatsSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary-600 mb-2">
                {stat.value}
              </div>
              <div className="text-lg font-semibold text-gray-900 mb-1">
                {stat.label}
              </div>
              <div className="text-sm text-gray-600">
                {stat.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
