import { NextResponse } from 'next/server';

export async function GET(request) {
  return NextResponse.json({
    hasGithubToken: !!process.env.GITHUB_TOKEN,
    hasGithubRepo: !!process.env.GITHUB_REPO,
    githubRepo: process.env.GITHUB_REPO || 'NOT_SET',
    nodeEnv: process.env.NODE_ENV,
    // Don't show the actual token for security
    tokenPreview: process.env.GITHUB_TOKEN ? `${process.env.GITHUB_TOKEN.substring(0, 10)}...` : 'NOT_SET'
  });
}
