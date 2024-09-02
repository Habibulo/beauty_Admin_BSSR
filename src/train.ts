/*
  ZE-TASK:
    Shunday function yozing, uni  string parametri bolsin. 
    String ichida takrorlangan harflarni olib tashlab qolganini qaytarsin
    MASALAN: removeDuplicate('stringg') return 'string'
*/
function removeDuplicate(input: string): string {
  // Create a Set to store unique characters
  const uniqueChars = new Set<string>();

  // Iterate through each character in the input string
  for (const char of input) {
      // Add each character to the Set
      uniqueChars.add(char);
  }

  // Convert the Set back to a string by joining its elements
  return Array.from(uniqueChars).join('');
}

// Example usage
const result = removeDuplicate('stringg');
console.log(result); // Output: 'string'
