function submitData() {
  console.log('Submitting data...');
  const clipboardText = document.getElementById("clipboardText").value;

  // Check if the textarea is empty
  if (!clipboardText.trim()) {
    alert("Please enter text before submitting.");
    return;
  }

  // Send data to the server
  fetch('https://online-clipboard-6vjy.onrender.com/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text: clipboardText }),
  })
  .then(response => response.json())
  .then(data => {
    console.log('Submission response:', data);
    if (data.key) {
      document.getElementById("submissionResponse").innerHTML = `Data submitted successfully. Your key is: <strong>${data.key}</strong>`;
    } else {
      document.getElementById("submissionResponse").innerHTML = 'Failed to submit data.';
    }
  })
  .catch(error => {
    console.error('Error:', error);
    document.getElementById("submissionResponse").innerHTML = 'An error occurred.';
  });
}

function pasteFromClipboard() {
  if (navigator.clipboard) {
    navigator.clipboard.readText()
      .then(clipboardData => {
        document.getElementById("clipboardText").value = clipboardData;
      })
      .catch(error => {
        console.error('Error pasting from clipboard:', error);
      });
  } else {
    console.error('Clipboard API not supported in this browser.');
  }
}


// ... (previous code remains unchanged)

function retrieveData() {
  console.log('Retrieving data...');
  const key = document.getElementById("retrieveKey").value;

  // Check if the key is empty
  if (!key.trim()) {
    alert("Please enter a key before retrieving data.");
    return;
  }

  // Retrieve data from the server using the key
  fetch(`https://online-clipboard-6vjy.onrender.com/retrieve/${key}`)
    .then(response => response.json())
    .then(data => {
      console.log('Retrieval response:', data);
      if (data.text) {
        document.getElementById("clipboardText").value = data.text; // Display retrieved data in the textarea
        document.getElementById("copiedText").value = data.text; // Copy data to the hidden textarea
      } else {
        document.getElementById("retrievalResponse").innerHTML = 'Failed to retrieve data. Key not found or expired.';
      }
    })
    .catch(error => {
      console.error('Error:', error);
      document.getElementById("retrievalResponse").innerHTML = 'An error occurred.';
    });
}

// ... (remaining code remains unchanged)


function copyToClipboard() {
  const copiedText = document.getElementById("copiedText").value;
  
  if (copiedText.trim()) {
    navigator.clipboard.writeText(copiedText)
      .then(() => {
        document.getElementById("copyDisplayBox").innerText = `Copied: ${copiedText}`;
      })
      .catch(error => {
        console.error('Error copying to clipboard:', error);
      });
  } else {
    document.getElementById("copyDisplayBox").innerText = 'No data to copy.';
  }
}





//for dark mode start 
function toggleDarkMode() {
  const body = document.body;
  body.classList.toggle('dark-mode');
}
//for dark mode close
