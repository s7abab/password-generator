const copyToClipboard = (textToCopy, handleMarkCopied) => {
  // Create a textarea element
  const textarea = document.createElement("textarea");
  textarea.value = textToCopy;
  document.body.appendChild(textarea);
  // Select the text in the textarea
  textarea.select();
  document.execCommand("copy");

  // Remove the textarea from the DOM
  document.body.removeChild(textarea);

  // Set the copied state
  setIsCopied(true);
};
