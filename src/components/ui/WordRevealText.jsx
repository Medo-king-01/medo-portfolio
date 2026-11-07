import { useMemo } from 'react';
import { motion } from 'framer-motion';

const splitWords = (text) => {
  if (!text || typeof text !== 'string') return [];
  const tokens = [];
  const regex = /(\S+)(\s*)/g;
  let m;
  let i = 0;
  while ((m = regex.exec(text)) !== null) {
    tokens.push({ word: m[1], space: m[2], key: `${i}-${m[1]}` });
    i += 1;
  }
  return tokens;
};

const wordVariants = {
  hidden: {
    opacity: 0,
    y: '0.6em',
    filter: 'blur(4px)',
  },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
      delay: Math.min(0.03 * i, 1.2), // cap maximum stagger delay to 1.2s
    },
  }),
};

export const WordRevealText = ({
  text,
  className = '',
  as: Component = 'div',
  paragraphClassName = '',
  once = true,
  amount = 0.2,
}) => {
  // Normalize input into an array of paragraph strings
  const paragraphs = useMemo(() => {
    if (!text) return [];
    if (Array.isArray(text)) return text.filter(Boolean);
    if (typeof text === 'string') {
      return text.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
    }
    return [String(text)];
  }, [text]);

  const tokenizedParagraphs = useMemo(() => {
    const list = [];
    let runningWordCount = 0;
    for (let idx = 0; idx < paragraphs.length; idx += 1) {
      const paragraph = paragraphs[idx];
      const tokens = splitWords(paragraph);
      list.push({ paragraph, tokens, startWordIndex: runningWordCount });
      runningWordCount += tokens.length;
    }
    return list;
  }, [paragraphs]);

  if (!paragraphs.length) return null;

  return (
    <Component className={className}>
      {tokenizedParagraphs.map(({ paragraph, tokens, startWordIndex }, pIdx) => (
        <p key={pIdx} className={paragraphClassName || 'mb-5 last:mb-0'} aria-label={paragraph}>
          {tokens.map((tok, i) => (
            <span key={tok.key} className="inline-block">
              <motion.span
                custom={startWordIndex + i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once, amount }}
                variants={wordVariants}
                style={{ display: 'inline-block' }}
              >
                {tok.word}
              </motion.span>
              {tok.space && (
                <span style={{ display: 'inline', whiteSpace: 'pre' }}>{tok.space}</span>
              )}
            </span>
          ))}
        </p>
      ))}
    </Component>
  );
};

export default WordRevealText;
