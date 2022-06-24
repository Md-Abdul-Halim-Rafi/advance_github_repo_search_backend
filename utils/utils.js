const isProduction = process.env.NODE_ENV === "production";

const isArrayAndHasContent = (arr) => {
    return Array.isArray(arr) && arr.length > 0;
}

module.exports = { isProduction, isArrayAndHasContent };