import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { content } = await request.json();

    // GitHub configuration
    const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
    const GITHUB_REPO = process.env.GITHUB_REPO || 'gbits021-dev/designinmotion';
    const FILE_PATH = 'app/content.js';
    const BRANCH = 'main';

    if (!GITHUB_TOKEN) {
      return NextResponse.json(
        { error: 'GitHub token not configured. Please set GITHUB_TOKEN in environment variables.' },
        { status: 500 }
      );
    }

    // Get the current file SHA (required for updating)
    const getFileResponse = await fetch(
      `https://api.github.com/repos/${GITHUB_REPO}/contents/${FILE_PATH}?ref=${BRANCH}`,
      {
        headers: {
          'Authorization': `Bearer ${GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json',
        },
      }
    );

    let sha = null;
    if (getFileResponse.ok) {
      const fileData = await getFileResponse.json();
      sha = fileData.sha;
    }

    // Format the content as a proper JavaScript file
    const fileContent = `// Content Configuration File
// Edit this file to update event details, dates, partners, and more

const content = ${JSON.stringify(content, null, 2)};

export default content;
`;

    // Encode content to base64
    const encodedContent = Buffer.from(fileContent).toString('base64');

    // Create or update the file
    const updatePayload = {
      message: `Update content via admin panel - ${new Date().toISOString()}`,
      content: encodedContent,
      branch: BRANCH,
    };

    if (sha) {
      updatePayload.sha = sha;
    }

    const updateResponse = await fetch(
      `https://api.github.com/repos/${GITHUB_REPO}/contents/${FILE_PATH}`,
      {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatePayload),
      }
    );

    if (!updateResponse.ok) {
      const errorData = await updateResponse.json();
      console.error('GitHub API Error:', errorData);
      return NextResponse.json(
        { error: 'Failed to save to GitHub', details: errorData },
        { status: updateResponse.status }
      );
    }

    const result = await updateResponse.json();

    return NextResponse.json({
      success: true,
      message: 'Content saved successfully to GitHub! Vercel will automatically redeploy.',
      commit: result.commit,
    });

  } catch (error) {
    console.error('Error saving content:', error);
    return NextResponse.json(
      { error: 'Failed to save content', details: error.message },
      { status: 500 }
    );
  }
}
