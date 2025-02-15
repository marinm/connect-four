const NATIONALITIES = [
    "albanian",
    "american",
    "argentinian",
    "brazilian",
    "british",
    "canadian",
    "french",
    "german",
    "indian",
    "irish",
    "italian",
    "korean",
    "lithuanian",
    "mexican",
    "nigerian",
    "peruvian",
    "portugese",
    "scottish",
    "spanish",
    "welsh",
    "azerbaijani",
    "iranian",
    "armenian",
    "iraqi",
    "portugese",
    "serbian",
    "bosnian",
    "croatian",
    "czech",
    "chinese",
    "japanese",
    "cambodian",
];

const ANIMALS = [
    "cat",
    "dog",
    "fish",
    "bear",
    "goose",
    "moose",
    "beaver",
    "snake",
    "tiger",
    "badget",
    "hedgehog",
    "skunk",
    "mouse",
    "cow",
    "raccoon",
];

function randomInt(max: number): number {
    return Math.floor(Math.random() * max);
}

function arrayRandom(array: string[]): string {
    return array[randomInt(array.length)];
}

export function randomName() {
    return `${arrayRandom(NATIONALITIES)}-${arrayRandom(ANIMALS)}`;
}
