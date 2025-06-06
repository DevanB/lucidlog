import Image from 'next/image'

import { Container } from '@/components/marketing/container'
import backgroundImage from '@/images/background-faqs.jpg'

const faqs = [
  [
    {
      question: 'Is my data private and secure?',
      answer:
        'LOREM ISM IPSUM DOLOR SIT AMET, CONSECTETUR ADIPISICING ELIGENDI VOLUPTATES. LABORIOSAM, VOLUPTAS.',
    },
    {
      question: 'What happens to my data if I cancel my subscription?',
      answer: 'LOREM ISM IPSUM DOLOR SIT AMET, CONSECTETUR ADIPISICING ELIGENDI VOLUPTATES. LABORIOSAM, VOLUPTAS.',
    },
    {
      question: 'Is there a free version of LucidLog?',
      answer:
        'LOREM IPSUM DOLOR SIT AMET, CONSECTETUR ADIPISICING ELIGENDI VOLUPTATES. LABORIOSAM, VOLUPTAS.',
    },
    {
      question: "What's included in the Premium plan?",
      answer:
        'LOREM IPSUM DOLOR SIT AMET, CONSECTETUR ADIPISICING ELIGENDI VOLUPTATES. LABORIOSAM, VOLUPTAS.',
    },
  ],
  [
    {
      question: 'How do I upgrade or downgrade my subscription?',
      answer:
        'LOREM IPSUM DOLOR SIT AMET, CONSECTETUR ADIPISICING ELIGENDI VOLUPTATES. LABORIOSAM, VOLUPTAS.',
    },
    {
      question: 'What payment methods do you accept?',
      answer:
        'LOREM IPSUM DOLOR SIT AMET, CONSECTETUR ADIPISICING ELIGENDI VOLUPTATES. LABORIOSAM, VOLUPTAS.',
    },
    {
      question: 'Can I get a refund?',
      answer:
        'LOREM IPSUM DOLOR SIT AMET, CONSECTETUR ADIPISICING ELIGENDI VOLUPTATES. LABORIOSAM, VOLUPTAS.',
    },
    {
      question: 'Is LucidLog available on mobile devices?',
      answer:
        'LOREM IPSUM DOLOR SIT AMET, CONSECTETUR ADIPISICING ELIGENDI VOLUPTATES. LABORIOSAM, VOLUPTAS.',
    },
  ],
  [
    {
      question:
        'Do you offer offline access?',
      answer:
        'LOREM ISM IPSUM DOLOR SIT AMET, CONSECTETUR ADIPISICING ELIGENDI VOLUPTATES. LABORIOSAM, VOLUPTAS.',
    },
    {
      question: 'How can I contact support?',
      answer:
        'LOREM ISM IPSUM DOLOR SIT AMET, CONSECTETUR ADIPISICING ELIGENDI VOLUPTATES. LABORIOSAM, VOLUPTAS.',
    },
    {
      question: 'How can I suggest a feature or provide feedback?',
      answer: 'LOREM ISM IPSUM DOLOR SIT AMET, CONSECTETUR ADIPISICING ELIGENDI VOLUPTATES. LABORIOSAM, VOLUPTAS.',
    },
    {
      question: 'How do I delete my account?',
      answer:
        'LOREM ISM IPSUM DOLOR SIT AMET, CONSECTETUR ADIPISICING ELIGENDI VOLUPTATES. LABORIOSAM, VOLUPTAS.',
    },
  ],
]

export function Faqs() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="relative overflow-hidden bg-slate-50 py-20 sm:py-32"
    >
      <Image
        className="absolute top-0 left-1/2 max-w-none translate-x-[-30%] -translate-y-1/4"
        src={backgroundImage}
        alt=""
        width={1558}
        height={946}
        unoptimized
      />
      <Container className="relative">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2
            id="faq-title"
            className="font-display text-3xl tracking-tight text-slate-900 sm:text-4xl"
          >
            Frequently asked questions
          </h2>
          <p className="mt-4 text-lg tracking-tight text-slate-700">
            If you can’t find what you’re looking for, email our support team
            and someone will get back to you.
          </p>
        </div>
        <ul
          role="list"
          className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3"
        >
          {faqs.map((column, columnIndex) => (
            <li key={columnIndex}>
              <ul role="list" className="flex flex-col gap-y-8">
                {column.map((faq, faqIndex) => (
                  <li key={faqIndex}>
                    <h3 className="font-display text-lg/7 text-slate-900">
                      {faq.question}
                    </h3>
                    <p className="mt-4 text-sm text-slate-700">{faq.answer}</p>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
