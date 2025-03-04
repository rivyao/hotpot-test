import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Button } from './components/ui/button';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import { Copy } from 'lucide-react';

const questions = [
  {
    id: 1,
    text: "🛎️ Arriving at the Gathering\nYou step into the house, greeted by familiar faces and the delicious aroma of simmering broth. The hotpot table is almost full. What do you do?",
    options: [
      { text: "🍻 Greet everyone loudly, help set up, and start hyping up the meal!", scores: { E: 1 } },
      { text: "🍵 Smile and quietly find your seat, happy to just be part of the moment.", scores: { I: 1 } },
      { text: "🥢 Depends on the crowd—sometimes I jump in, sometimes I observe.", scores: { E: 0.5, I: 0.5 } }
    ]
  },
  {
    id: 2,
    text: "Granny excitedly unveils a new dish she claims is the 'special of the year' and asks if you'd like to try it first.",
    options: [
      { text: "🌟 'Of course! I'll be the judge of how good this is!'", scores: { T: 1 } },
      { text: "🤔 'Uhh… let me see what everyone else thinks first.'", scores: { F: 1 } },
      { text: "🍛 'What's in it? I'll decide after I know more.'", scores: { T: 0.5, F: 0.5 } }
    ]
  },
  {
    id: 3,
    text: "The table is full of ingredients, and it's time to start cooking. How do you decide what goes in first?",
    options: [
      { text: "📊 Carefully choose ingredients based on cooking time and nutrition.", scores: { J: 1 } },
      { text: "💖 Go for whatever looks best and makes you (and others) happy.", scores: { P: 1 } },
      { text: "🍜 A bit of both—I like good food, but I'm practical too.", scores: { J: 0.5, P: 0.5 } }
    ]
  }
];

const personalityTypes = {
  "ETJ": { emoji: "🥩", name: "Wagyu Beef", desc: "Bossy, efficient, natural leader" },
  "ETP": { emoji: "🥬", name: "Cabbage", desc: "Chaotic, energetic, loves experimenting" },
  "EFJ": { emoji: "🧀", name: "Cheese Tofu", desc: "Social, warm, keeps the group together" },
  "EFP": { emoji: "🦐", name: "Prawn Paste", desc: "Creative, spontaneous, loves fun" },
  "ITJ": { emoji: "🍜", name: "Noodles", desc: "Precise, methodical, structured thinker" },
  "ITP": { emoji: "🥟", name: "Dumplings", desc: "Observant, logical, lowkey hilarious" },
  "IFJ": { emoji: "🍄", name: "Enoki", desc: "Gentle, caring, quietly supportive" },
  "IFP": { emoji: "🐟", name: "Fishball", desc: "Soft-hearted, dreamy, authentic" }
};

const HotpotTest = () => {
  const { width, height } = useWindowSize();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState({ E: 0, I: 0, T: 0, F: 0, J: 0, P: 0 });
  const [showResult, setShowResult] = useState(false);
  const [personalityResult, setPersonalityResult] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);

  const handleAnswer = (optionScores) => {
    let newScores = { ...scores };

    for (const key in optionScores) {
      newScores[key] += optionScores[key];
    }

    setScores(newScores);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResult(newScores);
    }
  };

  const calculateResult = (finalScores) => {
    const personality = 
      (finalScores.E > finalScores.I ? 'E' : 'I') +
      (finalScores.T > finalScores.F ? 'T' : 'F') +
      (finalScores.J > finalScores.P ? 'J' : 'P');

    setPersonalityResult(personality);
    setShowResult(true);
    setShowConfetti(true);

    setTimeout(() => setShowConfetti(false), 3000);
  };

  const resetTest = () => {
    setCurrentQuestion(0);
    setScores({ E: 0, I: 0, T: 0, F: 0, J: 0, P: 0 });
    setShowResult(false);
    setPersonalityResult('');
  };

  const shareResult = () => {
    const resultText = `🔥 I took the Hotpot Personality Test and I'm ${personalityTypes[personalityResult].emoji} ${personalityTypes[personalityResult].name}! ${personalityTypes[personalityResult].desc}\n\nTry it here: [insert test link]`;
    
    navigator.clipboard.writeText(resultText);
    alert("Copied to clipboard! Share it with your friends! 🎉");
  };

  return (
    <div className="min-h-screen bg-red-50 py-8 px-4">
      {showConfetti && <Confetti width={width} height={height} />}
      
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center bg-red-100 rounded-t-lg">
          <CardTitle className="text-2xl font-bold text-red-800">
            🔥 The Hotpot Personality Test – CNY Edition! 🍲🎊
          </CardTitle>
          {!showResult && (
            <p className="mt-4 text-red-700">
              It's Chinese New Year, and you've arrived at a bustling family gathering. 
              The table is set, the broth is bubbling, and everyone is getting ready for an epic hotpot feast!
            </p>
          )}
        </CardHeader>
        <CardContent className="p-6">
          {!showResult ? (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold mb-4">
                {questions[currentQuestion].text}
              </h3>
              <div className="space-y-4">
                {questions[currentQuestion].options.map((option, index) => (
                  <Button
                    key={index}
                    onClick={() => handleAnswer(option.scores)}
                    className="w-full text-left p-4 hover:bg-red-100"
                    variant="outline"
                  >
                    {option.text}
                  </Button>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center space-y-6">
              <div className="text-6xl mb-4">
                {personalityTypes[personalityResult].emoji}
              </div>
              <h2 className="text-2xl font-bold text-red-800">
                You are: {personalityTypes[personalityResult].name}!
              </h2>
              <p className="text-lg text-gray-700">
                {personalityTypes[personalityResult].desc}
              </p>
              <Button onClick={shareResult} className="bg-blue-600 hover:bg-blue-700 text-white flex items-center">
                <Copy className="w-4 h-4 mr-2" /> Share Your Result
              </Button>
              <Button onClick={resetTest} className="mt-4 bg-red-600 hover:bg-red-700 text-white">
                Take the Test Again
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default HotpotTest;
