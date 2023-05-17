// prompt - the text sent to ChatGPT.
// completion - the text ChatGPT responses back.
// Prompt Engineering - the art of composing correct and efficent prompts.
// Token - a part of a word that ChatGPT uses in its algorithm. A word is approximately 4 tokens. Max tokens per single prompt + completion is 4.096 tokens (about 1000 words).

async function generate(){
  try{
    // take the html elements:
    const programmingLanguageBox = document.getElementById("programmingLanguageBox");
    const difficultyBox = document.getElementById("difficultyBox");
    const countBox = document.getElementById("countBox");
    const questionsDiv = document.getElementById("questionsDiv");

    // extract values:
    const language = programmingLanguageBox.value;
    const difficulty = difficultyBox.value;
    const count = countBox.value;

    // create prompt:
    const prompt = generatePrompt(language, difficulty, count);

    // get the completion:
    const completion = await getCompletion(prompt);

    // display:
    questionsDiv.innerHTML = completion;

  } catch(err) {
    alert(err.message);
  }
};

function generatePrompt(language, difficulty, count) {
  let prompt = `
    Write ${count} job interview questions for ${language} programming language. Each question should be suitable for ${difficulty} level of programming. Each question should be enumerated and wrapped as html paragraph. Under each question place hidden answer that can be collapsed by user click. 
  `;

  return prompt.trim();
};

async function getCompletion(prompt){

  // API key:
  const apiKey = ""; // My Test Key

  // URL:
  const url = "https://api.openai.com/v1/completions";

  // request body:
  const body = {
    prompt, // the prompt
    model: "text-davinci-003", // GhatGPT algorithm
    max_tokens: 2500 // max completion tokens
  };

  // options:
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": "Bearer " + apiKey
    },
    body: JSON.stringify(body)
  };

  // fetch:
  const response = await fetch(url, options);
  const json = await response.json();

  // if there is an error:
  if (response.status >= 400) throw json.error;

  // extract the completion:
  const completion = json.choices[0].text;

  // return completion:
  return completion;
};