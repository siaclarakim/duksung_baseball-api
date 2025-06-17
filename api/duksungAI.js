import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();
const ai = new GoogleGenerativeAI({ apiKey: process.env.GEMINI_API_KEY });

export default async function handler(req, res) {
  const allowedOrigin="https://siaclarakim.github.io"
  res.setHeader("Access-Control-Allow-Origin", allowedOrigin);
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  const { name, birth } = req.body;
 if (!name || !birth) {
 return res.status(400).json({ error: "이름(name)과 생년월일(birth)이 필요합니다." });
 }
  //const name = "김시아";
  //const cheer = "신나는 응원";
 // const local = "광주";
  try {
    const today = new Date().toISOString().slice(0, 10);
    const prompt = `
이름: ${name}
좋아하는 응원 스타일: ${cheer}
고향: ${local}

이 사람에게 어울리는 한국 프로야구 구단 하나를 추천해줘.
이유도 간단히 설명하고, 마지막에 한 줄 응원 문구를 덧붙여줘.
`;

    const model = ai.getGenerativeModel({
      model: "gemini-2.0-flash", 
      systemInstruction:
        "당신은 KBO 리그 전문가입니다. 사용자의 선호와 정보를 분석해 가장 잘 맞는 KBO 구단을 추천하고, 그 이유를 명확하게 설명해주세요. 추천은 각 구단의 역사, 팬, 스타일, 지역 등을 고려해 이루어져야 합니다.",
    });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();

    res.status(200).json({ answer: text });
  } catch (err) {
    console.error("Gemini API 오류:", err);
    res.status(500).json({ error: "Gemini API 오류 발생" });
  }
}
