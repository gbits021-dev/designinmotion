import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // GitHub configuration
    const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
    const GITHUB_REPO = process.env.GITHUB_REPO || 'gbits021-dev/designinmotion';
    const BRANCH = 'main';

    if (!GITHUB_TOKEN) {
      return NextResponse.json(
        { error: 'GitHub token not configured' },
        { status: 500 }
      );
    }

    // Read file as buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Determine file type and subfolder
    const fileExtension = file.name.split('.').pop().toLowerCase();
    const fontExtensions = ['ttf', 'woff', 'woff2', 'otf', 'eot'];
    const isFontFile = fontExtensions.includes(fileExtension);

    // Create a clean filename
    const filename = `${Date.now()}-${file.name.replace(/\s/g, '-')}`;
    const subfolder = isFontFile ? 'fonts' : '';
    const FILE_PATH = subfolder ? `public/${subfolder}/${filename}` : `public/${filename}`;

    // Encode to base64 for GitHub API
    const encodedContent = buffer.toString('base64');

    // Check if file already exists (unlikely with timestamp, but good practice)
    const checkResponse = await fetch(
      `https://api.github.com/repos/${GITHUB_REPO}/contents/${FILE_PATH}?ref=${BRANCH}`,
      {
        headers: {
          'Authorization': `Bearer ${GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json',
        },
      }
    );

    let sha = null;
    if (checkResponse.ok) {
      const fileData = await checkResponse.json();
      sha = fileData.sha;
    }

    // Upload to GitHub
    const uploadPayload = {
      message: `Upload ${isFontFile ? 'font' : 'image'}: ${filename}`,
      content: encodedContent,
      branch: BRANCH,
    };

    if (sha) {
      uploadPayload.sha = sha;
    }

    const uploadResponse = await fetch(
      `https://api.github.com/repos/${GITHUB_REPO}/contents/${FILE_PATH}`,
      {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(uploadPayload),
      }
    );

    if (!uploadResponse.ok) {
      const errorData = await uploadResponse.json();
      console.error('GitHub upload error:', errorData);
      return NextResponse.json(
        { error: 'Failed to upload to GitHub', details: errorData.message },
        { status: uploadResponse.status }
      );
    }

    const result = await uploadResponse.json();

    return NextResponse.json({
      success: true,
      filename: filename,
      url: subfolder ? `/${subfolder}/${filename}` : `/${filename}`,
      message: `${isFontFile ? 'Font' : 'Image'} uploaded to GitHub successfully! Vercel will redeploy automatically.`,
      commit: result.commit,
      fileType: isFontFile ? 'font' : 'image'
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload file', details: error.message },
      { status: 500 }
    );
  }
}
