import React, { useState, useEffect } from 'react';
import './App.css';
import logoImage from './q.jpge.png';
import githubImage from './github.jpeg';
import linkedinImage from './link3.jpeg';
import twitterImage from './twitter.jpeg';





function App() {
  const [askItems, setAskItems] = useState([]);
  const [submitItems, setSubmitItems] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const storedAskItems = JSON.parse(localStorage.getItem('askItems')) || [];
    const storedSubmitItems = JSON.parse(localStorage.getItem('submitItems')) || [];

    setAskItems(storedAskItems);
    setSubmitItems(storedSubmitItems);
  }, []);

  const ask = () => {
    const askItem = document.getElementById('askInput').value;

    if (askItem) {
      const updatedAskItems = [...askItems, { question: askItem, answers: [] }];
      setAskItems(updatedAskItems);
      localStorage.setItem('askItems', JSON.stringify(updatedAskItems));
    }
  };

  const submitAnswer = () => {
    const submitItem = document.getElementById('submitInput').value;
    const questionIndex = document.getElementById('questionList').selectedIndex;

    if (submitItem && questionIndex >= 0) {
      const updatedSubmitItems = [...submitItems, submitItem];
      const updatedAskItems = [...askItems];
      updatedAskItems[questionIndex].answers.push({
        answer: submitItem,
        likes: 0,
        dislikes: 0,
        comments: [],
      });

      setSubmitItems(updatedSubmitItems);
      setAskItems(updatedAskItems);

      localStorage.setItem('submitItems', JSON.stringify(updatedSubmitItems));
      localStorage.setItem('askItems', JSON.stringify(updatedAskItems));
    }
  };

  const clearData = () => {
    localStorage.removeItem('askItems');
    localStorage.removeItem('submitItems');
    setAskItems([]);
    setSubmitItems([]);
  };

  const updateAnswer = (answer, questionIndex, answerIndex) => {
    const updatedAskItems = [...askItems];
    updatedAskItems[questionIndex].answers[answerIndex] = answer;

    setAskItems(updatedAskItems);
    localStorage.setItem('askItems', JSON.stringify(updatedAskItems));
  };

  const addComment = (comment, questionIndex, answerIndex) => {
    const updatedAskItems = [...askItems];
    updatedAskItems[questionIndex].answers[answerIndex].comments.push(comment);

    setAskItems(updatedAskItems);
    localStorage.setItem('askItems', JSON.stringify(updatedAskItems));
  };

  const handleSearch = () => {
    // Implement your search logic here
    console.log('Performing search for:', searchText);
    // Clear the search input
    setSearchText('');
  };

  return (
    <div className="app">
      <header>
        <nav className="nav">
          <a className="logo" href="/">
            <img src={logoImage} alt="logo" className="logo-image" />
          </a>
          <a href="/">HOME</a>
          <a className="UserGuide" href="/userguide">USER GUIDES</a>
          <a className="moreinfo" href="/about">MORE INFORMATION</a>
          <a href="/search"></a>
          
          <input
            type="text"
            placeholder="Search"
            className="search-input"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button type="submit" className="search-button" onClick={handleSearch}>
            Search
          </button>
        </nav>

       
      


        <h1>Question and Answer Forum</h1>
      </header>

      <div className="content">
        <section className="box ask-section">
          <h2>Ask a Question</h2>
          <input type="text" id="askInput" placeholder="Type your question" />
          <button onClick={ask}>Ask</button>
        </section>

        <section className="box submit-section">
          <h2>Submit an Answer</h2>
          <input type="text" id="submitInput" placeholder="Type your answer" />
          <select id="questionList">
            {askItems.map((item, index) => (
              <option key={index} value={index}>
                {item.question}
              </option>
            ))}
          </select>
          <button onClick={submitAnswer}>Submit</button>
        </section>

        <section className="box clear-section">
          <button onClick={clearData}>Clear Data</button>
        </section>

        <section className="box questions-section">
          <h2>Questions:</h2>
          {askItems.map((item, questionIndex) => (
            <div key={questionIndex} className="question-box">
              <h3>{item.question}</h3>
              {item.answers.length > 0 && (
                <div>
                  <h4>Answers:</h4>
                  {item.answers.map((answer, answerIndex) => (
                    <div key={answerIndex} className="answer-box">
                      <p>{answer.answer}</p>
                      <button
                        onClick={() => {
                          answer.likes++;
                          updateAnswer(answer, questionIndex, answerIndex);
                        }}
                      >
                        Like ({answer.likes})
                      </button>
                      <button
                        onClick={() => {
                          answer.dislikes++;
                          updateAnswer(answer, questionIndex, answerIndex);
                        }}
                      >
                        Dislike ({answer.dislikes})
                      </button>
                      <input
                        type="text"
                        id={`commentInput-${questionIndex}-${answerIndex}`}
                        placeholder="Add a comment"
                      />
                      <button
                        onClick={() => {
                          const comment = document.getElementById(
                            `commentInput-${questionIndex}-${answerIndex}`
                          ).value;
                          if (comment) {
                            addComment(comment, questionIndex, answerIndex);
                          }
                        }}
                      >
                        Comment
                      </button>
                      {answer.comments.map((comment, commentIndex) => (
                        <p key={commentIndex}>- {comment}</p>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </section>
      </div>

      <footer>
        <div className="footer-container">
          <div className="footer-column">
            <h4>About</h4>
            <p>
              QnAOverflow is a community-driven platform where users can ask and answer questions on various topics.
            </p>
          </div>
          <div className="footer-column">
            <h4>Support</h4>
            <ul>
              <li>
                <a href="/faq">FAQ</a>
              </li>
              <li>
                <a href="/contact">Contact Us</a>
              </li>
              <li>
                <a href="/documentation">Documentation</a>
              </li>
              <li>
                <a href="/tutorials">Tutorials</a>
              </li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Follow Us</h4>
            <ul className="social-links">
              <li>
                <a href="https://github.com/Chaitanyakola24/projrct1">
                  <img src={githubImage} alt="logo" className="github-image" />
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/chaitanya-kola-845a14220/">
                  <img src={linkedinImage} alt="logo" className="linkdin-image" />
                </a>
              </li>
              <li>
                <a href="https://twitter.com/ChaitanyaKola4?t=arRPmCDQN2bDaN8FGrgfQQ&s=08">
                  <img src={twitterImage} alt="logo" className="twitter-image" />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2023 QnAOverflow. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
