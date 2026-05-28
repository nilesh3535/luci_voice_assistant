// Replace the handleSubmit function in app/page.tsx with this code
// Update the GOOGLE_APPS_SCRIPT_URL with your actual deployment URL

const GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/d/YOUR_DEPLOYMENT_ID/userweb';

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!formState.email) {
    setFormState((prev) => ({
      ...prev,
      status: 'error',
      message: 'Please enter your email',
    }));
    return;
  }

  setFormState((prev) => ({
    ...prev,
    status: 'loading',
  }));

  try {
    // Send email to Google Sheet via Apps Script
    const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: formState.email,
      }),
    });

    const result = await response.json();

    if (result.success) {
      // Success
      setFormState((prev) => ({
        ...prev,
        status: 'success',
        message: 'Thanks for joining! 🎉 Check your email for updates.',
        email: '',
      }));

      // Reset form after 5 seconds
      setTimeout(() => {
        setFormState((prev) => ({
          ...prev,
          status: 'idle',
          message: '',
        }));
      }, 5000);
    } else if (result.isDuplicate) {
      // Duplicate email - show friendly message
      setFormState((prev) => ({
        ...prev,
        status: 'error',
        message: result.message, // "This email is already on our waitlist!"
      }));
    } else {
      // Other error
      setFormState((prev) => ({
        ...prev,
        status: 'error',
        message: result.message || 'Failed to join waitlist. Please try again.',
      }));
    }
  } catch (error) {
    // Network or parsing error
    setFormState((prev) => ({
      ...prev,
      status: 'error',
      message: 'Connection error. Your email may still be saved. Please refresh and try again.',
    }));
    console.error('Waitlist submission error:', error);
  }
};
