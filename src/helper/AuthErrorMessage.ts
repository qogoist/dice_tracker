export const mapAuthErrorMessage = (code: string): string => {
  console.log(code);

  let message = "An error occured during authentication. 😦\n Please try again.";

  switch (code) {
    case "auth/user-not-found":
      message = "No user found with this email.";
      break;

    case "auth/wrong-password":
      message = "Wrong email or password, please try again.";
      break;

    case "auth/too-many-requests":
      message = "To many requests. Please try again later.";
      break;

    case "auth/user-mismatch":
      message = "The given credentials do not match the logged in user. Please try again.";
      break;

    default:
      break;
  }

  return message;
};
