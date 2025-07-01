import { Ollama } from "@langchain/community/llms/ollama";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { RunnableSequence } from "@langchain/core/runnables";

// 1. Define the structured output
interface RepositorySummary {
  summary: string;
  cool_facts: [string, string];
}

// 2. Create a dedicated prompt without template variables
const SYSTEM_PROMPT = `You are an expert GitHub repository analyzer. 
Always return a JSON object with:
- "summary": 2-3 sentence overview
- "cool_facts": exactly 2 interesting facts

Example response:
{
  "summary": "This project is...",
  "cool_facts": [
    "First interesting fact...",
    "Second interesting fact..."
  ]
}

Return ONLY the JSON object, no other text.`;

// 3. New implementation
export const summarizeReadme = async (
  readmeContent: string
): Promise<RepositorySummary> => {
  const model = new Ollama({
    model: "llama3",
    temperature: 0.3,
    format: "json",
  });

  const chain = RunnableSequence.from([
    {
      // Combine static prompt with dynamic content
      system: () => SYSTEM_PROMPT,
      content: (input: { readmeContent: string }) => input.readmeContent,
    },
    ({ system, content }) =>
      `${system}\n\nREADME CONTENT:\n${content}\n\nJSON OUTPUT:`,
    model,
    new StringOutputParser(),
  ]);

  try {
    const result = await chain.invoke({ readmeContent });

    // Robust JSON extraction
    const jsonMatch = result.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("No JSON found in response");

    const parsed = JSON.parse(jsonMatch[0]);

    // Validate structure
    if (
      typeof parsed.summary === "string" &&
      Array.isArray(parsed.cool_facts) &&
      parsed.cool_facts.length === 2
    ) {
      return parsed as RepositorySummary;
    }
    throw new Error("Invalid structure");
  } catch (error) {
    console.error("Summary generation failed:", error);
    return {
      summary:
        "This repository contains valuable project files and documentation",
      cool_facts: [
        "The project follows modern software development practices",
        "The README provides important setup and usage instructions",
      ],
    };
  }
};
