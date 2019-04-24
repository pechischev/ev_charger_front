module.exports = {
    collectCoverageFrom: ["src/**/*.{js,jsx,ts,tsx}", "!src/**/*.d.(ts|tsx)"],
    setupFiles: ["<rootDir>/config/polyfills.js", "jest-localstorage-mock"],
    testEnvironment: "node",
    testURL: "http://localhost",
    transform: {
        "^.+\\.(js|jsx|mjs)$": "<rootDir>/node_modules/babel-jest",
        "^.+\\.tsx?$": "<rootDir>/config/jest/typescriptTransform.js",
        "^.+\\.(css|scss)$": "<rootDir>/config/jest/cssTransform.js",
        "^.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
            "<rootDir>/config/jest/fileMock.js",
        "^(?!.*\\.(js|jsx|mjs|css|json)$)": "<rootDir>/config/jest/fileTransform.js",
    },
    testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
    moduleNameMapper: {
        "\\.(css|scss)$": "<rootDir>/config/jest/cssTransform.js",
        "^.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
            "<rootDir>/config/jest/fileMock.js",
        "^react-native$": "react-native-web",
        "^@components(.*)$": "<rootDir>/build/components$1",
        "^@app(.*)$": "<rootDir>/build/app$1",
        "^@config(.*)$": "<rootDir>/src/config$1",
        "^@services(.*)$": "<rootDir>/build/services$1",
        "^@entities(.*)$": "<rootDir>/build/entities$1",
        "^@context(.*)$": "<rootDir>/build/context$1",
        "^@utils(.*)$": "<rootDir>/build/utils",
        "^@tests(.*)$": "<rootDir>/build/tests$1",
        "^@lib(.*)$": "<rootDir>/build/lib$1",
    },
    testPathIgnorePatterns: ["/node_modules/", "<rootDir>/scripts", "<rootDir>/build"],
    moduleFileExtensions: ["mjs", "web.ts", "ts", "web.tsx", "tsx", "web.js", "js", "web.jsx", "jsx", "json", "node"],
    globals: {
        "ts-jest": {
            tsConfig: "tsconfig.test.json",
            babelConfig: { presets: ["env"] },
        },
    },
};
