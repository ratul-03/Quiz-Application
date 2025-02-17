import React, { useState, useEffect, useRef } from 'react';
import { data } from '../../assets/data';
import '../../App.css';

const Navbar = () => {
  const [index, setIndex] = useState(0);
  const [question, setQuestion] = useState(data[index]);
  const [lock, setLock] = useState(false);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  useEffect(() => {
    setQuestion(data[index]);
  }, [index]);

  const option1 = useRef(null);
  const option2 = useRef(null);
  const option3 = useRef(null);
  const option4 = useRef(null);

  const optionArray = [option1, option2, option3, option4];

  const checkAns = (e, ans) => {
    if (!lock) {
      if (question.ans === ans) {
        e.target.classList.add('Correct');
        setScore(score + 5); // Correct answer +5 points
      } else {
        e.target.classList.add('Wrong');
        optionArray[question.ans - 1].current.classList.add('Correct');
        setScore(score - 2.5); // Wrong answer -2.5 points
      }
      setLock(true);
    }
  };

  const nextQuestion = () => {
    if (index < data.length - 1) {
      setIndex(index + 1);
      setLock(false);

      optionArray.forEach(option => {
        option.current.classList.remove('Correct', 'Wrong');
      });
    } else {
      setShowScore(true);
    }
  };

  return (
    <>
      <div className="container w-[640px] mt-[150px] m-auto flex flex-col rounded-2xl bg-white py-[40px] px-[50px]">
        <h1 className="text-3xl my-3 font-bold">Quiz app</h1>
        <hr className="bg-gray-700 h-0.5" />

        {showScore ? (
          <h2 className="text-2xl font-bold text-center my-5">
            Your Score: {score} / {data.length * 5}
          </h2>
        ) : (
          <>
            <h2 className="text-xl my-3 font-medium">
              {index + 1}. {question?.question}
            </h2>
            <ul>
              <li
                ref={option1}
                onClick={e => checkAns(e, 1)}
                className="flex items-center pl-3 h-[70px] border border-gray-700 mb-5 rounded-lg text-[17px] cursor-pointer"
              >
                {question?.option1}
              </li>
              <li
                ref={option2}
                onClick={e => checkAns(e, 2)}
                className="flex items-center pl-3 h-[70px] border border-gray-700 mb-5 rounded-lg text-[17px] cursor-pointer"
              >
                {question?.option2}
              </li>
              <li
                ref={option3}
                onClick={e => checkAns(e, 3)}
                className="flex items-center pl-3 h-[70px] border border-gray-700 mb-5 rounded-lg text-[17px] cursor-pointer"
              >
                {question?.option3}
              </li>
              <li
                ref={option4}
                onClick={e => checkAns(e, 4)}
                className="flex items-center pl-3 h-[70px] border border-gray-700 mb-5 rounded-lg text-[17px] cursor-pointer"
              >
                {question?.option4}
              </li>
            </ul>
            <button
              onClick={nextQuestion}
              className="flex flex-row w-[150px] mb-4 m-auto h-[55px] cursor-pointer rounded-lg font-bold text-xl justify-center items-center text-[19px] bg-violet-800 text-white"
            >
              {index === data.length - 1 ? 'Show Score' : 'Next'}
            </button>
            <div className="index mx-auto">
              {index + 1} of {data.length} questions
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Navbar;
