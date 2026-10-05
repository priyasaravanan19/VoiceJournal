# 🎙️ VoiceJournal

VoiceJournal is a simple voice-powered journaling web application that converts spoken thoughts into text and allows users to save, search, and manage their journal entries.

## ✨ Features

- 🎤 Voice-to-text journal recording
- 📝 Edit and write journal entries
- 💾 Save journal entries
- 📖 View previous entries
- 🔍 Search journal entries
- 🗑️ Delete entries
- 📅 Automatic date and time
- 🔢 Word count
- 📱 Responsive design for desktop and mobile
- 💡 Data persistence using browser LocalStorage

## 🛠️ Technologies Used

### Frontend
- HTML5
- CSS3
- JavaScript

### Backend
- Python
- Flask

### Browser API
- Web Speech API

### Storage
- Browser LocalStorage

## 📂 Project Structure

```text
VoiceJournal/
│
├── app.py
│
├── templates/
│   └── index.html
│
├── static/
│   ├── style.css
│   └── script.js
│
├── README.md
└── .gitignore
```

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/YOUR-USERNAME/VoiceJournal.git
```

### 2. Open the project

```bash
cd VoiceJournal
```

### 3. Create a virtual environment

```bash
python -m venv venv
```

### 4. Activate the virtual environment

#### Windows

```powershell
.\venv\Scripts\activate
```

### 5. Install Flask

```bash
pip install flask
```

## ▶️ Run the Application

Start the Flask server:

```bash
python app.py
```

Open your browser and visit:

```text
http://127.0.0.1:5000
```

For the best voice recognition experience, use Google Chrome or Microsoft Edge.

## 🎤 How It Works

1. Open VoiceJournal.
2. Click **Start Recording**.
3. Speak your thoughts.
4. The Web Speech API converts speech into text.
5. Edit the generated text if needed.
6. Add a journal title.
7. Click **Save Entry**.
8. Your entry appears in the journal history.
9. Search or delete previous entries whenever needed.

## 🔮 Future Enhancements

- User authentication
- Cloud database
- AI-powered journal summaries
- Mood detection from journal entries
- Emotion analysis
- Multiple language support
- Audio recording and playback
- Export journal entries as PDF
- Cloud synchronization
- AI-generated journal insights

## 👩‍💻 Author

**Priya Saravanan**

## 📄 License

This project is created for learning and educational purposes.