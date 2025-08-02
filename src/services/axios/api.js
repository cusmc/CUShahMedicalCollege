import Api from './api'; // adjust path if needed

const handleLogin = async () => {
  try {
    const result = await Api.createToken(username, password);
    console.log('Logged in successfully:', result);

    // Save token or navigate
    // await AsyncStorage.setItem('token', result.access_token);

  } catch (error) {
    alert(`Login failed: ${error.message}`);
  }
};
