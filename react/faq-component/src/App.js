/*
 * https://frontendeval.com/questions/faq-component
 *
 * Create a re-usable "Frequently Asked Questions" component
 */

import './styles.css';

const FAQ = [
  {
    question: 'How many bones does a cat have?',
    answer: 'A cat has 230 bones - 6 more than a human'
  },
  {
    question: 'How much do cats sleep?',
    answer: 'The average cat sleeps 12-16 hours per day'
  },
  {
    question: 'How long do cats live',
    answer:
      'Outdoor cats live 5 years on average. Indoor cats live 15 years on average.'
  }
];

const FAQComponent = ({ questions }) => {
  // Create this component
  return (
    <>
      {questions.map(({ question, answer }, i) => (
        <details key={i} open={i === 0}>
          <summary>{question}</summary>
          <p>{answer}</p>
        </details>
      ))}
    </>
  );
};

export default function App() {
  return <FAQComponent questions={FAQ} />;
}
