"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseAadhaarAddressInfo = exports.parseAadhaarBasicInfo = void 0;
const parseAadhaarBasicInfo = (text1, result) => {
    // Initialize with only the requested fields
    const nameMatch = text1.match(/(?<=\n-)[A-Za-z\s]+(?=\n)/);
    const dobMatch = text1.match(/\b(\d{2}\/\d{2}\/\d{4})\b/);
    const genderMatch = text1.match(/\b(Male|Female|Other)\b/i);
    const aadhaarMatch = text1.match(/\d{4}\s\d{4}\s\d{4}/);
    result.name = (nameMatch === null || nameMatch === void 0 ? void 0 : nameMatch[0]) || "";
    result.dob = (dobMatch === null || dobMatch === void 0 ? void 0 : dobMatch[0]) || "";
    result.gender = (genderMatch === null || genderMatch === void 0 ? void 0 : genderMatch[0]) || "";
    result.aadharNumber = (aadhaarMatch === null || aadhaarMatch === void 0 ? void 0 : aadhaarMatch[0]) || "";
    console.log(nameMatch === null || nameMatch === void 0 ? void 0 : nameMatch[0], dobMatch === null || dobMatch === void 0 ? void 0 : dobMatch[0], genderMatch === null || genderMatch === void 0 ? void 0 : genderMatch[0], aadhaarMatch === null || aadhaarMatch === void 0 ? void 0 : aadhaarMatch[0]);
};
exports.parseAadhaarBasicInfo = parseAadhaarBasicInfo;
const formatAddress = (addressText) => {
    // Remove any remaining special characters
    let formattedAddress = addressText.replace(/[|]/g, ", ");
    // Replace multiple commas with a single comma
    formattedAddress = formattedAddress.replace(/,\s*,/g, ",");
    // Make sure commas have spaces after them
    formattedAddress = formattedAddress.replace(/,(?!\s)/g, ", ");
    // Remove redundant spaces
    formattedAddress = formattedAddress.replace(/\s+/g, " ");
    // Add proper capitalization for readability
    formattedAddress = formattedAddress
        .split(", ")
        .map((part) => {
        // Don't alter text that might be all caps deliberately
        if (part.toUpperCase() === part && part.length > 3) {
            return part;
        }
        return part.replace(/\b\w/g, (c) => c.toUpperCase());
    })
        .join(", ");
    return formattedAddress;
};
const parseAadhaarAddressInfo = (text, result) => {
    const cleanedText = text.replace(/\s+/g, " ").trim();
    // For the specific format you're seeing (address followed by pincode)
    // Look for a pattern that might contain Kerala and a 6-digit pincode
    const addressWithPincodePattern = /(.*?Kerala.*?\d{6})/i;
    const addressMatch = cleanedText.match(addressWithPincodePattern);
    if (addressMatch === null || addressMatch === void 0 ? void 0 : addressMatch[1]) {
        result.address = addressMatch[1].trim();
    }
    else {
        // Fallback: Look for any substantial text that's not the Aadhaar number
        // (Aadhaar numbers have a specific format of 4 digits, space, 4 digits, space, 4 digits)
        const nonAadhaarText = cleanedText.replace(/\d{4}\s\d{4}\s\d{4}/, "");
        // Get the longest coherent part that might be an address
        const possibleAddress = nonAadhaarText
            .split("|")
            .filter((part) => part.length > 10 && !part.includes("@"))
            .sort((a, b) => b.length - a.length)[0];
        if (possibleAddress) {
            result.address = possibleAddress.trim();
        }
    }
    // Extract pincode - specifically for Kerala format (6 digits)
    const pincodeMatch = text.match(/Kerala,?\s*(\d{6})/i) || text.match(/\b(\d{6})\b/);
    if (pincodeMatch) {
        result.pincode = pincodeMatch[1];
    }
    // Clean up address if needed
    if (result.address && result.pincode) {
        result.address = formatAddress(result.address);
        // Remove pincode from address if it's included
        result.address = result.address.replace(result.pincode, "").trim();
        // Remove trailing commas, etc.
        result.address = result.address.replace(/,\s*$/, "").trim();
    }
};
exports.parseAadhaarAddressInfo = parseAadhaarAddressInfo;
