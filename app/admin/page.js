"use client";
import { useState, useEffect } from "react";
import content from "../content";

const ADMIN_PASSWORD = "dio2025admin"; // Change this to your preferred password

export default function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [editedContent, setEditedContent] = useState(content);
  const [message, setMessage] = useState("");
  const [activeTab, setActiveTab] = useState("event");
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (file, path) => {
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        updateNestedValue(path, data.url);
        setMessage(`Image uploaded successfully: ${data.url}`);
      } else {
        setMessage(`Upload failed: ${data.error}`);
      }
    } catch (error) {
      setMessage(`Upload error: ${error.message}`);
    } finally {
      setUploading(false);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setMessage("");
    } else {
      setMessage("Incorrect password");
    }
  };

  const handleSave = async () => {
    setMessage("Saving changes to GitHub...");

    try {
      const response = await fetch('/api/save-content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: editedContent }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage("✅ " + data.message);
      } else {
        setMessage("❌ Error: " + (data.error || 'Failed to save'));
        console.error('Save error:', data);
      }
    } catch (error) {
      setMessage("❌ Error saving to GitHub: " + error.message);
      console.error('Save error:', error);
    }
  };

  const updateNestedValue = (path, value) => {
    const newContent = JSON.parse(JSON.stringify(editedContent));
    const keys = path.split(".");
    let current = newContent;

    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }

    current[keys[keys.length - 1]] = value;
    setEditedContent(newContent);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Admin Panel
          </h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter admin password"
              />
            </div>
            {message && (
              <p className="text-red-500 text-sm">{message}</p>
            )}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors duration-200"
            >
              Login
            </button>
          </form>
          <p className="text-sm text-gray-500 mt-4 text-center">
            Default password: dio2025admin
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Content Manager</h1>
          <div className="flex gap-3">
            <button
              onClick={handleSave}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
            >
              💾 Save to GitHub
            </button>
            <a
              href="/"
              className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
            >
              View Site
            </a>
            <button
              onClick={() => setIsAuthenticated(false)}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {message && (
        <div className="max-w-7xl mx-auto px-4 mt-4">
          <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded">
            {message}
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 mt-6">
        <div className="flex space-x-2 border-b overflow-x-auto">
          {["event", "hero", "visibility", "fonts", "about", "architects-club", "gallery", "partners", "speakers", "agenda", "venue", "registration"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-medium whitespace-nowrap ${
                activeTab === tab
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              {tab === "architects-club" ? "Architects Club" : tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          {/* Event Tab */}
          {activeTab === "event" && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Event Details</h2>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Event Date & Time
                </label>
                <input
                  type="datetime-local"
                  value={editedContent.event.date.slice(0, 16)}
                  onChange={(e) => updateNestedValue("event.date", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date Display (English)
                  </label>
                  <input
                    type="text"
                    value={editedContent.event.dateDisplay.en}
                    onChange={(e) => updateNestedValue("event.dateDisplay.en", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date Display (Georgian)
                  </label>
                  <input
                    type="text"
                    value={editedContent.event.dateDisplay.ka}
                    onChange={(e) => updateNestedValue("event.dateDisplay.ka", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Venue (English)
                  </label>
                  <input
                    type="text"
                    value={editedContent.event.venue.en}
                    onChange={(e) => updateNestedValue("event.venue.en", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Venue (Georgian)
                  </label>
                  <input
                    type="text"
                    value={editedContent.event.venue.ka}
                    onChange={(e) => updateNestedValue("event.venue.ka", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Hero Tab */}
          {activeTab === "hero" && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Hero Section</h2>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Desktop Banner Image
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={editedContent.hero.bannerImageDesktop}
                      onChange={(e) => updateNestedValue("hero.bannerImageDesktop", e.target.value)}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="/banner-desktop.jpg"
                    />
                    <label className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg cursor-pointer flex items-center whitespace-nowrap">
                      {uploading ? "Uploading..." : "📤 Upload"}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e.target.files[0], "hero.bannerImageDesktop")}
                        className="hidden"
                        disabled={uploading}
                      />
                    </label>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    💻 Shows on tablets & desktops (768px+)
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mobile Banner Image
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={editedContent.hero.bannerImageMobile}
                      onChange={(e) => updateNestedValue("hero.bannerImageMobile", e.target.value)}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="/banner-mobile.jpg"
                    />
                    <label className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg cursor-pointer flex items-center whitespace-nowrap">
                      {uploading ? "Uploading..." : "📤 Upload"}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e.target.files[0], "hero.bannerImageMobile")}
                        className="hidden"
                        disabled={uploading}
                      />
                    </label>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    📱 Shows on mobile phones (below 768px)
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title (English)</label>
                  <input
                    type="text"
                    value={editedContent.hero.title.en}
                    onChange={(e) => updateNestedValue("hero.title.en", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title (Georgian)</label>
                  <input
                    type="text"
                    value={editedContent.hero.title.ka}
                    onChange={(e) => updateNestedValue("hero.title.ka", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle (English)</label>
                  <textarea
                    value={editedContent.hero.subtitle.en}
                    onChange={(e) => updateNestedValue("hero.subtitle.en", e.target.value)}
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle (Georgian)</label>
                  <textarea
                    value={editedContent.hero.subtitle.ka}
                    onChange={(e) => updateNestedValue("hero.subtitle.ka", e.target.value)}
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Logo (Georgian)</label>
                  <input
                    type="text"
                    value={editedContent.hero.logoKa}
                    onChange={(e) => updateNestedValue("hero.logoKa", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="/dio-logo-ka.svg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Logo (English)</label>
                  <input
                    type="text"
                    value={editedContent.hero.logoEn}
                    onChange={(e) => updateNestedValue("hero.logoEn", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="/dio-logo-en.svg"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Visibility Tab */}
          {activeTab === "visibility" && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Section Visibility</h2>
              <p className="text-sm text-gray-600 mb-6">
                Control which sections appear on your website. Unchecked sections will be completely hidden from visitors.
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { key: 'about', label: 'About Section' },
                  { key: 'architectsClub', label: 'Architects Club' },
                  { key: 'partners', label: 'Partners' },
                  { key: 'speakers', label: 'Speakers' },
                  { key: 'venue', label: 'Venue & Location' },
                  { key: 'agenda', label: 'Event Agenda' },
                  { key: 'registration', label: 'Registration' }
                ].map((section) => (
                  <div key={section.key} className="border border-gray-200 rounded-lg p-4 bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={editedContent.sectionVisibility?.[section.key] !== false}
                        onChange={(e) => {
                          const newVisibility = {
                            ...editedContent.sectionVisibility,
                            [section.key]: e.target.checked
                          };
                          setEditedContent({
                            ...editedContent,
                            sectionVisibility: newVisibility
                          });
                        }}
                        className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mr-3"
                      />
                      <div>
                        <div className="font-medium text-gray-800">{section.label}</div>
                        <div className="text-xs text-gray-500 mt-1">
                          {editedContent.sectionVisibility?.[section.key] !== false ? 'Visible' : 'Hidden'}
                        </div>
                      </div>
                    </label>
                  </div>
                ))}
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div className="text-sm text-blue-800">
                    <p className="font-semibold mb-1">Note:</p>
                    <p>Hidden sections will not appear in the navigation menu or on the webpage. You can show/hide sections at any time without deleting their content.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Fonts Tab */}
          {activeTab === "fonts" && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Custom Fonts Management</h2>
              <p className="text-sm text-gray-600">Upload .woff fonts and assign them to different sections for English and Georgian versions</p>

              {/* Upload Font Section */}
              <div className="border border-gray-300 rounded-lg p-6 bg-gray-50">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Upload Custom Font</h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Font Display Name</label>
                    <input
                      type="text"
                      id="fontDisplayName"
                      placeholder="e.g., My Custom Font"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Upload Font File (.woff format recommended)</label>
                    <label className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg cursor-pointer inline-flex items-center">
                      {uploading ? "Uploading..." : "Choose Font File"}
                      <input
                        type="file"
                        accept=".woff,.woff2,.ttf,.otf"
                        onChange={async (e) => {
                          const file = e.target.files[0];
                          const nameInput = document.getElementById('fontDisplayName');
                          const fontName = nameInput.value.trim();

                          if (!file) return;
                          if (!fontName) {
                            setMessage("Please enter a font display name first");
                            return;
                          }

                          setUploading(true);
                          const formData = new FormData();
                          formData.append('file', file);

                          try {
                            const response = await fetch('/api/upload', {
                              method: 'POST',
                              body: formData,
                            });

                            const data = await response.json();

                            if (data.success) {
                              const newFont = {
                                name: fontName,
                                url: data.url,
                                filename: data.filename,
                                format: file.name.split('.').pop().toLowerCase()
                              };

                              const fonts = editedContent.fonts || { uploadedFonts: [], sectionFonts: {} };
                              const newFonts = fonts.uploadedFonts ? [...fonts.uploadedFonts, newFont] : [newFont];

                              setEditedContent({
                                ...editedContent,
                                fonts: {
                                  ...fonts,
                                  uploadedFonts: newFonts
                                }
                              });

                              setMessage(`Font "${fontName}" uploaded successfully!`);
                              nameInput.value = '';
                            } else {
                              setMessage(`Upload failed: ${data.error}`);
                            }
                          } catch (error) {
                            setMessage(`Upload error: ${error.message}`);
                          } finally {
                            setUploading(false);
                          }
                        }}
                        className="hidden"
                        disabled={uploading}
                      />
                    </label>
                  </div>
                </div>
              </div>

              {/* Uploaded Fonts List */}
              <div className="border border-gray-300 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Uploaded Custom Fonts</h3>

                {editedContent.fonts?.uploadedFonts && editedContent.fonts.uploadedFonts.length > 0 ? (
                  <div className="space-y-3">
                    {editedContent.fonts.uploadedFonts.map((font, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <div className="flex items-center space-x-3">
                          <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded text-xs font-semibold">
                            .{font.format}
                          </div>
                          <div>
                            <div className="font-medium text-gray-800">{font.name}</div>
                            <div className="text-xs text-gray-500">{font.url}</div>
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            const newFonts = editedContent.fonts.uploadedFonts.filter((_, i) => i !== index);
                            setEditedContent({
                              ...editedContent,
                              fonts: {
                                ...editedContent.fonts,
                                uploadedFonts: newFonts
                              }
                            });
                            setMessage(`Font "${font.name}" removed`);
                          }}
                          className="text-red-600 hover:text-red-800 p-2 rounded"
                          title="Remove Font"
                        >
                          Delete
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">No custom fonts uploaded yet</p>
                )}
              </div>

              {/* Section Font Assignment */}
              <div className="border border-gray-300 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Assign Fonts to Sections</h3>

                <div className="space-y-4">
                  {["hero", "about", "architectsClub", "partners", "speakers", "venue", "agenda", "registration"].map((section) => (
                    <div key={section} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <h4 className="font-semibold text-gray-700 mb-3 capitalize">
                        {section === "architectsClub" ? "Architects Club" : section}
                      </h4>

                      <div className="grid md:grid-cols-2 gap-4">
                        {/* English Font */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">English Font</label>
                          <select
                            value={editedContent.fonts?.sectionFonts?.[section]?.en?.family || "Poppins"}
                            onChange={(e) => {
                              const selectedValue = e.target.value;
                              const isCustom = editedContent.fonts?.uploadedFonts?.some(f => f.name === selectedValue) || false;

                              const fonts = editedContent.fonts || { uploadedFonts: [], sectionFonts: {} };
                              setEditedContent({
                                ...editedContent,
                                fonts: {
                                  ...fonts,
                                  sectionFonts: {
                                    ...fonts.sectionFonts,
                                    [section]: {
                                      ...fonts.sectionFonts?.[section],
                                      en: { family: selectedValue, isCustom }
                                    }
                                  }
                                }
                              });
                            }}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                          >
                            <optgroup label="System Fonts">
                              <option value="Poppins">Poppins (Default)</option>
                              <option value="Arial">Arial</option>
                              <option value="Helvetica">Helvetica</option>
                              <option value="Georgia">Georgia</option>
                            </optgroup>
                            {editedContent.fonts?.uploadedFonts && editedContent.fonts.uploadedFonts.length > 0 && (
                              <optgroup label="Custom Fonts">
                                {editedContent.fonts.uploadedFonts.map((font, idx) => (
                                  <option key={idx} value={font.name}>{font.name}</option>
                                ))}
                              </optgroup>
                            )}
                          </select>
                        </div>

                        {/* Georgian Font */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Georgian Font</label>
                          <select
                            value={editedContent.fonts?.sectionFonts?.[section]?.ka?.family || "Noto Sans Georgian"}
                            onChange={(e) => {
                              const selectedValue = e.target.value;
                              const isCustom = editedContent.fonts?.uploadedFonts?.some(f => f.name === selectedValue) || false;

                              const fonts = editedContent.fonts || { uploadedFonts: [], sectionFonts: {} };
                              setEditedContent({
                                ...editedContent,
                                fonts: {
                                  ...fonts,
                                  sectionFonts: {
                                    ...fonts.sectionFonts,
                                    [section]: {
                                      ...fonts.sectionFonts?.[section],
                                      ka: { family: selectedValue, isCustom }
                                    }
                                  }
                                }
                              });
                            }}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                          >
                            <optgroup label="System Fonts">
                              <option value="Noto Sans Georgian">Noto Sans Georgian (Default)</option>
                              <option value="Arial">Arial</option>
                              <option value="Helvetica">Helvetica</option>
                              <option value="Georgia">Georgia</option>
                            </optgroup>
                            {editedContent.fonts?.uploadedFonts && editedContent.fonts.uploadedFonts.length > 0 && (
                              <optgroup label="Custom Fonts">
                                {editedContent.fonts.uploadedFonts.map((font, idx) => (
                                  <option key={idx} value={font.name}>{font.name}</option>
                                ))}
                              </optgroup>
                            )}
                          </select>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  <strong>Important:</strong> After uploading fonts and assigning them, click "Save to GitHub" to apply changes.
                </p>
              </div>
            </div>
          )}

          {/* About Tab */}
          {activeTab === "about" && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">About Section</h2>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Headline (English)</label>
                  <input
                    type="text"
                    value={editedContent.about.headline.en}
                    onChange={(e) => updateNestedValue("about.headline.en", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Headline (Georgian)</label>
                  <input
                    type="text"
                    value={editedContent.about.headline.ka}
                    onChange={(e) => updateNestedValue("about.headline.ka", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Cover Image URL</label>
                <input
                  type="text"
                  value={editedContent.about.posterImage}
                  onChange={(e) => updateNestedValue("about.posterImage", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="https://... or /image.jpg"
                />
              </div>

              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700">Paragraphs</label>
                {editedContent.about.paragraphs.map((para, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-semibold text-gray-700">Paragraph {index + 1}</h4>
                      <div className="flex items-center space-x-2">
                        <label className="flex items-center text-sm text-gray-600">
                          <input
                            type="checkbox"
                            checked={para.highlight}
                            onChange={(e) => {
                              const newParagraphs = [...editedContent.about.paragraphs];
                              newParagraphs[index].highlight = e.target.checked;
                              setEditedContent({
                                ...editedContent,
                                about: { ...editedContent.about, paragraphs: newParagraphs }
                              });
                            }}
                            className="mr-1"
                          />
                          Highlight
                        </label>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">English</label>
                        <textarea
                          value={para.en}
                          onChange={(e) => {
                            const newParagraphs = [...editedContent.about.paragraphs];
                            newParagraphs[index].en = e.target.value;
                            setEditedContent({
                              ...editedContent,
                              about: { ...editedContent.about, paragraphs: newParagraphs }
                            });
                          }}
                          rows="4"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Georgian</label>
                        <textarea
                          value={para.ka}
                          onChange={(e) => {
                            const newParagraphs = [...editedContent.about.paragraphs];
                            newParagraphs[index].ka = e.target.value;
                            setEditedContent({
                              ...editedContent,
                              about: { ...editedContent.about, paragraphs: newParagraphs }
                            });
                          }}
                          rows="4"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Footer Text (English)</label>
                  <input
                    type="text"
                    value={editedContent.about.footer.en}
                    onChange={(e) => updateNestedValue("about.footer.en", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Footer Text (Georgian)</label>
                  <input
                    type="text"
                    value={editedContent.about.footer.ka}
                    onChange={(e) => updateNestedValue("about.footer.ka", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Architects Club Tab */}
          {activeTab === "architects-club" && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">DIO's Architects Club</h2>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title (English)</label>
                  <input
                    type="text"
                    value={editedContent.architectsClub.title.en}
                    onChange={(e) => updateNestedValue("architectsClub.title.en", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title (Georgian)</label>
                  <input
                    type="text"
                    value={editedContent.architectsClub.title.ka}
                    onChange={(e) => updateNestedValue("architectsClub.title.ka", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Club Logo Path</label>
                <input
                  type="text"
                  value={editedContent.architectsClub.logo}
                  onChange={(e) => updateNestedValue("architectsClub.logo", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="/architect.jpg"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Section Title (English)</label>
                  <input
                    type="text"
                    value={editedContent.architectsClub.sectionTitle.en}
                    onChange={(e) => updateNestedValue("architectsClub.sectionTitle.en", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Section Title (Georgian)</label>
                  <input
                    type="text"
                    value={editedContent.architectsClub.sectionTitle.ka}
                    onChange={(e) => updateNestedValue("architectsClub.sectionTitle.ka", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700">Paragraphs</label>
                {editedContent.architectsClub.paragraphs.map((para, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <h4 className="font-semibold text-gray-700 mb-3">Paragraph {index + 1}</h4>
                    <div className="grid md:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">English</label>
                        <textarea
                          value={para.en}
                          onChange={(e) => {
                            const newParagraphs = [...editedContent.architectsClub.paragraphs];
                            newParagraphs[index].en = e.target.value;
                            setEditedContent({
                              ...editedContent,
                              architectsClub: { ...editedContent.architectsClub, paragraphs: newParagraphs }
                            });
                          }}
                          rows="4"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Georgian</label>
                        <textarea
                          value={para.ka}
                          onChange={(e) => {
                            const newParagraphs = [...editedContent.architectsClub.paragraphs];
                            newParagraphs[index].ka = e.target.value;
                            setEditedContent({
                              ...editedContent,
                              architectsClub: { ...editedContent.architectsClub, paragraphs: newParagraphs }
                            });
                          }}
                          rows="4"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Gallery Tab */}
          {activeTab === "gallery" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">Gallery Images</h2>
                <button
                  onClick={() => {
                    const newGallery = [...editedContent.gallery, "/new-image.jpg"];
                    setEditedContent({ ...editedContent, gallery: newGallery });
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <span>Add Image</span>
                </button>
              </div>

              <p className="text-sm text-gray-600 mb-4">
                Add images to the <code className="bg-gray-100 px-2 py-1 rounded">public</code> folder first, then reference them here (e.g., /image.jpg)
              </p>

              {editedContent.gallery.map((image, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                  <div className="flex items-center space-x-4">
                    <span className="text-gray-700 font-medium">Image {index + 1}</span>
                    <input
                      type="text"
                      value={image}
                      onChange={(e) => {
                        const newGallery = [...editedContent.gallery];
                        newGallery[index] = e.target.value;
                        setEditedContent({ ...editedContent, gallery: newGallery });
                      }}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="/image.jpg"
                    />
                    <label className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg cursor-pointer flex items-center whitespace-nowrap">
                      {uploading ? "Uploading..." : "📤 Upload"}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={async (e) => {
                          const file = e.target.files[0];
                          if (file) {
                            await handleImageUpload(file, `gallery.${index}`);
                          }
                        }}
                        className="hidden"
                        disabled={uploading}
                      />
                    </label>
                    <button
                      onClick={() => {
                        const newGallery = editedContent.gallery.filter((_, i) => i !== index);
                        setEditedContent({ ...editedContent, gallery: newGallery });
                      }}
                      className="text-red-600 hover:text-red-800 hover:bg-red-50 p-2 rounded-lg transition-colors duration-200"
                      title="Delete Image"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}

              {editedContent.gallery.length === 0 && (
                <div className="text-center py-12 text-gray-500 border border-dashed border-gray-300 rounded-lg">
                  <p>No images yet. Click "Add Image" to add your first gallery image.</p>
                </div>
              )}
            </div>
          )}

          {/* Partners Tab */}
          {activeTab === "partners" && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Partners</h2>
              {editedContent.partners.map((partner, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-700 mb-3">Partner {index + 1}</h3>
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Partner Name"
                      value={partner.name}
                      onChange={(e) => {
                        const newPartners = [...editedContent.partners];
                        newPartners[index].name = e.target.value;
                        setEditedContent({ ...editedContent, partners: newPartners });
                      }}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    />
                    <input
                      type="text"
                      placeholder="Website URL"
                      value={partner.link}
                      onChange={(e) => {
                        const newPartners = [...editedContent.partners];
                        newPartners[index].link = e.target.value;
                        setEditedContent({ ...editedContent, partners: newPartners });
                      }}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    />
                    <input
                      type="text"
                      placeholder="Logo Path (e.g., /logo.png)"
                      value={partner.logo}
                      onChange={(e) => {
                        const newPartners = [...editedContent.partners];
                        newPartners[index].logo = e.target.value;
                        setEditedContent({ ...editedContent, partners: newPartners });
                      }}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Speakers Tab */}
          {activeTab === "speakers" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">Event Speakers</h2>
                <button
                  onClick={() => {
                    const newSpeaker = {
                      name: { en: "New Speaker", ka: "ახალი სპიკერი" },
                      image: "/speaker-new.jpg",
                      topic: { en: "Topic", ka: "თემა" },
                      bio: { en: "Biography...", ka: "ბიოგრაფია..." }
                    };
                    setEditedContent({
                      ...editedContent,
                      speakers: [...editedContent.speakers, newSpeaker]
                    });
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <span>Add Speaker</span>
                </button>
              </div>

              <p className="text-sm text-gray-600 mb-4">
                Add speaker images to the <code className="bg-gray-100 px-2 py-1 rounded">public</code> folder first, then reference them here (e.g., /speaker-1.jpg)
              </p>

              {editedContent.speakers && editedContent.speakers.map((speaker, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-6 bg-gray-50">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-semibold text-gray-700 text-lg">Speaker {index + 1}</h3>
                    <button
                      onClick={() => {
                        const newSpeakers = editedContent.speakers.filter((_, i) => i !== index);
                        setEditedContent({ ...editedContent, speakers: newSpeakers });
                      }}
                      className="text-red-600 hover:text-red-800 hover:bg-red-50 p-2 rounded-lg transition-colors duration-200"
                      title="Delete Speaker"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>

                  <div className="space-y-4">
                    {/* Image Path with Upload */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Speaker Image</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="/speaker-1.jpg"
                          value={speaker.image}
                          onChange={(e) => {
                            const newSpeakers = [...editedContent.speakers];
                            newSpeakers[index].image = e.target.value;
                            setEditedContent({ ...editedContent, speakers: newSpeakers });
                          }}
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                        <label className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg cursor-pointer flex items-center whitespace-nowrap">
                          {uploading ? "Uploading..." : "📤 Upload"}
                          <input
                            type="file"
                            accept="image/*"
                            onChange={async (e) => {
                              const file = e.target.files[0];
                              if (file) {
                                await handleImageUpload(file, `speakers.${index}.image`);
                              }
                            }}
                            className="hidden"
                            disabled={uploading}
                          />
                        </label>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Image will be displayed in a circular frame</p>
                    </div>

                    {/* Speaker Name */}
                    <div className="grid md:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Name (English)</label>
                        <input
                          type="text"
                          placeholder="John Smith"
                          value={speaker.name.en}
                          onChange={(e) => {
                            const newSpeakers = [...editedContent.speakers];
                            newSpeakers[index].name.en = e.target.value;
                            setEditedContent({ ...editedContent, speakers: newSpeakers });
                          }}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Name (Georgian)</label>
                        <input
                          type="text"
                          placeholder="ჯონ სმიტი"
                          value={speaker.name.ka}
                          onChange={(e) => {
                            const newSpeakers = [...editedContent.speakers];
                            newSpeakers[index].name.ka = e.target.value;
                            setEditedContent({ ...editedContent, speakers: newSpeakers });
                          }}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    {/* Speaker Topic/Theme */}
                    <div className="grid md:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Topic/Theme (English)</label>
                        <input
                          type="text"
                          placeholder="Sustainable Architecture"
                          value={speaker.topic.en}
                          onChange={(e) => {
                            const newSpeakers = [...editedContent.speakers];
                            newSpeakers[index].topic.en = e.target.value;
                            setEditedContent({ ...editedContent, speakers: newSpeakers });
                          }}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Topic/Theme (Georgian)</label>
                        <input
                          type="text"
                          placeholder="მდგრადი არქიტექტურა"
                          value={speaker.topic.ka}
                          onChange={(e) => {
                            const newSpeakers = [...editedContent.speakers];
                            newSpeakers[index].topic.ka = e.target.value;
                            setEditedContent({ ...editedContent, speakers: newSpeakers });
                          }}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    {/* Speaker Bio */}
                    <div className="grid md:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Biography (English)</label>
                        <textarea
                          placeholder="Speaker biography and background..."
                          value={speaker.bio.en}
                          onChange={(e) => {
                            const newSpeakers = [...editedContent.speakers];
                            newSpeakers[index].bio.en = e.target.value;
                            setEditedContent({ ...editedContent, speakers: newSpeakers });
                          }}
                          rows="5"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Biography (Georgian)</label>
                        <textarea
                          placeholder="სპიკერის ბიოგრაფია და ბექგრაუნდი..."
                          value={speaker.bio.ka}
                          onChange={(e) => {
                            const newSpeakers = [...editedContent.speakers];
                            newSpeakers[index].bio.ka = e.target.value;
                            setEditedContent({ ...editedContent, speakers: newSpeakers });
                          }}
                          rows="5"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {(!editedContent.speakers || editedContent.speakers.length === 0) && (
                <div className="text-center py-12 text-gray-500 border border-dashed border-gray-300 rounded-lg">
                  <p>No speakers yet. Click "Add Speaker" to add your first speaker.</p>
                </div>
              )}
            </div>
          )}

          {/* Agenda Tab */}
          {activeTab === "agenda" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">Event Agenda</h2>
                <button
                  onClick={() => {
                    const newSession = {
                      time: "00:00 - 00:00",
                      title: { en: "New Session", ka: "ახალი სესია" },
                      speaker: { en: "", ka: "" },
                      description: { en: "Description", ka: "აღწერა" }
                    };
                    setEditedContent({
                      ...editedContent,
                      agenda: [...editedContent.agenda, newSession]
                    });
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <span>Add Session</span>
                </button>
              </div>

              {editedContent.agenda.map((item, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 bg-gray-50 relative">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-semibold text-gray-700">Session {index + 1}</h3>
                    <button
                      onClick={() => {
                        const newAgenda = editedContent.agenda.filter((_, i) => i !== index);
                        setEditedContent({ ...editedContent, agenda: newAgenda });
                      }}
                      className="text-red-600 hover:text-red-800 hover:bg-red-50 p-2 rounded-lg transition-colors duration-200"
                      title="Delete Session"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Time</label>
                      <input
                        type="text"
                        placeholder="e.g., 11:00 - 11:30"
                        value={item.time}
                        onChange={(e) => {
                          const newAgenda = [...editedContent.agenda];
                          newAgenda[index].time = e.target.value;
                          setEditedContent({ ...editedContent, agenda: newAgenda });
                        }}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Title (English)</label>
                        <input
                          type="text"
                          placeholder="Session title"
                          value={item.title.en}
                          onChange={(e) => {
                            const newAgenda = [...editedContent.agenda];
                            newAgenda[index].title.en = e.target.value;
                            setEditedContent({ ...editedContent, agenda: newAgenda });
                          }}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Title (Georgian)</label>
                        <input
                          type="text"
                          placeholder="სესიის სათაური"
                          value={item.title.ka}
                          onChange={(e) => {
                            const newAgenda = [...editedContent.agenda];
                            newAgenda[index].title.ka = e.target.value;
                            setEditedContent({ ...editedContent, agenda: newAgenda });
                          }}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Speaker (English) - Optional</label>
                        <input
                          type="text"
                          placeholder="Speaker name"
                          value={item.speaker?.en || ""}
                          onChange={(e) => {
                            const newAgenda = [...editedContent.agenda];
                            if (!newAgenda[index].speaker) {
                              newAgenda[index].speaker = { en: "", ka: "" };
                            }
                            newAgenda[index].speaker.en = e.target.value;
                            setEditedContent({ ...editedContent, agenda: newAgenda });
                          }}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Speaker (Georgian) - Optional</label>
                        <input
                          type="text"
                          placeholder="სპიკერის სახელი"
                          value={item.speaker?.ka || ""}
                          onChange={(e) => {
                            const newAgenda = [...editedContent.agenda];
                            if (!newAgenda[index].speaker) {
                              newAgenda[index].speaker = { en: "", ka: "" };
                            }
                            newAgenda[index].speaker.ka = e.target.value;
                            setEditedContent({ ...editedContent, agenda: newAgenda });
                          }}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Description (English)</label>
                        <textarea
                          placeholder="Session description"
                          value={item.description.en}
                          onChange={(e) => {
                            const newAgenda = [...editedContent.agenda];
                            newAgenda[index].description.en = e.target.value;
                            setEditedContent({ ...editedContent, agenda: newAgenda });
                          }}
                          rows="3"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Description (Georgian)</label>
                        <textarea
                          placeholder="სესიის აღწერა"
                          value={item.description.ka}
                          onChange={(e) => {
                            const newAgenda = [...editedContent.agenda];
                            newAgenda[index].description.ka = e.target.value;
                            setEditedContent({ ...editedContent, agenda: newAgenda });
                          }}
                          rows="3"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    {/* Move Up/Down Buttons */}
                    <div className="flex items-center space-x-2 pt-2 border-t border-gray-200">
                      <button
                        onClick={() => {
                          if (index > 0) {
                            const newAgenda = [...editedContent.agenda];
                            [newAgenda[index - 1], newAgenda[index]] = [newAgenda[index], newAgenda[index - 1]];
                            setEditedContent({ ...editedContent, agenda: newAgenda });
                          }
                        }}
                        disabled={index === 0}
                        className={`px-3 py-1 rounded text-sm ${
                          index === 0
                            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            : 'bg-gray-300 hover:bg-gray-400 text-gray-700'
                        }`}
                      >
                        ↑ Move Up
                      </button>
                      <button
                        onClick={() => {
                          if (index < editedContent.agenda.length - 1) {
                            const newAgenda = [...editedContent.agenda];
                            [newAgenda[index], newAgenda[index + 1]] = [newAgenda[index + 1], newAgenda[index]];
                            setEditedContent({ ...editedContent, agenda: newAgenda });
                          }
                        }}
                        disabled={index === editedContent.agenda.length - 1}
                        className={`px-3 py-1 rounded text-sm ${
                          index === editedContent.agenda.length - 1
                            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            : 'bg-gray-300 hover:bg-gray-400 text-gray-700'
                        }`}
                      >
                        ↓ Move Down
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {editedContent.agenda.length === 0 && (
                <div className="text-center py-12 text-gray-500 border border-dashed border-gray-300 rounded-lg">
                  <p>No sessions yet. Click "Add Session" to create your first session.</p>
                </div>
              )}
            </div>
          )}

          {/* Venue Tab */}
          {activeTab === "venue" && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Venue & Location</h2>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Venue Name (English)</label>
                  <input
                    type="text"
                    value={editedContent.venue?.name?.en || ""}
                    onChange={(e) => updateNestedValue("venue.name.en", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Marriott Hotel"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Venue Name (Georgian)</label>
                  <input
                    type="text"
                    value={editedContent.venue?.name?.ka || ""}
                    onChange={(e) => updateNestedValue("venue.name.ka", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="მარიოტ ჰოტელი"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Address (English)</label>
                  <input
                    type="text"
                    value={editedContent.venue?.address?.en || ""}
                    onChange={(e) => updateNestedValue("venue.address.en", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="13 Shota Rustaveli Ave, Tbilisi"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Address (Georgian)</label>
                  <input
                    type="text"
                    value={editedContent.venue?.address?.ka || ""}
                    onChange={(e) => updateNestedValue("venue.address.ka", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="შოთა რუსთაველის 13, თბილისი"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">Google Maps Embed URL</label>
                <p className="text-xs text-gray-500">
                  📍 Go to Google Maps → Search for location → Click "Share" → Select "Embed a map" → Copy the iframe src URL
                </p>
                <textarea
                  value={editedContent.venue?.mapUrl || editedContent.event?.mapEmbedUrl || ""}
                  onChange={(e) => {
                    if (editedContent.venue?.mapUrl !== undefined) {
                      updateNestedValue("venue.mapUrl", e.target.value);
                    } else {
                      updateNestedValue("event.mapEmbedUrl", e.target.value);
                    }
                  }}
                  rows="3"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                  placeholder="https://www.google.com/maps/embed?pb=..."
                />
              </div>

              {/* Google Maps Preview */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">Map Preview</label>
                <div className="border border-gray-300 rounded-lg overflow-hidden bg-gray-100">
                  {(editedContent.venue?.mapUrl || editedContent.event?.mapEmbedUrl) ? (
                    <iframe
                      src={editedContent.venue?.mapUrl || editedContent.event?.mapEmbedUrl}
                      width="100%"
                      height="450"
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="w-full"
                    ></iframe>
                  ) : (
                    <div className="flex items-center justify-center h-64 text-gray-500">
                      <div className="text-center">
                        <svg className="w-16 h-16 mx-auto mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <p>No map URL provided yet</p>
                        <p className="text-sm mt-1">Add a Google Maps embed URL above to see the preview</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Google Maps Link (for "View on Google Maps" button)</label>
                <input
                  type="url"
                  value={editedContent.venue?.googleMapsLink || ""}
                  onChange={(e) => updateNestedValue("venue.googleMapsLink", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="https://goo.gl/maps/your-link"
                />
              </div>

              {/* Venue Gallery Images */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="block text-sm font-medium text-gray-700">Venue Gallery Images</label>
                  <button
                    onClick={() => {
                      const newGallery = editedContent.venue?.gallery ? [...editedContent.venue.gallery, "/venue-image.jpg"] : ["/venue-image.jpg"];
                      setEditedContent({
                        ...editedContent,
                        venue: { ...editedContent.venue, gallery: newGallery }
                      });
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2 text-sm"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    <span>Add Image</span>
                  </button>
                </div>

                {editedContent.venue?.gallery && editedContent.venue.gallery.length > 0 ? (
                  <div className="space-y-3">
                    {editedContent.venue.gallery.map((image, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-3 bg-gray-50">
                        <div className="flex items-center space-x-3">
                          <span className="text-gray-700 font-medium text-sm">Image {index + 1}</span>
                          <input
                            type="text"
                            value={image}
                            onChange={(e) => {
                              const newGallery = [...editedContent.venue.gallery];
                              newGallery[index] = e.target.value;
                              setEditedContent({
                                ...editedContent,
                                venue: { ...editedContent.venue, gallery: newGallery }
                              });
                            }}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                            placeholder="/venue-image.jpg or https://..."
                          />
                          <label className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg cursor-pointer flex items-center whitespace-nowrap text-sm">
                            {uploading ? "Uploading..." : "📤 Upload"}
                            <input
                              type="file"
                              accept="image/*"
                              onChange={async (e) => {
                                const file = e.target.files[0];
                                if (file) {
                                  await handleImageUpload(file, `venue.gallery.${index}`);
                                }
                              }}
                              className="hidden"
                              disabled={uploading}
                            />
                          </label>
                          <button
                            onClick={() => {
                              const newGallery = editedContent.venue.gallery.filter((_, i) => i !== index);
                              setEditedContent({
                                ...editedContent,
                                venue: { ...editedContent.venue, gallery: newGallery }
                              });
                            }}
                            className="text-red-600 hover:text-red-800 hover:bg-red-50 p-2 rounded-lg transition-colors duration-200"
                            title="Delete Image"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500 border border-dashed border-gray-300 rounded-lg">
                    <p className="text-sm">No venue gallery images yet. Click "Add Image" to add venue photos.</p>
                  </div>
                )}
              </div>

              {/* Venue Description */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description (English)</label>
                  <textarea
                    value={editedContent.venue?.description?.en || ""}
                    onChange={(e) => updateNestedValue("venue.description.en", e.target.value)}
                    rows="4"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Description about the venue..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description (Georgian)</label>
                  <textarea
                    value={editedContent.venue?.description?.ka || ""}
                    onChange={(e) => updateNestedValue("venue.description.ka", e.target.value)}
                    rows="4"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="ვენიუს შესახებ აღწერა..."
                  />
                </div>
              </div>
            </div>
          )}

          {/* Registration Tab */}
          {activeTab === "registration" && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Registration Settings</h2>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Registration Form URL
                </label>
                <input
                  type="url"
                  value={editedContent.registration.formUrl}
                  onChange={(e) => updateNestedValue("registration.formUrl", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="https://docs.google.com/forms/..."
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={editedContent.registration.isFree}
                  onChange={(e) => updateNestedValue("registration.isFree", e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label className="ml-2 text-sm text-gray-700">
                  Event is free to attend
                </label>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
