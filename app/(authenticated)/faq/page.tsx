const faqs = [
  {
    id: 24,
    question:
      "What's the most frustrating thing about troubleshooting IoT devices over the phone?",
    answer:
      "Trying to explain to the customer how to unplug and replug something they can't even see.",
  },
  {
    id: 11,
    question: "Why did the smart lightbulb go to therapy?",
    answer: "It was feeling a little dim.",
  },
  {
    id: 3,
    question: "Why did the M2M device go to therapy?",
    answer: "It was feeling disconnected.",
  },
  {
    id: 4,
    question: "What's the best thing about a smart home?",
    answer: "You can tell your thermostat to shut up.",
  },
  {
    id: 5,
    question: "Why did the IoT device join a band?",
    answer: "It heard the network was looking for a new connection.",
  },
];

export default function page() {
  return (
    <div className="lg:mt-6">
      <div className="mx-auto max-w-7xl px-6 lg:px-0">
        <h2 className="text-balance font-semibold tracking-tight text-gray-900 sm:text-3xl">
          Frequently asked questions
        </h2>
        <dl className="mt-10 space-y-8 divide-y divide-gray-900/10">
          {faqs.map((faq) => (
            <div key={faq.id} className="pt-8 lg:grid lg:grid-cols-12 lg:gap-8">
              <dt className="text-base/7 font-semibold text-gray-900 lg:col-span-5">
                {faq.question}
              </dt>
              <dd className="mt-4 lg:col-span-7 lg:mt-0">
                <p className="text-base/7 text-gray-600">{faq.answer}</p>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
