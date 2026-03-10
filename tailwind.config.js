module.exports = {
  content: ["./src/app/**/*.{ts,tsx}", "./src/components/**/*.{ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        jumpCondensed: ["KBLJump-EB-Condensed"],
        jumpExtended: ["KBLJump-EB-Extended"],
      },
    },
  },
  plugins: [],
};
