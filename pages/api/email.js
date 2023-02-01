import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  const completion = await openai.createCompletion({
    max_tokens: 512,
    model: "text-davinci-002",
    prompt: generateEmail(req.body.person, req.body.content),
    temperature: 0.6,
  });
  console.log('completion', JSON.stringify(completion.data));
  res.status(200).json({ result: completion.data.choices[0].text });
}

function generateEmail(person, content) {
  return `Write an email response to ${person}. Here is the email:
    ${content} 
  `;
}
