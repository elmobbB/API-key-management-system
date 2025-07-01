import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";
// import { summarizeReadme } from "./chain";
import { summarizeReadme } from "./ollama";

export async function POST(req: NextRequest) {
  try {
    // Parse the request body properly
    const { githubUrl } = await req.json(); // Destructure githubUrl from the body

    if (!githubUrl || typeof githubUrl !== "string") {
      return NextResponse.json(
        { error: "Invalid or missing GitHub URL" },
        { status: 400 }
      );
    }

    const apiKey = req.headers.get("x-api-key");
    const { data, error } = await supabase
      .from("api_keys")
      .select("id")
      .eq("key", apiKey)
      .single();

    if (error || !data) {
      return NextResponse.json({ valid: false }, { status: 401 });
    }

    const readmeContent = await getReadmeContentFromGithub(githubUrl);
    console.log("GitHub README content:", readmeContent);

    if (!readmeContent) {
      return NextResponse.json({ error: "README not found" }, { status: 404 });
    }

    const summaryResult = await summarizeReadme(readmeContent);
    return NextResponse.json(summaryResult);
  } catch (error) {
    console.error("Error in API route:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
async function getReadmeContentFromGithub(
  githubUrl: string
): Promise<string | null> {
  try {
    const match = githubUrl.match(
      /github\.com\/([^\/]+)\/([^\/]+?)(?:\.git|\/|$)/i
    );
    if (!match) {
      console.error("Invalid GitHub URL format");
      return null;
    }

    const owner = match[1];
    const repo = match[2].replace(/\.git$/, "");
    console.log(`Attempting to fetch README for ${owner}/${repo}`);

    // First try GitHub API to get default branch
    const repoInfoUrl = `https://api.github.com/repos/${owner}/${repo}`;
    const repoRes = await fetch(repoInfoUrl);

    if (!repoRes.ok) {
      console.error(`GitHub repo info failed: ${repoRes.status}`);
      return null;
    }

    const repoData = await repoRes.json();
    const defaultBranch = repoData.default_branch || "main";
    console.log(`Detected default branch: ${defaultBranch}`);

    // 1. Try standard README.md first
    const standardReadmeUrl = `https://raw.githubusercontent.com/${owner}/${repo}/${defaultBranch}/README.md`;
    const standardRes = await fetch(standardReadmeUrl);
    if (standardRes.ok) {
      return await standardRes.text();
    }

    // 2. Add filename variations check HERE
    const readmeVariations = [
      "README.md",
      "Readme.md",
      "README.MD",
      "readme.md",
      "README",
    ];

    for (const filename of readmeVariations) {
      const variationUrl = `https://raw.githubusercontent.com/${owner}/${repo}/${defaultBranch}/${filename}`;
      const variationRes = await fetch(variationUrl);
      if (variationRes.ok) {
        return await variationRes.text();
      }
    }

    // 3. Fallback to GitHub API if all filename variations fail
    const apiUrl = `https://api.github.com/repos/${owner}/${repo}/readme`;
    const apiRes = await fetch(apiUrl, {
      headers: {
        Accept: "application/vnd.github.v3.raw",
        // Add authentication if needed
        // 'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`
      },
    });

    if (apiRes.ok) {
      return await apiRes.text();
    }

    console.error(`All attempts failed. Final status: ${apiRes.status}`);
    return null;
  } catch (e) {
    console.error("Error fetching README:", e);
    return null;
  }
}
