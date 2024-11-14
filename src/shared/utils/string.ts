export const formatEmail = (email: string) => email.toLocaleLowerCase().trim();

export const formatName = (value: string) => {
  const words = value.trim().toLocaleLowerCase().split(" ");

  const name: string[] = [];

  words.forEach((item) => {
    const firstLetter = item.charAt(0);
    const firstLetterCap = firstLetter.toUpperCase();
    const remainingLetters = item.slice(1);

    const result = firstLetterCap + remainingLetters;

    name.push(result);
  });

  return name.join(" ");
};

