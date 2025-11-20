import { defineStore } from 'pinia'
import type { CodeType, TabType, EditorState, Base64State } from '~/types/editor'

export const useEditorStore = defineStore('editor', {
  state: () => ({
    currentTab: 'html' as TabType,
    darkMode: false,

    // Code editors state
    html: {
      input: '',
      output: '',
      stats: {
        originalSize: 0,
        processedSize: 0,
        savedPercentage: '0%'
      }
    } as EditorState,

    css: {
      input: '',
      output: '',
      stats: {
        originalSize: 0,
        processedSize: 0,
        savedPercentage: '0%'
      }
    } as EditorState,

    js: {
      input: '',
      output: '',
      stats: {
        originalSize: 0,
        processedSize: 0,
        savedPercentage: '0%'
      }
    } as EditorState,

    json: {
      input: '',
      output: '',
      stats: {
        originalSize: 0,
        processedSize: 0,
        savedPercentage: '0%'
      }
    } as EditorState,

    // Base64 state
    base64: {
      textInput: '',
      textOutput: '',
      imageInput: '',
      imagePreview: '',
      imageType: '-',
      base64Size: 0
    } as Base64State
  }),

  actions: {
    setCurrentTab(tab: TabType) {
      this.currentTab = tab
      if (process.client) {
        localStorage.setItem('currentTab', tab)
      }
    },

    toggleDarkMode() {
      this.darkMode = !this.darkMode
      if (process.client) {
        localStorage.setItem('darkMode', String(this.darkMode))
        document.body.classList.toggle('dark-mode', this.darkMode)
      }
    },

    setDarkMode(enabled: boolean) {
      this.darkMode = enabled
      if (process.client) {
        localStorage.setItem('darkMode', String(enabled))
        document.body.classList.toggle('dark-mode', enabled)
      }
    },

    updateEditorInput(type: CodeType, input: string) {
      this[type].input = input
    },

    updateEditorOutput(type: CodeType, output: string) {
      this[type].output = output
    },

    updateEditorStats(type: CodeType, originalSize: number, processedSize: number) {
      const saved = originalSize > 0
        ? ((originalSize - processedSize) / originalSize * 100).toFixed(2)
        : '0'

      this[type].stats = {
        originalSize,
        processedSize,
        savedPercentage: saved + '%'
      }
    },

    clearEditor(type: CodeType) {
      this[type].input = ''
      this[type].output = ''
      this[type].stats = {
        originalSize: 0,
        processedSize: 0,
        savedPercentage: '0%'
      }
    },

    updateBase64Text(input: string, output: string) {
      this.base64.textInput = input
      this.base64.textOutput = output
    },

    updateBase64Image(input: string, preview: string, type: string, size: number) {
      this.base64.imageInput = input
      this.base64.imagePreview = preview
      this.base64.imageType = type
      this.base64.base64Size = size
    },

    clearBase64Text() {
      this.base64.textInput = ''
      this.base64.textOutput = ''
    },

    clearBase64Image() {
      this.base64.imageInput = ''
      this.base64.imagePreview = ''
      this.base64.imageType = '-'
      this.base64.base64Size = 0
    },

    loadSampleCode() {
      // Sample HTML
      this.html.input = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sample Page</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
        }

        h1 {
            color: #333;
        }
    </style>
</head>
<body>
    <!-- This is a comment -->
    <h1>Hello World</h1>

    <p>This is a sample HTML document with multiple lines.</p>

    <div class="container">
        <ul>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
        </ul>
    </div>

    <script>
        console.log('Hello from JavaScript');
    <\/script>
</body>
</html>`

      // Sample CSS
      this.css.input = `/* Main Styles */
body {
    margin: 0;
    padding: 0;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-color: #f5f5f5;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
}

/* Header Styles */
h1, h2, h3 {
    color: #333;
    font-weight: 600;
}

h1 {
    font-size: 2.5em;
    margin-bottom: 20px;
}

/* Button Styles */
.button {
    display: inline-block;
    padding: 12px 24px;
    background-color: #007bff;
    color: white;
    border-radius: 4px;
    text-decoration: none;
}

.button:hover {
    background-color: #0056b3;
}`

      // Sample JavaScript
      this.js.input = `// Sample JavaScript Code
function calculateSum(a, b) {
    // Add two numbers
    return a + b;
}

// Array manipulation
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(num => num * 2);

// Object example
const user = {
    name: 'John Doe',
    age: 30,
    email: 'john@example.com'
};

// Event listener
document.addEventListener('DOMContentLoaded', function() {
    console.log('Page loaded successfully!');

    // Get element
    const button = document.querySelector('.button');

    // Add click handler
    if (button) {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Button clicked!');
        });
    }
});

// Async function example
async function fetchData(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}`

      // Sample JSON
      this.json.input = `{
    "name": "John Doe",
    "age": 30,
    "email": "john.doe@example.com",
    "address": {
        "street": "123 Main Street",
        "city": "New York",
        "state": "NY",
        "zipCode": "10001",
        "country": "USA"
    },
    "phoneNumbers": [
        {
            "type": "home",
            "number": "555-1234"
        },
        {
            "type": "mobile",
            "number": "555-5678"
        }
    ],
    "hobbies": [
        "reading",
        "traveling",
        "photography",
        "coding"
    ],
    "employment": {
        "company": "Tech Corp",
        "position": "Software Engineer",
        "yearsOfExperience": 5,
        "skills": [
            "JavaScript",
            "Python",
            "React",
            "Node.js"
        ]
    },
    "isActive": true,
    "lastLogin": "2024-01-15T10:30:00Z"
}`
    },

    loadPreferences() {
      if (process.client) {
        // Load dark mode preference
        const darkMode = localStorage.getItem('darkMode') === 'true'
        this.setDarkMode(darkMode)

        // Load last tab
        const lastTab = (localStorage.getItem('currentTab') as TabType) || 'html'
        this.currentTab = lastTab
      }
    }
  }
})
