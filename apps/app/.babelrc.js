module.exports = {
  presets: ["next/babel"],
  plugins: "CYPRESS_INSTRUMENT_CODE" in process.env ? ["istanbul"] : [],
};
