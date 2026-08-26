const fs = require('fs');
const path = require('path');

const messagesDir = path.join(__dirname, '../messages');
const locales = ['ar.json', 'de.json', 'en.json', 'es.json', 'fr.json', 'pt.json', 'zh.json'];

const newKeys = {
    auth: {
        login: "Login",
        signup: "Sign Up",
        continueWithGoogle: "Continue with Google",
        email: "Email",
        password: "Password",
        username: "Username",
        alreadyHaveAccount: "Already have an account?",
        dontHaveAccount: "Don't have an account?",
        loginDescription: "Log in to your account.",
        signupDescription: "Create a new account."
    },
    validation: {
        emailRequired: "Email is required",
        emailInvalid: "Invalid email address",
        passwordRequired: "Password is required",
        passwordLength: "Password must be at least 6 characters",
        usernameRequired: "Username is required",
        usernameLength: "Username must be at least 3 characters",
        serverError: "Something went wrong, please try again."
    },
    metadata: {
      title: "Movie Atlas | Explore Movies & TV Shows",
      description: "Discover movies, TV shows, ratings, and trending titles. Explore detailed information, reviews, and personalized recommendations all in one place.",
      ogTitle: "Movie Atlas | Explore Movies & TV Shows",
      ogDescription: "Discover movies, TV shows, ratings, and trending titles in one place."
    },
    global: {
      close: "Close"
    }
};

for (const file of locales) {
    const filePath = path.join(messagesDir, file);
    if (!fs.existsSync(filePath)) continue;
    
    const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    
    // Add auth namespace
    if (!content.auth) content.auth = {};
    for (const [k, v] of Object.entries(newKeys.auth)) {
        if (!content.auth[k]) content.auth[k] = v;
    }
    
    // Add validation namespace
    if (!content.validation) content.validation = {};
    for (const [k, v] of Object.entries(newKeys.validation)) {
        if (!content.validation[k]) content.validation[k] = v;
    }

    // Add metadata namespace
    if (!content.metadata) content.metadata = {};
    for (const [k, v] of Object.entries(newKeys.metadata)) {
        if (!content.metadata[k]) content.metadata[k] = v;
    }

    // Update global
    if (!content.global) content.global = {};
    for (const [k, v] of Object.entries(newKeys.global)) {
        if (!content.global[k]) content.global[k] = v;
    }

    // Fix typos in button
    if (content.button) {
      if (file === 'en.json' && content.button.seeMore === "Sea More") content.button.seeMore = "See more";
      if (file === 'en.json' && content.button.editeProfile === "Edite Profile") content.button.editeProfile = "Edit Profile";
      if (file === 'en.json' && content.button.edite === "Edite") content.button.edite = "Edit";
    }

    if (content.user) {
      if (file === 'en.json' && content.user.editeProfile === "Edite Profile") content.user.editeProfile = "Edit Profile";
    }

    fs.writeFileSync(filePath, JSON.stringify(content, null, 2), 'utf8');
    console.log(`Updated ${file}`);
}
